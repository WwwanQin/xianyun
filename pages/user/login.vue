<template>
  <div class="login">
    <div class="form-wrapper">
      <div class="tabs">
        <span :class="{active: current == 'login'}" @click="changeCurrent('login')">登录</span>
        <span :class="{active: current == 'submit'}" @click="changeCurrent('submit')">注册</span>
      </div>
      <loginForm v-if="current == 'login'"/>
    </div>
  </div>
</template>

<script>
import loginForm from '@/components/user/loginForm.vue'
export default {
  data(){
    return {
      current: 'login'
    }
  },
  methods:{
    changeCurrent(type){
      this.current = type;
    }
  },
  components:{
    loginForm
  }
}
</script>

<style scoped lang="less">
  .login{
    width: 100%;
    min-width: 1000px;
    height: 500px;
    background: url('../../static/th.jpg') center center no-repeat;
    background-size: 100%;
    .form-wrapper{
      width: 400px;
      position: relative;
      left: 50%;
      top: 25%;
      margin-left: -200px;
      .tabs{
        width: 100%;
        display: flex;
        justify-content: center;
        cursor: pointer;
        span{
          text-align: center;
          flex:  0 0 50%;
          display: inline-block;
          height: 50px;
          line-height: 45px;
          background-color: rgb(238, 238, 238);
          color: black;        
        }
        .active{
          text-align: center;
          flex:  0 0 50%;
          display: inline-block;
          height: 50px;
          line-height: 45px;
          background-color: white;
          color: orange; 
          font-weight: 700;
          border-top: 2px solid orange;
          box-sizing: border-box;
        }
      }
    }
  }
</style>