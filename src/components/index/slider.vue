<template>
    <section :class="[sliderClass,cname]">
        <swiper v-if="items.length>0" :options="options" :not-next-tick="options.notNextTick" ref="mySwiper"> 
            <swiper-slide v-for="item in items" :key="item.img" class="slider_center">
                <img :src="item.img" alt="">
                <!-- <slot name="item" :price="item.price" :title="item.title" :tagId="item.tagId"/> -->
            </swiper-slide>
            <div v-if="options.pagination" slot="pagination" class="swiper-pagination"/>
        </swiper> 
    </section>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper"

export default {
    components: {
        swiper,
        swiperSlide,
    },
    data(){
        return {
            sliderClass:"sliderClass"
        }
    },
    props: {
        cname: {
            type: String,
            default: "",
        },
        options: {
            type: Object,
            default() {
                return {
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                    autoplay: true,
                    loop: true,
                    pagination: {
                        el: ".swiper-pagination",
                    },
                    notNextTick: false
                }
            },
        },
        items: {
            type: Array,
            default() {
                return []
            },
        },
    },
    mounted(){

    },
    methods:{
        // jumpIndexHotDetail(){console.log(123444666);
        //     this.$emit("jumpIndexHotDetail");
        // }
    }
}
</script>

<style lang="css">
  @import "swiper/dist/css/swiper.css";
 
  .sliderClass{
      /* height:3.2rem; */
      height:3.72rem;
  }  
  .swiper-pagination-bullet{
      background: #fff;
      opacity: 0.6;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #007aff;
  }
  .slider_center{
      display: flex;
      align-items: center;
  }
</style>
