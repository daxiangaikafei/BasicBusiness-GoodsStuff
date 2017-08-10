import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './vuex';
import axios from 'axios'
import footGuide from './components/footer/footGuide'
import errorMessage from './components/requestError'
// import VueImgInputer from 'vue-img-inputer'
Vue.prototype.$ajax = axios
Vue.use(VueRouter)
Vue.component('footGuide', footGuide)
Vue.component('errorMessage', errorMessage)
// Vue.component('VueImgInputer', VueImgInputer)
const router = new VueRouter({
	// routes
	// mode: 'history',
  	routes: routes
})

new Vue({
	router,
	store
}).$mount('#app')