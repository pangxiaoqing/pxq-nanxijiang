<template>
        <div class="pageFullScreen projectOrder"  id="xxxFullScreen">
           <div class="projectTop">
              <span @click="goLast()"><img src="../../../src/assets/project/return.png"></span>
              <span>{{this.title}}</span>
          </div>
          <pull-to :bottom-load-method="bottom_load" :top-load-method="refresh" class="jiazai">
                <div class="singleOrder"  v-for="(item,index) in data_list" :key="index">
                    <div class="orderTop">
                        <span class="orderNumber">订单编号:<i>{{item.lNum}}</i></span>
                        <span class="orderNumberStatus" v-if="item.lState==1" style="color:#f95555">未支付</span>
                        <span class="orderNumberStatus" v-else-if="item.lState==101" style="color:#07b6c4">已预订（待支付）</span>
                         <span class="orderNumberStatus" v-else-if="item.lState==2" style="color:#07b6c4">已支付</span>
                        <span class="orderNumberStatus" v-else-if="item.lState==3" style="color:#f95555">已取消</span>
                        <span class="orderNumberStatus" v-else-if="item.lState==4" style="color:#07b6c4">已完成</span>
                        <span class="orderNumberStatus" v-else-if="item.lState==5" style="color:#f95555">已过期</span>
                        <span class="orderNumberStatus" v-else-if="item.lState==6" style="color:#07b6c4">已退款</span>
                        <span class="orderNumberStatus" v-else-if="item.lState==601" style="color:#07b6c4">已退押金</span>
                        <span class="orderNumberStatus" v-else-if="item.lState==7" style="color:#07b6c4">已使用</span>
                        <span class="orderNumberStatus" v-else ></span>
                    </div>
                    <div class="orderBottom" @click="clickSingle(item.lNum,item.lState,item.id)">
                        <div>
                          <span><img src="../../assets/indexImg/f-s.png" alt=""><i>{{item.ticketsName}}</i></span>
                          <span><i>订单金额</i>¥&nbsp;{{item.tprice}}</span>
                        </div>
                        <div>
                            <div>
                              <span>使用日期：{{item.playTime}}</span>
                            </div>
                            <div>
                                <span>购买份数：<i>{{item.tnum}}</i></span>
                            </div>
                            <div>
                                <span>下单时间：{{item.orderTime}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="line"></div>
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
      title: "我的订单",
      openid:""
    };
  },
  activated() {},
  mounted() {
    this.projectData();
  },
  components: {
    PullTo
  },
  methods: {
    //下拉刷新
    refresh(loaded) {
      this.axios
        .get("/ticket/myOrder?openId="+this.openid+"&page=1&pageSize=10")
        .then(res => {
          //if (res.data.result == 1) {
             //console.log(res.data.value);
            for(var i=0;i<res.data.length;i++){
             res.data[i].orderTime=(res.data[i].orderTime).replace(/\-/g, "/"); 
            }
            this.data_list=res.data;
            loaded("done");
          //}
        })
        .catch(() => {});
    },
    //上拉加载更多数据
    bottom_load(loaded) {
      this.shu = this.shu + 10;
      this.axios
        .get("/ticket/myOrder?openId="+this.openid+"&page=1&pageSize="+this.shu)
        .then(res => {
          //if (res.data.result == 1) {
            // //console.log(res.data.value);
            for(var i=0;i<res.data.length;i++){
             res.data[i].orderTime=(res.data[i].orderTime).replace(/\-/g, "/");
            }
            this.data_list=res.data;
            loaded("done");
          //}
        })
        .catch(() => {});
    },
    projectData: function() {
      this.openid = this.getCookie("WeiId");
      this.axios
        .get("/ticket/myOrder?openId="+this.openid+"&page=1&pageSize=10")
        .then(res => {
            console.log(res+"-------------");
            for(var i=0;i<res.data.length;i++){
             res.data[i].orderTime=(res.data[i].orderTime).replace(/\-/g, "/");
            }
            this.data_list=res.data;
          // if (res.data.result == 1) {
          //   this.data_list = res.data.value;
          // }
        })
        .catch(() => {});
    },
    shijian(sjTime){
      let date = new Date(sjTime);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return  y + '/' + MM + '/' + d + ' ' + h + ':' + m + ':' + s;
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
    goLast(){
      this.$router.push({
        path:'/riverDetail'
      })
    },
    clickSingle: function(lnum,state,orderID) {
          if(state==1 || state==101){
             this.$router.push({
              path: "/river_projectOrderDetailUn",
              query: {
                orderNum: lnum,
                orderID:orderID
              }
            });
          }else if(state==3){
               this.$router.push({
                path: "/river_projectOrderDetailCancel",
                query: {
                  orderNum: lnum,
                  orderID:orderID
                }
            });
          }else{
               this.$router.push({
                path: "/river_projectOrderDetail",
                query: {
                  orderNum: lnum
                }
            });
          }
    }
  }
};
</script>
<style scoped>
.projectOrder {
  width: 100%;
  height: 100%;
  /* margin-top: 1.8rem;
  padding-bottom: 1.8rem; */
}
/* .jiazai {
  height:100%;
  padding-top: .88rem;
} */
.jiazai {
  height:100%;
  padding: .8rem 0 0rem 0;
}
.singleOrder {
  font-size: 0.28rem;
  background-color: #fff;
  /* border-bottom:.2rem solid #f6f6f6; */
}
.singleOrder .line {
  width: 100%;
  height: 0.2rem;
  background-color: #f6f6f6;
}
.singleOrder .orderTop {
  height: 0.9rem;
  line-height: 0.9rem;
  border-bottom:.01rem solid #e5e5e5;
}
.singleOrder .orderTop > span:first-child {
  float: left;
  margin-left: 0.5rem;
  font-size: .26rem;
    color: #777;
}
.singleOrder .orderTop > span:last-child {
  float: right;
  margin-right: 0.2rem;
  margin-right: 0.3rem;
  font-size: .28rem;
}
.singleOrder .orderTop .orderNumber i {
  font-style:normal;
  margin-left:.2rem;
}
.singleOrder .orderBottom {
  /* height: 2.7rem; */
  padding: 0 0.3rem;
  color: #333333;
}
.singleOrder .orderBottom > div {
  text-align: left;
    font-size: .3rem;
    color: #666;
}
.singleOrder .orderBottom > div:nth-child(1) {
    height:1.12rem;
    line-height: 1.1rem;
}
.singleOrder .orderBottom > div:nth-child(1)>span:first-child {
  float:left;
}
.singleOrder .orderBottom > div:nth-child(1)>span:first-child img {
  width:.66rem;
}
.singleOrder .orderBottom > div:nth-child(1)>span:first-child i {
    font-style: normal;
    margin-left: .2rem;
    font-size: .34rem;
    color: #333;
    width: 2rem;
    height:.7rem;
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.singleOrder .orderBottom > div:nth-child(1)>span:last-child {
  float:right;
}
.singleOrder .orderBottom > div:nth-child(1)>span:last-child {
  font-size: .34rem;
  color:#333;
}
.singleOrder .orderBottom > div:nth-child(1)>span:last-child i {
  font-size: .3rem;
  font-style: normal;
  margin-right: .2rem;
}
.singleOrder .orderBottom > div:nth-child(2) {
  padding-left:.9rem;
}
.singleOrder .orderBottom > div:nth-child(2) > div {
  height: 0.5rem;
  margin-top:.1rem;
}
.singleOrder .orderBottom > div:nth-child(2)>div:nth-child(2) i {
  font-style: normal;
  margin-left:.2rem;
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