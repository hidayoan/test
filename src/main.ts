import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import middleware from '@grafikri/vue-middleware'
import BaseComponents from './components/index'
import ElementPlus from 'element-plus'
// import GAuth from 'vue3-google-oauth2'
import 'element-plus/lib/theme-chalk/index.css'

import ReadMore from 'vue-read-more'
import './assets/css/style.css'

import { middlewareFactory } from '@/utils/middleware'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCprlKjBdj0QHz1LTudaadnfS5_tpc4bpk',
  authDomain: 'payment-app-4bc33.firebaseapp.com',
  projectId: 'payment-app-4bc33',
  storageBucket: 'payment-app-4bc33.appspot.com',
  messagingSenderId: '962095583617',
  appId: '1:962095583617:web:92440fc498724f88c8d880',
  measurementId: 'G-RQSZL5YBJB'
}

router.beforeEach(middlewareFactory({ store }))
// init firebase
initializeApp(firebaseConfig)

const app = createApp(App).use(router).use(store).use(ElementPlus).use(ReadMore)
// .use(GAuth, {
//   clientId: process.env.VUE_APP_GOOGLE_LOGIN_API_KEY,
//   scope: 'email',
//   prompt: 'consent',
//   fetch_basic_profile: false
// })

BaseComponents.register(app)

app.mount('#app')
