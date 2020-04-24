import {Message} from 'element-ui'
export default obj => {
    obj.$axios.onError(error => {
        let {data} = error.response;
        Message({
            type: 'error',
            message: data.message
        })
        if(data.statusCode == 403){
            console.log(obj);
        }
    })
}
