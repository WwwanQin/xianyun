import {Message} from 'element-ui'
export default (obj) => {
    obj.$axios.onError(error => {
        let {data} = error.response;
        Message({
            type: 'error',
            message: data.message
        })
    })
}
