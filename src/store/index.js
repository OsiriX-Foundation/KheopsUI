import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import studies from './modules/studies'
import albums from './modules/albums'
import album from './modules/album'
import sending from './modules/sending'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		users,
		studies,
		albums,
		album,
		sending
	}
})
