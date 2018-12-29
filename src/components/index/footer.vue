<template>
    <div class="tab">
        <router-link class="tab_item" tag="div" to="/riverDetail">
            <div class="tab_link" v-bind:class="{ 'tab_home_active': tabHomeActive, 'tab_home': tabHome }">首页</div>
        </router-link>
        <router-link class="tab_item" tag="div" to="/orderList/allOrder">
            <div class="tab_link" v-bind:class="{ 'tab_list_active': tabListActive, 'tab_list': tabList }">订单</div>
        </router-link>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tabHomeActive:true,
            tabHome:false,
            tabListActive:false,
            tabList:true
        }
    }
}
</script>

<style>
    .tab{
        height: .98rem;
        line-height: .98rem;
        width: 100%;
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position:fixed;
        bottom: 0;
        border-top:1px solid #E5E5E7;
        z-index: 1000;
    }
    .tab_item{
        text-align: center;
        font-size: .24rem;
        width:50%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-right: 1px solid #E5E5E7;
    }
    .tab_link{
        height: .98rem;
        line-height: .98rem;
        background-size:.48rem .48rem;
        background-repeat: no-repeat;
        padding-top: .28rem;
        box-sizing: border-box;
        background-position: center 5px;
    }
    .tab_home{
        color:#8C8C8C;
        background-image: url("../../assets/footer/home.png");
    }
    .tab_list{
        color:#8C8C8C;
        background-image: url("../../assets/footer/list.png");
    }
    .tab_home_active{
        color:#40B1FF;
        background-image:url("../../assets/footer/home_active.png");
    }
    .tab_list_active{
        color:#40B1FF;
        background-image:url("../../assets/footer/list_active.png");
    }
</style>


