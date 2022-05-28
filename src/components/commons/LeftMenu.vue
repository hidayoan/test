<template>
  <div>
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <el-icon class="mr-2"><Menu /></el-icon>
        <span>List prodcut</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
// import { defineComponent } from 'vue'
import { Menu } from '@element-plus/icons-vue'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  components: {
    Menu
  }
})
</script>

<style lang="scss" scoped></style>
