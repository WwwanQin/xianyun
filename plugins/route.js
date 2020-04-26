import Vue from 'vue'
export default ({app}) => {
    app.router.beforeEach((to,from,next) => {
        if(to.name == 'air-pay'){
            console.log(to.path);
            next();
            return;
        }else{
            next();
        }
    })
}