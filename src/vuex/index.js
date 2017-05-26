import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
	//state for all components, should import {mapState} from vuex to use it, and set ...mapState method in computed method.
  state: {
  	pageTitle: 'Page Title'
  },
  //getters for all components, should import {mapGetters} from vuex to use it, and set ...mapGetters method in computed method.
  getters: {
  	pageTitle: state => state.pageTitle,
  },
  //mutations for all components, should import {mapMutations} from vuex to use it, and set ...mapMutations method in methods inside components,
  // how to use mutations method? 
  // ...mapMutations(['method1','method2','method3'])
  // to use: this.$store.commit('method name');
  mutations: {
  	changePageTitle(state,name){
  		state.pageTitle = 'change title';
  	}
  },
  // 异步的数据操作
  // actions: {
  //   getSong ({commit}, id) {
  //     commit('openLoading');
  //     api.getMusicUrlResource(id).then(res => {
  //       let url = res.data.data[0].url;
  //       commit('setAudio');
  //       commit('setLocation', url);
  //     })
  //       .catch((error) => {     // 错误处理
  //         console.log(error);
  //         window.alert('获取歌曲信息出错！');
  //       });
  //   }
  // }
});
export default store;
