<template>
    <div>
        <Heador>
            <img @click="back" src="../../assets/header/arrow.png" alt="">
            <h4>{{title}}</h4>
        </Heador>
        <div class="default">
            <img src="../../assets/lazyload/default.png" alt="">
        </div>
    </div>
</template>

<script>
import Heador from '@/components/index/header.vue'
export default {
    components:{
        Heador
    },
    data(){
        return{
            title:''
        }
    },
    mounted(){
        this.title=this.$route.query.Title
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goBack, false);
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.goBack, false);
    },
    methods:{
        goBack(){
            this.$router.replace({path: '/'});
            //replace替换原路由，作用是避免回退死循环
        },
        back(){
            this.$router.push({
                path:'/riverDetail'
            })
        }
    }
}
</script>


<style>
    .default{
        margin: 4rem auto 0;
    }
    .default img{
        width:50%;
        
    }
</style>

