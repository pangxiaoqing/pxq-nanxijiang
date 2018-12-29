<template>
 <div>
     <Heador>
        <img @click="back" src="../../assets/header/arrow.png" alt="">
        <h4>提交订单</h4>
    </Heador>
     <transition name="fade" class="transition">
            <div class="box_zhe" v-show="box_show"></div>
    </transition>
    <transition name="fade" class="transition">
            <div class="box_zhe" v-show="boxdate_show"></div>
    </transition>
    <div class="pageFullScreen" style="margin:1.08rem 0 1.16rem" id="xxxFullScreen">
        <div class="basic_information">
            <h5>{{ticketDetail.UUtitle}}</h5>
            <ul>
                <li>售价</li>
                <li class="basic_information_num">
                    <span><i>￥</i>{{ticketDetail.sale_price}}</span>
                    <em>/人</em>
                </li>
            </ul>
            <ul>
                {{getData}}
                <li>入园时间</li>
                <li class="basic_information_time" @click="dateBool()">{{time}}</li>
            </ul>
            <ul>
                <li>入园人数</li>
                <li class="riverReserve_cut_add">
                    <b @click="cuts()"></b>
                    <b>{{num}}</b>
                    <b @click="add()"></b>
                </li>
            </ul>
            <ul>
                <li>总金额</li>
                <li class="basic_information_num"><i>￥</i>{{(ticketDetail.sale_price*num).toFixed(2)}}</li>
            </ul>
        </div>
        <div class="basic_information">
            <h5>预订信息</h5>
            <ul>
                <li>联系人</li>
                <li class="basic_information_num">
                    <input type="text" placeholder="请填写联系人" v-model="name2">
                </li>
            </ul>
            <ul>
                <li>手机号</li>
                <li class="basic_information_num">
                    <input type="text" placeholder="请填写联系人手机号" maxlength="11" v-model="tel2">
                </li>
            </ul>
            <ul>
                <li>身份证号</li>
                <li class="basic_information_num">
                    <input type="text" placeholder="请填写联系人身份证号码" v-model="carPeople">
                </li>
            </ul>
        </div>   
    </div>
    <transition name="fade" class="transition">
        <div class="dateData" v-show="boolData">
                <Calendar
                    class="Calendar"
                    :agoDayHide="timeHours"
                    v-on:choseDay="clickDay"
                    :futureDayHide="timeHoursEnd"
                >
                </Calendar>
        </div>
    </transition>
    <div class="ticket_bottom" v-show="bottom_show">
            <span>金额：<i>￥{{(ticketDetail.sale_price*num).toFixed(2)}}</i></span>
            <!-- <span class="SelectedBtn" @click="orderSubmit">提交订单</span> -->
            <button class="SelectedBtn" @click="orderSubmit()" :disabled="isDisable">提交订单</button>
    </div>
 </div>
</template>
<script>
import payMixins from "@/payMixins.js";
import Calendar from 'vue-calendar-component';
import Heador from '@/components/index/header'

