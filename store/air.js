export const state = () => {
    return {
        airHistory: [
            
        ]
    }
}

export const mutations = {
    pushHistory(state,data){
        state.airHistory.unshift(data);
        if(state.airHistory.length > 5){
            state.airHistory.length = 5
        }
    }
}