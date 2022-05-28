import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from './auth'
import { removeToken } from '@/utils/auth'
import { DataReponse } from '@/types/axios'
import { ElNotification } from 'element-plus'
import { encrypt } from './encrypt'
import store from '@/store'

export abstract class HTTPBaseService {
  protected instance: AxiosInstance

  public constructor() {
    const baseURL = process.env.VUE_APP_BASE_URL

    // axios.defaults.headers.common['Authorization'] = getToken()
    this.instance = axios.create({
      baseURL,
      withCredentials: true, // send cookies when cross-domain requests
      timeout: 300000 // request timeout
    })

    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (getToken()) {
          if (config.headers) {
            config.headers['Authorization'] = getToken()
          }
        }

        // encrypt where
        if (config?.params?.where) {
          config.params.where = encrypt(JSON.stringify(config.params.where))
        }

        return config
      },
      (error) => {
        console.log(error.message) // for debug
      }
    )
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use((response: AxiosResponse<DataReponse>) => {
      // Handle the returned result here

      return response
    }, this.handleError)
  }

  private handleError = (error) => {
    // Turn off loading
    store.dispatch('setLoading', false)

    // Handle not authentication
    if (error.response?.status && error.response.status === 401) {
      removeToken()

      // back to login page
      return error.response
    }

    // Handle not perrmision
    if (error.response?.status && error.response.status === 405) {
      ElNotification({ message: 'Not Permission', type: 'error' })
      setTimeout(() => (window.location.href = '/'), 2000)
      return error.response
    }

    let message = ''
    if (error.response?.data?.details) {
      const errorMessage: any = Object.values(error.response?.data?.details)
      message = errorMessage.length && errorMessage[0]?.message
    }

    const errorMessage = message || error.response?.data?.message || error.message

    if (process.env.NODE_ENV !== 'production') {
      ElNotification({
        title: 'Error',
        message: errorMessage,
        type: 'error',
        duration: 3000
      })
    }

    throw error.response.data
  }
}

class HttpException extends Error {
  status: number
  message: string
  response: { [key: string]: string }
  constructor(status: number, message: string, response: { [key: string]: string }) {
    super(message)
    this.status = status
    this.message = message
    this.response = response
  }
}

export default HttpException
