<template>
    <div class="search">
        <div class="searchTabs">
            <div 
            v-for="(item,index) in tabs" 
            :key="index" 
            :class="{active : current == index}" 
            @click="checkTab(index)">
                <span :class="item.icon" class="icon"></span> {{ item.name }}
            </div>
        </div>
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="出发城市" prop="departCity">
                <el-autocomplete
                v-model="form.departCity"
                :fetch-suggestions="queryDepartCity"
                placeholder="请搜索出发城市"
                @select="departCitySelect"
                @blur="departCityBlur"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市" prop="arriveCity">
                <el-autocomplete
                v-model="form.arriveCity"
                :fetch-suggestions="queryArriveCity"
                placeholder="请搜索到达城市"
                @select="arriveCitySelect"
                @blur="arriveCityBlur"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间" prop="departDate">
                <el-date-picker
                v-model="form.departDate"
                value-format="yyyy-MM-dd"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="submitBtn">
                <el-button type="primary" icon="el-icon-search" @click="submitCitys('form')">搜索</el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            current: 0,
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            // 查询到的所有起飞城市
            departCityArray: [],
            // 查询到的所有目的地城市
            arriveCityArray: [],
            form: {
                // 起飞城市
                departCity: '',
                // 起飞城市编号
                departCityCode: '',
                // 目的地城市
                arriveCity: '',
                // 目的地城市编号
                arriveCityCode: '',
                // 起飞日期
                departDate: ''
            },
            rules: {
                departCity:[
                    {required: true, message: '请输入出发城市', trigger: ''}
                ],
                arriveCity:[
                    {required: true, message: '请输入到达城市', trigger: ''}
                ],
                departDate:[
                    {required: true, message: '请选择出发时间', trigger: ''}
                ]
            },
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() < Date.now() - 24 * 3600 * 1000;
                },
            }
        }
    },
    methods:{
        checkTab(index){
            this.current = index;
        },
        queryDepartCity(queryString, cb){
            if(!queryString){
                return;
            }
            this.queryAirsCity(queryString).then(res => {
                let {data} = res.data;
                let citys = data.map(ele => {
                    ele.value = ele.name.replace('市','');
                    return ele;
                })
                this.departCityArray = citys;
                cb(citys);
            })
        },
        queryArriveCity(queryString,cb){
            if(!queryString){
                return;
            }
            this.queryAirsCity(queryString).then(res => {
                let {data} = res.data;
                let citys = data.map(ele => {
                    ele.value = ele.name.replace('市','');
                    return ele;
                })
                this.arriveCityArray = citys;
                cb(citys);
            })
        },
        departCitySelect(item){
            this.form.departCityCode = item.sort
        },
        arriveCitySelect(item){
            this.form.arriveCityCode = item.sort;
        },
        departCityBlur(){
            if(this.departCityArray.length > 0){
                console.log(1);
                this.form.departCity = this.departCityArray[0].value;
                this.form.departCityCode = this.departCityArray[0].sort;
            }
        },
        arriveCityBlur(){
            if(this.arriveCityArray.length > 0){
                this.form.arriveCity = this.arriveCityArray[0].value
                this.form.arriveCityCode = this.arriveCityArray[0].sort;
            }
        },
        // 封装查询飞机机票
        queryAirsCity(queryString,fn){
            return new Promise((resolve,reject) => {
                if(!queryString){
                    return;
                }
                this.$axios({
                    url: "/airs/city",
                    params: {
                        name: queryString
                    }
                }).then(res => {
                    resolve(res);
                    return res;
                }).catch(reason => {
                    reject(reason);
                })
            })
        },
        handleReverse(){
            let { departCity,departCityCode,arriveCity,arriveCityCode } = this.form;
            this.form.arriveCity = departCity;
            this.form.arriveCityCode = departCityCode;
            this.form.departCity = arriveCity;
            this.form.departCityCode = arriveCityCode
        },
        submitCitys(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    console.log(this.form);
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
    .search{
        border: 1px solid rgb(201, 181, 181);
        width: 360px;
        .searchTabs{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            div{
                text-align: center;
                flex:  0 0 50%;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                .icon{
                    font-size: 17px;
                    margin-right: 5px;
                    display: inline-block;
                    height: 15px;
                }
            }
            .active{
                border-top: 2px solid orange;
                background-color: rgb(238, 238, 238);
            }
        }
        .el-form{
            padding: 5px;
            position: relative;
            .el-form-item{
                width: 85%;
            }
            .submitBtn{
                button{
                    width: 100%;
                }
            }
            .el-autocomplete{
                width: 100%;
            }
            .reverse{
                position: absolute;
                right: 38px;
                top: 45px;
                span{
                    position: relative;
                    left: 15px;
                    top: 2px;
                    background-color: #cccccc;
                    color: white;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    font-size: 15px;
                    text-align: center;
                    cursor: pointer;
                    &::before{
                        content: '';
                        position: absolute;
                        width: 2px;
                        height: 20px;
                        background-color: #ccc;
                        top: -20px;
                        left: 7px;
                    }
                    &::after{
                        content: '';
                        position: absolute;
                        width: 2px;
                        height: 22px;
                        background-color: #ccc;
                        top: 20px;
                        left: 7px;
                    }
                }
            }
            .reverse::before,
            .reverse::after{
                content: '';
                position: absolute;
                display: block;
                width: 25px;
                height: 2px;
                background-color: #ccc;
                top: -19px;
                left: -1px;
            }
            .reverse::after{
                top: 45px;
                left: -1px;
            }
        }
    }
</style>