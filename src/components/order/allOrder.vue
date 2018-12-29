<template>
    <div class="pickOrder">
       <pull-to :bottom-load-method="bottom_load" :top-load-method="refresh" class="jiazai">
        <div class="AllOrder" v-for="item in data_list" :key="item.index">
            <!-- 待支付 -->
            <div class="singleOrder"  v-if="item.lstate==1"  @click="clickPay(item.lstate,item.lnum,item.ids)">
                <div class="orderTop">
                    <span class="orderNumber">订单编号:<i>{{item.lnum}}</i></span>
                    <span class="orderNumberStatus" style="color:#FF6245">待支付</span>
                </div>
                <div class="orderBottom">
                    <div>
                        <div>
                          <span>{{item.ticketName}}</span>
                        </div>
                        <div>
                            <span>入园时间：<i>{{item.orderTime}}</i></span>
                        </div>
                        <div>
                            <span>¥{{item.tprice}}</span>
                            <span>*{{item.tnum}}</span>
                        </div>
                    </div>
                    <div>
                      <span>合计：¥&nbsp;<i>{{item.totalPrice}}</i></span>
                    </div>
                </div>
            </div>
            <!-- 待使用 -->
            <div class="singleOrder"  v-if="item.lstate==2"  @click="clickUse(item.lstate,item.lnum,item.ids)">
                <div class="orderTop">
                    <span class="orderNumber">订单编号:<i>{{item.lnum}}</i></span>
                    <span class="orderNumberStatus" style="color:#40B1FF">待使用</span>
                </div>
                <div class="orderBottom">
                    <div>
                        <div>
                          <span>{{item.ticketName}}</span>
                        </div>
                        <div>
                            <span>入园时间：<i>{{item.orderTime}}</i></span>
                        </div>
                        <div>
                            <span>¥{{item.tprice}}</span>
                            <span>*{{item.tnum}}</span>
                        </div>
                    </div>
                    <div>
                      <span>合计：¥&nbsp;<i>{{item.totalPrice}}</i></span>
                    </div>
                </div>
            </div>
            <!-- 已使用 -->
            <div class="singleOrder"  v-if="item.lstate==7"  @click="clickYiUse(item.lstate,item.lnum,item.ids)">
                <div class="orderTop">
                    <span class="orderNumber">订单编号:<i>{{item.lnum}}</i></span>
                    <span class="orderNumberStatus" style="color:#878789">已使用</span>
                </div>
                <div class="orderBottom">
                    <div>
                        <div>
                          <span>{{item.ticketName}}</span>
                        </div>
                        <div>
                            <span>入园时间：<i>{{item.orderTime}}</i></span>
                        </div>
                        <div>
                            <span>¥{{item.tprice}}</span>
                            <span>*{{item.tnum}}</span>
                        </div>
                    </div>
                    <div>
                      <span>合计：¥&nbsp;<i>{{item.totalPrice}}</i></span>
                    </div>
                </div>
            </div>
            <!-- 已取消 -->
            <div class="singleOrder"  v-if="item.lstate==3"  @click="clickCancle(item.lstate,item.lnum,item.ids)">
                <div class="orderTop">
                    <span class="orderNumber">订单编号:<i>{{item.lnum}}</i></span>
                    <span class="orderNumberStatus" style="color:#878789">已取消</span>
                </div>
                <div class="orderBottom">
                    <div>
                        <div>
                          <span>{{item.ticketName}}</span>
                        </div>
                        <div>
                            <span>入园时间：<i>{{item.orderTime}}</i></span>
                        </div>
                        <div>
                            <span>¥{{item.tprice}}</span>
                            <span>*{{item.tnum}}</span>
                        </div>
                    </div>
                    <div>
                      <span>合计：¥&nbsp;<i>{{item.totalPrice}}</i></span>
                    </div>
                </div>
            </div>
            <!-- 已过期 -->
            <div class="singleOrder"  v-if="item.lstate==5"  @click="clickOutDate(item.lstate,item.lnum,item.ids)">
                <div class="orderTop">
                    <span class="orderNumber">订单编号:<i>{{item.lnum}}</i></span>
                    <span class="orderNumberStatus" style="color:#878789">已过期</span> 
                </div>
                <div class="orderBottom">
                    <div>
                        <div>
                          <span>{{item.ticketName}}</span>
                        </div>
                        <div>
                            <span>入园时间：<i>{{item.orderTime}}</i></span>
                        </div>
                        <div>
                            <span>¥{{item.tprice}}</span>
                            <span>*{{item.tnum}}</span>
                        </div>
                    </div>
                    <div>
                      <span>合计：¥&nbsp;<i>{{item.totalPrice}}</i></span>
                    </div>
                </div>
            </div>
        </div>
      </pull-to>
    </div>
