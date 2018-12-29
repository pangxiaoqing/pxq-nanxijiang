<template>
  <div>
    <riverPublicTop :data="title"/>
        <transition name="fade" class="transition">
            <div class="box_zhe" v-show="box_show"></div>
        </transition>
          <div class="count3">
              <div class="search_jg">
                <span>有</span>
                <span>{{searchNum}}条</span>
                <span>与</span>
                <span>{{this.$route.query.typeId}}</span>
                <span>相关的结果：</span>
            </div>
            <div class="ticket_content">
                <div v-for="item in searchDetail" :key="item.UUid">
                    <span>
                        <h2>{{item.UUtitle}}</h2>
                        <h2 @click="box_change()"><i>票型说明</i><img src="../../assets/riverImg/jt_big.png" alt=""></h2>
                    </span>
                    <span @click="ticket_show(item.UUid)">
                        <h2>￥<i>{{item.UUtprice}}</i></h2>
                        <h2>立即预订</h2>  
                    </span>
                </div>
            </div>
        </div>

        <transition name="slide-fade" class="transition">
            <div class="ticket_know" v-show="box_show">
                <h2>
                    <span>楠溪江风景区成人票</span>
                    <span @click="box_change1"><img src="../../assets/riverImg/X_big.png" alt=""></span>
                </h2>
                <div class="border"></div>
                <p  v-html="scenicDetails.UUbhjq">
                </p>
                <p  v-html="scenicDetails.UUjqts">
                </p>
                <p  v-html="scenicDetails.UUjtzn">
                </p>
                <!-- <div class="border"></div>
                <div class="know_content">
                    <div class="know_one">
                        <h2>取票信息</h2>
                        <span>王思聪开车前15天（不含）以上退票的，不收取退票费；票面乘车站开车时间前48小时以上的按票价</span>
                    </div>
                    <div class="know_two">
                        <h2>产品说明</h2>
                        <span>王思聪开车前15天（不含）以上退票的，不收取退票费；票面乘车站开车时间前48小时以上的按票价</span>
                    </div>
                    <div class="know_three">
                        <h2>退款规则</h2>
                        <span>· 退票手续费</span>
                        <i>￥130</i>
                        <span>· 退票类型</span>
                        <i>不想去了</i>
                    </div>
                    <div class="know_four">
                        <h2>有效期</h2>
                        <span>· 允许推迟游玩的天数</span>
                        <i>2018.12.12</i>
                    </div>
                </div> -->
            </div>
        </transition>
  </div>
</template>

<script>
import riverPublicTop from "@/components/river/river_publicTop";
export default {
  data() {
    return {
      liList_data:[],
      total: 0,
      title: "搜索结果列表",
      searchNum:'',
      searchDetail:[],
      box_show:false,
      scenicDetails:""
    };
  },
  components: {
    riverPublicTop
  },
  mounted(){
    this.pick_data()
    this.getScenic()
  },
  methods: {
    ticket_show(id){
        this.$router.push({
            path:"/riverReserve",
            query:{
                id:id
            }
        })
    },
    pick_data(){
        var searchData = this.$route.query.id;
        //console.log(searchData)
        this.axios.post('/ticket/Get_Ticket_List?n='+111497).then((res)=>{
            // //console.log(res)
            this.liList_data = res.data.result;
            console.log(this.liList_data)
            this.search()
        }).catch(()=>{})
    },
    search(){
      var len = this.liList_data.length;
      var arr = [];
      var reg = new RegExp(this.$route.query.id);
      for(var i=0;i<len;i++){
          //如果字符串中不包含目标字符会返回-1
          if(this.liList_data[i].UUtitle.match(reg)){
              arr.push(this.liList_data[i]);
          }
      }
      this.searchNum = arr.length;
      this.searchDetail = arr
      console.log(this.searchDetail)
    },
    routerData(type,id){

    },
    box_change(){
        this.box_show = !this.box_show;
        // this.bottom_show = !this.bottom_show;
    },
    box_change1(){
        this.box_show = !this.box_show;
        // this.bottom_show = !this.bottom_show;
    },
    getScenic(){
        this.axios.get('/ticket/Get_ScenicSpot_Info?n='+111497).then((res)=>{
            console.log(res)
            this.scenicDetails = res.data.result[0];
            console.log(this.scenicDetails)
            // this.$store.commit("tabproStateMutation", detailsData);
            // window.sessionStorage["tabprojectIndex"] = detailsData  

        }).catch(()=>{})
    }
  }
};
</script>

<style  scoped>

.count3 ul li {
  height: 2rem;
  margin: 0.1811rem 0 0.1811rem 0.28rem;
}
.count3 {
  margin: 0.9rem 0 1.3rem 0;
}
.count3 .search_jg{
    height:40px;
    line-height:40px;
    text-align: left;
    font-size: 16px;
    margin-left: 0.28rem;
}
.count3 .search_jg span:nth-child(2),.count3 .search_jg span:nth-child(4){
    color:#08B7C4;
}
.ticket_content div{
    width:100%;
    height:1.8rem;
    background: url("../../assets/riverImg/bg_ticketlittle.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    margin-bottom: .4rem;
}
.ticket_content div span:nth-child(2){
    width:2.2rem;
    color:#fff;
    font-size: .24rem;
    display: flex;
    flex-direction: column;
    padding-top: .42rem;
}
.ticket_content div span:nth-child(2) h2{
    font-size: .24rem;
}
.ticket_content div span:nth-child(2) h2:nth-child(1){
    font-size: .28rem;
    margin-bottom: .04rem;
}
.ticket_content div span:nth-child(2) h2 i{
    font-size: .52rem;
    font-style: normal;
}
.ticket_content div span:nth-child(1){
    /* flex:1; */
    width: 68.2%;
    display: flex;
    /* padding:.36rem 0 .28rem .32rem; */
    padding-left:.32rem; 
    flex-direction: column;
}
.ticket_content div span:nth-child(1) h2:nth-child(1){
    color: #262626;
    font-size: .36rem;
    font-weight: 800;
    height:1rem;
    line-height: 1rem;
    text-align: left;
    /* display: flex;
    align-items: center;
    justify-content: flex-start; */
    width: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.ticket_content div span:nth-child(1) h2:nth-child(2){
    display: flex;
    align-items: center;
}
.ticket_content div span:nth-child(1) h2:nth-child(2) i{
    font-style: normal;
    color:#11C07A;
    font-size: .28rem;
    margin-right: .08rem;
}
.ticket_content div span:nth-child(1) h2:nth-child(2) img{
    width:.16rem;
    height:.24rem;
}
    .ticket_know{
        width:100%;
        /* display: flex; */
        /* flex-direction: column; */
        padding:0 .2rem .3rem;
        position: fixed;
        bottom: 0;
        background: #fff;
        overflow-y: auto;
        height:94%;
    }
    .ticket_know p{
        text-align: left;
    }
    .ticket_know h2{
        width:100%;
        height:1.16rem;
        display: flex;
        align-items: center;
        padding-right: .4rem;
    }
    .ticket_know h2 span:nth-child(1){
        flex:1;
    }
    .ticket_know h2 span:nth-child(2) img{
        height:.28rem!important;
        width:.28rem!important;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .6s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .slide-fade-enter-active {
        transition: all .6s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(30px);
        opacity: 0;
    }
    .box_zhe{
      height: 100%;
      width:100%;
      background: #333;
      opacity: .3;
      position: fixed;
      bottom:0;
      top:0;
  }
</style>

