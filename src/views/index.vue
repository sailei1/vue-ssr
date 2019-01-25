<template>
    <div class="bg">
        首页 {{text}}
        <div @click="gotoDetail"> 详情页</div>
        <router-link :to="{ name: 'detail',query: {id:'123'}}">详情页</router-link>
        <div>
        <router-link :to="{ name: 'rem',query: {id:'123'}}">rem</router-link>
        </div>
        <div @click="testMethod"> {{test}}</div>

    </div>
</template>
<style lang="scss" scoped>
     @import "./index.scss";
</style>
<script>
    import  test from '../store/modules/testModule'
    import Item from '../components/Item.vue'

    export default{
        name:'index',
        metaInfo: {
            title: '标题',
        },
        asyncData ({ store }) {
            store.registerModule('test', test);
            return store.dispatch('test/getServerData')
        },
         data(){
             return{
//                 text:''
             }
         },
        components: {
            Item
        },
        computed: {
            text() {
                return this.$store.state.test.server_text;
            },
            test(){
                return this.$store.state.test.test;
            }

        },
        mounted(){

        },
        destroyed () {
            this.$store.unregisterModule('test')
        },
        methods:{
            gotoDetail(){
                this.$router.push({ name: 'detail', query: {id:'123'}});
            },
            testMethod(){
                this.$store.dispatch('test/getServerDataByMethod')
            }
        }

    }
</script>