import { http } from '../http'
export const adminStatsApi=()=>http.get('/api/admin/stats')
export const adminUsersApi=(params)=>http.get('/api/admin/users',params)
export const adminClassesApi=()=>http.get('/api/admin/classes')
export const adminSettingsApi=(data)=>http.post('/api/admin/settings',data)
