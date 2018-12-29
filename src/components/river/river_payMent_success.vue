<template>
    <div class="payMain">
        <div class="projectTop">
            支付结果
        </div>
         <div class="payment">
            <span><img src="../../assets/payment/pay_success.png"></span>
            <span class='shi'>{{data}}</span>
            <span @click="chakan">{{one}}
            </span>
            <span @click="zailai">{{two}}
            </span>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      data:'支付成功',
      one:'查看订单',
      two:'返回首页',
      dingdan_id:'',
      chakan_success_url:'',
      zailai_url:''
    }
  },
  mounted() {
     this.dingdan_id=localStorage.dingdan_id;
     if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
    }
   
    //  this.chakan_success_url = localStorage.chakan_success_url; 
    //  this.zailai_url=localStorage.zailai_url;
  },
  destroyed(){
  window.removeEventListener('popstate', this.goBack, false);
},
  methods:{
      goBack(){
    this.$router.replace({path: '/'});
    //replace替换原路由，作用是避免回退死循环
  },
      chakan(){
          this.$router.push({
            path: '/river_orderDetailUn',   //已完成的订单详情
            query: {
                orderNum: this.dingdan_id
            }
        });
      },
      zailai(){
          this.$router.push({
            path: "/riverDetail"
        });
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
.payment span:nth-child(3) a {
    color:#fff;
}
.payment span:nth-child(4){
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
