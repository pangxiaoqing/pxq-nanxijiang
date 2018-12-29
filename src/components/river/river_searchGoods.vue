<template>
 <div class="pageFullScreen" id="xxxFullScreen">
     <div>
        <div class="projectTop1">
            <span><a href="javascript:;" @click="tiaozhuan()"><img src="../../../src/assets/searchImg/searchGo.png"></a></span>
            <span class="input_box"><input type="search"  @keyup.13="searchAllGoods()" v-model="searchData" placeholder="请输入搜索内容"></span>
            <span @click="searchAllGoods()">搜索</span>
        </div>
     </div>
 </div>
</template>
<script>
export default {
    name:"searchGoods",
    data() {
        return {
            searchData:''
        }
    },
    activated() {

    },
    methods:{
        searchAllGoods(){
            if(this.searchData != ""){
                this.$router.push({
                    path:'/river_searchResult',   
                    query:{
                        id : this.searchData,
                        secenid:5,
                        typeId:this.searchData
                    }
                })
            }else{
                // alert("请输入搜索内容")
            }
            
        },
        tiaozhuan(){
            this.$router.push({
                path:"/"
            })
        }
    }
}
</script>
<style scoped>
.pageFullScreen{
    background: #fff;
}
.projectTop1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  height: 0.88rem;
  background: #07b6c4;
  z-index: 1;
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.28rem;
  border-bottom:.01rem solid #dadada;
  padding:0 .3rem;
  align-items: center;
}
.projectTop1 > span:first-child {
  width: 0.18rem;
  height: 0.88rem;
  line-height: 0.88rem;
  margin-right: .3rem;
  position: static !important;
}
.projectTop1 > span:first-child img {
  width: 100%;
}
.projectTop1 > span:nth-child(3){
    width:.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .28rem;
    color:#fff;
}
.input_box{
    display: flex;
    flex: 1;
    height: .6rem;
    border-radius: 0.5rem;
    background: #fff;
    justify-content: center;
}
.input_box input{
    height:.6rem;
    border-radius: 0.5rem;
    text-align: center;
    line-height: .6rem;
    width:100%;
    text-align: left;
    padding-left: .3rem;
    /* background: url("../../../src/assets/searchImg/searchFd.png") no-repeat 10% center; */
    background-size:10% 50%; 
    font-size: 0.28rem;
}
.input_box input:-moz-placeholder{
    color:#8c8c8c;
}
.type_search{
    height: 3.22rem;
    padding-top:1.2rem;
}
.top_span{
    width:100%;
    height:.98rem;
    align-items: center;
    padding-left: .36rem;
    display: flex;
    flex-direction: row;
}
.iconfont{
    color:#07b6c4;
    margin-right: .1rem;
    font-size: .28rem;
}
.top_span span{
    font-size: .28rem;
    color: #333;
}
.typesearch_box{
    height: .84rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 .3rem;
    flex-wrap: wrap;
}
.typesearch_box a{
    display: block;
    height:.68rem;
    width:1.56rem;
    border:.01rem solid #06b6c5;
    border-radius: .1rem;
    font-size: .38rem;
    color:#333;
    text-align: center;
    line-height: .68rem;    
}
.typesearch_box a:nth-child(5){
    margin-top:.5rem;
}
</style>
