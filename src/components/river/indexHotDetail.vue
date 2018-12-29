<template>
    <div>
        <goTop/>
        <Heador cname="header_border">
            <img @click="back" src="../../assets/header/arrow.png" alt="">
            <h4>门票预订</h4>
        </Heador>
        <div class="navlist_navListDetail pageFullScreen" id="xxxFullScreen">
            <div>
                <div style="height:3.72rem">
                <article class="slider_navListDetail">
                    <slider :items="adList" cname="slider"/>
                    <div class="border_radius"></div>
                </article>
                </div>
                <div class="navListDetail_content">
                    <section v-show="navListDetailContentListSingle" class="navListDetail_content_list" v-for="item in scenicInfoList" :key="item.tagId">
                        <h5>{{item.UUtitle}}</h5>
                        <div class="time">开放时间：{{item.runtime}}</div>
                        <div class="address">景区地址：{{item.address}}</div>
                    </section>
                    <section v-show="navListDetailContentListDouble" class="navListDetail_content_list" v-for="item in scenicInfoList" :key="item.tagId">
                        <h5>{{item.UUtitle}}</h5>
                    </section>
                    <div class="navListDetail_content_tab">
                        <div class="navListDetail_content_tab_item" :class="{'Ticket_active':Ticket}" @click="navListDetailTicket()">
                            <span class="navListDetail_content_tab_link">购票</span>
                        </div>
                        <div class="navListDetail_content_tab_item" :class="{'Instruction_active':Instruction}" @click="bookingInstruction">
                            <span class="navListDetail_content_tab_link">预订须知</span>
                        </div>
                        <div class="navListDetail_content_tab_item" :class="{'Policy_active':Policy}" @click="preferentialPolicy">
                            <span class="navListDetail_content_tab_link">优惠政策</span>
                        </div>
                        <div class="navListDetail_content_tab_item" :class="{'ScenicArea_active':ScenicArea}" @click="introductionToScenicArea">
                            <span class="navListDetail_content_tab_link">景区介绍</span>
                        </div>
                    </div>
                    <!-- 购票 -->
                    <div style="background:#fff">
                    <div v-show="Ticket" class="navListDetail_ticket_list" v-for="item in scenicTicketInfo" :key="item.tagId">
                        <div class="navListDetail_ticket_list_left">
                            <h5>{{item.title}}</h5>
                            <!-- <p>{{item.address}}</p>
                            <span @click="getDetail">查看详情</span> -->
                            <p v-show="item.manual" ref="TicketDetails">{{item.manual}}</p>
                            <p v-show="!item.manual">暂无相关说明</p>
                            <!-- <span v-show="item.manual" @click="getDetail">查看详情</span> -->
                        </div>
                        <div class="navListDetail_ticket_list_right">
                            <div>
                                <span><i>￥</i>{{item.price}}</span>
                                <!-- <em>￥54</em> -->
                            </div>
                            <button @click="book(item.tid,item.UUid)">预订</button>
                        </div>
                    </div>
                    </div>
                    <!-- 预订须知 -->
                    <div v-show="Instruction" class="navListDetail_ticket_list_box">
                        <div class="navListDetail_ticket_txt" v-for="item in scenicInfoList" :key="item.tagId">
                            {{item.UUjqts}}
                        </div>
                    </div>
                    <!-- 优惠政策 -->
                    <div v-show="Policy" class="navListDetail_ticket_list_box">
                        <div class="navListDetail_ticket_txt" v-for="item in scenicInfoList" :key="item.tagId">
                           {{item.UUjtz}}
                        </div>
                    </div>
                    <!-- 景区介绍 -->
                    <div v-show="ScenicArea" class="navListDetail_ticket_list_box">
                        <div class="navListDetail_ticket_txt navListDetail_ticket_richtext" v-for="item in scenicInfoList" :key="item.tagId">
                            {{item.bhjp}}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 点击查看详情弹出层 -->
            <!-- <div id="detail_mask" v-show="boxshow">
                <transition name="detail_mask_content">
                    <div class="detail_mask_box" v-for="item in scenicTicketInfo" :key="item.tagId">
                            <div class="detail_mask_box_title">
                                <h5>{{item.title}}</h5>
                                <span @click="close"><img src="../../assets/indexListDetail/close.png" alt=""></span>
                            </div>
                            <div class="navListDetail_text_content">
                                <div style="height:100%;overflow-y: auto;">
                                    <div class="navListDetail_txt">{{item.bhjp}}</div>
                                </div>
                            </div>
                    </div>
                </transition>
                弹出层遮罩层
                <transition name="mask">
                    <div class="cover" @click="close"></div>
                </transition>
            </div> -->
        </div>
        <div class="loading_container" v-show="!(scenicTicketInfo.length&&scenicInfoList.length)">
            <loading></loading>
        </div>
        <Footor/>
    </div>
