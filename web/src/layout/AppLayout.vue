<template>
  <div class="layout">
    <div v-if="sidebar" class="side-mask" @click="toggle" />
    <aside :class="['side', { open: sidebar }]">
      <SideMenu />
    </aside>

    <main class="main">
      <header class="top">
        <div class="toolbar" style="margin:0;align-items:center;">
          <button class="icon-btn" @click="toggle">☰</button>
          <strong>云同学录 · 青春版</strong>
        </div>
        <div class="toolbar" style="margin:0;align-items:center;justify-content:flex-end;">
          <span class="chip">{{ roleText }}</span>
          <span class="chip">当前班级：{{ currentClass }}</span>
          <button @click="logout">退出</button>
        </div>
      </header>
      <section class="content">
        <div class="page">
          <router-view />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'

export default {
  components: { SideMenu },
  computed: {
    user() { return this.$store.state.auth.user },
    sidebar() { return this.$store.state.app.sidebar },
    currentClass() { return this.$store.state.app.currentClass || '未选择' },
    roleText() {
      const map = { student: '学生', monitor: '班长/班主任', admin: '管理员' }
      return map[this.user?.role] || '访客'
    }
  },
  methods: {
    toggle() { this.$store.commit('app/toggle') },
    logout() {
      this.$store.commit('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.icon-btn {
  width: 2.4vw;
  min-width: 38px;
  border-radius: 999px;
  padding: 0;
  font-size: clamp(14px, 1vw, 18px);
}
@media (max-width: 768px) {
  .icon-btn { width: 100%; min-width: 44px; }
}
</style>
