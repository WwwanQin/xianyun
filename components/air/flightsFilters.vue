<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程：
                {{flightsData.info.departCity}} - {{flightsData.info.destCity}}
                / 
                {{ flightsData.info.departDate }}
               
            </el-col>
            <el-col :span="4">
                <el-select 
                size="mini" 
                v-model="search.airport"
                placeholder="起飞机场">
                    <el-option
                    v-for="(item,index) in flightsData.options.airport"
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
                placeholder="航空公司">
                    <el-option
                    v-for="(item,index) in flightsData.options.company"
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
        {{ filter }}
    </div>
</template>

<script>
export default {
    props:{
        flightsData:{          
            type: Object,
            default: {}
        }
    },
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
        // changeAirport(val){
        //     let flights = [... this.flightsData.flights];
        //     let airs = flights.filter(ele => {
        //         return ele.org_airport_name == val;
        //     });
        //     this.$emit('getData',airs);
        // },
        changeFlightTimes(val){

        },
        changeCompany(val){

        },
        changeAirSize(val){

        },
        revoke(){
            this.search.airport = '';
            this.search.flightTimes = '';
            this.search.company = '';
            this.search.airSize = ''
        }
    },
    computed:{
        flightTimeArray(){
            if(this.flightsData.options.flightTimes){
                let times = this.flightsData.options.flightTimes.map((ele) => {
                    return {
                        label: `${ele.from}:00 - ${ele.to}:00`,
                        value: `${ele.from},${ele.to}`
                    }
                })
                return times;
            }else{
                return {};
            }
        },
        filter(){
            const filterArray = [
                {
                    key: this.search.airport,
                    fn: flag => (this.search.airport && this.search.airport === flag.org_airport_name)
                },
                {
                    key: this.search.company,
                    fn: flag => (this.search.company && this.search.company === flag.airline_name)
                },
                {
                    key: this.search.airSize,
                    fn: flag => (this.search.airSize && this.search.airSize === flag.plane_size)
                },
                {
                    key: this.search.flightTimes,
                    fn: flag => {
                        let [from, to] = this.search.flightTimes.split(',');
                        let currentTime = flag.dep_time.split(':')[0];
                        return this.search.flightTimes && (+currentTime > +from && +currentTime < +to);
                    }
                }
            ]
            let filters = filterArray.filter(item => item.key);
            // 获取到用于过滤的数组
            let airs = this.flightsData.flights.filter(ele => {
                return filters.every(item => item.fn(ele));
            })
            this.$emit('getData',airs);
            return '';
        }
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