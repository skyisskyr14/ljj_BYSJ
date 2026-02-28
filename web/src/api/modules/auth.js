import { http } from '../http'

export const captchaApi = (type = 'image') => http.get('/auth/captcha', { type })
export const loginApi = (data) => http.post('/auth/user/login', data)
export const registerApi = (data) => http.post('/auth/user/register', data)
export const adminLoginApi = (data) => http.post('/auth/admin/login', data)
export const profileApi = () => http.get('/auth/user/auth-token')
