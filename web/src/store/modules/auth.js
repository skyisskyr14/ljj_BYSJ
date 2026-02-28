import { loginApi, registerApi, adminLoginApi } from '../../api/modules/auth'

const state = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user') || 'null')
}

const mutations = {
  setAuth(s, p) {
    s.token = p.token
    s.user = p.user
    localStorage.setItem('token', p.token)
    localStorage.setItem('user', JSON.stringify(p.user))
  },
  logout(s) {
    s.token = ''
    s.user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

const actions = {
  async login({ commit }, form) {
    const api = form.roleType === 'admin' ? adminLoginApi : loginApi
    const payload = { ...form }
    delete payload.roleType
    const r = await api(payload)
    if (r.code === 200) {
      if (form.roleType === 'admin') {
        const adminUser = { username: form.username, role: 'admin', nickname: '管理员' }
        commit('setAuth', { token: `admin-${Date.now()}`, user: adminUser })
      } else {
        commit('setAuth', r.data)
      }
    }
    return r
  },
  async register({ commit }, form) {
    const r = await registerApi(form)
    if (r.code === 200) commit('setAuth', r.data)
    return r
  }
}

export default { namespaced: true, state, mutations, actions }
