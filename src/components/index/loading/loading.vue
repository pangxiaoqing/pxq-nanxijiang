<template>
  <div class="loading">
    <img src="./loading.gif">
    <!-- <p class="desc">{{title}}</p> -->
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        // default: '正在载入...'
      }
    }
  }
</script>
<style>
    .loading{
      width:100%;
      text-align: center;
    }
    .loading img{
      width:.48rem;
      height:.48rem;
    }
    .loading desc{
      line-height: 20px;
      font-size: 26px;
      color:#5E6776;
    }
</style>
