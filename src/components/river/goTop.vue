<template>
    <div id="goTop">
      <div class="goTop" v-show="goTopShow" @click="goTop"><i class="goTopIcon"></i></div>
    </div>
</template>
<script>
    export default {
      name: "goTop",
      data(){
          return{
            scrollTop: null,
            goTopShow:false,
            timer:""
          }
        },
      methods:{
        goTop(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll(){
// 监听滚动事件
          window.addEventListener('scroll', () => {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            // 控制滚动按钮的隐藏或显示
            //console.log(this.scrollTop)
            if (this.scrollTop > 100) {
              //alert("显示")
              this.goTopShow = true;
            }else {
              this.goTopShow = false;
            }
            // if(document.documentElement.scrollTop < 20) {
            //   this.goTopShow = false;
            // }
          }, true);
        }
      },
      mounted() {
        this.handleScroll();
         
      },
      destroyed(){
        document.documentElement.scrollTop = document.body.scrollTop =0;
      }
    }
</script>
 
<style scoped>
  .goTop{
    position: fixed;
    right: 20px;
    bottom: 1.4rem;
    width: .88rem;
    height: .88rem;
    
  }
  .goTopIcon{
    display: block;
    width: .88rem;
    height: .88rem;
    background-image: url("../../assets/riverImg/top_big.png");
    background-size:100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>
