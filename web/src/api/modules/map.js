import { http } from '../http'
export const mapPointsApi=()=>http.get('/api/map/points')
export const updateMyPositionApi=(data)=>http.post('/api/map/update',data)
