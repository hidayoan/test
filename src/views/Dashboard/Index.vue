<template>
  <ListProduct />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ListProduct from '@/components/application/Product/ListProduct.vue'

export default defineComponent({
  name: 'DashboardPage',
  components: {
    ListProduct
  },

  setup() {
    const goBack = () => {}
    return { goBack }
  }
})
</script>
