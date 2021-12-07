const userInfo = {
    namespace: true,
    state: {
        data: {},
        isLogined: false
    },
    getters: {
        packUserInfo: state => {
            return state.data
        }
    },
    mutations: {
        setUserInfo(state, userInfo){
            state.data = userInfo
            state.isLogined = true
        },
        clearUserInfo(state, info){
            state.data = info
            state.isLogined = false
        },
        modifyUserInfo(state, newInfo){
            state.data = Object.assign(state.data, newInfo)
        }
    },
    actions: {
        saveInfo({commit}, res){
            commit('setUserInfo', res)
        },
        logout({commit}){
            commit('clearUserInfo', {})
            location.href = './login'
        }
    }
}
export default userInfo