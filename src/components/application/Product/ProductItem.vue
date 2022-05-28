<template>
  <div class="product">
    <el-card :body-style="{ padding: '0px' }">
      <el-image style="width: 100%" :src="data.imageSrc" fit="cover" class="image" />

      <div style="padding: 14px">
        <span>{{ data.name }}</span>
        <div class="bottom">
          <div>
            <div class="time"><strong>Price:</strong> $ {{ data.price }}</div>
            <div class="time"><strong>Team size:</strong> {{ data.size }}</div>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-shopping-cart-1" circle />
            <el-button type="primary" plain @click="goToPath(`/product/${data.id}`)">Buy now</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '@/router'
import { RouteLocationRaw } from 'vue-router'

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const goToPath = (path: RouteLocationRaw) => {
      router.push(path)
    }
    return { goToPath }
  }
})
</script>

<style lang="scss" scoped>
.product {
  .el-card {
    border-radius: 10px;
  }
  .time {
    font-size: 12px;
    color: #999;
    padding: 5px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .image {
    width: 100%;
    display: block;
  }
}
</style>
