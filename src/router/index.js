import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const mapObj = {
    'index':function (resolve) {
        require.ensure(['../views/index.vue'], function (index) {
            require(['../views/index.vue'], resolve);
        }, 'index');
    },
    'detail':function (resolve) {
        require.ensure(['../views/detail/detail.vue'], function (index) {
            require(['../views/detail/detail.vue'], resolve);
        }, 'detail');
    }
}


const routes=[];

routes.push(
    {path: '/', redirect: '/index'},
    {path:'/index',name:'index',component:mapObj.index},
    {path:'/detail',name:'detail',component:mapObj.detail}
);

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({y: 0}),
        routes: routes
    });
}