import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  	state: {
	   selectCity: '北京',  // 用户选择城市
	   headerTitle: '',
	   backPage:false
	},
	getters:{
		
	},
	mutations: {
		selectCity(state,obj){
			state.selectCity = obj
		},
		changeTitle(state,title){
			state.headerTitle = title
		},
		IsBackPage(state,status){
			state.backPage = status
		}
	},
	actions: {
		
	}
});
