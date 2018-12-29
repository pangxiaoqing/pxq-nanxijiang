import Vue from 'vue'
import Router from 'vue-router'

import riverDetail from '@/components/river/riverDetail'
import riverindexList from '@/components/river/riverindexList'
import riverindexListDetail from '@/components/river/riverindexListDetail'
// import navListDetailTicket from '@/components/riverindexListDetail/navListDetailTicket'
import refundApplication from '@/components/refundApplication/refundApplication'
import refundApplicationDetail from '@/components/refundApplication/refundApplicationDetail'
import indexHotDetail from '@/components/river/indexHotDetail'
import indexScenicAreaDetail from '@/components/river/indexScenicAreaDetail'
import agreeApplication from '@/components/refundApplication/agreeApplication'
import refuseApplication from '@/components/refundApplication/refuseApplication'
import Default from '@/components/river/default'

import riverReserve from '@/components/river/riverReserve'
import river_payMent_error from '@/components/river/river_payMent_error'
import river_payMent_success from '@/components/river/river_payMent_success'
import river_projectConfirm from '@/components/river/river_projectConfirm'
import river_projectOrder from '@/components/river/river_projectOrder'
import river_searchGoods from '@/components/river/river_searchGoods'
import river_searchResult from '@/components/river/river_searchResult'
import river_orderDetailUn from '@/components/detail/river_orderDetailUn'
import orderList from '@/components/order/orderList'
import allOrder from '@/components/order/allOrder'
import payOrder from '@/components/order/payOrder'
import useOrder from '@/components/order/useOrder'
import yiUseOrder from '@/components/order/yiUseOrder'
import refundOrder from '@/components/order/refundOrder'
import outDateOrder from '@/components/order/outDateOrder'

import refundOrderList from '@/components/refundList/refundOrderList'
import refundAllOrder from '@/components/refundList/refundAllOrder'
import shenOrder from '@/components/refundList/shenOrder'
import passOrder from '@/components/refundList/passOrder'
import refuseOrder from '@/components/refundList/refuseOrder'


Vue.use(Router);
const route= new Router({
  //  mode:'history',
  base:'encdata-ticket',
  routes: [
    {
      path:"/",
      redirect:'/riverDetail'
    },
    {
      path: '/riverDetail',
      name: 'riverDetail',
      component: riverDetail
    },
    {
      path: '/riverindexList',
      name: 'riverindexList',
      component: riverindexList
    },
    {
      path: '/riverindexListDetail',
      name: 'riverindexListDetail',
      component: riverindexListDetail,
    },
    {
      path:'/indexHotDetail',
      name:'indexHotDetail',
      component:indexHotDetail
    },
    {
      path: '/default',
      name: 'default',
      component: Default
    },
    {
      path:'/indexScenicAreaDetail',
      name:'indexScenicAreaDetail',
      component:indexScenicAreaDetail
    },
    {
      path: '/riverReserve',
      name: 'riverReserve',
      component: riverReserve
    },
     // 支付成功
     {
      path: '/river_payMent_success',
      name: 'river_payMent_success',
      component: river_payMent_success
    },
    // 退票申请页面
    {
      path:'/refundApplication',
      name:'refundApplication',
      component:refundApplication
    },
    {
      path:'/refundApplicationDetail',
      name:'refundApplicationDetail',
      component:refundApplicationDetail
    },
    {
      path:'/agreeApplication',
      name:'agreeApplication',
      component:agreeApplication
    },
    {
      path:'/refuseApplication',
      name:'refuseApplication',
      component:refuseApplication
    },
    // 支付失败
    {
      path: '/river_payMent_error',
      name: 'river_payMent_error',
      component: river_payMent_error
    },
    //订单确订页
    {
      path: '/river_projectConfirm',
      name: 'river_projectConfirm',
      component: river_projectConfirm
    },
    //我的订单列表
    {
      path: '/river_projectOrder',
      name: 'river_projectOrder',
      component: river_projectOrder
    },
    // 搜索页
    {
      path: '/river_searchGoods',
      name: 'river_searchGoods',
      component: river_searchGoods
    },
    // 搜索结果页
    {
      path: '/river_searchResult',
      name: 'river_searchResult',
      component: river_searchResult
    },
    //未支付的订单详情页
    {
      path:'/river_orderDetailUn',
      name:'river_orderDetailUn',
      component:river_orderDetailUn
    },
    // 我的订单
    {
      path: '/orderList',
      component: orderList,
      redirect:'/orderList/allOrder',
      children:[
        // 全部
        {
          path: 'allOrder',
          name: 'allOrder',
          component: allOrder
        },
        // 待支付
        {
          path: 'payOrder',
          name: 'payOrder',
          component: payOrder
        },
        
        // 待使用
        {
          path: 'useOrder',
          name: 'useOrder',
          component: useOrder
        },
        // 已使用
        {
          path: 'yiUseOrder',
          name: 'yiUseOrder',
          component: yiUseOrder
        },
        //已退款
        {
          path: 'refundOrder',
          name: 'refundOrder',
          component: refundOrder
        },
        //已过期
        {
          path: 'outDateOrder',
          name: 'outDateOrder',
          component: outDateOrder
        }
      ]
    },
    // 退票列表
    {
      path: '/refundOrderList',
      component: refundOrderList,
      redirect:'/refundOrderList/refundAllOrder',
      children:[
        // 全部
        {
          path: 'refundAllOrder',
          name: 'refundAllOrder',
          component: refundAllOrder
        },
        // 待审核
        {
          path: 'shenOrder',
          name: 'shenOrder',
          component: shenOrder
        },
        
        // 已通过
        {
          path: 'passOrder',
          name: 'passOrder',
          component: passOrder
        },
        // 已拒绝
        {
          path: 'refuseOrder',
          name: 'refuseOrder',
          component: refuseOrder
        }
      ]
    }
  ]
})
export default route;
