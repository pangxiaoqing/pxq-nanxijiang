<template>
 <div>
    <div class="input_box" v-if="input_show == 1">
        <span><span class="iconfont"></span></span>
        <div class="input"><router-link to= "/river_searchGoods" class="input_child"><i class="iconfont">&#xe60c;</i>搜索门票</router-link></div>
        <span><span class="iconfont"  @click="userShowHide()">&#xe7df;</span></span>
        <indexUserbox :show_hide = "user_show_hide"/>
    </div>
    <div id="input_box1" class="input_box" v-else-if="input_show == 2">
        <span><span class="iconfont"></span></span>
        <div class="input"><router-link to= "/river_searchGoods" class="input_child"><i class="iconfont">&#xe60c;</i>搜索门票</router-link></div>
        <span><span class="iconfont"  @click="userShowHide()">&#xe7df;</span></span>
        <indexUserbox :show_hide = "user_show_hide"/>
    </div>
 </div>
</template>
<script>
import indexUserbox from '@/components/index/indexUserbox'
import router from '@/router'
export default {
    name:"indexInput",
    data() {
        return {
          menu_show_hide:false,
          user_show_hide:false,
          cookieData : '',
          input_show:2
        }
    },
    activated() {
        
    },
    methods:{
      userShowHide(){
        this.user_show_hide = !this.user_show_hide;
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

                  if (c_end == -1){
                      c_end = document.cookie.length;
                  }
                  //通过substring()得到了值
                  return unescape(document.cookie.substring(c_start, c_end))　　 
              }　　　　
          }　　　　
          return null　　
      }
    },
    mounted(){
        this.cookieData = this.getCookie('userName');
        // //console.log(cookieData)
    },
    components:{
      indexUserbox,
    }
}
</script>
<style scoped>
.input_box{
  position: fixed;
  top:0rem;
  height:0.88rem;
  width:100%;
  display: flex;
  /* background: url("../../assets/indexImg/inputbg.png") no-repeat; */
  /* background-size:100% 100%;  */
  align-items: center;
}
.input_box span:nth-child(1){
  width:.3rem;
}
#input_box1{
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}
.input_box span{
  display: flex;
  width:1rem;
  height:100%;
}
.input_box span>span{
  display: flex;
  justify-content: center;
  align-items: center;
  margin:auto;
  font-size: 0.40rem;
  color:#11C07A;
}
.input{
  /* justify-content: center; */
  height:0.6rem;
  /* width:6.94rem; */
  flex:1;
  background: #ECECEC;
  /* opacity: 0.9; */
  border:0.5px solid #ffffff;
  /* margin: 0 auto; */
  align-items: center;
  border-radius: 0.5rem;
}
.input_child{
  display:block;
  width:3.98rem;
  background: #ECECEC;
  height:0.5rem;
  margin:0.08rem 0 0.08rem .2rem;
  color:#7F8083;
  font-size:0.3rem;
  text-align: left;
  /* line-height: 0.5rem; */
}
.input_child .iconfont{
  font-size: 0.34rem;
  color:#7F8083;
  font-weight: 700;
}

</style>
