import { http } from '../http'
export const joinClassApi=(data)=>http.post('/api/class/join',data)
export const classListApi=()=>http.get('/api/class/list')
export const createClassApi=(data)=>http.post('/api/class/create',data)
export const updateClassApi=(data)=>http.put('/api/class/update',data)
export const removeClassApi=(data)=>http.delete('/api/class/remove',data)
