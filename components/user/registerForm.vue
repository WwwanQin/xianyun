<template>
    <div class="registerForm">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item class="form-item" prop="username">
                <!-- 用户名输入框 -->
                <el-input 
                placeholder="用户名/手机" 
                v-model="ruleForm.username">
                </el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="captcha">
                <!-- 验证码 -->
                <el-input v-model="ruleForm.captcha" placeholder="验证码">
                    <template slot="append">
                        <el-button @click="handleSendCaptcha('ruleForm')" :disabled="dis">{{ sendCaptcha }}</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="nickname">
                <!-- 用户名输入框 -->
                <el-input 
                placeholder="昵称" 
                v-model="ruleForm.nickname">
                </el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="password">
                <!-- 用户名输入框 -->
                <el-input 
                placeholder="密码" 
                type="password"
                v-model="ruleForm.password">
                </el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="checkPassword">
                <!-- 用户名输入框 -->
                <el-input 
                placeholder="确认密码" 
                type="password"
                v-model="ruleForm.checkPassword">
                </el-input>
            </el-form-item>
            <el-row>
                <el-button type="primary" class="submit" @click="submitForm('ruleForm')">注册</el-button>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    methods: {
        // 倒计时加获取验证码
        handleSendCaptcha(rule){
            if(this.time == 60){
                console.log(this.ruleForm);
                if(this.ruleForm.username === ''){
                    this.$refs[rule].validateField('username');
                    this.dis = false;
                    this.sendCaptcha = '发送验证码'
                    this.time = 60;
                    return;
                }else{
                    this.$store.dispatch('user/getPhoneCode',{tel : this.ruleForm.username}).then(res => {
                        let {data:{code}} = res;
                        this.$message({
                            type: 'success',
                            message: `验证码为${code}`
                        })
                    }).catch(reason => {
                        console.log(reason);
                    });
                }
            }
            if(this.time === 0){
                this.dis = false;
                this.sendCaptcha = '发送验证码'
                this.time = 60;
                return;
            }else{
                this.dis = true;
                this.sendCaptcha = this.time + 's';
                this.time -- ;
            }
            setTimeout(() => {
                this.handleSendCaptcha();
            },1000)
        },
        // 提交
        submitForm(formName){
            this.$refs[formName].validate(() => {
                let {checkPassword,...other} = this.ruleForm;
                this.$store.dispatch('user/userRegister',other ).then(res => {
                    let {data} = res;
                    setTimeout(() => {
                        this.$store.dispatch('user/userLogin',{username:data.user.username,password:other.password}).then(res => {
                            this.$message({ type: 'success',message: `登录成功，欢迎：${res.user.nickname}` })
                            setTimeout(()=>{ this.$router.replace('/'); },1000)
                        })
                    },1000)
                }).catch(reason =>{
                    this.$message({
                        type: 'error',
                        message: '注册失败，请重试'
                    })
                })
            })
        }
    },
    data(){
        // 自定义检测
        const validateCheckPass = (rule,value,callback) =>{
            if(value === ''){
                callback(new Error('请输入内容'));
            }else if(this.ruleForm.password !== value){
                callback(new Error('两次输入内容不一致'));
            }else{
                callback();
            }
        };
        return{
            sendCaptcha: '发送验证码',
            dis: false,
            timer: '',
            time: 60,
            ruleForm: {
                username: '',
                captcha: '',
                nickname: '',
                password: '',
                checkPassword: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名或手机号', trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入手机验证码', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                checkPassword: [
                    { validator: validateCheckPass, trigger: 'blur' }
                ]
            }
        }
    }
}
</script>

<style scoped lang="less">
.registerForm{
    width: 400px;
    background-color: white;
    .form-item{
        margin-bottom: 7px;
        padding-top: 15px;
        /deep/ .el-form-item__content{
            margin: 0px 15px 7px 15px;
        }
    }
    .wangjimima{
        text-align: right;
        height: 30px;
        margin-right: 15px;
        color: #409eff;
    }
    .el-row{
        display: flex;
        justify-content: center;
        padding-bottom: 20px;
        padding-top: 10px;
        .submit{
            width: 95%;
            text-align: center;
        }
    }
}
</style>