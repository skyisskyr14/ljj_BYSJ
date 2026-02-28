<template>
  <div>
    <EmptyState v-if="!items || !items.length" />
    <div v-else class="grid">
      <div class="card" v-for="i in items" :key="i.id">
        <slot :item="i" />
      </div>
    </div>
  </div>
</template>

<script>
import EmptyState from './EmptyState.vue'

export default {
  components: { EmptyState },
  props: {
    items: { type: Array, default: () => [] }
  }
}
</script>
