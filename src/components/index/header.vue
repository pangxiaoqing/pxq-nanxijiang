<template>
    <section :class="[headerClass,cname]">
        <slot/>
    </section>
</template>

<script>
export default {
    props: {
        cname: {
            type: String,
            default: "",
        }
    },
    data(){
        return {
            headerClass: "header",
        }
    }
}
</script>

<style>
    .header{
        width:100%;
        height:.88rem;
        line-height: .88rem;
        background-color:#fff;
        padding:0 .3rem;
        text-align: center;
        position: fixed;
        z-index: 1000;
    }
    .header img{
        width:.48rem;
        height:.48rem;
        position: absolute;
        left:.2rem;
        top:.22rem;
    }
    .header h4{
        font-size: .36rem;
        color:#333335;
    }
</style>



