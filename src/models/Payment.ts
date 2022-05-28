import { HTTPBaseService } from '@/utils/request'

class Payment extends HTTPBaseService {
  private static classInstance?: Payment

  constructor() {
    super()
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Payment()
    }

    return this.classInstance
  }

  public stripeCheckout = async (data) => {
    return await (
      await this.instance.post('/payment/stripe', data)
    ).data
  }

  public coinbaseCheckout = async (data) => {
    return await (
      await this.instance.post('/payment/coinbase', data)
    ).data
  }

  async paypalSuccess(params): Promise<any> {
    return (await this.instance.post('/payment/paypal/success', params)).data
  }

  async coinbaseSuccess(params): Promise<any> {
    return (await this.instance.post('/payment/coinbase/success', params)).data
  }
}

export default Payment
