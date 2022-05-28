import Vuex from 'vuex'
import { useAccessor, mutationTree, actionTree } from 'typed-vuex'
import Auth from './module/auth'
import Payment from './module/payment'

export const state = () => ({
  user: {},
  loading: false,
  title: {
    label: '',
    isVisible: false
  }
})

type RootState = ReturnType<typeof state>

export const getters = {
  loading: (state: RootState) => state.loading,
  user: (state: RootState) => state.user,
  title: (state: RootState) => state.title
}

export const mutations = mutationTree(state, {
  setLoading(state, status: boolean) {
    state.loading = status
  },
  setUser(state, reqObj) {
    state.user = reqObj.user
  },
  setTitle(state, reqObj) {
    state.title = reqObj
  }
  // remove
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async setLoading({ commit }, status: boolean) {
      commit('setLoading', status)
    },
    async setUser({ commit }, reqObj) {
      commit('setUser', reqObj)
    },

    async setTitle({ commit }, reqObj) {
      commit('setTitle', reqObj)
    },

    ...Auth.actions,
    ...Payment.actions
  }
)

export const storePattern = {
  state,
  mutations,
  actions,
  namespaced: true,
  devtools: true
}

const store = new Vuex.Store(storePattern)
export const accessor = useAccessor(store, storePattern)

export default store
