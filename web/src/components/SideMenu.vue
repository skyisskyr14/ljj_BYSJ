<template>
  <nav>
    <div class="menu-title">🥚 同学录导航</div>
    <router-link v-for="m in menus" :key="m.path" :to="m.path" class="m">
      <span class="badge-dot">{{ m.label.slice(0, 1) }}</span>
      <span>{{ m.label }}</span>
    </router-link>
  </nav>
</template>

<script>
const all = {
  student: [
    ['/student/dashboard', '工作台'],
    ['/student/join', '加入班级'],
    ['/student/class', '我的班级'],
    ['/student/posts', '动态广场'],
    ['/student/albums', '班级相册'],
    ['/student/map', '同学地图'],
    ['/student/members', '成员名录'],
    ['/student/profile', '个人中心']
  ],
  monitor: [
    ['/monitor/class-manage', '班级管理'],
    ['/monitor/member-role', '职位管理'],
    ['/monitor/album-manage', '相册管理']
  ],
  admin: [
    ['/admin/dashboard', '平台看板'],
    ['/admin/users', '用户管理'],
    ['/admin/classes', '班级管理'],
    ['/admin/review-posts', '动态审核'],
    ['/admin/review-images', '图片审核'],
    ['/admin/settings', '系统设置']
  ]
}

export default {
  computed: {
    menus() {
      const role = this.$store.state.auth.user && this.$store.state.auth.user.role
      let arr = []
      if (role === 'student') arr = all.student
      if (role === 'monitor') arr = [...all.student, ...all.monitor]
      if (role === 'admin') arr = all.admin
      return arr.map(i => ({ path: i[0], label: i[1] }))
    }
  }
}
</script>
