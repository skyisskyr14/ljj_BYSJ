import AppLayout from '../layout/AppLayout.vue'
const r=(role)=>({requiresAuth:true,roles:Array.isArray(role)?role:[role]})
export default [
 {path:'/login',component:()=>import('../views/auth/Login.vue')},
 {path:'/register',component:()=>import('../views/auth/Register.vue')},
 {path:'/',component:AppLayout,meta:{requiresAuth:true},children:[
  {path:'',redirect:'/student/dashboard'},
  {path:'/student/dashboard',component:()=>import('../views/student/Dashboard.vue'),meta:r(['student','monitor'])},
  {path:'/student/join',component:()=>import('../views/student/ClassJoin.vue'),meta:r(['student','monitor'])},
  {path:'/student/class',component:()=>import('../views/student/ClassHome.vue'),meta:r(['student','monitor'])},
  {path:'/student/members',component:()=>import('../views/student/Members.vue'),meta:r(['student','monitor'])},
  {path:'/student/posts',component:()=>import('../views/student/Posts.vue'),meta:r(['student','monitor'])},
  {path:'/student/albums',component:()=>import('../views/student/AlbumList.vue'),meta:r(['student','monitor'])},
  {path:'/student/album/:id',component:()=>import('../views/student/AlbumDetail.vue'),meta:r(['student','monitor'])},
  {path:'/student/map',component:()=>import('../views/student/Map.vue'),meta:r(['student','monitor'])},
  {path:'/student/profile',component:()=>import('../views/student/Profile.vue'),meta:r(['student','monitor'])},
  {path:'/monitor/class-manage',component:()=>import('../views/monitor/ClassManage.vue'),meta:r('monitor')},
  {path:'/monitor/member-role',component:()=>import('../views/monitor/MemberRoleManage.vue'),meta:r('monitor')},
  {path:'/monitor/album-manage',component:()=>import('../views/monitor/AlbumManage.vue'),meta:r('monitor')},
  {path:'/admin/dashboard',component:()=>import('../views/admin/Dashboard.vue'),meta:r('admin')},
  {path:'/admin/users',component:()=>import('../views/admin/Users.vue'),meta:r('admin')},
  {path:'/admin/classes',component:()=>import('../views/admin/Classes.vue'),meta:r('admin')},
  {path:'/admin/review-posts',component:()=>import('../views/admin/ReviewPosts.vue'),meta:r('admin')},
  {path:'/admin/review-images',component:()=>import('../views/admin/ReviewImages.vue'),meta:r('admin')},
  {path:'/admin/settings',component:()=>import('../views/admin/Settings.vue'),meta:r('admin')}
 ]},
 {path:'/403',component:()=>import('../views/error/403.vue')},
 {path:'*',component:()=>import('../views/error/404.vue')}
]
