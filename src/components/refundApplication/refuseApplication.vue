<template>
  <div>
    <Heador>
      <img @click="back" src="../../assets/header/arrow.png" alt>
      <h4>退票详情</h4>
    </Heador>
    <div class="refundDetailTitle">*审核已拒绝</div>
    <div class="refundDetailContent">
      <h5>退票信息</h5>
      <ul>
        <li>申请时间</li>
        <li>{{data_list.createTime}}</li>
      </ul>
      <ul>
        <li>退票商品</li>
        <li>{{data_list.ticketName}}</li>
      </ul>
      <ul>
        <li>入园时间</li>
        <li>{{data_list.playTime}}</li>
      </ul>
      <ul>
        <li>退票数量</li>
        <li>{{data_list.count}}</li>
      </ul>
      <ul>
        <li>退票金额</li>
        <li>¥{{data_list.money}}</li>
      </ul>
      <ul>
        <li>退票原因</li>
        <li>{{data_list.reason}}</li>
      </ul>
    </div>
    <ul class="refundDetailContentOrder" @click="TiaoOrder">
      <li>
        <span>对应订单</span>
        <em>{{data_list.number}}</em>
      </li>
      <li>
        <img src="../../assets/submitOrder/arrow.png" alt>
      </li>
    </ul>
    <ul class="refundDetailContentReason">
      <li>拒绝原因</li>
      <li>{{data_list.refuse}}</li>
    </ul>
  </div>
</template>

<script>
import Heador from "@/components/index/header";

export default {
  components: {
    Heador
  },
  data() {
    return {
      id: "",
      data_list: "",
      enter:'',
      state:'',
      number:''
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.state= this.$route.query.state;    //订单状态
    this.enter = this.$route.query.enter;
    this.pickData();
  },
  methods: {
    back() {
        console.log(this.enter)
      if (this.enter == 0) {
        this.$router.replace({ path: "/refundOrderList/refundAllOrder" });
      } else {
        if (this.state == 3) {
            // 待审核
          this.$router.replace({ path: "/refundOrderList/shenOrder?type=1" });
        } else if (this.state == 1) {
            // 已通过
          this.$router.replace({ path: "/refundOrderList/passOrder?type=2" });
        } else if (this.state == 2) {
          this.$router.replace({ path: "/refundOrderList/refuseOrder?type=3" });
        } 
      }
    },
    pickData: function() {
      this.axios
        .get("/ticket/home/refund/detail", {
          params: {
            id: this.id
          }
        })
        .then(res => {
          console.log(res);
          this.data_list = res.data.value.orderRefunDetail[0];
          this.number= res.data.value.orderRefunDetail[0].number;
        })
        .catch(error => {});
    },
    TiaoOrder:function() {
        this.$router.push({
            path: '/river_orderDetailUn',   
            query: {
                orderNum: this.number
            }
        });
    }
  }
};
</script>

<style>
.refundDetailTitle {
  font-size: 0.28rem;
  color: #ff6245;
  padding-left: 0.3rem;
  margin: 1.28rem 0 0.4rem;
  text-align: left;
}
.refundDetailContent {
  background: #fff;
  padding: 0 0.3rem;
  margin-top: 0.2rem;
  border-radius: 0.12rem;
}
.refundDetailContent h5 {
  font-size: 0.32rem;
  color: #484848;
  text-align: left;
  font-weight: bold;
  padding: 0.4rem 0;
}
.refundDetailContent ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-bottom: 0.3rem;
}
.refundDetailContent li,
.refundDetailContentReason li {
  font-size: 0.28rem;
  color: #484848;
}
.refundDetailContent li:first-child,
.refundDetailContentReason li:first-child {
  color: #878789;
  width: 2rem;
  padding-right: 0.4rem;
  text-align: left;
}
.refundDetailContentOrder {
  background: #fff;
  padding: 0 0.3rem;
  border-radius: 0.12rem;
  height: 0.92rem;
  line-height: 0.92rem;
  font-size: 0.28rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.2rem;
}
.refundDetailContentOrder li:first-child {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.refundDetailContentOrder li:first-child span {
  color: #878789;
  width: 2rem;
  padding-right: 0.4rem;
  text-align: left;
}
.refundDetailContentOrder li:first-child em {
  font-style: normal;
  color: #484848;
}
.refundDetailContentOrder img {
  width: 0.18rem;
  height: 0.28rem;
}
.refundDetailContentReason {
  height: 0.92rem;
  line-height: 0.92rem;
  background: #fff;
  padding: 0 0.3rem;
  margin-top: 0.2rem;
  border-radius: 0.12rem;
  display: flex;
  flex-direction: row;
}
</style>


