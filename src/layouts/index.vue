<template>
  <div class="main-warpper">
    <el-container class="content-body">
      <el-aside width="300px" class="bg-white">
        <el-container class="content-body">
          <el-header class="container mb-4 p-4"> LOGO </el-header>
          <el-main>
            <LeftMenu />
          </el-main>
          <el-footer>
            <el-button @click="handleLogout"> Log out </el-button>
          </el-footer>
        </el-container>
      </el-aside>
      <el-container class="p-4">
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { getAuth, signOut } from 'firebase/auth'
import { defineComponent } from 'vue'
import LeftMenu from '@/components/commons/LeftMenu.vue'

export default defineComponent({
  components: {
    LeftMenu
  },
  setup() {
    const goBack = () => {}
    const handleLogout = async () => {
      await signOut(getAuth())
    }
    return { goBack, handleLogout }
  }
})
</script>
