import Vue from 'vue';
import Vuex from 'vuex';
import talkingData from '../plugins/talking.data'
Vue.use(Vuex);
const store = new Vuex.Store({
	//state for all components, should import {mapState} from vuex to use it, and set ...mapState method in computed method.
  state: {
    appId: 'wx197c21f563166768'
  	// pageTitle: 'Page Title'
  },
  //getters for all components, should import {mapGetters} from vuex to use it, and set ...mapGetters method in computed method.
  getters: {
  	// pageTitle: state => state.pageTitle,
  },
  //mutations for all components, should import {mapMutations} from vuex to use it, and set ...mapMutations method in methods inside components,
  // how to use mutations method? 
  // ...mapMutations(['method1','method2','method3'])
  // to use: this.$store.commit('method name') or this.methodName();
  mutations: {
    buryPoint(state,{
      eventId,
      label
    }){
      TDAPP.onEvent(eventId,label);
    },
    setAppId(state,{
      appId
    }){
      state.appId = appId;
    }
  }
});
export default store;
