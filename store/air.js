export const state = () => {
    return {
        airHistory: [
            
        ],
        fightData: {
            seat_infos: {

            }
        },
        allPirce: '1000',
        passengerNumber: 1,
    }
}

export const mutations = {
    // 添加历史纪录
    pushHistory(state,data){
        state.airHistory.unshift(data);
        if(state.airHistory.length > 5){
            state.airHistory.length = 5
        }
    },
    // 添加机票详情
    setFightData(state,data){
        console.log(data);
        state.fightData = data;
    },
    // 设置总价格
    setAllPrice(state,data){
        state.allPirce = data;
    },
    // 设置游客数量
    setPassengerNumber(state,data){
        state.passengerNumber = data;
    }
}