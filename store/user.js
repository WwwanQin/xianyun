export const state = () => ({
    userInfo:{
        user: {},
        token: ''
    }
})
export const mutations = {
    saveUserInfo(state,data){
        state.userInfo = data;
    },
    logOut(state,data){
        state.userInfo = data;
    }
}

export const actions = {
    // 用户登录接口
    userLogin({commit},{username,password}){
        return new Promise((resolve,reject) => {
            this.$axios({
                url: '/accounts/login',
                method: 'post',
                data:{
                    username,
                    password
                }
            }).then(res => {
                commit('saveUserInfo',res.data);
                resolve(res.data);
            }).catch(reason => {
                reject(reason);
            })
        })
    },
    // 用户注册接口
    userRegister({commit},data){
        return new Promise((resolve,reject)=>{
            this.$axios({
                url: '/accounts/register',
                method: 'post',
                data: data
            }).then(res => {
                resolve(res);
            }).catch(reason => {
                reject(reason);
            })
        })
    },
    // 获取手机验证码接口
    getPhoneCode({commit},data){
        return new Promise((resolve,reject) => {
            this.$axios({
                url: '/captchas',
                method: 'post',
                data: data
            }).then(res => {
                resolve(res);
            }).catch(reason => {
                reject(reason);
            })
        })
    }
}