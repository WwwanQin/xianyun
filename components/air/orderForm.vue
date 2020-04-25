<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info" ref="form" :rules="rules" :model="form">
                <!-- 乘机人用户列表，根据form.users要循环 -->
                <div class="member-info-item"
                v-for="(item,index) in form.users"
                :key="index">
                    <el-form-item prop="users">
                        <el-form-item label="乘机人类型">
                            <!-- 重点关注input,忽略select即可 -->
                            <el-input 
                            placeholder="姓名" 
                            class="input-with-select"
                            v-model="item.username">
                                <el-select 
                                slot="prepend" 
                                value="1" 
                                placeholder="请选择">
                                    <el-option label="成人" value="1"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="证件类型">
                            <!-- 重点关注input,忽略select即可 -->
                            <el-input 
                            placeholder="证件号码"  
                            class="input-with-select"
                            v-model="item.id">
                                <el-select 
                                slot="prepend" 
                                value="1"           
                                placeholder="请选择">
                                    <el-option label="身份证" value="1" :checked="true"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                    </el-form-item>
                <!-- 删除用户 -->
                <span 
                class="delete-user" 
                @click="delUser(index)">-</span>
                </div>
            </el-form>

            <el-button 
            class="add-member" 
            type='primary'
            @click="addUser">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <!-- 数据来自于后台，循环渲染保险的列表数据 -->
                <div class="insurance-item"
                v-for="(item,index) in detail.insurances"
                :key="index">
                    <!-- change事件在点击时候触发，重点在事件里面获取到id -->
                    <el-checkbox 
                    :checked="false"
                    :label="`${item.type}￥${item.price}/份 × 1 最高赔付${item.compensation}`"
                    @change="bundleInsurances(item.id)"
                    border>
                    </el-checkbox> 
                </div>
            </div>
        </div>
        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <!-- 联系人的姓名 -->
                        <el-input
                        v-model="form.contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <!-- 手机号码 -->
                        <el-input placeholder="请输入内容"
                        v-model="form.contactPhone">
                            <template slot="append">
                            <el-button @click="sendCaptcha">{{ timeState }}</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <!-- 手机验证码 -->
                        <el-input
                        v-model="form.captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button 
                type="warning" 
                class="submit"
                @click="submitOrder">提交订单</el-button>
            </div>
        </div>
        <div v-show="false">
            {{ allPrice }}
        </div>
    </div>
</template>

<script>
export default {
    data(){
        const validatorUser = (rule,value,callback) => {
            let flag = true;
            for (const ele of value) {
                if(!flag) return;
                if(ele.username.trim() == ''){
                    flag = true;
                    return callback(new Error('乘客姓名不能为空'));
                }
                if(ele.id.trim() == ''){
                    flag = true;
                    return callback(new Error('证件号码不能为空'));
                }
            }
        }
        return {
            time: 60,
            timeState:'发送验证码',
            form: {
                // 乘客列表 
                users: [
                     {username: "", id: ""}
                ],
                // 保险
                insurances: [],
                contactName: '',
                contactPhone: '',
                invoice: false,
                captcha: '',
                seat_xid: '',
                air: ''
            },
            rules:{
                users: [
                    // 自定义验证，validatorUser是个函数，在data里面有定义
                    { validator: validatorUser, trigger: "blur" } 
                ],
            },
            detail: {}
        }
    },
    methods:{
        // 添加乘客
        addUser(){
            this.form.users.push({
                username: '',
                id: ''
            })
        },
        // 删除乘客
        delUser(index){
            this.form.users.splice(index,1);
        },
        // 移除保险
        bundleInsurances(id){
            let index = this.form.insurances.indexOf(id);
            if(index > -1){
                this.form.insurances.splice(index,1)
            }else{
                this.form.insurances.push(id);
            }
        },
        // 提交订单
        submitOrder(){
            console.log(1);
            let token = this.$store.state.user.userInfo.token;
            if(!token){
                this.$message({
                    type: 'error',
                    message: '请登录，登录之后才可以提交订单'
                })
            }else{
                this.$axios({
                    url: '/airorders',
                    method: 'post',
                    headers: {
                        Authorization: `Bearer ` +token
                    },
                    data: this.form
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '订单创建成功'
                    });
                    let {id} = res.data.data;
                    this.$router.push({
                        path: '/air/pay',
                        query: {
                            id
                        }
                    })
                }).catch(reason => {
                    console.log(reason);
                })
            }       
        },
        // 发送验证码
        sendCaptcha(){
            console.log(this.form.contactPhone);
            if(this.form.contactPhone){
                this.$store.dispatch('user/getPhoneCode',{tel:this.form.contactPhone}).then(res => {
                    this.$message({
                        type: 'success',
                        message: `您的验证码是：${res.data.code}`
                    });
                });
                this.countDown();
            }else{
                this.$message({
                    type: 'warning',
                    message: '请填写电话号码'
                })
            }
        },
        // 倒计时
        countDown(){
            if(this.time > 0){
                this.time --;
                this.timeState = this.time + '秒';
                setTimeout(() => {
                    this.countDown();
                },1000)
            }else{
                this.time = 60;
                this.timeState = '发送验证码'
                return;
            }
        }
    },
    mounted(){
        let {id,seat_xid} = this.$route.query;
        this.form.air = id;
        this.form.seat_xid = seat_xid;
        this.$axios({
            url: `/airs/${id}`,
            params: {
                seat_xid: seat_xid
            }
        }).then(res => {
            this.detail = res.data;
            this.$store.commit('air/setFightData',this.detail)
        }).catch(reason => {
            console.log(reason);
        })
    },
    computed:{
        allPrice: function() {
            let price = 0;
            if(!this.detail.seat_infos) return 0;
            price += this.detail.seat_infos.org_settle_price;
            price += this.detail.airport_tax_audlet;
            this.form.insurances.forEach(ele => {
                this.detail.insurances.forEach(item => {
                    if(ele == item.id){
                        price += item.price;
                    }
                })
            })
            price *= this.form.users.length;
            this.$store.commit('air/setAllPrice',price);
            this.$store.commit('air/setPassengerNumber',this.form.users.length);
            return price;
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>