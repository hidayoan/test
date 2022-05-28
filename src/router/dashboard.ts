import DashboardPage from '@/views/Dashboard/Index.vue'
import SuccessPage from '@/views/Success/Index.vue'
import ProductDetailPage from '@/views/Dashboard/ProductDetailPage.vue'
import Layout from '@/layouts/index.vue'
import authentication from '@/middleware/authentication'

const dashboard = {
  path: '/',
  component: Layout,
  redirect: '/',
  icon: 'ico_home.svg',
  menuName: 'Dashboard',
  meta: {
    middleware: [authentication]
  },
  children: [
    {
      path: '',
      alias: '/product',
      name: 'Dashboard',
      meta: { title: 'BabyQuip Cleaning' },
      component: DashboardPage
    },
    {
      path: '/success',
      name: 'success',
      meta: { title: 'BabyQuip Cleaning' },
      component: SuccessPage
    },
    // {
    //   path: '/product',
    //   name: 'Dashboard',
    //   meta: { title: 'BabyQuip Cleaning' },
    //   component: DashboardPage
    // },
    {
      path: 'product/:id',
      name: 'Product Details',
      meta: { title: 'BabyQuip Cleaning' },
      component: ProductDetailPage
    }
  ]
}

export default dashboard
