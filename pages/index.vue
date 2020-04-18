<template>
  <div class="index">
    <!-- 设置轮播图控件 -->
    <el-carousel :interval="5000" arrow="always" height="700px" style="min-width:1000px">
        <el-carousel-item v-for="(item,index) in carousels" :key="index">
            <div class="carousel-item" 
            :style="
                `background-image: url(${$axios.defaults.baseURL + item.url});
                height:700px;
                background-position:center;
                background-repeat:no-repeat`
            "></div>
        </el-carousel-item>
    </el-carousel>
    <!-- 设置搜索框的位置 -->
    <div class="search-box">
        <div class="tabs">
            <span v-for="(item,index) in tabs" :key="index" :class="{active: index == current}" @click="fn(index)">
              {{ item.title }}
            </span>
        </div>
        <div class="search-content">
            <input :placeholder="'搜索'+ tabs[current].title"><i class="el-icon-search"></i>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
          current: 0,
          carousels: [],
          tabs:[
            {
              title: '攻略'
            },
            {
              title: '酒店'
            },
            {
              title: '机票'
            }
          ]
        }
    },
    methods:{
      fn(index){
        this.current = index;
      }
    },
    mounted(){
        this.$axios({
            url: '/scenics/banners',
            method: 'get',
        }).then(res => {
            let {data:{data}} = res;
            console.log(data);
            this.carousels = data;
        })
    }
}
</script>

<style lang="less" scoped>
.index{
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .search-box{
      z-index: 2;
      width: 550px;
      height: 100px;
      position: absolute;
      left: 50%;
      top: 10%;
      top: 50%;
      margin-left: -250px;
      .tabs{
          span{
            display: inline-block;
            position: relative;
            width: 75px;
            height: 40px;
            background: rgb(238, 238, 238);
            line-height: 40px;
            text-align: center;
            border-radius:0px 10px 0px 0px;
            cursor:pointer; 
            margin-left: 3px;
            color: #5e5a5a;
          }
          .active{
                display: inline-block;
                width: 75px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                opacity: .5;
                background: black;
                color: white;
           }
      }
      .search-content{
        width: 100%;
        height: 50px;
        background: white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius:0 5px 5px 5px; 
        input{
            height: 70%;
            width: 300px;
            border: none;
            outline: none;
            font-size: 20px;
        }
        .el-icon-search{
            font-size: 25px;
        }
      }
  }
}
</style>