const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const path = require('path')
const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const vConsolePlugin = require('vconsole-webpack-plugin');
const { SkeletonPlugin } = require('page-skeleton-webpack-plugin');
const {routes} = require('./skeleton.routes');

const config={
    // Paths
    assetsSubDirectory: 'public',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay:true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
}

const devWebpackConfig = merge(base, {
    entry: {
        app: './src/entry-client.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist_spa'),
        publicPath: '/',
        filename: '[name].js'
    },
    devtool: config.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: '0.0.0.0',
        port: config.port,
        open: false,
        overlay: config.errorOverlay ? { warnings: false, errors: true } : false,
        publicPath: config.assetsPublicPath,
        // proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.poll,
        }
    },

    performance: {
        hints: false
    },
    devtool: '#eval-source-map',


    resolve: {

    },

    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env':config
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist_spa/index.html'),
            template: 'src/index_spa.template.html',
            inject: true,
            minify: {
                // removeComments: true,
                collapseWhitespace: false,
                removeAttributeQuotes: true
            },
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public'),
                to: config.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
        new vConsolePlugin({
            filter: [],  // 需要过滤的入口文件
            enable: true // 发布代码前记得改回 false
             }),

        // //加载骨架
        // new SkeletonPlugin({
        //     pathname: path.resolve(__dirname, '../shell'),
        //     staticDir: path.resolve(__dirname, '../dist_spa'),
        //     routes: routes,
        //     loading: 'chiaroscuro',
        //     svg: {
        //         color: '#EFEFEF',
        //         shape: 'circle',
        //         shapeOpposite: ['.Rating-gray_1kpffd5_0 svg']
        //     },
        //     image: {
        //         shape: 'rect', // `rect` | `circle`
        //         color: '#EFEFEF',
        //         shapeOpposite: ['.mint-swipe-items-wrap img']
        //     },
        //     pseudo: {
        //         color: '#EFEFEF', // or transparent
        //         shape: 'circle', // circle | rect
        //         shapeOpposite: ['.delivery-icon-hollow_3q8_B5r_0', '.index-premium_39rl0v9']
        //     },
        //     button: {
        //         color: '#EFEFEF',
        //         excludes: ['.mint-swipe-items-wrap a']
        //     },
        //     defer: 5000,
        //     excludes: [],
        //     remove: [],
        //     hide: ['.index-dashedline_7B79b3W', '.Rating-actived_GBtiHkB_0'],
        //     grayBlock: ['#header'],
        //     cssUnit: 'rem',
        //     headless: true,
        //     minify: false,
        //     debug:true,
        //     // cookies: [{
        //     //     name: 'SID',
        //     //     value: 'a495vvmEPEE4DZi083dr8yR3EAPYqW40HaWA',
        //     //     url: 'https://h5.ele.me'
        //     // }, {
        //     //     name: 'USERID',
        //     //     value: '273745271',
        //     //     url: 'https://h5.ele.me'
        //     // }],
        //     // storagies: {
        //     //     test: '1234'
        //     // }
        // }),
    ]

})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = config.port;

    portfinder.getPort((err, port) => {
        if (err) {
            // console.log(JSON.stringify(err));
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.PORT = port

            // console.log(JSON.stringify(devWebpackConfig));

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${config.host}:${port}`],
                },
                onErrors: config.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})