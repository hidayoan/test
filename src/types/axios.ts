export interface DataReponse {
  data: any
  message?: string
  status: boolean
}

export interface ErrorDetail {
  message: string
  value?: string
}

export interface ErrorReponse {
  status: boolean
  message: string
  details?: { [k: string]: ErrorDetail }
}
