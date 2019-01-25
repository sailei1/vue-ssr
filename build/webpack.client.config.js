const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// const vConsolePlugin = require('vconsole-webpack-plugin');
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const build_type=process.env.TYPE;
const { SkeletonPlugin } = require('page-skeleton-webpack-plugin');
const {routes} = require('./skeleton.routes');

let output={};
if(build_type==='SPA'){
    output={
        path: path.resolve(__dirname,   '../dist_spa'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    };
}

let index_html=build_type==='PWA' ? '../dist/index.html' : '../dist_spa/index.html';



const config = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
    output: output,
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  // const categories = Category.map(category => category.title).join('|');
  // const categoryUrlPattern = new RegExp('^/(' + categories + ')');
  // config.plugins.push(
  //   // auto generate service worker
  //   new SWPrecachePlugin({
  //     cacheId: 'qsc-ssr',
  //     filename: 'service-worker.js',
  //     minify: false,
  //     dontCacheBustUrlsMatching: /./,
  //     staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
  //     runtimeCaching: [
  //       {
  //         urlPattern: '/',
  //         handler: 'networkFirst'
  //       },
  //       // {
  //       //   urlPattern: categoryUrlPattern,
  //       //   handler: 'networkFirst'
  //       // }
  //     ]
  //   })
  // )
    config.plugins.push(
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, index_html),
            template: 'src/index_spa.template.html',
            inject: true,
            minify: {
                // removeComments: true,
                collapseWhitespace: false,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
    )
    config.plugins.push(
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public'),
                to: 'public',
                ignore: ['.*']
            }
        ])
    )

    config.plugins.push(
        // copy custom static assets
        //加载骨架
        new SkeletonPlugin({
            pathname: path.resolve(__dirname, '../shell'),
            staticDir: path.resolve(__dirname, '../dist_spa'),
            routes: routes,
            loading: 'chiaroscuro',
            svg: {
                color: '#EFEFEF',
                shape: 'circle',
                shapeOpposite: ['.Rating-gray_1kpffd5_0 svg']
            },
            image: {
                shape: 'rect', // `rect` | `circle`
                color: '#EFEFEF',
                shapeOpposite: ['.mint-swipe-items-wrap img']
            },
            pseudo: {
                color: '#EFEFEF', // or transparent
                shape: 'circle', // circle | rect
                shapeOpposite: ['.delivery-icon-hollow_3q8_B5r_0', '.index-premium_39rl0v9']
            },
            button: {
                color: '#EFEFEF',
                excludes: ['.mint-swipe-items-wrap a']
            },
            defer: 5000,
            excludes: [],
            remove: [],
            hide: ['.index-dashedline_7B79b3W', '.Rating-actived_GBtiHkB_0'],
            grayBlock: ['#header'],
            cssUnit: 'rem',
            headless: true,
            minify: {
                minifyCSS: { level: 2 },
                removeComments: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: false
            },
            // cookies: [{
            //     name: 'SID',
            //     value: 'a495vvmEPEE4DZi083dr8yR3EAPYqW40HaWA',
            //     url: 'https://h5.ele.me'
            // }, {
            //     name: 'USERID',
            //     value: '273745271',
            //     url: 'https://h5.ele.me'
            // }],
            noInfo: false,
            // storagies: {
            //     test: '1234'
            // }
        })
    )



    if (process.env.npm_config_report) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
        config.plugins.push(new BundleAnalyzerPlugin())
    }
}
module.exports = config
