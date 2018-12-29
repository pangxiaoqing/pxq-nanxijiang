<template>
<div>
    <div class="navListDetail_ticket_list" v-for="item in scenicTicketInfo" :key="item.tagId">
        <div class="navListDetail_ticket_list_left">
            <h5>{{item.title}}</h5>
            <p>{{item.bhjp}}</p>
            <span @click="getDetail">查看详情</span>
        </div>
        <div class="navListDetail_ticket_list_right">
            <div>
                <span><i>￥</i>{{item.price}}</span>
                <!-- <em>￥54</em> -->
            </div>
            <button>预订</button>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            types:0,
            id:0,
            uuid:0,
            scenicTicketInfo:[]
        }
    },
    mounted(){
        this.getIndexListDetail();
    },
    methods:{
        getIndexListDetail(){
            this.types=this.$route.query.types;
            this.id=this.$route.query.id;
            this.uuid=this.$route.query.uuid;
            console.log(this.types);
            console.log(this.id);
            console.log(this.uuid);
            this.axios.post('/ticket/home/scenic/info',{
                types:this.types,
                id:this.id,
                uuid:this.uuid
            })
            .then((res) => {
                this.scenicTicketInfo=res.data.value.scenicTicketInfo;
            })
            .catch((err) => {
                console.log(err);
            })
        },
    }
}
</script>

