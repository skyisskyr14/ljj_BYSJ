import { mockRequest } from '../mock/services'

export const http = {
  request({ url, method = 'get', data = {}, params = {} }) {
    return mockRequest({ url, method, data, params })
  },
  get(url, params) { return this.request({ url, method: 'get', params }) },
  post(url, data) { return this.request({ url, method: 'post', data }) },
  put(url, data) { return this.request({ url, method: 'put', data }) },
  delete(url, data) { return this.request({ url, method: 'delete', data }) }
}
