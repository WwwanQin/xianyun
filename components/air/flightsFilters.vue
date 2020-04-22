<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程：
                {{ departCity }} - 
                {{ destCity }} 
                / 
                {{ departDate }}
               
            </el-col>
            <el-col :span="4">
                <el-select 
                size="mini" 
                v-model="search.airport"
                @change="changeAirport"
                placeholder="起飞机场">
                    <el-option
                    v-for="(item,index) in $store.state.flightsData.flightsData.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select 
                size="mini" 
                v-model="search.flightTimes" 
                @change="changeFlightTimes" 
                placeholder="起飞时间">
                    <el-option
                    v-for="(item,index) in flightTimeArray"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select 
                size="mini" 
                v-model="search.company"
                change="changeCompany"  
                placeholder="航空公司">
                    <el-option
                    v-for="(item,index) in $store.state.flightsData.flightsData.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select 
                size="mini" 
                v-model="search.airSize" 
                change="changeAirSize"
                placeholder="机型">
                    <el-option
                    v-for="(item,index) in optionSize"
                    :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
            type="primary" 
            round 
            plain 
            size="mini"
            @click="revoke">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            search:{
                airport: "",        // 机场
                flightTimes: "",    // 出发时间
                company: "",        // 航空公司
                airSize: "",        // 机型大小
            },
            optionSize: [
                {name: '大',size: 'L'},
                {name:'中',size: 'M'},
                {name:'小',size: 's'}
            ]
        }
    },
    methods:{
        changeAirport(){

        },
        changeFlightTimes(){

        },
        changeCompany(){

        },
        changeAirSize(){

        },
        revoke(){
            this.search.airport = '';
            this.search.flightTimes = '';
            this.search.company = '';
            this.search.airSize = ''
        }
    },
    computed:{
        departCity(){
            return this.$store.state.flightsData.flightsData.info.departCity
        },
        destCity(){
            return this.$store.state.flightsData.flightsData.info.destCity
        },
        departDate(){
            return this.$store.state.flightsData.flightsData.info.departDate
        },
        flightTimeArray(){
            if(this.$store.state.flightsData.flightsData.options.flightTimes){
                let times = this.$store.state.flightsData.flightsData.options.flightTimes.map((ele) => {
                    return {
                        label: `${ele.from}:00 - ${ele.to}:00`,
                        value: `${ele.from},${ele.to}`
                    }
                })
                return times;
            }else{
                return {};
            }
        }
    },
    mounted(){
        console.log();
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>