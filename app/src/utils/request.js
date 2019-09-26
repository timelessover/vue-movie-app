import axios from 'axios'
const BASE_URL = 'http://localhost:3005'
import { Toast } from 'mint-ui';

const profix = (method,data,headers,url)=>{
	return axios({
		method: method,
		baseURL: BASE_URL,
		url,
		data:data,
		timeout: 10000,
		headers: headers
	}).then((res)=>{
		if(res.status !== 200){
			Toast({
				message: '网络出了些故障',
				position: 'middle',
				duration: 3000
			  });
		}
		return res.data
	}).catch((err) => {
		console.log(err)
	})
}

export default {
    post(url,data) {
		let headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': "application/json",
			'authtoken':''
		}
		return profix('post',data,headers,url)
    },
    get(url,data) {
		let headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': "application/json",
		}
		return profix('get',data,headers,url)
    }
}
