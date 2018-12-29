<template>
    <div>
        <Heador>
            <img @click="back" src="../../assets/header/arrow.png" alt="">
            <h4>退票申请</h4>
        </Heador>
        <div class="refundApplicationTitle">
            <h5>{{data_list.ticketName}}</h5>
            <ul>
                <li>入园时间</li>
                <li>{{data_list.orderTime}}</li>
            </ul>
            <ul>
                <li>单价</li>
                <li>¥{{price}}</li>
            </ul>
            <ul>
                <li>入园人数</li>
                <li>{{data_list.tnum}}</li>
            </ul>
            <ul>
                <li>总金额</li>
                <li>¥{{(data_list.totalPrice)}}</li>
            </ul>
        </div>
        <div class="refundApplicationContent">
            <ul>
                <li>退票数量</li>
                <li class="refundApplicationContentCutAdd">
                    <span class="refundApplicationContent_red">最多可退{{jisuan_sum}}张</span>
                    <div class="refundApplicationContent_cut_add">
                        <b @click="cuts()"></b>
                        <b>{{num}}</b>
                        <b @click="add()"></b>
                    </div>
                </li>
            </ul>
            <ul>
                <li>退票金额</li>
                <li>¥{{sumPrice}}</li>
            </ul>
            <ul>
                <li>退票原因</li>
                <li class="refundApplicationReason" @click="refundApplicationReason">
                    <input ref="refundApplicationReason" type="text" disabled="disabled" placeholder="请选择退票原因">
                </li>
            </ul>
        </div>
        <div class="refundApplicationSubmit" @click="refundApplicationDetail">提交</div>
        <!-- 点击查看详情弹出层 -->
        <div id="refundApplicationMask" v-show="boxshow">
            <transition name="refundApplicationMaskContent">
                <div class="refundApplicationMaskContent">
                    <!-- <div @click="Radio">
                        <span ref="Radio1">时间行程变更</span>
                        <div class="refundApplicationMaskContentImg" v-if="RadioImg"><img src="../../assets/refundApplication/arrow.png" alt=""></div>
                        <div class="refundApplicationMaskContentImg" v-else><img src="../../assets/refundApplication/arrow.png" alt=""></div>
                    </div> -->
                    <div v-for="item in Radio" :key="item.id" @click="getText(item.value)">
                        <span ref="Radio">{{item.value}}</span>
                    </div>
                </div>
            </transition>
            <!-- 弹出层遮罩层 -->
            <transition name="mask">
                <div class="cover" @click="close"></div>
            </transition>
        </div>
    </div>
</template>

<script>
import Heador from '@/components/index/header'
import { Indicator } from 'mint-ui';
export default {
    components:{
        Heador
    },
    data(){
        return{
            num:1,
            boxshow:false,
            Radio:[],
            id:"",
            data_list:{},
            price:"",
            tnum:"",
            sumPrice:"",
            jisuan_tnum:0,
            jisuan_usedNum:0,
            jisuan_refundCount:0,
            jisuan_sum:0
            // RadioImg:false,
        }
    },
    mounted(){
        Indicator.open();
        this.Radio=[
            {
                id:0,
                value:"时间行程变更"
            },
            {
                id:1,
                value:"旅游目的地变更"
            },
            {
                id:2,
                value:"同游小伙伴变更"
            },
            {
                id:3,
                value:"家中静养暂不出关"
            }
        ];
        this.id=this.$route.query.id;
        this.pickData();
    },
    methods:{
        back(){
            this.$router.push({
                path:"/refundOrderList/refundAllOrder"
        })
            // this.$router.go(-1);
            // 跳转到订单列表的退票详情页面（两个切换的页面）
        },
        //查询订单详细
        pickData() {
      this.axios
        .get("/ticket/home/order/detail",{
           params:{
                      number:this.id
                    //    number:"TK201812280430593354"
                    }
        })
        .then(res => {
          console.log(JSON.stringify(res.data));
          console.log(res.data);
          if(res.data.result==1){
               this.data_list=res.data.value.orderDetailList[0];
                this.price=res.data.value.orderDetailList[0].tprice;
                //下面3个，用户计算最多可退票数的计算
                this.jisuan_tnum=res.data.value.orderDetailList[0].tnum;
                if(res.data.value.orderDetailList[0].usedNum){
                    this.jisuan_usedNum=res.data.value.orderDetailList[0].usedNum;
                }else{
                    this.jisuan_usedNum=0;
                }
                if(res.data.value.orderDetailList[0].refundCount){
                    this.jisuan_refundCount=res.data.value.orderDetailList[0].refundCount;
                }else{
                    this.jisuan_refundCount=0;
                }
                //计算得出可退票数
                this.jisuan_sum=this.jisuan_tnum-this.jisuan_usedNum-this.jisuan_refundCount;
                this.sumPrice=this.price*this.num;
                Indicator.close();
          }
         
        })
        .catch(() => {});
    },
        refundApplicationReason(){
            this.boxshow=true;
        },
        cuts(){
         this.$nextTick(()=>{
             if(this.num<2) return;
                this.num--;
                this.sumPrice=this.price*this.num;
         })
        },
        add(){
            this.$nextTick(()=>{
                this.num++;
                this.sumPrice=this.price*this.num;
            })
        },
        close(){
            this.boxshow=false;
        },
        getText(innerHTML){
            this.boxshow=false;
            // // console.log(this.$refs.Radio1.innerHTML)
            this.$refs.refundApplicationReason.value=innerHTML;
        },
        refundApplicationDetail(){
            // alert(this.$refs.refundApplicationReason.value)
            if(this.$refs.refundApplicationReason.value==""){
                alert("退票原因不能为空！");
                return false;
            }
            if(this.num>this.jisuan_sum){
                alert("不可大于可退数量！");
                return false;
            }
            this.axios
                .post("/ticket/wx/submitRefund?orderNum="
                // +"TK2018122720102926334"+"&count="
                 +this.id+"&count="
                +this.num+"&reason="
                +this.$refs.refundApplicationReason.value,)
                .then(res => {
                console.log(JSON.stringify(res.data.result));
                console.log(res.data.result);
                if(res.data.result==1){
                    alert("申请成功");
                    //跳到退款列表页
                    this.$router.push({
                        path:'/refundOrderList/refundAllOrder'
                    })
                }else if(res.data.result==2){
                    alert("申请数量不正确");
                }else if(res.data.result==3){
                    alert("有尚未处理的退款申请，不允许申请");
                }
                
                })
                .catch(() => {});
        },
    }
}
</script>

