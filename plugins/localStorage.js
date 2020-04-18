import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'xianyun_user',
        storage: window.sessionStorage
    })(store)
  })
}