import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const mapObj = {
    'index':function (resolve) {
        require.ensure(['../views/index.vue'], function (index) {
            require(['../views/index.vue'], resolve);
        }, 'index');

    }
}


const routes=[];

routes.push(
    {path: '/', redirect: '/index' },
    {path:'/index',component:mapObj.index}
);

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({y: 0}),
        routes: routes
    });
}