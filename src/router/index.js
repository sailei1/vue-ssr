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
    },
    'rem':function (resolve) {
        require.ensure(['../views/rem/rem.vue'], function (index) {
            require(['../views/rem/rem.vue'], resolve);
        }, 'rem');
    },
    'finger':function (resolve) {
        require.ensure(['../views/finger/finger.vue'], function (index) {
            require(['../views/finger/finger.vue'], resolve);
        }, 'finger');
    },
    // 'seat':function (resolve) {
    //     require.ensure(['../views/seat/seat.vue'], function (index) {
    //         require(['../views/seat/seat.vue'], resolve);
    //     }, 'seat');
    // },
}


const routes=[];

routes.push(
    {path: '/', redirect: '/index'},
    {path:'/index',name:'index',component:mapObj.index},
    {path:'/detail',name:'detail',component:mapObj.detail},
    {path:'/rem',name:'rem',component:mapObj.rem},
    {path:'/finger',name:'finger',component:mapObj.finger},
    // {path:'/seat',name:'seat',component:mapObj.seat},
);

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({y: 0}),
        routes: routes
    });
}