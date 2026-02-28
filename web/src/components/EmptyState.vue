<template>
  <div class="empty card">
    <div style="font-size:3.6vh;margin-bottom:1vh;">🧋</div>
    <div>{{ text || '这里暂时空空的，去发布一点青春记录吧～' }}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' }
  }
}
</script>
