export const defaultDB=()=>({
 users:[
  {id:'u1',username:'s1',password:'123456',role:'student',nickname:'学生一号',signature:'好好学习',avatar:'',status:true},
  {id:'u2',username:'m1',password:'123456',role:'monitor',nickname:'班长一号',signature:'服务同学',avatar:'',status:true},
  {id:'u3',username:'a1',password:'123456',role:'admin',nickname:'系统管理员',signature:'平台守护',avatar:'',status:true}
 ],
 classes:[{id:'c1',name:'2020级1班',year:'2020',school:'示例中学',desc:'欢迎回家',code:'CLS2020',allowJoin:true,notice:'周末班会',cover:''}],
 memberships:[{userId:'u1',classId:'c1',position:'学生'},{userId:'u2',classId:'c1',position:'班长'}],
 posts:[{id:'p1',classId:'c1',userId:'u1',content:'第一次发动态！',images:[],likes:[],comments:[],status:'approved',createdAt:Date.now()}],
 albums:[{id:'a1',classId:'c1',name:'毕业照',permission:'all',desc:'青春不散场'}],
 photos:[{id:'ph1',albumId:'a1',userId:'u1',url:'',name:'占位图',status:'approved',createdAt:Date.now()}],
 locations:[{id:'l1',classId:'c1',userId:'u1',lng:116.39,lat:39.9,updatedAt:Date.now()}],
 notifications:[{id:'n1',title:'欢迎使用',content:'云同学录上线'}],
 settings:{announcement:'欢迎使用云同学录',banners:[]}
})
