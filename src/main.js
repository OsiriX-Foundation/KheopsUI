// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// require('../node_modules/vue-snotify/styles/material.css')

import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import '@/css/bootstrap_dark.css'
import '@/css/main.css'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/material.css'
import Access from '@/directives/access'
import 'vue-awesome/icons'
import lodash from 'lodash'
import Icon from 'vue-awesome/components/Icon'
import VeeValidate from 'vee-validate'
import store from './store'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import {HTTP} from '@/router/http';
import '@/filters/filters.js';
import VueI18n from 'vue-i18n'
import messages from '@/lang/messages'


Vue.config.productionTip = false

Vue.use(Snotify, options)
Vue.use(BootstrapVue)
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})
Vue.use(VueI18n)

// Vue.use(Vuex)
Vue.component('v-icon', Icon)
Vue.directive('access',Access);

// globally (in your main .js file)
const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

const keycloakconfig = {
  authRealm: 'StaticLoginConnect',
  authUrl: 'https://keycloak.kheops.online/auth',
  authClientId: 'loginConnect'
  // logoutRedirectUri: 'http://logout'
}

function tokenInterceptor () {
	let user = {
		login: `${Vue.prototype.$keycloak.userName}`,
		jwt: `${Vue.prototype.$keycloak.token}`,
		fullname: `${Vue.prototype.$keycloak.fullName}`,
		lastname: `${Vue.prototype.$keycloak.lastName}`,
		firstname: `${Vue.prototype.$keycloak.firstName}`,
		email: `${Vue.prototype.$keycloak.email}`,
		permissions: ['active']
	}
	store.dispatch('login',user).then(user => {})
}


// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en',
  messages
})



/* eslint-disable no-new */
Vue.use(VueKeyCloak, {
	config: keycloakconfig,
    onReady: (keycloak) => {
	   tokenInterceptor()
    /* eslint-disable no-new */
	new Vue({
	    el: '#app',
	    router,
	    store,
  	    i18n,
	    components: { App },
	    template: '<App/>'
	  })
  }
})


// if we don't need authentication...

	  // new Vue({
	  //   el: '#app',
	  //   router,
	  //   store,
	  //   components: { App },
	  //   template: '<App/>'
	  // })
