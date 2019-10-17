import axios from 'axios'
const BASE_URL = 'http://localhost:3005'
import { Toast } from 'vant';

const profix = (method, data, headers, url) => {
	Toast.loading({
		mask: false,
		message: "加载中...",
		duration:0
	});
	return axios({
		method: method,
		baseURL: BASE_URL,
		url,
		data,
		timeout: 10000,
		headers: headers,
		params: data
	}).then((res) => {
		Toast.clear()
		if (res.status !== (200 || 304)) {
			Toast.fail('网络出了些故障');
		}
		return res.data
	}).catch((err) => {
		Toast.fail('网络出了些故障');
	})
}

export default {
	post(url, data) {
		let headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': "application/json",
			'authtoken': ''
		}
		return profix('post', data, headers, url)
	},
	get(url, params) {
		let headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': "application/json",
		}
		return profix('get', params, headers, url)
	}
}
