<template>
    <div class="pageFullScreen" id="xxxFullScreen">
        <goTop></goTop>
        <!-- <indexInput/>  -->
        <div style="position:relative">
            <Slider :items="adList" cname="slider"/>
            <section class="list">
                <div v-for="item in navList" class="item" :key="item.tagId" @click="jump(item.tagId,item.tagName)">
                    <!-- <img :src="item.img" :alt="item.tagName"> -->
                    <!-- <img src="../../assets/indexList/1.png" :alt="item.tagName"> -->
                    <div v-if="item.tagId==1">
                        <img src="../../assets/index/humanities.png" :alt="item.tagName">
                    </div>
                    <div v-else-if="item.tagId==2">
                        <img src="../../assets/index/nature.png" :alt="item.tagName">
                    </div>
                    <div v-else-if="item.tagId==3">
                        <img src="../../assets/index/drifting.png" :alt="item.tagName">
                    </div>
                    <h4>{{ item.tagName }}</h4>
                </div>
            </section>
        </div>
        <section class="hot_content">
            <div class="hot">热门</div>
            <div class="hot_slider">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="item in hotScenicList" :key="item.id">
                        <img :src="item.img" alt="" @click="indexHotDetail(item.uupType,item.tagId,item.id,item.UUid)">
                        <!-- <slot name="item" :price="item.price" :title="item.title" :tagId="item.tagId"/> -->
                        <h6>{{item.title}}</h6>
                        <div class="price">
                            <span><i>￥</i>{{item.price}}</span>
                            <!-- <em>￥32</em> -->
                        </div>
                        <div class="hot_img">
                            <!-- <img src="../../assets/indexSlider/1.png" alt=""> -->
                            <!-- <img src='../../assets/indexSlider/'+{{props.tagId}}+'.png' alt=""> -->
                            <!-- <img :src=`../../assets/index/${props.tagId}.png`> -->
                            <div v-if="item.tagId==1">
                                <img src="../../assets/index/humanities_mini.png" :alt="item.title">
                            </div>
                            <div v-else-if="item.tagId==2">
                                <img src="../../assets/index/nature_mini.png" :alt="item.title">
                            </div>
                            <div v-else-if="item.tagId==3">
                                <img src="../../assets/index/drifting_mini.png" :alt="item.title">
                            </div>
                        </div>
                    </swiper-slide>
                    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                </swiper> 
            </div>

            <!-- <Slider :options="options" :items="scenicList" cname="hot_slider" @jumpIndexHotDetail="indexHotDetail(item.tagId,item.id,item.UUid)">
                <template slot="item" slot-scope="props">
                    
                </template>
            </Slider> -->
        </section>
        <section class="scenic_spots">
            <div class="hot">景区景点</div>
            <!-- <List :items="hotScenicList"/>  -->
            <div class="scenic_spots_list" v-for="item in scenicList" :key="item.title" @click="indexScenicAreaDetail(item.uupType,item.tagId,item.id,item.UUid)">
                <div class="scenic_spots_list_img">
                    <img :src="item.img" alt="">
                    <span>
                        <div v-if="item.tagId==1">
                            <img src="../../assets/index/humanities_mini.png" :alt="item.title">
                        </div>
                        <div v-else-if="item.tagId==2">
                            <img src="../../assets/index/nature_mini.png" :alt="item.title">
                        </div>
                        <div v-else-if="item.tagId==3">
                            <img src="../../assets/index/drifting_mini.png" :alt="item.title">
                        </div>
                    </span>
                </div>
                <div class="scenic_spots_list_content">
                    <h6>{{item.title}}</h6>
                    <div class="price">
                        <span><i>￥</i>{{item.price}}</span> 
                        <!-- <em>￥32</em> -->
                    </div>
                </div>
            </div>
        </section>
        <footor/>
        <div class="loading_container" v-show="!(scenicList.length&&hotScenicList.length)">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper"
// import indexInput from '@/components/index/indexInput'
import goTop from '@/components/river/goTop'
import Slider from "@/components/index/slider.vue"
// import List from "@/components/index/list.vue"
import Footor from "@/components/index/footer.vue"
import Loading from "@/components/index/loading/loading.vue"

