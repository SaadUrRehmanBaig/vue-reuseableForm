import { createStore } from 'vuex'
import { config } from "vuex-module-decorators";

import AuthModule from './modules/AuthModule';
import createPersistedState from 'vuex-persistedstate';

config.rawError = true;

export default createStore({
  modules: {
    AuthModule
  },
  plugins:[createPersistedState({
    key: 'Randomkey',
    storage: window.localStorage // or window.sessionStorage
  })]
})
