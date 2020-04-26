<template>
  <div class="map">
      <script 
        type="text/javascript" 
        src="https://webapi.amap.com/maps?v=1.4.15&key=f8245ea0cc0ef1352e3f1acd8048036a">
      </script> 
      <div id="container"></div> 
  </div>
</template>

<script>
export default {
    data(){
        return {
            // 高德地图
            map: '',
            // 标记列表
            markerList: [],
            // 搜索的城市
            cityData: '',
            hotels: [],
            latitude: '39.908775',
            longitude: '116.406315'
        }
    },
    methods:{
        async initData(){
            let cityData = await this.$axios(
                { url: `http://157.122.54.189:9095/cities`, params: { name: `${this.$route.query.cityName}` } }
            );
            this.cityData = cityData;
            let { id } = cityData.data.data[0] || 0;
            let hotels = await this.$axios(
                { url: `http://157.122.54.189:9095/hotels`, params: {city: `${id}`} }
            )
            this.hotels = hotels;
            return Promise.resolve({
                cityData,hotels
            });
        }
    },
    async mounted(){
        this.initData().then(res => {
            let { cityData,hotels } = res;
            if(hotels && hotels.data.data.length > 0){
                let { latitude,longitude } = hotels.data.data[0].location;
                this.latitude = latitude;
                this.longitude = longitude;
            }
            // 构建地图根元素
            let map = new AMap.Map('container', {
                zoom: 20,//级别,
                resizeEnable: true,
                center: [this.longitude, this.latitude]
            });
            // 创建消息窗体
            var infoWindow = new AMap.InfoWindow({ //创建信息窗体
                isCustom: true,  //使用自定义窗体
                content:'<div>信息窗体</div>', //信息窗体的内容可以是任意html片段
                offset: new AMap.Pixel(16, -45)
            });
            var icon = new AMap.Icon({
                size: new AMap.Size(30, 30),    // 图标尺寸
                image: 'http://www.yusen.space:8889/toDoList/img/hotel_1.png',  // Icon的图像
                imageSize: new AMap.Size(30, 30)   // 根据所设置的大小拉伸或压缩图片
            });
            this.map = map;
            if(hotels && hotels.data.data.length > 0){
                hotels.data.data.forEach(ele => {
                    console.log(ele.name);
                    let marker = new AMap.Marker({
                            size: new AMap.Size(30, 30),
                            position: new AMap.LngLat(ele.location.longitude,ele.location.latitude),
                            offset: new AMap.Pixel(-10, -10),
                            icon: icon, // 添加 Icon 实例
                            title: '北京',
                            zoom: 13,
                            title: ele.name
                    })
                    this.markerList.push(
                        marker
                    )
                })
            }
            map.add(this.markerList);
        });
    }
}
</script>

<style scoped lang="less">
    #container {
        width:600px; height: 500px; 
    } 
</style>