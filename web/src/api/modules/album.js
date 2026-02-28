import { http } from '../http'
export const albumListApi=()=>http.get('/api/album/list')
export const albumDetailApi=(params)=>http.get('/api/album/detail',params)
export const uploadPhotoApi=(data)=>http.post('/api/album/upload',data)
export const manageAlbumApi=(data)=>http.post('/api/album/manage',data)
