import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './vuex';
Vue.use(VueRouter)
const router = new VueRouter({
	// routes
	// mode: 'history',
  	routes: routes
})

new Vue({
	router,
	store
}).$mount('#app')