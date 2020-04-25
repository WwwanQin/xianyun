<template>
    <div class="aside">
        <div class="air-info">
            <el-row type="flex" justify="space-between" class="info-top">
                <div>{{ $store.state.air.fightData.arr_date }}</div>
                <div>{{ $store.state.air.fightData.org_city_name }} - {{ $store.state.air.fightData.dst_city_name }}</div>
            </el-row>    
            <el-row 
            type="flex" 
            justify="space-between" 
            align="middle" 
            class="info-step">
                <el-col :span="5" class="flight-airport">
                    <strong>{{ $store.state.air.fightData.dep_time }}</strong>
                    <span>
                        {{ $store.state.air.fightData.dst_airport_name }}{{ $store.state.air.fightData.dst_airport_quay }}
                    </span>
                </el-col>
                <el-col :span="14" class="flight-time">
                    <span>--- {{ lastHours }}时{{ lastMinute }}分 ---</span>
                    <span>
                        {{ $store.state.air.fightData.airline_name }}
                        {{ $store.state.air.fightData.flight_no }}
                    </span>
                </el-col>
                <el-col :span="5" class="flight-airport">
                    <strong>{{ $store.state.air.fightData.arr_time }}</strong>
                    <span>
                        {{ $store.state.air.fightData.org_airport_name }}{{ $store.state.air.fightData.org_airport_quay }}
                    </span>
                </el-col>
            </el-row> 
        </div>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>订单总价</span>
            <span>金额</span>
            <span>数量</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>成人机票</span>
            <span>¥ {{ $store.state.air.fightData.seat_infos.org_settle_price }}</span>
            <span>x {{ $store.state.air.passengerNumber }}</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>机建＋燃油</span>
            <span>¥ {{ $store.state.air.fightData.airport_tax_audlet }}/人/单程</span>
            <span>x {{ $store.state.air.passengerNumber }}</span>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle" class="info-bar">
            <span>应付总额：</span>
            <!-- 从store中获取总价格 -->
            <span class="price">￥ {{$store.state.air.allPirce}}</span>
        </el-row>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type: Object,
            default: {

            }
        }
    },
    data(){
        return {
            lastHours: '',
            lastMinute: ''
        }
    },
    mounted(){
        setTimeout(() => {
            console.log(this.data);
            let { dep_time,arr_time } = this.data.fightData;
            let [depHours,depMinute] = dep_time.split(':');
            let [arrHours,arrMinute] = arr_time.split(':');
            arrHours = arrHours < depHours ? arrHours += 24 : arrHours;
            let _depTime = +depHours * 60 + +depMinute;
            let _arrTime = +arrHours * 60 + +arrMinute;
            let lastTime = _arrTime - _depTime;
            this.lastHours = Math.floor(lastTime / 60);
            this.lastMinute = lastTime % 60
        },1000)
    }
}
</script>

<style scoped lang="less">
/*aside*/
.aside{
    width: 350px;
    height: fit-content;
    border:1px #ddd solid;
}

.air-info{
    padding:15px;

    .info-top{
        margin-bottom:10px;
        > div:last-child{
            font-size:14px;
        }
    }

    .info-step{
        .flight-airport{
            strong{
                display: block;
                font-size: 22px;
                font-weight: normal;
            }

            span{
                font-size: 12px;
                color:#999;
            }
        }

        .flight-time{
            text-align: center;
            font-size: 12px;
            color:#999;
            span{
                display: block;
            }
        }
    }
}

.info-bar{
    border-top:1px #ddd dashed;
    padding: 10px 15px;
    font-size: 14px;
    color: #666;

    .price{
        font-size:28px;
        color: orange;
    }
}
</style>