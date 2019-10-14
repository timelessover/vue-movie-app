
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
            console.error(err)
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
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
            }
        }).catch((err)=>{
            console.error(err)
        })
    }
}