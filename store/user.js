export const state = () => ({
    userInfo:{
        user: {},
        token: ''
    }
})
export const mutations = {
    saveUserInfo(state,data){
        state.userInfo = data;
    }
}

export const actions = {
    userLogin(result,{username,password}){
        let {commit} = result;
        this.$axios({
            url: '/accounts/login',
            method: 'post',
            data:{
                username,
                password
            }
        }).then(res => {
            console.log(res.data);
            commit('saveUserInfo',res.data);
            return Promise.resolve(res);
        }).catch(reason => {
            return reason;
        })
    }
}