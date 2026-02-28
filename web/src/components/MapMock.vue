<template>
  <div class="card mapmock">
    <div class="grid" />
    <div class="toolbar" style="margin-top:1vh;">
      <span class="chip">地图 Key 未配置，已启用 Mock 地图</span>
      <span class="chip">点位数：{{ points.length }}</span>
    </div>
    <ul>
      <li v-for="p in points" :key="p.id" style="margin:.7vh 0;">
        👤 {{ p.userId }} ｜ 经度 {{ Number(p.lng).toFixed(4) }} ｜ 纬度 {{ Number(p.lat).toFixed(4) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    points: { type: Array, default: () => [] }
  }
}
</script>