</template>

<script>
import Heador from '@/components/index/header'
import goTop from '@/components/river/goTop'
import Slider from "@/components/index/slider.vue"
import Footor from "@/components/index/footer.vue"
import Loading from "@/components/index/loading/loading.vue"

export default {
    components:{
        Heador,
        goTop,
        Slider,
        Footor,
        Loading
    },
    data(){
        return {
            Ticket:true,
            Instruction:false,
            Policy:false,
            ScenicArea:false,
            boxshow:false,
            types:0,
            id:0,
            uuid:0,
            scenicInfoList:[],
            scenicTicketInfo:[],
            seeMore:false,
            uupType:'',
            navListDetailContentListSingle:false,
            navListDetailContentListDouble:false,
            adList:[]
        }
    },
    created(){
        // this.getIndexListDetail();
    },
    mounted(){
        this.getIndexListDetail();
        this.uupType=this.$route.query.uupType;
        if(this.uupType=='A'){
            // 单票
            this.navListDetailContentListSingle=true;
        }
        if(this.uupType=='F'){
            // 套票
            this.navListDetailContentListDouble=true;
        }
        // console.log(this.$refs.TicketDetails);
    },
    methods:{
        getIndexListDetail(){
            this.types=this.$route.query.types;
            this.id=this.$route.query.id;
            this.uuid=this.$route.query.uuid;
            // this.axios.get('/ticket/home/scenic/info',{
            //     params:{
            //         types:this.types,
            //         id:this.id,
            //         uuid:this.uuid
            //     }
            // })
            // .then(function(res){
            //     console.log(res);
            // })
            // .catch(function(err){
            //     console.log(err);
            // })

            this.axios.post('/ticket/home/scenic/info',{
                types:this.types,
                id:this.id,
                uuid:this.uuid
            })
            .then((res) => {
                this.scenicInfoList=res.data.value.scenicInfoList;
                this.adList=res.data.value.scenicInfoList[0].adList;
                // console.log(this.scenicInfoList);
                console.log(this.adList);
                this.scenicTicketInfo=res.data.value.scenicTicketInfo;
                // for(var key in this.scenicInfoList){
                //     console.log(this.scenicInfoList[key].address);
                //     // if(this.scenicTicketInfo[key].address.indexOf('...'>-1)){
                //     //     this.seeMore=true;
                //     // }
                // }
                // item.address.indexOf('...')>-1
            })
            .catch((err) => {
                console.log(err);
            })
        },
        back(){
            this.$router.go(-1);
        },
        navListDetailTicket(){
            this.Ticket=true;
            this.Instruction=false;
            this.Policy=false;
            this.ScenicArea=false;
            // this.$router.push({
            //     path:'/navListDetailTicket',
            //     query:{
            //         types:tagId,
            //         id:id,
            //         uuid:UUid
            //     }
            // })
        },
        bookingInstruction(){
            this.Ticket=false;
            this.Instruction=true;
            this.Policy=false;
            this.ScenicArea=false;
        },
        preferentialPolicy(){
            this.Ticket=false;
            this.Instruction=false;
            this.Policy=true;
            this.ScenicArea=false;
        },
        introductionToScenicArea(){
            this.Ticket=false;
            this.Instruction=false;
            this.Policy=false;
            this.ScenicArea=true;
        },
        // getDetail(){
        //     this.boxshow=true;
        // },
        // close(){
        //     this.boxshow=false;
        // },
        book(tid,UUid){
            this.$router.push({
                path:'/riverReserve',
                query:{
                    p_tid:tid,
                    p_UUid:UUid
                }
            })
        }
    }
}
</script>
<style>
    .header_border{
        border-bottom:1px solid #F5F5F6;
    }
    .navlist_navListDetail{
        margin:.88rem 0 .98rem;
    }
    .navlist_content{
        height: 100%;
        overflow: hidden;
    }
    .loading_container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
    /* slider */
    .slider{
        height:3.72rem !important;
    }
    .slider_navListDetail img{
        width:100%;
        height: 3.72rem !important;
    }
    .swiper-pagination-bullet{
      background: #fff !important;
      opacity: 0 !important;
    }
    .swiper-pagination-bullet-active {
        opacity: 0 !important;
        background: #fff !important;
    }
    .slider_navListDetail{
        position: relative;
    }
    .slider_navListDetail .border_radius{
        width: 100%;
        position: absolute;
        top:3.68rem;
        z-index: 999;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background:#fff;
        padding:.32rem .3rem 0;
    }
    /* 切换 */
    .navListDetail_content{
        /* background-color:#fff; */
        /* margin-top: 3.72rem; */
        border-top-left-radius: .12rem;
        border-top-right-radius: .12rem;
        background:#F5F5F6;
    }
    .navListDetail_content .navListDetail_content_list{
        background:#fff;
        padding:0 .3rem .32rem;
        text-align: left;
        display:flex;
        flex-direction: column;
        margin-bottom: .2rem;
        margin-top:.26rem;
    }
    .navListDetail_content .navListDetail_content_list h5{
        font-size:.32rem;
        color:#484848;
        font-weight: bold;
    }
    .navListDetail_content .navListDetail_content_list .time{
        line-height: .4rem;
        padding:.2rem 0;
        font-size: .28rem;
        color:#6C6C6C;
        /* background:url("../../assets/indexListDetail/time.png") no-repeat left center;
        background-size:.32rem .32rem;
        padding-left: .4rem; */
    }
    .navListDetail_content .navListDetail_content_list .address{
        height:.4rem;
        line-height: .4rem;
        font-size:.28rem;
        color:#6C6C6C;
        /* background:url("../../assets/indexListDetail/address.png") no-repeat left center;
        background-size:.26rem .32rem;
        padding-left:.4rem; */
    }
    .navListDetail_content_tab{
        background-color:#fff;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: .28rem;
        border-bottom: 1px solid #F5F5F6;
        padding:0 .3rem;
        width:100%;
        height: .88rem;
        line-height: .88rem;
    }
    .navListDetail_content_tab_item{
        flex:1;
        text-align: center;
        margin:0 .24rem;
    }
    .navListDetail_content_tab_item span{
        display: inline-block;
        color: #767679;
    }
    .Ticket_active span,.Instruction_active span,.Policy_active span,.ScenicArea_active span{
        color:#40B1FF;
        border-bottom:2px solid #40B1FF;
    }
    /* 切换内容 */
    .navListDetail_ticket_list{
        /* background-color:#fff; */
        margin:0 .3rem;
        padding:.4rem 0;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #F5F5F6;
    }
    .navListDetail_ticket_list_left{
        width:60%;
        position: relative;
        /* height: 1.6rem; */
        text-align: left;
    }
    .navListDetail_ticket_list_left h5{
        font-size:.32rem;
        color: #484848;
        padding-bottom: .2rem;
        font-weight: bold;
    }
    .navListDetail_ticket_list_left p{
        font-size: .24rem;
        color: #878789;
        height: .64rem;
        line-height: .32rem;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        /* margin-bottom: .6rem; */
    }
    .navListDetail_ticket_list_left span{
        color:#878789;
        font-size: .24rem;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .navListDetail_ticket_list_right{
        width:30%;
        text-align: center;
    }
    .navListDetail_ticket_list_right div{
        margin-bottom: .2rem;
        display: flex;
        justify-content: center;
        /* padding-left: .2rem; */
    }
    .navListDetail_ticket_list_right div span{
        font-size: .24rem;
        color: #FF6245;
        font-weight: bold;
    }
    .navListDetail_ticket_list_right div span i{
        font-style: normal;
        font-size: .2rem;
    }
    .navListDetail_ticket_list_right div em{
        font-style: normal;
        font-size: .24rem;
        color:#878789;
        padding-left: .2rem;
        text-decoration: line-through;
    }
    .navListDetail_ticket_list_right button{
        width:1.2rem;
        height: .48rem;
        background-color: #FF6245;
        border-radius: .12rem;
        color:#fff;
        font-size: .28rem;
        line-height: .48rem;
        border:0px;
        background-color:transparent;
        background:url("../../assets/indexListDetail/button.png") no-repeat center center;
        background-size: 1.2rem .48rem;
    }
    /* 弹出层 */
    .detail_mask_content-leave-active,.detail_mask_content-enter-active{
        transition:all 1s ease;
    }
    .detail_mask_content-leave-active,.detail_mask_content-enter{
        height:0px !important;
    }
    .detail_mask_content-leave,.detail_mask_content-enter-active{
        height: 473px;
    }
    .detail_mask_box{
        /* position:absolute; */
        position: fixed;
        width:100%;
        height:9.46rem;
        bottom:0;
        left: 0;
        background-color:#fff;
        cursor:pointer;
        z-Index:99999;
        border-top-left-radius: .12rem;
        border-top-right-radius: .12rem;
    }
    .detail_mask_box div.detail_mask_box_title{
        height:.88rem;
        line-height: .88rem;
        border-top-left-radius: .12rem;
        border-top-right-radius: .12rem;
        border-bottom: 1px solid #EEF1F0;
        text-align: center;
        position: relative;
    }
    .detail_mask_box div.detail_mask_box_title h5{
        font-size:.32rem;
        color:#484848;
    }
    .detail_mask_box div.detail_mask_box_title span{
        width: .52rem;
        height: .8rem;
        position: absolute;
        top: 0rem;
        right: .2rem;
    }
    .detail_mask_box div.detail_mask_box_title span img{
        width:.28rem;
        height: .28rem;
    }
    .cover{
        position:fixed;
        left:0px;
        top:0px;
        background:rgba(0, 0, 0, 0.6);
        width:100%;
        height:100%;
        filter:alpha(opacity=60);  /*设置透明度为60%*/
        opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
        z-Index:9999; 
    }
    .navListDetail_text_content{
        position: relative;
        top:0;
        bottom: 1rem;
        width: 100%;
        height:7.6rem;
        padding: .2rem .3rem;
        box-sizing: border-box;
    }
    .navListDetail_txt{
        font-size: .28rem;
        color:#6C6C6C;
        line-height: .44rem;
        text-align: justify;
        /* height:100%;
        overflow-y: auto; */
    }
    .navListDetail_ticket_list_box{
        padding:.4rem 0.3rem;
        background:#fff;
    }
    .navListDetail_ticket_txt{
        text-align: left;
        color:#5C5C5E;
        font-size:.28rem;
    }
    .navListDetail_ticket_richtext{
        width:100%;
    }
    .navListDetail_ticket_richtext img{
        width:100%;
    }
</style>


