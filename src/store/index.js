import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        // 采摘tab
        tabState:{},
        // 娱乐tab
        tabproState:{},
        // 租赁tab
        tabrentState:{},
        // 餐品tab
        tabresturState:{},
        // total:''
        list_data:'',
        reslist_data:'',
        rentList_data : '',
        hotellist_data:''
    },
    mutations:{
        tabStateMutation(state,detailsData){
            // //console.log(detailsData)
            state.tabState = detailsData;
            // //console.log(state.tabState)
        },
        tabproStateMutation(state,detailsData){
            // //console.log(detailsData)
            state.tabproState = detailsData;
            // //console.log(state.tabproState)
        },
        tabrentStateMutation(state,detailsData){
            // //console.log(detailsData)
            state.tabrentState = detailsData;
            // //console.log(state.tabproState)
        },
        tabresturStateMutation(state,detailsData){
            // //console.log(detailsData)
            state.tabresturState = detailsData;
            // //console.log(state.tabproState)
        },
        Listdata(state,value){
            window.sessionStorage["/projectgodsDetail"] = JSON.stringify(value);
            state.list_data = value;
        },
        resListdata(state,value){
            window.sessionStorage["/restaurantReserve"] = JSON.stringify(value);
            state.picklist_data = value;
        },
        rentListdata(state,value){
            window.sessionStorage["/rentReserve"] = JSON.stringify(value);
            state.picklist_data = value;
        },
        hotelListdata(state,value){
            window.sessionStorage["/hotelReserve"] = JSON.stringify(value);
            state.hotellist_data = value;
        }
        // totalNum(state,total){
        //     state.total = total;
        // }
    },
    actions:{

    },
    getters:{
        // getTabState(state){
        //     return state.tabState;
        // }
    },
    modules:{

    }
})