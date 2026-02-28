<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <div class="auth-title">欢迎回到云同学录</div>
      <p class="auth-subtitle">记录同窗青春，连接同学关系</p>
      <div class="chip" style="margin-bottom:1vh;display:inline-flex;">默认账号：s1 / 123456</div>
      <input v-model="form.username" placeholder="请输入账号" />
      <input v-model="form.password" type="password" placeholder="请输入密码" />
      <div class="auth-actions">
        <button @click="submit">立即登录</button>
        <router-link to="/register" class="chip">没有账号？去注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { username: 's1', password: '123456' }
    }
  },
  methods: {
    async submit() {
      const r = await this.$store.dispatch('auth/login', this.form)
      if (r.code === 200) {
        const role = r.data.user.role
        const map = { student: '/student/dashboard', monitor: '/student/dashboard', admin: '/admin/dashboard' }
        this.$router.push(map[role])
      } else {
        this.$message.error(r.message)
      }
    }
  }
}
</script>
