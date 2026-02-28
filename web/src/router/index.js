import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
Vue.use(Router)
const router=new Router({mode:'hash',routes})
router.beforeEach((to,from,next)=>{
 const user=JSON.parse(localStorage.getItem('user')||'null')
 const token=localStorage.getItem('token')
 if(to.matched.some(i=>i.meta.requiresAuth)&&!token) return next('/login')
 const roleMeta=to.meta.roles
 if(roleMeta&&(!user||!roleMeta.includes(user.role))) return next('/403')
 next()
})
export default router
