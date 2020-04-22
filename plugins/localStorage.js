import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'xianyun_local_data',
        storage: window.sessionStorage
    })(store)
  })
}