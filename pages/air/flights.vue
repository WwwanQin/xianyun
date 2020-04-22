<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    <flightFilters
                    :fightsData="flightsData.info"/>
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <flightsHeader/>
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                    <flightsItem
                    v-for="(item,index) in dataList"
                    :key="index"
                    :fightData="item"/>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <flightsAside/>
            </div>
        </el-row>
        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </section>
</template>

<script>
import flightsAside from '@/components/air/flightsAside.vue'
import flightFilters from '@/components/air/flightsFilters.vue'
import flightsHeader from '@/components/air/flightsHeader.vue'
import flightsItem from '@/components/air/flightsItem'
export default {
    components:{
        flightsAside,
        flightsHeader,
        flightsItem,
        flightFilters
    },
    data(){
        return{
            dataList: [],
            flightsData: {},
            pageIndex: 1,
            pageSize: 5,
            total: 0
        }
    },
    methods:{
        handleSizeChange(val) {
            this.pageSize = val;
            this.pageIndex = 1;
            this.dataList = this.flightsData.flights.slice(
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize);
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.dataList = this.flightsData.flights.slice(
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize);
        }
    },
    mounted(){
        let {
        arriveCity: destCity,
        arriveCityCode: destCode,
        departCity: departCity,
        departCityCode: departCode,
        departDate: departDate} = this.$route.query;
        this.$axios({
            url: '/airs',
            method: 'get',
            params:{
                destCity,
                destCode,
                departCity,
                departCode,
                departDate
            }
        }).then(res => {
            this.flightsData = res.data;
            this.$store.commit('flightsData/savefightsData',this.flightsData);
            this.dataList = this.flightsData.flights.slice(0,this.pageIndex * this.pageSize);
            this.total = this.flightsData.total;
        }).catch(reason => {
            console.log(reason);
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>