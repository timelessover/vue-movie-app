
import axios from "axios";
const BASE_URL = 'https://m.maoyan.com'

const handleStatus = (ctx)=>{
    const status = ctx.status
    if(status == '404'){
        ctx.body = {
            status: 404,
            msg: '网络异常'
        }
    }
    if(status == '500'){
        ctx.body = {
            status: 500,
            msg: '服务器故障'
        }
    }
} 

export default {
    post(url,ctx,data) {
        handleStatus(ctx)
        return axios({
            method: 'post',
            baseURL: BASE_URL,
            url,
            data: JSON.stringify(data),
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': "application/json",
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    get(url,ctx,params) {
        handleStatus(ctx)
        return axios({
            method: 'get',
            baseURL: BASE_URL,
            url,
            params, 
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
}