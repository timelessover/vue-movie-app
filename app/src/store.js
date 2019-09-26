import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
		selectCity: null,  // 用户选择城市
	},
	getters:{
		
	},
	mutations: {
		selectCity(state,obj){
			state.selectCity = obj
		},
	},
	actions: {
		
	}
});
