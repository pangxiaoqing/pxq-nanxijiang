<template>
    <div id="Allorder">
        <Heador>
            <img @click="back" src="../../assets/header/arrow.png" alt="">
            <div class="headerTitle">
                <!-- <router-link to="/orderList/allOrder">订单记录</router-link> -->
                <span>订单记录</span>
                <i></i>
                <!-- <span></span> -->
                <router-link to="/refundOrderList/refundAllOrder">退票记录</router-link>
            </div>
        </Heador>
        <!-- <keep-alive> -->
            <div class="OrderBox">
                <router-link to="/orderList/allOrder" @click.native="changeTab($event)">全部</router-link>
                <router-link to="/orderList/payOrder" @click.native="changeTab($event)">待支付</router-link>
                <router-link to="/orderList/useOrder" @click.native="changeTab($event)">待使用</router-link>
                <router-link to="/orderList/yiUseOrder" @click.native="changeTab($event)">已使用</router-link>
                <router-link to="/orderList/refundOrder" @click.native="changeTab($event)">已取消</router-link>
                <router-link to="/orderList/outDateOrder" @click.native="changeTab($event)">已过期</router-link>            
            </div>
        <!-- </keep-alive> -->
        <div class="order_content">
            <router-view></router-view>
        </div>
        <footor/>
    </div>
</template>
<script>
import Heador from '@/components/index/header'
import Footor from '@/components/index/footer2'

export default {
   data() {
      return {
          title:"我的订单",
          src_href:'/',
      }
   },
   components:{
        Heador,
        Footor
   },
   methods: {
       changeTab:function(event) {
           var child=document.querySelectorAll(".OrderBox a");
           for(var i=0;i<child.length;i++) {
               child[i].style.color="#6C6C6C";
               child[i].style.fontWeight="400";
           }
           event.currentTarget.style.color="#40B1FF";
           event.currentTarget.style.fontWeight="600";
       },
       back(){
            this.$router.push({
                path:this.src_href
            })
        }
   }
}
</script>
<style scoped>
.headerTitle {
    margin: 0 auto;
}
.headerTitle>span,
.headerTitle>a {
    display: inline-block;
    padding: 0 .3rem;
    font-size: .36rem;
}
.headerTitle i {
    display: inline-block;
    height: .34rem;
    width: .02rem;
    margin-bottom: .06rem;
    background-color: #6C6C6C;
    vertical-align: middle;
}
.headerTitle>span {
    color:#333335;
}
.headerTitle>a {
    color:#878789;
}
.order_content{
    height:100%;
    margin-top: 1.8rem;
}
#Allorder {
    width:100%;
    height:100%;
} 
.OrderBox{
    position: fixed;
    width: 100%;
    height: 0.98rem;
    line-height: 0.98rem;
    border-bottom: .01rem solid #dadada;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    background-color: #fff;
    z-index: 10;
    border-top: .01rem solid #E5E5E7;
    margin-top: .88rem;
}
.OrderBox a{
    font-size: 0.28rem;
    color: #6C6C6C;
    padding: 0 .16rem;
}
.OrderBox a:first-child {
    color: #40B1FF;
    font-weight: 600;
}
</style>
