import { http } from '../http'
export const postListApi=(params)=>http.get('/api/posts/list',params)
export const createPostApi=(data)=>http.post('/api/posts/create',data)
export const likePostApi=(data)=>http.post('/api/posts/like',data)
export const commentPostApi=(data)=>http.post('/api/posts/comment',data)
export const reviewPostApi=(data)=>http.post('/api/posts/review',data)
