<template>
    <div class="flight-item">
        <div  @click="isShow = !isShow">
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <span>{{ fightData.airline_name }} </span> {{ fightData.flight_no }}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <!-- 出发的机场 -->
                        <el-col :span="8" class="flight-airport">
                            <strong>{{ fightData.dep_time }}</strong>
                            <span>{{ fightData.org_airport_name }} {{ fightData.org_airport_quay }}</span>
                        </el-col>
                        <!-- 总时长 -->
                        <el-col :span="8" class="flight-time">
                            <span>{{ duration }}</span>
                        </el-col>
                        <!-- 到达的机场 -->
                        <el-col :span="8" class="flight-airport">
                            <strong>{{ fightData.arr_time }}</strong>
                            <span>{{ fightData.dst_airport_name }} {{ fightData.dst_airport_quay }}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{ fightData.base_price / 2 }}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend" v-if="isShow">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row type="flex" 
                    justify="space-between" 
                    align="middle" 
                    class="flight-sell"
                    v-for="(item,index) in fightData.seat_infos"
                    :key="index">
                    {{ fightData.id }}
                    
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{ item.name }}</span> | {{ item.supplierName }}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{ item.settle_price }}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini"
                            @click="submitOrder(item)">
                            选定
                            </el-button>
                            <p>剩余：{{ item.discount }}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isShow:false,
        }
    },
    methods:{
        submitOrder(item){
            this.$router.push({
                path: '/air/order',
                query: {
                    id: this.fightData.id,
                    seat_xid: item.seat_xid
                }
            });
        }
    },
    props:{
        fightData:{
            type: Object,
            default: {}
        }
    },
    computed:{
        duration(){
            let [depHours,depMins] = this.fightData.dep_time.split(':');
            let [arrHours,arrMins] = this.fightData.arr_time.split(':');
            arrHours = arrHours < depHours ? arrHours + 24 : arrHours;
            let times = (arrHours * 60 + +arrMins) - (depHours * 60 + +depMins)
            return `${Math.floor(times / 60)}小时${Math.floor(times % 60)}分`;
        }
    }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>