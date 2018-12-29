<template>
    <section class="header">
        <slot/>
    </section>
</template>

<script>
export default {
    
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
        z-index:10
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



