
import axios from "axios";
const BASE_URL = 'https://m.maoyan.com'



export default {
    post(url, data) {
        return axios({
            method: 'post',
            baseURL: BASE_URL,
            url,
            data: JSON.stringify(data),
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': "application/json",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
            }
        }).catch((err) => {
            console.error(err)
        })
    },
    get(url, params) {
        return axios({
            method: 'get',
            baseURL: BASE_URL,
            url,
            params,
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'http://m.maoyan.com/shows/264?movieId=1230121&date=2019-10-16&$from=canary',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
            }
        }).catch((err) => {
            console.error(err)
        })
    }
}