<template>
  <div>
    <el-row class="row-bg" justify="start" align="top" :gutter="24">
      <el-col
        v-for="(product, index) in data"
        :key="index"
        :xs="24"
        :sm="12"
        :md="12"
        :lg="8"
        :xl="6"
        style="margin-bottom: 20px"
      >
        <ProductItem :data="product" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import ProductItem from './ProductItem.vue'

export default defineComponent({
  components: {
    ProductItem
  },
  setup() {
    const data = [
      {
        id: 1,
        name: 'School Event',
        imageSrc:
          'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-event-flyer-template-design-9717e1632b811c2aff8ae62891878455_screen.jpg?ts=1636989589',
        imageAlt: 'School event',
        price: '35',
        size: 12
      },
      {
        id: 2,
        name: 'School Event',
        imageSrc:
          'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-event-flyer-template-design-9717e1632b811c2aff8ae62891878455_screen.jpg?ts=1636989589',
        imageAlt: 'School event',
        price: '35',
        size: 12
      },
      {
        id: 3,
        name: 'School Event',
        imageSrc:
          'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-event-flyer-template-design-9717e1632b811c2aff8ae62891878455_screen.jpg?ts=1636989589',
        imageAlt: 'School event',
        price: '35',
        size: 12
      },
      {
        id: 4,
        name: 'School Event',
        imageSrc:
          'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-event-flyer-template-design-9717e1632b811c2aff8ae62891878455_screen.jpg?ts=1636989589',
        imageAlt: 'School event',
        price: '35',
        size: 12
      }
    ]
    return { data }
  }
})
</script>

<style lang="scss" scoped></style>
