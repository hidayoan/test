<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
      <div class="forgot-password">
        <el-card>
          <h2>Forgot Password</h2>

          <el-form ref="form" class="forgot-password-form" :model="model" @submit.prevent="resetPassword">
            <el-form-item prop="email">
              <el-input v-model="model.email" placeholder="Email" prefix-icon="el-icon-message"> </el-input>
              <div v-if="validationErrs['email']" class="text-danger">
                {{ validationErrs['email'] }}
              </div>
            </el-form-item>

            <el-form-item>
              <el-button :loading="loading" class="forgot-password-button" type="primary" native-type="submit" block>
                {{ buttonText }}
              </el-button>
            </el-form-item>
            <div style="display: flex; align-items: flex-start; justify-content: flex-start; width: 100%">
              <router-link to="/auth/login">
                <div>Already have account? Login now</div>
              </router-link>
            </div>
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { defineComponent, ref } from 'vue'

const userRules = {
  email: {
    presence: {
      allowEmpty: false
    },
    email: true
  }
}

export default defineComponent({
  setup() {
    const model = ref({ email: '' })
    let validationErrs = ref({})
    const auth = getAuth()
    const loading = ref(false)

    const buttonText = ref('Reset Password Now')

    const resetPassword = async () => {
      loading.value = true
      try {
        await sendPasswordResetEmail(auth, model.value.email)
        loading.value = false
        buttonText.value = 'Reset Password after '
      } catch (error: any) {
        loading.value = false
        console.log(error.message)
      }
    }

    return { model, loading, validationErrs, resetPassword, buttonText }
  }
})
</script>
<style lang="scss" scoped>
.forgot-password {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-width: 400px;
  margin-top: 30px;
}

.forgot-password-button {
  width: 100%;
  margin-top: 20px;
  margin-left: 0 !important;
}

.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.forgot-password .el-input__inner:hover {
  border-color: $teal;
}
.forgot-password .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.forgot-password .el-input input {
  padding-left: 35px;
}
.forgot-password .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: 'Open Sans';
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.forgot-password .el-card {
  display: flex;
  justify-content: center;
  border-radius: 15px;
}
</style>
