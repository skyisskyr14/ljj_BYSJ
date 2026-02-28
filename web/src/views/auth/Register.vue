<template>
  <div class="auth-wrap">
    <div class="auth-card auth-card-register">
      <div class="auth-title">注册同学录账号</div>
      <p class="auth-subtitle">仅支持学生、班长/班主任注册</p>

      <div class="form-grid">
        <select v-model="form.role">
          <option :value="2">学生</option>
          <option :value="4">班长/班主任</option>
        </select>
        <input v-model="form.username" placeholder="账号（学号/工号）" />
        <input v-model="form.nickname" placeholder="昵称" />
        <input v-model="form.password" type="password" placeholder="密码" />

        <div class="captcha-row">
          <input v-model="form.captchaInput" placeholder="请输入验证码" />
          <img v-if="captcha.data" :src="`data:image/png;base64,${captcha.data}`" class="captcha-img" @click="loadCaptcha" />
          <button class="chip" @click="loadCaptcha">换一张</button>
        </div>
      </div>

      <div class="auth-actions">
        <button @click="submit">注册并登录</button>
        <router-link to="/login" class="chip">已有账号？去登录</router-link>
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
        username: '',
        password: '',
        securePassword: '123456',
        nickname: '',
        role: 2,
        type: 2,
        captchaType: 'image',
        captchaUuid: '',
        captchaInput: ''
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
      const r = await this.$store.dispatch('auth/register', this.form)
      if (r.code === 200) {
        this.$router.push('/student/dashboard')
      } else {
        this.$message.error(r.message)
        this.loadCaptcha()
      }
    }
  }
}
</script>

<style scoped>
.auth-card-register { max-width: 680px; }
.form-grid { display: grid; gap: 10px; margin: 14px 0; }
.captcha-row { display: grid; grid-template-columns: 1fr 110px auto; gap: 8px; align-items: center; }
.captcha-img { width: 110px; height: 42px; object-fit: cover; border-radius: 8px; border: 1px solid #f0d8a6; cursor: pointer; }
</style>
