import Login from '@/views/Login/Index.vue'
import Register from '@/views/Register/Index.vue'
import Layout from '@/layouts/NotLayout.vue'
import authentication from '@/middleware/authentication'

const user = {
  path: '/auth',
  name: 'user',
  hidden: true,
  redirect: '/auth',
  component: Layout,
  meta: {
    middleware: [authentication]
  },
  children: [
    {
      path: 'login',
      name: 'Login',
      component: Login
    },
    {
      path: 'register',
      name: 'Register',
      component: Register
    }
  ]
}

export default user
