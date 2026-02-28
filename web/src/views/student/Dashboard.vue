<template>
  <div>
    <PageHeader title="学生工作台" desc="今日也来记录一下青春吧" />
    <div class="toolbar">
      <span class="chip">主题：咸蛋黄柔和风</span>
      <span class="chip">角色：学生 / 班长</span>
    </div>
    <div class="stats">
      <div class="card" v-for="s in stats" :key="s.k">
        <div>{{ s.k }}</div>
        <h3>{{ s.v }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '../../components/PageHeader.vue'
import { classListApi } from '../../api/modules/class'
import { postListApi } from '../../api/modules/post'
import { albumListApi } from '../../api/modules/album'
import { mapPointsApi } from '../../api/modules/map'

export default {
  components: { PageHeader },
  data() {
    return { stats: [] }
  },
  async mounted() {
    const [c, p, a, m] = await Promise.all([classListApi(), postListApi(), albumListApi(), mapPointsApi()])
    this.stats = [
      { k: '我的班级', v: c.data.length },
      { k: '最近动态', v: p.data.length },
      { k: '相册数量', v: a.data.length },
      { k: '位置点位', v: m.data.length }
    ]
  }
}
</script>
