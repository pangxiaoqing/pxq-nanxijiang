<template>
  <div id="app">
    <!-- <headerCom/> -->
    <router-view/>
    <!-- <tabbar></tabbar> -->
  </div>
</template>

<script>
// import tabbar  from '@/components/publicComponents/footer'
// import headerCom  from '@/components/publicComponents/header'
export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  // components :{
  //   tabbar
  // }
}
</script>

<style>
#app {
  font-family: "Microsoft Yahei",'Microsoft JhengHei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display:flex;
  flex-direction: column;
  height:100%;
  background-color: #F5F5F6;
  font-family:”微软雅黑”
}
#app img{
  margin:0;
  padding:0;
  border:none;
}
/* .content{
  flex:1;
  overflow-y:auto; 
} */
footer{
  flex: 0 0 auto;
}
#xxxFullScreen {
background-color: #F5F5F6;
} 
.pageFullScreen{
    overflow: visible;
    background: #fff;
}
</style>
