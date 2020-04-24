<template>
    <div class="order">
        <el-row type="flex" justify="space-between">
            <orderForm/>
            <div class="aside">

            </div>
        </el-row>
    </div>
</template>

<script>
import orderForm from '@/components/air/orderForm.vue'
export default {
    data(){
        return {

        }
    },
    components:{
        orderForm
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