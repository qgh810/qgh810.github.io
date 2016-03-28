import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import system from './modules/system'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    system
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
