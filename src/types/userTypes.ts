/**
 * Error key uniquely for each error in each request
 *
 */
export type ErrorKeyAuthType = 'loginErrorMsg' | 'registerErrorMsg'

export type AuthStateType = {
  userData: any
  token: string
}

export type LoginSentDataType = {
  email: string
  password: string
}

interface RegisterSentDataType {
  fullName: string
  email: string
  phoneNumber: string
  password: string
}

export type { RegisterSentDataType }
