
import axios from "axios";
const BASE_URL = 'https://m.maoyan.com'



export default {
    post(url,data) {
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
    get(url,params) {
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