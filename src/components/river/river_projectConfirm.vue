<template>
    <div class="pageFullScreen resturantConfirm" id="xxxFullScreen">
        {{getParams}}
        <!-- <publicHeader :data="title" :src_href="src_href"/> -->
        <div class="projectTop">
            <span @click="goLast()"><img src="../../../src/assets/project/return.png"></span>
            <span>{{this.title}}</span>
        </div>
        <div class="reserveNotice clearfix" >
            <p>
                请在{{timer}}内完成付款,否则订单都将取消
            </p>
            <p>{{list_dingdan.tell}}</p>
        </div>
        <div class="payType">
            <div>支付信息</div>
            <div>
                <span>支付方式</span>
                <!-- <span>{{list_dingdan.payType}}</span> -->
                <span>微信支付</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="orderInfo">
           <div>订单信息</div>
           <div>
               <div>
                   <span>订单号</span>
                   <span>{{list_dingdan.lNum}}</span>
               </div>
               <div>
                   <span>使用日期</span>
                   <span>{{list_dingdan.playTime}}</span>
               </div>
               <div>
                   <span>订单金额</span>
                   <span>￥{{list_dingdan.tprice}}</span>
               </div>
           </div>
        </div>
        <div class="line"></div>
        <div class="toutistInfo">
           <div>联系人信息</div>
           <div>
               <div>
                   <span>姓名</span>
                   <span>{{list_dingdan.orderName}}</span>
               </div>
               <div>
                   <span>手机号</span>
                   <span>{{list_dingdan.orderTel}}</span>
               </div>
               <div>
                   <span>身份证号</span>
                   <span>{{list_dingdan.personId}}</span>
               </div>
           </div>
        </div>
        <!-- <div class="line"></div>
        <div class="reserveInfo">
           <div>预订信息</div>
           <div>
               
               <div>
                   <span>手机号</span>
                   <span>{{list_dingdan.contactTel}}</span>
               </div>
           </div>
        </div> -->
        <div class="detailBottom">
            <span>合计：<i>￥{{list_dingdan.tprice}}</i></span>
            <span @click="goPay()">去支付</span>
        </div>
    </div>
