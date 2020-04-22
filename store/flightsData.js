export const state = () =>{
    return {
        flightsData:{
            flights:[],
            info:{},
            options:{},
            total:0
        }
    }
}

export const mutations = {
    savefightsData(state,data){
        console.log(data);
        state.flightsData = data;
        return 'AAA';
    }
}