</template>
<script>
import PullTo from 'vue-pull-to'
export default {
  data() {
    return {
      data_list: [],
      shu:10,
      openid:''
    };
  },
  activated() {},
  mounted(){
    if (document.cookie.indexOf("WeiId=") != -1) { 
      this.openid = this.getCookie("WeiId");
    } else {
        location.href= "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcdbacc55093a60d0&redirect_uri=http%3A%2F%2Fgenius.enn.cn%2Fencdata-ticket%2F%23%2FriverDetail&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    }
    
    this.axios.get("/ticket/home/order/info",{
      params: {
          openId: this.openid,
          offset: 0,
          limit: 10
      }
    }).then((res)=>{
      console.log(res)
      this.data_list = res.data.value.orderList;
    }).catch((error)=>{})
  },
  components: {
    PullTo
  },
  methods:{
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
    //下拉刷新
    refresh(loaded) {
      this.axios
        .get("/ticket/home/order/info", {
          params: {
            offset: 0,
            limit: 10,
            openId: this.openid,
          }
        })
        .then(res => {
          if (res.data.result == 1) {
            // //console.log(res.data.value);
            this.data_list = res.data.value.orderList;
            loaded("done");
          }
        })
        .catch(() => {});
    },
    //上拉加载更多数据
    bottom_load(loaded) {
      this.shu = this.shu + 10;
      this.axios
        .get("/ticket/home/order/info", {
          params: {
            offset: 0,
            limit: this.shu,
            openId: this.openid,
          }
        })
        .then(res => {
          if (res.data.result == 1) {
            // //console.log(res.data.value);
            this.data_list = res.data.value.orderList;
            loaded("done");
          }
        })
        .catch(() => {});
    },
    // 待支付----传订单id
    clickPay(state,orderNum,id) {
        this.$router.push({
          path: "/river_orderDetailUn",
          query: {
            orderNum: orderNum,
            orderID: id,
            state: state,
            enter:0
          }
        });
    },
    // 待使用----传订单编号
    clickUse(state,orderNum,id) {
        this.$router.push({
          path: "/river_orderDetailUn",
          query: {
            orderNum: orderNum,
            orderID: id,
            state: state,
            enter:0
          }
        });
      },
    // 已使用----传订单编号
      clickYiUse(state,orderNum,id) {
          this.$router.push({
            path: "/river_orderDetailUn",
            query: {
              orderNum: orderNum,
              orderID: id,
              state: state,
              enter:0
            }
          });
      },
      // 已取消----传订单id
      clickCancle(state,orderNum,id) {
          this.$router.push({
            path: "/river_orderDetailUn",
            query: {
              orderNum: orderNum,
              orderID: id,
              state: state,
              enter:0
            }
          });
      },
       // 已过期----传订单编号
      clickOutDate(state,orderNum,id) {
          this.$router.push({
            path: "/river_orderDetailUn",
            query: {
              orderNum: orderNum,
              orderID: id,
              state: state,
              enter:0
            }
          });
      }
    }
};
</script>
<style scoped>

.AllOrder i{
  font-style: normal;
}
.jiazai {
  height:100%;
  padding-top: .1rem;
}
.pickOrder {
  /* width: 100%;
  height: 100%;
  margin-top: 1.8rem;
  padding-bottom: 1rem; */
  width: 100%;
  position: fixed;
  top: 1.7rem;
  bottom: 1rem;
}
.singleOrder {
  width: 6.86rem;
    height: 4.24rem;
    font-size: 0.28rem;
    background-color: #fff;
    margin: 0 .32rem;
    margin-top: .2rem;
}
.singleOrder .orderTop {
    height: 0.92rem;
    line-height: 0.92rem;
    border-bottom: 0.01rem solid #e5e5e5;
}
.singleOrder .orderTop > span:first-child {
  float: left;
    margin-left: 0.2rem;
    font-size: 0.28rem;
    color: #333335;
}
.singleOrder .orderTop > span:last-child {
  float:right;
  margin-right: 0.2rem;
  font-size: 0.26rem;
}
.singleOrder .orderTop .orderNumber i {
  font-style: normal;
  margin-left: 0.2rem;
}
.singleOrder .orderBottom {
  height: 3rem;
  /* padding: 0 0.2rem; */
  color: #333333;
}
.singleOrder .orderBottom > div {
  text-align: left;
  font-size: 0.28rem;
  color: #666;
  height:.6rem;
  padding: 0 0.2rem;
}
.singleOrder .orderBottom > div:nth-child(1) {
    height: 1.88rem;
  margin-top:.32rem;
  border-bottom: .02rem solid #F5F5F6;
}
.singleOrder .orderBottom > div:nth-child(1)>div {
  height: .6rem;
}
.singleOrder .orderBottom > div:nth-child(1) > div:nth-child(1) span{
  color:#484848;
  font-weight: 600;
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    width: 5rem;
}
.singleOrder .orderBottom > div:nth-child(1) > div:nth-child(2) {
  color:#878789;
}
.singleOrder .orderBottom > div:nth-child(1) > div:nth-child(2) i{
  color:#333335;
}
.singleOrder .orderBottom > div:nth-child(1) > div:nth-child(3) span:first-child {
    float: left;
    color: #484848;
    font-size: .24rem;
}
.singleOrder .orderBottom > div:nth-child(1) > div:nth-child(3) span:last-child {
  float: right;
  font-size: .28rem;
  color: #484848;
}
.singleOrder .orderBottom > div:nth-child(2) {
    height: 1.16rem;
    line-height: 1.16rem;
    color:#767679;
}
.singleOrder .orderBottom > div:nth-child(2) i {
  color:#484848;
  font-weight: 600;
}
</style>
