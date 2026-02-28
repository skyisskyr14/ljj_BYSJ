<template>
  <div class="card page-head">
    <div>
      <h2>{{ title }}</h2>
      <small>{{ desc }}</small>
    </div>
    <div class="chip">同学录 · 青春黄主题</div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    desc: { type: String, default: '' }
  }
}
</script>
