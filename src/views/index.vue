<template>
    <div class="bg">
        首页 {{text}}
    </div>
</template>
<style lang="scss" scoped>
     @import "./index.scss";
</style>
<script>

    import Item from '../components/Item.vue'
    import {mapGetters} from 'vuex';
    import axios from 'axios';
    import website from'../config/website'

    export default{
        name:'index',
        metaInfo: {
            title: '标题',
        },
            asyncData ({ store }) {
            return store.dispatch('getServerData')
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
                return this.$store.getters.getText;
            }
        },
        mounted(){
//            this.loadData();
        },
        methods:{
//            loadData(){
//                let url='http://127.0.0.1:9999/detail';
//                axios({
//                    method:'get',
//                    url: url,
//                }).then(response => {
//                     console.log(response.data);
//                     let data=response.data;
//                     this.text=data.itemInfo.text;
//
//                }).catch(err => {
//                    console.error(err);
//                });
//            }
        }

    }
</script>