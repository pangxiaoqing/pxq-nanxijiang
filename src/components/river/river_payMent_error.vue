<template>
    <div class='payMain'>
        <div class="projectTop">
            支付结果
        </div>
         <div class="payment">
            <span><img src="../../assets/payment/pay_error.png"></span>
            <span class='shi'>{{data}}</span>
            <span >支付遇到问题，请重新支付</span>
            <span @click="chakan">{{two}}</span>
            <span @click="chongxin">{{one}}</span>
        </div>
    </div>
</template>
<script>
import payMixins from "@/payMixins.js";
export default {
  data() {
    return {
      data:'支付失败',
      one:'重新支付',
      two:'返回首页',
    //   dingdan_id:'',
    //   chakan_error_url:'',
    //   zhongxin_url:''
    orderId:'',
    id:''
    }
  },
  mounted() {
    //  this.dingdan_id=localStorage.dingdan_id;
    this.orderId = this.$route.query.id;   //订单id
    this.id = this.$route.query.lnum;      //订单编号
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
    }
   
    //  this.chakan_error_url = localStorage.chakan_error_url; 
    //  this.zhongxin_url=localStorage.zhongxin_url;
  },
  destroyed(){
    window.removeEventListener('popstate', this.goBack, false);
  },
  mixins:[payMixins],
  methods:{
      goBack(){
    this.$router.replace({path: '/'});
    //replace替换原路由，作用是避免回退死循环
  },
      chakan(){
          this.$router.push({
            path: '/riverDetail'
        });
      },
      chongxin(){
        //   this.$router.push({
        //     path: '/orderList/allOrder'
        // });
        this.goPay();
      }
  }
};
</script>
<style scoped>
.payMain{
        background:rgba(245,245,246,1);
}
.payment{
  margin-top: 1.4rem;
}
.payment span img{
    width: 2.1rem;
    /* height: 2.536rem; */
    margin: 0 0.3623rem;
}
.payment span:nth-child(2){
    margin-top: 0.2898rem;
    display: block;
    font-size: 0.3rem;
    color:#484848;
    width:100%;
}
.payment span:nth-child(3){
    margin-top: 0.2rem;
    display: block;
    font-size: 0.2rem;
    color:#6C6C6CFF;
    width:100%;
}
.payment span:nth-child(4){
    display: block;
    font-size: 0.3rem;
    /* background-color: #08b7c5; */
    height: 0.8rem;
    line-height: 0.8rem;
    border: 1px solid #dcdcdc;
    border-radius: .1rem;
    margin: 1.2rem .8rem 0 .8rem;
    color:#7c7c7f;
}
.payment span:nth-child(4) a {
    color:#fff;
}
.payment span:nth-child(5){
    display: block;
    font-size: 0.3rem;
    border: 1px solid #40b1ff;
    background-color: #40b1ff;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: .1rem;
    margin: .4rem .8rem 0 .8rem;
    color: #fff;
}
.projectTop {
  position: fixed;
  width: 100%;
  height: 0.88rem;
  background: #fff;
  z-index: 1;
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.33rem;
}
</style>