<style>
    .refundApplicationTitle{
        background:#fff;
        padding:0 .3rem;
        margin-top: 1.08rem;
        border-radius: .12rem;
    }
    .refundApplicationTitle h5{
        font-size: .32rem;
        color:#484848;
        text-align: left;
        font-weight: bold;
        padding:.4rem 0;
    }
    .refundApplicationTitle ul{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding-bottom: .3rem;
    }
    .refundApplicationTitle li{
        font-size: .28rem;
        color:#484848;
    }
    .refundApplicationTitle li:first-child{
        color: #878789;
        width:2rem;
        padding-right: .4rem;
        text-align: left;
    }
    .refundApplicationContent{
        background:#fff;
        margin-top: .2rem;
        border-radius: .12rem;
    }
    .refundApplicationContent ul{
        height: .88rem;
        line-height: .88rem;
        margin:0 .3rem;
        border-bottom: 1px solid #F5F5F6;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color:#484848;
        font-size: .28rem;
    }
    .refundApplicationContent li:first-child{
        color:#878789;
    }
    .refundApplicationContentCutAdd{
        display: flex;
        flex-direction: row;
    }
    .refundApplicationContent .refundApplicationContent_red{
        color:#FF6245;
        font-size:.24rem;
        padding-right: .3rem;
    }
    .refundApplicationContent_cut_add{
        display:flex;
        flex-direction: row;
        align-items: center;
    }
    .refundApplicationContent b:first-child{
        margin-right: .28rem;
        background: url("../../assets/submitOrder/cut.png") no-repeat;
        background-size: 100% 100%;
        width:.44rem;
        height:.44rem;
        border-radius: 0%!important;
    }
    .refundApplicationContent b:nth-child(2){
        height:100%;
        font-weight: normal;
        color:#484848;
        font-size: .32rem;
    }
    .refundApplicationContent b:last-child{
        margin-left: .28rem;
        background: url("../../assets/submitOrder/add.png") no-repeat;
        background-size: 100% 100%;
        width:.44rem;
        height:.44rem;
        border-radius: 0%!important;
    }
    .refundApplicationReason{
        
    }
    .refundApplicationReason input{
        height: .88rem;
        line-height: .88rem;
        text-align: right;
        padding-right: .4rem;
        background: url("../../assets/submitOrder/arrow.png") no-repeat right center;
        background-size: .18rem .28rem;
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
    /* 弹出层 */

    .refundApplicationMaskContent-leave-active,.refundApplicationMaskContent-enter-active{
        transition:all 1s ease;
    }
    .refundApplicationMaskContent-leave-active,.refundApplicationMaskContent-enter{
        height:0px !important;
    }
    .refundApplicationMaskContent-leave,.refundApplicationMaskContent-enter-active{
        height: 4.8rem;
    }
    .refundApplicationMaskContent{
        position: fixed;
        width:100%;
        height:4.8rem;
        bottom:0;
        left: 0;
        background-color:#fff;
        cursor:pointer;
        z-Index:99999;
        border-top-left-radius: .12rem;
        border-top-right-radius: .12rem;
    }
    .refundApplicationMaskContent div{
        height: 1.2rem;
        line-height: 1.2rem;
        border-bottom:1px solid #EEF1F0;
        margin:0 .3rem;
        font-size: .32rem;
        color:#484848;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .refundApplicationMaskContentImg img{
        display: inline-block;
        width:.4rem;
        height:.4rem;
        margin-top:.4rem;
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
    .refundApplicationSubmit{
        width:5.6rem;
        height:.8rem;
        background:#40B1FF;
        color:#fff;
        font-size: .32rem;
        line-height: .8rem;
        margin: 1.2rem auto 0.3rem;
        border-radius: .12rem;
    }
</style>


