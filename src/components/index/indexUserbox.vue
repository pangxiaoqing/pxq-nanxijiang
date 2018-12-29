<template>
 <div class="pageFullScreen" id="xxxFullScreen">
     <div class="user_box" v-show="show_hide">
         <div>
             <router-link to ="/river_projectOrder">我的订单</router-link>
         </div>
     </div>
 </div>
</template>
<script>
export default {
    props:{
     "show_hide":Boolean
    },
    data() {
        return {

        }
    },
    activated() {

    },
    methods:{
        loginDel(){
            console.log(1)
            this.axios.get("/encdata-pandaro/account/logout1").then((res)=>{
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * -1);
                window.document.cookie = "userName" + "=" + "" + ";path=/;expires=" + exdate.toGMTString();
                alert("退出成功！");
                //location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcdbacc55093a60d0&redirect_uri=http%3A%2F%2Fgenius.enn.cn%2Fencdata-ticket%2F%23%2FriverDetail&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
                // this.$router.push({
                //     path:'/login'
                // })
                // router.replace({
                //         path: 'login',
                //         query: {redirect: router.currentRoute.fullPath}
                //     })
            }).catch(()=>{})
        }
    }
}
</script>
<style scoped>
.user_box{
    position: absolute;
    top:90%;
    right:0%;
    /* height:0.8rem; */
    width:2.6rem;
    /* background: url('../../assets/indexImg/user_box.png') no-repeat ; */
    background-size:100% 100%; 
    border-radius: 0.3rem;
    padding:0.08rem 0;
    font-size:.28rem;
    z-index: 100;
}
.user_box div>a{
    display: block;
    height:0.78rem;
    width:100%;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    line-height: 0.78rem;
    text-align: center;
    color:#7d7d7e;
    background: #fff
}
.user_box div:last-child>a{
    border:0;
}
</style>
