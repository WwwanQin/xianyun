<template>
    <div class="order">
        <el-row type="flex" justify="space-between">
            <orderForm/>
            <div class="aside">
                <orderAside :data="$store.state.air"/>
            </div>
        </el-row>
    </div>
</template>

<script>
import orderForm from '@/components/air/orderForm.vue'
import orderAside from '@/components/air/orderAside.vue'
export default {
    data(){
        return {

        }
    },
    components:{
        orderForm,
        orderAside
    }
}
</script>

<style scoped lang="less">
    .order{
        width: 1000px;
        margin: 20px auto;
        .aside{
            width: 350px;
            height: fit-content;
            border:1px #ddd solid;
        }
    }
</style>