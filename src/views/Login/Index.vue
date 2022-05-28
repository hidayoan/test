<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
      <div class="login">
        <el-card>
          <h2>Login</h2>
          <el-form ref="form" class="login-form" :model="model" @submit.prevent="login">
            <el-form-item prop="username">
              <el-input v-model="model.email" placeholder="Email" prefix-icon="el-icon-message"></el-input>
              <div v-if="validationErrs['email']" class="text-danger">
                {{ validationErrs['email'] }}
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="model.password" placeholder="Password" type="password" prefix-icon="fas fa-lock"></el-input>
              <div v-if="validationErrs['password']" class="text-danger">
                {{ validationErrs['password'] }}
              </div>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" class="login-button" type="primary" native-type="submit" block>Login</el-button>
              <el-button :loading="loading" class="login-button" type="danger" plain block @click="handlePopupLogin('google')"
                >Login With Google</el-button
              >
              <el-button :loading="loading" class="login-button" type="primary" plain block @click="handlePopupLogin('facebook')"
                >Login With Facebook</el-button
              >
            </el-form-item>
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%">
              <router-link to="/auth/register">
                <div class="forgot-password">Register now</div>
              </router-link>
              <router-link to="/auth/forgot-password">
                <div class="forgot-password">Forgot password ?</div>
              </router-link>
            </div>
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import Router from '@/router'
import { setToken } from '@/utils/auth'
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { getDatabase, ref as refdb, set } from 'firebase/database'
import { isEmpty } from 'lodash'
import validate from 'validate.js'
import { defineComponent, ref } from 'vue'

const userRules = {
  email: {
    presence: {
      allowEmpty: false
    },
    email: true
  },
  password: {
    presence: {
      allowEmpty: false
    },
    length: {
      minimum: 6,
      message: 'must be at least 6 characters'
    }
  }
}

export default defineComponent({
  setup() {
    const model = ref({ email: '', password: '' })
    let validationErrs = ref({})
    const auth = getAuth()
    const loading = ref(false)

    const login = async () => {
      try {
        validationErrs.value = {}
        const errors = validate(model.value, userRules)
        if (errors) {
          Object.keys(errors).forEach((errorKey) => {
            validationErrs.value[errorKey] = errors[errorKey][0]
          })
        }

        if (isEmpty(validationErrs.value)) {
          loading.value = true
          const { user }: any = await signInWithEmailAndPassword(getAuth(), model.value.email, model.value.password)
          if (user) {
            setToken(user.accessToken)
          }
          loading.value = false
          Router.push('/')
        }
      } catch (error: any) {
        console.log(error.message)
        loading.value = false
      }
    }

    const handlePopupLogin = async (type: String) => {
      loading.value = true
      if (type === 'facebook') {
        const provider = new FacebookAuthProvider()
        await signInWithPopup(auth, provider)
          .then(async ({ user }: any) => {
            if (user) {
              await writeUserData(user.uid, user.email, user.displayName, null, user.email)
              setToken(user.accessToken)
            }
            loading.value = false
            Router.push('/')
          })
          .catch((e) => {
            console.log(e)
            loading.value = false
          })
      } else {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
          .then(async ({ user }: any) => {
            if (user) {
              await writeUserData(user.uid, user.email, user.displayName, null, user.email)
              setToken(user.accessToken)
            }
            loading.value = false
            Router.push('/')
          })
          .catch((e) => {
            console.log(e)
            loading.value = false
          })
      }
    }

    const writeUserData = async (userId, username, firstName, lastName, email) => {
      try {
        const db = await getDatabase()
        await set(refdb(db, 'users/' + userId), {
          user_name: username,
          first_name: firstName,
          last_name: lastName,
          email: email
        }).then((value) => console.log('value', value))
      } catch (error) {
        console.log(error)
      }
    }

    const handleClick = () => {
      let recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
    }

    return { model, login, loading, validationErrs, handlePopupLogin, handleClick }
  },
  component: {}
})
</script>
<style lang="scss" scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-width: 400px;
  margin-top: 30px;
}

.login-button {
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
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
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
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
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
.login .el-card {
  display: flex;
  justify-content: center;
  border-radius: 15px;
}
</style>
