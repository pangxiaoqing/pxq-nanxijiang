<template>
    <div>
         <div class="projectTop">
            <span><a href="javascript:history.go(-1);"><img src="../../assets/project/return.png"></a></span>
            <span>{{data}}</span>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  activated() {},
  props:{
      data:String
  }
};
</script>
<style scoped>
.projectTop {
  position: fixed;
  width: 100%;
  height: 0.88rem;
  background: #fff;
  z-index: 1;
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.36rem;
  border-bottom: .02rem solid #F5F5F6;
}
.projectTop > span:nth-child(1) {
  position: absolute;
  width: 0.48rem;
  left: 0.2rem;
  height: 0.88rem;
  line-height: 0.88rem;
}
.projectTop > span:nth-child(1) img {
  width: 100%;
}
</style>
