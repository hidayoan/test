import { HTTPBaseService } from '@/utils/request'

class Auth extends HTTPBaseService {
  constructor() {
    super()
  }

  public checkAuth = async () => {
    return await (
      await this.instance.post('/account/auth')
    ).data
  }
}

export default Auth
