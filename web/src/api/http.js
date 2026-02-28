const BASE_URL = process.env.VUE_APP_API_BASE || 'http://localhost:10438/api'

function buildQuery(params = {}) {
  const query = new URLSearchParams()
  Object.keys(params).forEach((k) => {
    if (params[k] !== undefined && params[k] !== null && params[k] !== '') {
      query.append(k, params[k])
    }
  })
  const q = query.toString()
  return q ? `?${q}` : ''
}

export const http = {
  async request({ url, method = 'get', data, params }) {
    const token = localStorage.getItem('token') || ''
    const response = await fetch(`${BASE_URL}${url}${buildQuery(params)}`, {
      method: method.toUpperCase(),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: data ? JSON.stringify(data) : undefined
    })
    return response.json()
  },
  get(url, params) { return this.request({ url, method: 'get', params }) },
  post(url, data) { return this.request({ url, method: 'post', data }) },
  put(url, data) { return this.request({ url, method: 'put', data }) },
  delete(url, data) { return this.request({ url, method: 'delete', data }) }
}
