<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <div class="auth-title">创建你的同学录身份</div>
      <p class="auth-subtitle">请选择角色并完善基础信息</p>

      <input v-model="form.username" placeholder="账号（如学号/工号）" />
      <input v-model="form.password" type="password" placeholder="密码（演示最少6位）" />
      <input v-model="form.nickname" placeholder="昵称" />
      <select v-model="form.role">
        <option value="student">学生</option>
        <option value="monitor">班长/班主任</option>
        <option value="admin">管理员（演示）</option>
      </select>

      <div class="auth-actions">
        <button @click="submit">注册并登录</button>
        <router-link to="/login" class="chip">已有账号？去登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { username: '', password: '123456', nickname: '', role: 'student' }
    }
  },
  methods: {
    async submit() {
      const r = await this.$store.dispatch('auth/register', this.form)
      if (r.code === 200) {
        const role = r.data.user.role
        this.$router.push(role === 'admin' ? '/admin/dashboard' : '/student/dashboard')
      } else {
        this.$message.error(r.message)
      }
    }
  }
}
</script>
