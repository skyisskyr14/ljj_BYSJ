<template>
  <div>
    <div class="toolbar">
      <input type="file" @change="pick" style="max-width:320px;" />
      <span class="chip">支持本地预览（base64）</span>
    </div>
    <div v-if="value" class="card" style="max-width:360px;">
      <img :src="value" class="thumb" style="height:24vh;" />
      <div class="toolbar">
        <button @click="$emit('input', '')">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: '' }
  },
  methods: {
    pick(e) {
      const f = e.target.files && e.target.files[0]
      if (!f) return
      const reader = new FileReader()
      reader.onload = () => this.$emit('input', reader.result)
      reader.readAsDataURL(f)
    }
  }
}
</script>