export default {
    name:"riverDetail",
    data() {
        return {
            adList:[],
            navList:[],
            scenicList:[],
            hotScenicList:[],
            swiperOption: {
                slidesPerView: 2.3,
                spaceBetween: 30,
                freeMode: true,
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true
                // }
            },
        }
    },
    components:{
        // indexInput,
        swiper,
        swiperSlide,
        goTop,
        Slider,
        // List,
        Footor,
        Loading
        
    },
    activated() {

    },
    mounted(){
        this.getSlider();
        // 人文、自然、漂流按钮
        this.navList=[
            {
                tagId: 1,
                tagName: "人文古迹"
            },
            {
                tagId:2,
                tagName: "自然景观"
            },
            {
                tagId:3,
                tagName: "激情漂流"
            }
        ];
        // console.log(this.navList)
        // this.getScenicDetails();
        this.code=location.href.split("?")[1].split("&")[0].split("=")[1];   //截取出来的code
        if (document.cookie.indexOf("code=") != -1) {
            // 如果cookie里有code就取出来看和截取的是否普相同
            if(this.getCookie("code")==this.code) {
                // 相同的话不进行任何操作

            } else {
                // 不同的话重新给code赋值并重新请求
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * 1); //保存的天数
                window.document.cookie = "code" + "=" + this.code + ";path=/;expires=" + exdate.toGMTString();
                this.axios.post('/ticket/getWxfo?code='+this.code).then((res)=>{
                    if(res.data.result==1) {
                        var exdate = new Date(); //获取时间
                        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * 1); //保存的天数
                        window.document.cookie = "WeiId" + "=" + res.data.value.openid + ";path=/;expires=" + exdate.toGMTString();
                    }
                }).catch(()=>{});
            }
        } else {
            // cookie里没有code
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * 1); //保存的天数
            window.document.cookie = "code" + "=" + this.code + ";path=/;expires=" + exdate.toGMTString();
            this.axios.post('/ticket/getWxfo?code='+this.code).then((res)=>{
                if(res.data.result==1) {
                    var exdate = new Date(); //获取时间
                    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * 1); //保存的天数
                    window.document.cookie = "WeiId" + "=" + res.data.value.openid + ";path=/;expires=" + exdate.toGMTString();
                }
            }).catch(()=>{});
        };
        
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

                    if (c_end == -1){
                        c_end = document.cookie.length;
                    }
                    //通过substring()得到了值
                    return unescape(document.cookie.substring(c_start, c_end))　　 
                }　　　　
            }　　　　
            return null　　
        },
        getSlider(){
            this.axios.get('/ticket/home').then((res)=>{
                this.adList=res.data.value.adList;
                // this.enters=res.data.value.navList;
                // this.navList=res.data.value.navList;
                this.scenicList=res.data.value.scenicList;
                this.hotScenicList=res.data.value.hotScenicList;
            }).catch(()=>{})
        },
        jump(tagId,tagName){
            this.$router.push({
                path:'/riverindexList',
                query:{
                    types:tagId,
                    Title:tagName
                }
            })
        },
        indexHotDetail(uupType,tagId,id,UUid){
            this.$router.push({
                path:'/indexHotDetail',
                query:{
                    types:tagId,
                    id:id,
                    uuid:UUid,
                    uupType:uupType
                }
            })
        },
        indexScenicAreaDetail(uupType,tagId,id,UUid){
            this.$router.push({
                path:'/indexScenicAreaDetail',
                query:{
                    types:tagId,
                    id:id,
                    uuid:UUid,
                    uupType:uupType
                }
            })
        }
    }
}
</script>
<style scope>
    .slider img{
        width:100%;
        height: 3.2rem;
    }
    .list{
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        background:#fff;
        position: absolute;
        top:3.12rem;
        width:100%;
        z-index: 99;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    .list .item{
        margin:.4rem 0;
    }
    .list img{
        width:.88rem;
        height: .88rem;
    }
    .list h4{
        font-size: .26rem;
        color:#5E6776;
        margin-top: .2rem;
    }
    .hot_content{
        background-color: #fff;
        margin-top:1.48rem;
    }
    .scenic_spots{
        background-color: #fff;
        margin-bottom: 1rem;
    }
    .hot_content .hot{
        font-size: .36rem;
        font-weight: bold;
        margin-bottom: .4rem;
        text-align: left;
        padding:0.4rem .3rem 0;
    }
    .scenic_spots .hot{
        font-size: .36rem;
        font-weight: bold;
        margin-bottom: .4rem;
        text-align: left;
        padding:0.8rem .3rem 0;
    }
    .hot_slider{
        position: relative;
        /* height:3.2rem !important; */
    }
    .hot_slider .swiper-container{
        box-sizing: border-box;
        padding: 0 .3rem;
    }
    .hot_slider .swiper-container .swiper-slide{
        width:2.8rem;
        margin-right: .2rem;
    }
    .hot_slider .swiper-container .swiper-slide img{
        width: 2.8rem;
        height: 2.08rem;
        display: block;
        border: 1px solid #fafafa;
        border-radius: .12rem;
    }
    .hot_slider h6{
        font-size:.28rem;
        color:#484848;
        font-weight:bold;
        text-align: left;
        padding:.1rem 0;
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .price{
        font-size: .24rem;
        text-align: left;
    }
    .price span{
        color: #FF6245;
        font-weight: bold;
    }
    .price span i{
        font-size: .2rem;
        font-style: normal;
        font-weight: normal;
    }
    .price em{
        font-style: normal;
        text-decoration: line-through;
        padding-left: .2rem;
        color:#878789;
    }
    .hot_slider .swiper-container .swiper-slide .hot_img img {
        display:block;
        width:.76rem;
        height: .46rem;
        background-size: 100%;
        position: absolute;
        left: -.06rem;
        top:0;
    }
    /* 景区景点 */
    .scenic_spots_list{
        display:flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        padding:0 .3rem 0.4rem;
        box-sizing: border-box;
    }
    .scenic_spots_list_img{
        width: 2.4rem;
        height: 1.8rem;
        position: relative;
    }
    .scenic_spots_list_img span{
        position:absolute;
        top:0;
        left: -0.06rem;
    }
    .scenic_spots_list_img span img{
        width:.76rem;
        height: .46rem;
    }
    .scenic_spots_list_img img{
        width:2.4rem;
        height: 1.8rem;
        background-size: 2.4rem 1.8rem;
        border-radius: .12rem;
    }
    .scenic_spots_list_content{
        display: flex;
        flex-direction: column;
        padding-left: .2rem;
        text-align: left;
        height: 1.8rem;
        overflow: hidden;
    }
    .scenic_spots_list_content h6{
        font-size:.28rem;
        color:#484848;
        font-weight:bold;
        text-align: left;
        padding:.1rem 0;
        width:100%;
        height:.9rem;
        line-height: .36rem;
        padding-top:.2rem;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .price{
        font-size: .24rem;
        text-align: left;
        margin-top:.5rem;
    }
    .price span{
        color: #FF6245;
        font-weight: bold;
    }
    .price span i{
        font-size: .2rem;
        font-style: normal;
        font-weight: normal;
    }
    .price em{
        font-style: normal;
        text-decoration: line-through;
        padding-left: .2rem;
        color:#878789;
    }
    .loading_container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
</style>
