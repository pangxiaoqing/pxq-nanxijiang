<template>
 <div>
    <div class="projectTop">
            <span @click="back"><img src="../../assets/project/return.png"/></span>
            <span>{{this.title}}</span>
        </div>
    <div>
        <div class="order_details">
            <p v-if="this.lState==1">未支付</p>
            <p v-else-if="this.lState==101">已预订（待支付）</p>
            <p v-else-if="this.lState==2">已支付</p>
            <p v-else-if="this.lState==3">已取消</p>
            <p v-else-if="this.lState==4">已完成</p>
            <p v-else-if="this.lState==5">已过期</p>
            <p v-else-if="this.lState==6">已退款</p>
            <p v-else-if="this.lState==601">已退押金</p>
            <p v-else-if="this.lState==7">已使用</p>
            <p v-else></p>
            <!-- 根据状态的不同，显示出来不同的内容 -->
            <p v-if="this.lState==1 || this.lState==101">请在&nbsp;<span class="jishi">{{timer}}</span>&nbsp;内完成支付，过期自动取消订单。</p>
            <span v-if="this.lState==3" class="quxiao">您的订单已取消！</span>
            <div v-if="this.lState==1 || this.lState==101" class="order_goplay"><span class="lijizhifu" @click="goPay" >立即支付</span></div>
            <!-- <div v-if="this.lState==3 " class="order_goplay"><span class="zhifu_again" @click="goPay_again" >再次预订</span></div> -->
            <div v-if="this.cishu>0 && (this.lState==2 || this.lState==5 || this.lState==7)" class="order_goplay"><span class="zhifu_anniu" @click="tuiOrder">退票</span></div>
        </div>
        <div class="order_content" v-show="erwei">
          <h1 class="ticketName">{{data_list.ticketName}}</h1>
            <div class="box_img">
                <div id="qrcode"></div>
            </div>
            <div class="box_b">
            </div>
            <div class="box_b">
                <span class="ping_zheng">凭证码：{{data_list.code}}</span>
            </div>
            <div class="box_b">
                <span class="ping_zheng">剩余次数：{{data_list.surplusNum}}</span>
            </div>
            <div class="box_b">
                <span class="ping_zheng">已使用：{{data_list.usedNum}}</span>
                <span class="ping_zheng">已退票：{{data_list.refundCount}}</span>
            </div>
        </div>
        <div class="order_content">
            <h1>商品信息</h1>
            <div class="box_b ticketName">
                <span>商品名称：</span><span>{{data_list.ticketName}}</span>
            </div>
            <div class="box_b ">
                <span>入园时间：</span><span>{{data_list.payTime}}</span>
            </div>
            <div class="box_b">
                <span>单价：</span><span>¥{{data_list.tprice}}</span>
            </div>
            <div class="box_b">
                <span>入园人数：</span><span>{{data_list.tnum}}</span>
            </div>
            <div class="box_b">
                <span>总金额：</span><span class="">¥{{data_list.totalPrice}}</span>
            </div>
        </div>
        <div class="order_content">
          <h1>联系人信息</h1>
            <div class="box_b">
                <span>联系人：</span><span>{{data_list.orderName}}</span>
            </div>
            <div class="box_b">
                <span>手机号：</span><span>{{data_list.orderTel}}</span>
            </div>
            <div class="box_b">
                <span>身份证号：</span><span>{{data_list.personId}}</span>
            </div>
        </div>
        <div class="order_content">
          <h1>订单信息</h1>
            <div class="box_b">
                <span>订单编号：</span><span>{{data_list.lnum}}</span>
            </div>
            <div class="box_b">
                <span>下单时间：</span><span>{{data_list.orderTime}}</span>
            </div>
        </div>
    </div>
 </div>