export default {
 data() {
    return {
        title:"预订票务",
        name1:"",
        tel1:"",
        carPeople:"",
        name2:"",
        tel2:"",
        box_show:false,
        boxdate_show:false,
        bottom_show:true,
        ticketDetail:{},
        boolData:false,
        timeHours:'',
        timeHoursEnd:'',
        time:"",
        num:1,
        lid:"",
        ticketId:"",
        scenicDetails:"",
        openId:"",
        p_tid:"",
        p_UUid:"",
        id:"",
        orderId:"",
        isDisable: false
    }
 },
 mixins:[payMixins],
 methods:{
     back(){
            this.$router.go(-1);
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
    //  提交订单
    orderSubmit(){
        let date_xt = new Date();
        let MM_xt = date_xt.getMonth() + 1;
        let d_xt = date_xt.getDate();
        let h_xt = date_xt.getHours();
        let m_xt = date_xt.getMinutes();
        // if(MM_xt==11 && d_xt==29){
        //         if(this.time=='2018-11-29'){
        //             if(h_xt==16 && m_xt>30){
        //                 alert("使用日期不能超过当天16:30,请重新选择日期");
        //                 return;
        //             }else if(h_xt>=17 ){
        //                 alert("使用日期不能超过当天16:30,请重新选择日期");
        //                 return;
        //             }
        //     }
        // }
        if(MM_xt==11 && d_xt==30){
                if(this.time=='2018-11-29'){
                    alert("使用日期不能是过去日期");
                        return;
                }
                if(this.time=='2018-11-30'){
                    if(h_xt==16 && m_xt>30){
                        alert("使用日期不能超过当天16:30,请重新选择日期");
                        return;
                    }else if(h_xt > 16){
                        alert("使用日期不能超过当天16:30,请重新选择日期");
                        return;
                    }
                }
        }
        if(MM_xt==12 && d_xt==1){
                if(this.time=='2018-11-29'){
                    alert("使用日期不能是过去日期");
                        return;
                }
                if(this.time=='2018-11-30'){
                    alert("使用日期不能是过去日期");
                        return;
                }
                if(this.time=='2018-12-1'){
                    if(h_xt==16 && m_xt>30){
                        alert("使用日期不能超过当天16:30,请重新选择日期");
                        return;
                    }else if(h_xt>=17 ){
                        alert("使用日期不能超过当天16:30,请重新选择日期");
                        return;
                    }
                }
        }
        if(MM_xt==12 && d_xt==2){
                if(this.time=='2018-11-29'){
                    alert("使用日期不能是过去日期");
                        return;
                }
                if(this.time=='2018-11-30'){
                    alert("使用日期不能是过去日期");
                        return;
                }
                if(this.time=='2018-12-1'){
                    alert("使用日期不能是过去日期");
                        return;
                }
                if(this.time=='2018-12-2'){
                    if(h_xt==16 && m_xt>30){
                        alert("使用日期不能超过当天16:30,请重新选择日期");
                        return;
                    }else if(h_xt>=17 ){
                        alert("使用日期不能超过当天16:30,请重新选择日期");
                        return;
                    }
                }
        }
       
        if(this.name2==""){
            alert("请输入联系人姓名");
            return;
        }
        if (this.carPeople && (!(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i).test(this.carPeople) || (this.carPeople.length !== 15 && this.carPeople.length !== 18))) {
                    alert('身份证号码不符合规范');
                    return;
        }
        if(this.tel2==""){
            alert("请输入联系人手机号")
            return;
        }
        if(this.tel2 && !(/^((0\d{2,3}-\d{7,8})|(1[357894]\d{9}))$/).test(this.tel2)){
            alert("联系人手机号码不符合规范")
            return;
        }
        if(this.carPeople==""){
            alert("请输入联系人身份证")
            return;
        }
        // console.log(this.name2);
        // console.log(this.tel2);
        // console.log(this.carPeople);
        // this.name2=this.name1;
        // this.tel2=this.tel1;
        // if(this.name2==""){
        //     alert("请输入预订人姓名")
        //     return;
        // }
        // if(this.tel2==""){
        //     alert("请输入预订人号码")
        //     return;
        // }
        // if(this.tel2 && !(/^((0\d{2,3}-\d{7,8})|(1[375849]\d{9}))$/).test(this.tel2)){
        //     alert("预订人手机号码不符合规范")
        //     return;
        // }
        // this.isDisable = true
        //     setTimeout(() => {
        //     this.isDisable = false
        //     }, 1000)
        // }
        this.isDisable=true;
        this.axios.post("/ticket/addOrder",{
            lid:this.lid,
            tid:this.tid,
            remotenum:'',
            tprice:this.ticketDetail.sale_price*this.num,
            tnum:this.num+"",
            playtime:this.time,
            ordername:this.name2,
            ordertel:this.tel2,
            contactTEL:this.tel2,
            smsSend:"1",
            paymode:"2",
            ordermode:"0",
            assembly:'',
            series:'',
            concatID:"0",
            pCode:"0",
            m:this.ticketDetail.UUaid,
            personID:this.carPeople,
            memo:'',
            openid:this.openId,
            scenicName:this.scenicDetails.UUtitle,
            ticketsName:this.ticketDetail.UUtitle
        }).then((res)=>{
            this.isDisable=false
            console.log(res)
            if(res.data != ''){
                if(res.data.result == 'error'){
                    alert("身份证号码不符合规范");
                }else if(res.data.result == 'error1' || res.data.result == 'error2'){
                    alert("该产品已下架");
                }else{
                    // localStorage.orderId = res.data.id
                    this.id=res.data.lNum;//门票编号
                    // this.orderId = localStorage.getItem("orderId");
                    this.orderId = res.data.id;//id
                    // this.$router.push({
                    //     path:'/river_projectConfirm',
                    //     query:{
                    //         id:res.data.id
                    //     }
                    // })
                    // alert("你是谁？");
                    this.goPay();
                }
            }
        }).catch(()=>{})
    },
    // getScenic(p_tid){
    //     this.axios.get('/ticket/Get_ScenicSpot_Info?n='+p_tid).then((res)=>{
    //         console.log(res)
    //         this.scenicDetails = res.data.result[0];
    //         console.log(this.scenicDetails)
    //         // this.$store.commit("tabproStateMutation", detailsData);
    //         // window.sessionStorage["tabprojectIndex"] = detailsData  

    //     }).catch(()=>{})
    // },
     cuts(){
         this.$nextTick(()=>{
             if(this.num<2) return;
                this.num--;
                console.log(this.num)
         })
     },
     add(){
         this.$nextTick(()=>{
            this.num++
         })
     },
    dayChange(){
        var time = new Date();
        var m = time.getMonth() + 1;   
        var t = time.getFullYear() + "-" + m + "-"+ time.getDate();
         this.time = t;
        //this.time ='2018-11-29';
    },
     dateBool(){
        this.boolData = !this.boolData;
        this.boxdate_show = !this.boxdate_show;
     },
     clickDay(data){
           this.boolData = !this.boolData;
           this.boxdate_show = !this.boxdate_show;
           this.time=data.replace("/","-").replace("/","-");
       },
    goLast(){
        this.$router.push({
            path:"/riverDetail"
        })
    },
    box_change(){
        this.box_show = !this.box_show;
        this.bottom_show = !this.bottom_show;
    },
    box_change1(){
        this.box_show = !this.box_show;
        this.bottom_show = !this.bottom_show;
    },
    // ticketDetails(ticketId){
    //     this.axios.get('/ticket/Get_Ticket_List?m='+ticketId).then((res)=>{
    //             console.log(res)
    //             let detailsData = res.data.result[0];
    //             console.log(detailsData)
    //             this.ticketDetail = detailsData
    //             this.lid = detailsData.UUlid
    //             // this.imgurl = detailsData.picture;
    //             // this.dataObj = res.data.result;
    //         }).catch(()=>{})
    // },
    p_getScenic(p_tid,p_UUid){
        this.axios.get('/ticket/home/ticket/info?tid='+p_tid+'&scenicId='+p_UUid).then((res)=>{
            this.ticketDetail = res.data.value.ticketInfoList[0];
            this.scenicDetails = res.data.value.scenicInfoList[0];
            this.lid = this.ticketDetail.UUlid
            this.tid = this.ticketDetail.UUid
        }).catch(()=>{})
    },
 },
 mounted(){
     this.dayChange();
    //  this.ticketId = this.$route.query.id
     this.p_tid=this.$route.query.p_tid
     this.p_UUid=this.$route.query.p_UUid
    //  this.p_lid=this.$route.query.p_lid
     localStorage.ticketId = this.ticketId
    //  this.ticketDetails(this.ticketId)
    //  this.getScenic(this.p_tid)
     this.p_getScenic(this.p_tid,this.p_UUid)
     this.openId = this.getCookie('WeiId')
     console.log(this.openId)
 },
 computed:{
       getData(){
                var time = new Date();
                var preDate = new Date(time.getTime() - 24*60*60*1000);
                var m = time.getMonth()+1;
                var t = time.getFullYear() + "-" + m + "-"+ time.getDate();
                this.time = t;
                var t1 = preDate.getFullYear() + "-" + m + "-"+ preDate.getDate();
                var timeHour = time.getHours();
                var timmer =  Date.parse(t1)/1000;
                this.timeHours = timmer.toString();
                var t2 = this.timeStart;
                var timmer1 =  Date.parse(t2)/1000;
                this.timeHoursEnd =  timmer1.toString();
                // var timmer =  Date.parse("2018-11-29")/1000;
                // this.timeHours = timmer.toString()
                // var timmer1 =  Date.parse("2018-12-02")/1000;
                // this.timeHoursEnd =  timmer1.toString()
       }
   },
   components:{
       Calendar,
       Heador
   },
 activated() {
 }
}
</script>
<style scoped>
.nx_form{
    width:100%;
    padding:1.2rem .3rem 1rem .3rem;
    height: auto;
    overflow-y: auto;
}
.ticket_one{
    width:100%;
    background: #fff;
    padding: .36rem .32rem 0 .32rem;
    display: flex;
    flex-direction: column;
    margin-bottom: .4rem;
}
.border{
    height: 1px;
    width:100%;
    background: #EEF1F0;
}
.ticket_one span:nth-child(1){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: .32rem;
}
.ticket_one span:nth-child(1) i{
    font-style: normal;
    font-size: .32rem;
    color:#08080A;
    font-weight: 900;
    width:80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
}
.ticket_one span:nth-child(1) p img,
.ticket_one span:nth-child(4) p img
{
    padding-top: .04rem;
    width:.16rem;
    height:.24rem;
    margin-left: .06rem;
}
.ticket_one span:nth-child(1) p,
.ticket_one span:nth-child(4) p
{
    display: flex;
    justify-content: center;
    align-items: center;
    color:#3ACB91;
    font-size: .24rem;
}
.ticket_one span:nth-child(2){
    width:.9rem;
    font-size: .22rem;
    color:#11C07A;
    /* border: 1px solid #11C07A; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: .34rem; */
    /* padding: 0.01rem; */
    margin-bottom: .36rem;
}       
.ticket_one span:nth-child(4){
    display: flex;
    justify-content: space-between;
    width:100%;
    padding:.36rem 0;
}
.ticket_one span:nth-child(4) h2{
    font-size: .32rem;
    color: #262626;
}
.ticket_one span:nth-child(4) h2 i{
    font-style: normal;
    font-size: .28rem;
    color: #464646;
}
.ticket_one span:nth-child(6){
    display: flex;
    justify-content: space-between;
    width:100%;
    padding:.36rem 0;
}
.ticket_one span:nth-child(6) h2{
    font-size: .32rem;
    color: #262626;
}
.ticket_one span:nth-child(6) .cai3{
    display: flex;
}
.ticket_one span:nth-child(6) .cai3 b:nth-child(1){
    margin-right: .28rem;
    background: url("../../assets/riverImg/cuts_big.png") no-repeat;
    background-size: 100% 100%;
    width:.44rem;
    height:.44rem;
    border-radius: 0%!important;
}
.ticket_one span:nth-child(6) .cai3 b:nth-child(2){
    height:100%;
    font-weight: normal;
    color:#08080A;
    font-size: .32rem;
}
.ticket_one span:nth-child(6) .cai3 b:nth-child(3){
    margin-left: .28rem;
    background: url("../../assets/riverImg/add_big.png") no-repeat;
    background-size: 100% 100%;
    width:.44rem;
    height:.44rem;
    border-radius: 0%!important;
}

.ticket_two{
    width:100%;
    background: #fff;
}
.ticket_twoa{
    margin-bottom: .4rem;
}
.ticket_twob{
    display:none;
    margin-bottom: 1.5rem;
}
.ticket_two h2{
    display: flex;
    /* justify-content: center; */
    align-items: center;
    width:100%;
    padding:.36rem .3rem;
    background: #F5F7FB;
    font-weight: 900;
    font-size: .32rem;
    color:#08080A;
}
.ticket_form1{
    width:100%;
    padding:0 .3rem;
    display: flex;
    flex-direction: column;
}
.ticket_form1 .span_form{
    height:1.04rem;
    width:100%;
    display: flex;
    align-items: center;
}
.ticket_form1 .span_form i{
    font-style: normal;
    font-size: .32rem;
    color: #262626;
    display: block;
    height:100%;
    line-height: 1.04rem;
}
.ticket_form1 .span_form input{
    height:100%;
    font-size: .28rem;
    color: #464646;
    line-height: 1.04rem;
    display: flex;
    align-items: center;
}
.ticket_form1 .span_form input::-webkit-input-placeholder{
    font-size: .28rem;
    color: #464646;
    line-height: 1.04rem;
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
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
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
    .know_content{
        padding:0 .4rem; 
    }
    .know_one h2,.know_two h2,.know_three h2,.know_four h2{
        font-size: .32rem;
        color:#08080A;
        font-weight: 600;
        display: flex;
        justify-content: flex-start;
        /* margin-bottom: .36rem; */
    }
    .know_one span,.know_two span{
        font-size: .28rem;
        color:#515254;
        line-height: .4rem;
        display: flex;
        justify-content: flex-start;
        text-align: left;
    }
    .know_three,.know_four{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .know_three span,.know_four span{
        font-size: .28rem;
        color: #464646;
        margin-bottom: .3rem;
    }
    .know_three i,.know_four i{
        font-style: normal;
        font-size: .28rem;
        color: #515254;
        margin-bottom: .4rem;
    }
    .know_three i:last-child{
        margin-bottom: 0;
    }
    .transition{
        height:30%;
        width: 100%;
    }
    .dateData{
        position:fixed;
        /* top:3.1rem; */
        bottom: 0;
        width:100% !important;
        height:60% !important;
        z-index: 1;
    }
    .pageFullScreen>>>.Calendar{
        height:100%;
        width:100%;
    }
    .pageFullScreen>>>.wh_content_all{
        background: #fff !important;
        height:100%;
        width:100%;
    }
    .pageFullScreen>>>.wh_container{
        min-width: 100%;
        font-size: .16rem;
        position: fixed;
        bottom: 0;
        height: 7.8rem;
        z-index: 1;
    }
    .pageFullScreen>>>.wh_chose_day{
        background: #40B1FF !important;
        /* color:#fff!important */
    }
    .pageFullScreen>>>.wh_top_tag {
        color: #a4a4a4;
        height: 1rem;
        line-height: 1rem;
    }
    .pageFullScreen>>>.wh_content_item {
        width: 14.2%;
        height: 1rem;
        line-height: 1rem;
    }
    .pageFullScreen>>>.wh_content_item .wh_other_dayhide {
        color:#333;
    }
    .pageFullScreen>>>.wh_content_item .wh_want_dayhide {
        color: #a4a4a4;
    }
    .pageFullScreen>>>.wh_item_date {
        color:#333;
    }
    .pageFullScreen>>>.wh_content_item .wh_isToday {
        border-radius: 100px;
        /* color: #fff; */
        /* background-color: #07b6c4 !important; */
        background-color: #fff !important;
        border:.01rem solid #333;
    }
    .pageFullScreen>>>.wh_content_li{
        color:#666;
    }
    .pageFullScreen>>>.wh_jiantou1{
        border-top: 2px solid #666;
        border-left: 2px solid #666;
    }
    .pageFullScreen>>>.wh_jiantou2{
        border-top: 2px solid #666;
        border-right: 2px solid #666;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .basic_information{
        padding:0 .3rem;
        background-color: #fff;
        border-radius: .12rem;
        margin-top:.2rem;
    }
    .basic_information h5{
        font-size: .32rem;
        color:#484848;
        text-align: left;
        font-weight: bold;
        height:.88rem;
        line-height: .88rem;
        border-bottom: 1px solid #F5F5F6;
        /* width: 90%; */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .basic_information ul{
        width:100%;
        height: .88rem;
        line-height: .88rem;
        border-bottom: 1px solid #F5F5F6;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .basic_information ul:last-child{
        border-bottom: 0;
    }
    .basic_information li:first-child{
        font-size: .28rem;
        color: #878789;
    }
    .basic_information li.basic_information_num{
        font-weight: bold;
        color:#484848;
    }
    .basic_information li.basic_information_num input{
        color:#484848;
        height:.72rem;
        line-height: .72rem;
        text-align: right;
        font-size: .28rem;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
        color:    #DCDCDC;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #DCDCDC;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #DCDCDC;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #DCDCDC;
    }
    .basic_information li.basic_information_num input:first-child{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .basic_information .basic_information_time{
        background: url("../../assets/submitOrder/arrow.png") no-repeat right center;
        background-size: .18rem .28rem;
        font-weight: bold;
        color:#484848;
        padding-right: .3rem;
    }
    .basic_information li.basic_information_num em{
        font-style: normal;
        font-size: .28rem;
        color:#878789;
    }
    .basic_information li.basic_information_num i{
        font-style: normal;
        font-size: .24rem;
    }
    .basic_information li.basic_information_num i,.basic_information li.basic_information_num em{
        font-weight: normal;
    }
    li.riverReserve_cut_add{
        display:flex;
        flex-direction: row;
        align-items: center;
    }
    li.riverReserve_cut_add b:first-child{
        margin-right: .28rem;
        background: url("../../assets/submitOrder/cut.png") no-repeat;
        background-size: 100% 100%;
        width:.44rem;
        height:.44rem;
        border-radius: 0%!important;
    }
    li.riverReserve_cut_add b:nth-child(2){
        height:100%;
        font-weight: normal;
        color:#484848;
        font-size: .32rem;
    }
    li.riverReserve_cut_add b:last-child{
        margin-left: .28rem;
        background: url("../../assets/submitOrder/add.png") no-repeat;
        background-size: 100% 100%;
        width:.44rem;
        height:.44rem;
        border-radius: 0%!important;
    }
    .ticket_bottom{
        height:.96rem;
        width:100%;
        background: #fff;
        position:fixed;
        bottom:0;
        display: flex;
        padding-left: .3rem;
        justify-content: space-between;
    }
    .ticket_bottom span{
        display: flex;
        align-items: center;
    }
    .ticket_bottom span:nth-child(2){
        width:2.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color:#fff;
        color:.36rem;
    }
    .ticket_bottom span:nth-child(1){
        flex:1;
        font-size: .28rem;
        color: #5C5C5E;
        font-weight: 500;
    }
    .ticket_bottom span:nth-child(1) i{
        font-style: normal;
        color:#40B1FF;
        font-weight: .36rem;
        font-weight: 600
    }
    .SelectedBtn {
        margin: 0;
        padding: 0;
        border: 1px solid transparent;
        outline: none;
        font-size:.32rem;
        width:2.6rem;
        height:.96rem;
        line-height: .96rem;
        text-align: center;
        background-color: #40B1FF;
        color:#fff;
    }
</style>