</template>
<script>
// import publicHeader from "@/components/publicComponents/publicHeader";
import payMixins from "@/payMixins.js";
export default {
  data() {
    return {
      title: "订单确认页",
      src_href: "/projectShow",
      orderId: "",
      orderNum:'',
      list_dingdan: {},
      size: "",
      openid: "",
      leftTime:'',
      timer:'',
      id:"",
      orderState:''
    };
  },
  // components: {
  //   publicHeader
  // },
  mixins: [payMixins],
  activated() {},
  mounted() {
    // this.id = this.$route.query.id
    this.orderData();
  },
  methods: {
    orderData() {
      ////console.log(this.id);
      this.axios
        .get("/ticket/order/detail", {
          params: {
            orderId: this.orderId
          }
        })
        .then(res => {
          // console.log(res.data);
          this.list_dingdan = res.data;
          this.orderNum=res.data.lNum;
           this.id=res.data.lNum;
           this.orderState= res.data.lState;
           this.axios
            .get("/ticket/orderQueryOne", {
              params: {
                localOrderNum: this.orderNum
              }
            })
            .then(res1 => {
              this.leftTime=res1.data.countDown;
            })
            .catch(() => {});
          this.CountDown();
          //     // //console.log(res.data.value);
          //     //转成日期格式
          //     let date = new Date(res.data.value.partTime);
          //     let y = date.getFullYear();
          //     let MM = date.getMonth() + 1;
          //     MM = MM < 10 ? ('0' + MM) : MM;
          //     let d = date.getDate();
          //     d = d < 10 ? ('0' + d) : d;
          //     let h = date.getHours();
          //     h = h < 10 ? ('0' + h) : h;
          //     let m = date.getMinutes();
          //     m = m < 10 ? ('0' + m) : m;
          //     let s = date.getSeconds();
          //     s = s < 10 ? ('0' + s) : s;
          //     var timee= y + '-' + MM + '-' + d;
          //     res.data.value.partTime=timee;
          //     this.list_dingdan=res.data.value;
          //     var Size = res.data.value.size
          //     if(Size == 1){
          //         this.size = "人"
          //     }else if(Size == 2){
          //         this.size = "团"
          //     }
        })
        .catch(() => {});
    },
    getCookie(c_name) {
        var that = this;
        if (document.cookie.length > 0) {
            //检查这个cookie是否存在，不存在就为 -1
            var c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                //获取cookie值的开始位置
                c_start = c_start + c_name.length + 1;
                //通过";"号是否存在来判断结束位置
                var c_end = document.cookie.indexOf(";", c_start);

                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                //通过substring()得到了值
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return null
    },
    goLast() {
      // if(this.orderState==1) {
          var r = confirm("该订单尚未完成支付,确订要放弃支付吗？");
            if (r == true) {
                 this.axios.get("/ticket/Order_Change_Pro", {
                    params: {
                      ordern: this.orderNum,
                      num: 0,
                      ordertel: "",
                      m: ""
                    }
                  })
                  .then(res => {
                      // if(res.data.result!=2) {
                      //  成功
                        this.$router.push({
                          path: "/river_projectOrderDetailCancel",
                          query:{
                              orderID:this.orderId
                          }
                        });
                      // }
                  })
            }
          // } else {
          //     var r = confirm("该订单是已支付状态,点击确认即返回首页");
          //     if (r == true) {
          //       this.axios.get("/ticket/Order_Change_Pro", {
          //           params: {
          //             ordern: this.orderNum,
          //             num: 0,
          //             ordertel: "",
          //             m: ""
          //           }
          //         })
          //         .then(res => {
          //             if(res.data.result==2) {
          //             //  失败
          //               this.$router.push({
          //                 path: "/riverDetail"
          //               });
          //             }
          //         })
                    
          //     }
          // }
      },

    //倒计时
    CountDown() {
      if (this.leftTime >= 0) {
        var m = Math.floor((this.leftTime / 60) % 60);
        var s = Math.floor(this.leftTime % 60);
        this.leftTime = this.leftTime - 1;
        this.timer = m + "分" + s + "秒";
        setTimeout(this.CountDown, 1000);
        //  //console.log("时间"+m+":"+s);
      } else {
        this.$router.push({
            path: "/river_projectOrderDetailCancel",
            query:{
                orderID:this.orderId
            }
        });
      }
    }
  },
  computed: {
    getParams() {
      // 取到路由带过来的参数
      // console.log(this.$route.query.valueId)
      this.orderId = localStorage.getItem("orderId");
    }
  }
};
</script>
<style scoped>
.resturantConfirm {
  background-color: #f7f7f7;
}
.resturantConfirm .payType {
  height: 1.78rem;
  padding: 0 0.3rem;
  font-size: 0.34rem;
  background-color: #fff;
}
.payType > div:nth-child(2) {
  height: 0.62rem;
  font-size: 0.28rem;
  color: #777;
  text-align: left;
}
.payType > div:nth-child(2) > span:first-child {
  display: inline-block;
  width: 2.16rem;
}
.line {
  width: 100%;
  height: 0.2rem;
  background-color: #f7f7f7;
}
.resturantConfirm .orderInfo {
  width: 100%;
  height: 3rem;
  padding: 0 0.3rem;
  background-color: #fff;
}
.resturantConfirm .toutistInfo {
  width: 100%;
  height: 3rem;
  padding: 0 0.3rem;
  background-color: #fff;
}
.resturantConfirm .reserveInfo {
  width: 100%;
  height: 1.8rem;
  padding: 0 0.3rem;
  background-color: #fff;
  margin-bottom: 1.5rem;
}
.payType > div:nth-child(1),
.orderInfo > div:nth-child(1),
.toutistInfo > div:nth-child(1),
.reserveInfo > div:nth-child(1) {
  text-align: left;
  height: 1.16rem;
  line-height: 1.16rem;
  font-size: 0.36rem;
  color: #333;
}
.orderInfo > div:nth-child(2) > div,
.toutistInfo > div:nth-child(2) > div,
.reserveInfo > div:nth-child(2) > div {
  height: 0.62rem;
  font-size: 0.28rem;
  color: #777;
  text-align: left;
}
.orderInfo > div:nth-child(2) > div > span:nth-child(1),
.toutistInfo > div:nth-child(2) > div > span:nth-child(1),
.reserveInfo > div:nth-child(2) > div > span:nth-child(1) {
  display: inline-block;
  width: 2.16rem;
}
.resturantConfirm .detailBottom {
  position: fixed;
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  bottom: 0;
  font-size: 0.36rem;
  background-image: url("../../assets/pick/backgroundImg.png");
  background-size: 100% 100%;
  padding-bottom: 1rem;
}
.resturantConfirm .detailBottom span i {
  color: #f00;
  font-style: normal;
}
.resturantConfirm .detailBottom span:first-child {
  float: left;
  text-align: left;
  width: 65%;
  padding-left: 0.24rem;
  color: #333;
}
.resturantConfirm .detailBottom span:last-child {
  float: right;
  text-align: center;
  width: 35%;
  color: #fff;
  background-image: url("../../assets/pick/xiadan.png");
  background-size: 100% 100%;
}
.reserveNotice {
  width: 100%;
  background-color: #eef7f7;
  margin-top: 0.88rem;
  padding: 0.2rem 0.3rem;
  color: #28bac6;
  font-size: 0.24rem;
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
  border-bottom: 0.01rem solid #dadada;
}
.projectTop > span:nth-child(1) {
  position: absolute;
  width: 0.18rem;
  left: 0.28rem;
  height: 0.88rem;
  line-height: 0.88rem;
}
.projectTop > span:nth-child(1) img {
  width: 100%;
}
</style>