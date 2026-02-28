<template>
  <div class="auth-wrap">
    <div class="auth-card auth-card-login">
      <div class="auth-title">云同学录登录</div>
      <p class="auth-subtitle">学生 / 班长(班主任) / 管理员</p>

      <div class="form-grid">
        <select v-model="form.roleType">
          <option value="student">学生</option>
          <option value="monitor">班长/班主任</option>
          <option value="admin">管理员</option>
        </select>
        <input v-model="form.username" placeholder="请输入账号" />
        <input v-model="form.password" type="password" placeholder="请输入密码" />

        <div class="captcha-row">
          <input v-model="form.captchaInput" placeholder="请输入验证码" />
          <img v-if="captcha.data" :src="`data:image/png;base64,${captcha.data}`" class="captcha-img" @click="loadCaptcha" />
          <button class="chip" @click="loadCaptcha">换一张</button>
        </div>
      </div>

      <div class="auth-actions">
        <button @click="submit">立即登录</button>
        <router-link to="/register" class="chip">没有账号？去注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { captchaApi } from '../../api/modules/auth'

export default {
  data() {
    return {
      captcha: { uuid: '', data: '' },
      form: {
        roleType: 'student',
        username: '',
        password: '',
        captchaType: 'image',
        captchaUuid: '',
        captchaInput: '',
        type: 2,
        role: 2,
        projectCode: 'ljj'
      }
    }
  },
  created() {
    this.loadCaptcha()
  },
  methods: {
    async loadCaptcha() {
      const r = await captchaApi('image')
      if (r.code === 200) {
        this.captcha = r.data
        this.form.captchaUuid = r.data.uuid
      }
    },
    async submit() {
      const roleMap = {
        student: { role: 2, type: 2 },
        monitor: { role: 4, type: 2 },
        admin: { role: null, type: null }
      }
      Object.assign(this.form, roleMap[this.form.roleType])
      const r = await this.$store.dispatch('auth/login', this.form)
      if (r.code === 200) {
        const role = this.form.roleType === 'admin' ? 'admin' : r.data.user.role
        const map = { student: '/student/dashboard', monitor: '/student/dashboard', admin: '/admin/dashboard' }
        this.$router.push(map[role])
      } else {
        this.$message.error(r.message)
        this.loadCaptcha()
      }
    }
  }
}
</script>

<style scoped>
.auth-card-login { max-width: 680px; }
.form-grid { display: grid; gap: 10px; margin: 14px 0; }
.captcha-row { display: grid; grid-template-columns: 1fr 110px auto; gap: 8px; align-items: center; }
.captcha-img { width: 110px; height: 42px; object-fit: cover; border-radius: 8px; border: 1px solid #f0d8a6; cursor: pointer; }
</style>
