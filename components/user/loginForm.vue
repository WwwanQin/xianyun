<template>
    <div class="loginForm"> 
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item class="form-item" prop="username">
                <!-- 用户名输入框 -->
                <el-input 
                placeholder="用户名/手机" 
                v-model="ruleForm.username">
                </el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="username">
                <!-- 用户名输入框 -->
                <el-input 
                type="password"
                placeholder="密码" 
                v-model="ruleForm.password">
                </el-input>
            </el-form-item>
            <p class="wangjimima">
                <small>忘记密码</small>
            </p>
            <el-row>
                <el-button type="primary" class="submit" @click="submitForm('ruleForm')">登录</el-button>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ruleForm: {
                username: '',
                password: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名或手机号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    { min: 3, max: 11, message: '密码最小长度为三个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate(valid => {
                valid ? this.saveUserMessage() : this.$message({type: 'error',message: '请检查您的登录信息'})
            })
        },
        saveUserMessage(){
            this.$store.dispatch('user/userLogin',this.ruleForm).then(res => {
                console.log(res);
                this.$message({ type: 'success',message: `登录成功，欢迎：${res.user.nickname}` })
                setTimeout(()=>{ this.$router.replace('/'); },1000)
            }).catch(reason => {
                console.log(reason);
                this.$message({ type: 'error',message: '登录失败' })
            })
        }
    }
}
</script>

<style scoped lang="less">
    .loginForm{
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
            .submit{
                width: 95%;
                text-align: center;
            }
        }
    }
</style>