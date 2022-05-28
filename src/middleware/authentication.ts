// import { onAuthStateChanged, getAuth, getIdToken } from 'firebase/auth'
import { removeToken, setToken } from '@/utils/auth'
import Router from '@/router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Auth from '@/models/Auth'

export default async ({ next, to }) => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (user: any) => {
    console.log(user)

    if (user) {
      setToken(user.accessToken)

      if (to.fullPath !== '/auth/login' && to.fullPath !== '/auth/register' && to.fullPath !== '/auth/forgot-password') {
        //
      } else {
        Router.push('/')
      }
    } else {
      removeToken()
      if (to.fullPath !== '/auth/login' && to.fullPath !== '/auth/register' && to.fullPath !== '/auth/forgot-password') {
        Router.push('/auth/login')
      }
    }

    // if (!user) {
    //   Router.push('/auth/login')
    // }
    // } else {
    //   if (!user) {
    //     //leave them on the sign in page
    //   } else {
    //     Router.push('/')
    //     // next()
    //   }
    // }
  })

  next()
}
