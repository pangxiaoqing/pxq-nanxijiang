<template>
    <div class="pageFullScreen" id="xxxFullScreen">
        <goTop/>
        <Heador>
            <img @click="back" src="../../assets/header/arrow.png" alt="">
            <h4>{{title}}</h4>
        </Heador>
        <div class="riverindexList">
            <!-- <List cname="panel_img" img_box="img_box" :items="tagTypeList" @jump="jumpNavListDetail()"/> -->
            <div class="riverindexList_list" v-for="item in tagTypeList" :key="item.title" @click="jumpNavListDetail(item.uupType,item.tagId,item.id,item.UUid)">
                <div class="riverindexList_list_img">
                    <img v-lazy="item.img" alt="">
                </div>
                <div class="riverindexList_list_content">
                    <h6>{{item.title}}</h6>
                    <div class="price">
                        <span><i>￥</i>{{item.price}}</span> 
                        <!-- <em>￥32</em> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- <div v-show="!ident" v-html="html" class="ident">{{html}}</div> -->

        <Footor/>
        <div class="loading_container" v-show="!tagTypeList.length">
            <loading></loading>
        </div>
    </div>
</template>
<script>
import Heador from '@/components/index/header.vue'
// import List from "@/components/index/list.vue"
import Footor from "@/components/index/footer.vue"
import Loading from "@/components/index/loading/loading.vue"
import goTop from '@/components/river/goTop'

export default {
    components:{
        goTop,
        Heador,
        // List,
        Footor,
        Loading
    },
    data(){
        return {
            types:this.$route.query.types,
            tagTypeList:[],
            title:'',
            // ident:false,
            // html:"小主，这里暂时没有内容，请移步其他模块看看吧~"
        }
    },
    created(){
        this.getList();
    },
    mounted(){
        this.title=this.$route.query.Title
    },
    methods:{
        getList(){
            this.axios.get('/ticket/home/type/info?types='+this.types).then((res)=>{
                // this.ident=true;
                this.tagTypeList=res.data.value.tagTypeList;
                
                if(JSON.stringify(this.tagTypeList)==='[]'){
                    // this.ident=false;
                    console.log(123333);
                    console.log(this.title);
                    this.$router.push({
                        path:'/default',
                        query:{
                            Title:this.title
                        }
                    })

                }
            }).catch(()=>{})
        },
        back(){
            this.$router.go(-1);
        },
        jumpNavListDetail(uupType,tagId,id,UUid){
            this.$router.push({
                path:'/riverindexListDetail',
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
<style>
    .riverindexList{
        border-top:1px solid #F5F5F6;
        background-color: #fff;
        margin-top: .88rem;
        margin-bottom:.98rem;
    }
    .riverindexList .riverindexList_list{
        margin:0 .3rem;
        padding: .4rem 0;
        border-bottom: 1px solid #F5F5F6;
        display:flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
    }
    .riverindexList_list .riverindexList_list_img{
        width:2.4rem;
    }
    .riverindexList_list .riverindexList_list_img img{
        width:2.4rem;
        height: 1.8rem;
        background-size: 2.4rem 1.8rem;
        border-radius: .12rem;
    }
    .riverindexList_list_content{
        display: flex;
        flex-direction: column;
        padding-left: .2rem;
        text-align: left;
        height: 1.8rem;
        overflow: hidden;
    }
    .riverindexList_list_content h6{
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
    .riverindexList_list_content .price{
        font-size: .24rem;
        text-align: left;
        margin-top:.5rem;
    }
    .riverindexList_list_content .price span{
        color: #FF6245;
        font-weight: bold;
    }
    .riverindexList_list_content .price span i{
        font-size: .2rem;
        font-style: normal;
        font-weight: normal;
    }
    .riverindexList_list_content .price em{
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
    /* 无数据 */
    .ident{
        padding:3rem .3rem 0;
    }
</style>