</template>
<script>
import payMixins from "@/payMixins.js";
import QRCode from 'qrcodejs2'
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      title: "订单详情",
      src_href:'',
      isShow:false,
      timer:0,
      leftTime:"",
      zhifu:"立即支付",
      // zhifu_state:"已支付",
      data_list:{},
      orderNum:'',
      zhifu_anniu:true,
      lState:"",
      UUordernum:"",
      orderID:"",
      enter:'',
      state:'',
      id:"",
      erwei:false,
      cishu:0
    };
  },
  mixins:[payMixins],
  activated() {},
  mounted() {
    Indicator.open();
    // this.id用于传给支付的编号
    this.id = this.$route.query.orderNum;  //订单编号
    this.orderNum = this.$route.query.orderNum;  //订单编号
    this.orderID = this.$route.query.orderID;    //订单id
    this.state= this.$route.query.state;    //订单状态
    this.enter = this.$route.query.enter;
    this.pickData();
  },
  methods: {
    back(){
      if(this.enter==0) {
          this.$router.replace({path: '/orderList/allOrder'});
      } else {
        if(this.state==1) {
          this.$router.replace({path: '/orderList/payOrder?type=1'});
        } else if(this.state==2) {
          this.$router.replace({path: '/orderList/useOrder?type=2'});
        } else if(this.state==7) {
          this.$router.replace({path: '/orderList/yiUseOrder?type=3'});
        } else if(this.state==3) {
          this.$router.replace({path: '/orderList/refundOrder?type=4'});
        } else if(this.state==5) {
          this.$router.replace({path: '/orderList/outDateOrder?type=5'});
        } else {
          this.$router.replace({path: '/orderList/allOrder'});
        }
      }
    },
    //二维码
    qrcode (pzmCode) {
      let qrcode = new QRCode('qrcode', {
        // width: 100,
        // height: 100, // 高度
        //  text: "222" // 二维码内容
         text: pzmCode // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      })
      console.log(qrcode)
    },
    pickData() {
      this.axios
        .get("/ticket/home/order/detail",{
           params:{
            //  number:"TK201812280114560060"
            //  number:"TK2018122720430630341"
             
             number:this.orderNum
          }
        })
        .then(res => {
          console.log(JSON.stringify(res.data));
          console.log(res.data);
          if(res.data.result==1){
            this.data_list=res.data.value.orderDetailList[0];
             this.lState=res.data.value.orderDetailList[0].status;
             this.cishu=res.data.value.orderDetailList[0].surplusNum;
             Indicator.close();
             if(this.lState==2  || this.lState==5 || this.lState==7){
               this.qrcode(this.data_list.code);
               this.erwei=true;
             }else if(this.lState==1 || this.lState==101){
                //倒计时的字段返回
          this.axios
            .get("/ticket/orderQueryOne",{
                params:{
                  localOrderNum:this.orderNum
                }
              })
              .then(res1 => {
                  this.leftTime=res1.data.countDown;
                  this.CountDown();
                })
              .catch(() => {});
           
             }else{
               this.erwei=fasle;
             }
          // this.UUordernum=res.data.lNum;
          
          
          
          }
          
        })
        .catch(() => {});
    },
    //再次预订
    // goPay_again(){
    //   this.$router.push({
    //     path:"",
    //     query:{
    //       orderID:this.orderID
    //     }
    //   })
    // },
    //退票
    tuiOrder(){
      alert("跳到退票申请页");
       this.$router.push({
        path:"/refundApplication",
        query: {
                 id:this.orderNum
              }
        
      })
    },
    //取消未支付的订单
    cancelOrder(){
      this.axios
                      .get("/ticket/Order_Change_Pro",{
                        params:{
                                    ordern:this.orderNum,
                                    num:0,
                                    ordertel :"",
                                    m:""
                                  }
                      })
                      .then(res => {
                        console.log(JSON.stringify(res));
                        console.log(res.data.result[0].UUerrorinfo);
                        //取消成功，跳到本页面
                        this.$router.push({
                          path:"/river_orderDetailUn",
                          query: {
                            orderNum:this.orderNum
                          }
                          
                        })
                        //console.log(res.data.result);
                      })
                      .catch(() => {});
    },
    //倒计时
     CountDown () {
              if (this.leftTime >= 0) {
                  //alert(this.leftTime)
                     var m = Math.floor(this.leftTime / 60 % 60);
                    var s = Math.floor(this.leftTime % 60);
                    this.leftTime=this.leftTime-1;
                    this.timer=m+"分"+s+"秒";
                     setTimeout(this.CountDown, 1000);
                    //  //console.log("时间"+m+":"+s);
                }else{
                    console.log("时间到了");
                    // this.isShow=true;
                    this.lState=3 ;
                  }
    }
  },
  components: {
  }
};
</script>
<style scoped>
.isShow{
  display: none;
}
.order_details {
  margin-top: 0.88rem;
  padding: 5.5% 0;
  /* height: 1.7rem; */
  font-size: 0.2rem;
  background:rgba(245,245,246,1);
}
.order_details p:nth-child(1) {
  color: #232323;
  font-weight: bold;
  font-size: 0.36rem;
}
.order_details p:nth-child(2) {
  margin-top: 0.2rem;
  font-size: 0.32rem;
}
.order_details p {
  line-height: 0.35rem;
}
.order_details .quxiao{
  line-height: 0.6rem;
  font-weight:500;
  color:rgba(135,135,137,1);
  font-size: .26rem;
}
.order_details .jishi{
  color:red;
  font-weight: 500;
}
.order_ts {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 1rem;
  line-height: 1rem;
  border-bottom: 0.01rem solid #dadada;
  font-size: 0.26rem;
  padding-left: .3rem;
}
.order_ts span {
  color: red;
  margin: 0 0.05rem;
  font-size: 0.24rem;
}
.order_content {
  /* height:2.58rem; */
  background-color: #fff;
  border-bottom: 0.2rem solid #f7f7f7;
}
.order_content h1 {
  height: .8rem;
  padding-left: 0.3rem;
  text-align: left;
  line-height: .8rem;
  font-size: 0.3rem;
  font-weight:600;
  color:rgba(72,72,72,1);
}
.order_content .box_b {
  height: 0.4rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
  color: #777;
}
.order_content .box_img {
  height: 2rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
}
.order_content .box_img #qrcode{
    width: 32%;
    height: 100%;
    margin: 0 auto;
}
.order_content .box_b span:nth-child(1) {
  width: 32%;
    height: 100%;
    line-height: 0.4rem;
    /* margin-right: 0.98rem; */
    font-size: 0.28rem;
    text-align: left;
}
.order_content .box_b span:nth-child(2)  {
    width: 65%;
    height: 100%;
    line-height: 0.4rem;
    /* margin-right: 0.98rem; */
    font-size: 0.28rem;
    text-align: left;
    font-weight:500;
    color:rgba(72,72,72,1);
}
.order_content .box_b p {
  height: 100%;
  line-height: 0.4rem;
  font-size: 0.26rem;
  /* margin-right: 1.3rem; */
}
.order_content .box_b .jine{
  font-size: 0.4rem!important;
  font-weight:500;
  color:rgba(72,72,72,1);
}
.product_content .box_b > span:first-child {
  width: 53%;
  margin-right: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product_content .box_b > p {
  width: 20%;
  margin-right: 0;
}
.product_content .box_b > span:last-child {
  width: 27%;
  margin-right: 0;
}
.last-content {
  margin-bottom: 0.98rem;
}
.order_bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  text-align: center;
  height: 0.98rem;
  line-height: 0.98rem;
  background-color: #07b6c4;
  color: #fff;
  font-size: 0.32rem;
}
.projectTop {
  position: fixed;
  width: 100%;
  height: 0.88rem;
  background: #fff;
  z-index: 1;
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.3rem;
  border-bottom:.01rem solid #dadada;
}
.projectTop > span:nth-child(1) {
  position: absolute;
  width: 0.18rem;
  left: 0.28rem;
  height: 0.88rem;
  line-height: 0.88rem;
}
.projectTop > span:nth-child(1) img {
  width: .48rem;
    height: .48rem;
    top: .22rem;
}
.zhifu_anniu{
    display: inline-block;
    font-size: 0.3rem;
    background-color: #40b1ff;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius:4px;
    margin: .4rem .2rem 0 .2rem;
}
.lijizhifu{
    display: inline-block;
    width:3.6rem!important;
    font-size: 0.3rem;
    background-color: #40b1ff!important;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius:4px;
    margin: .4rem .2rem 0 .2rem;
    color:rgba(255,255,255,1)!important;
}
.zhifu_again{
    display: inline-block;
    font-size: 0.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius:4px;
    margin: .4rem .2rem 0 .2rem;
    width:1.6rem;
    border:none!important;
    background-color: #40b1ff!important;
    font-weight:500;
    color:rgba(255,255,255,1)!important;
}
.order_goplay span:nth-child(1){
  width:1.6rem;
  border:1px solid rgba(220,220,220,1);
  background:rgba(245,245,246,1);
  font-weight:500;
  color:rgba(170,170,170,1);
}
.order_goplay span:nth-child(2){
  width:3.6rem;
  font-weight:500;
  color:rgba(255,255,255,1);
}
.ping_zheng{
  width:100%!important;
  text-align: center!important;
}
.ticketName{
  height:auto!important;
}
</style>
