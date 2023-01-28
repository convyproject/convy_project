function token() {
  const userToken = {
    get() {
      return localStorage.getItem('app_token')
      // const storedExpDate = window.localStorage.getItem('asani-exp-token')
      // if (storedExpDate) {
      //   const expDate = new Date(storedExpDate)
      //   const currentDate = new Date()
      //   if (expDate < currentDate) {
      //     window.localStorage.removeItem('asani-token')
      //     window.localStorage.removeItem('asani-exp-token')
      //   } else {
      //     return window.localStorage.getItem('asani-token')
      //   }
      // }

      // return null
    },
    save(accessToken: string) {
      window.localStorage.setItem('app_token', accessToken)
      // const expDate = new Date()
      // expDate.setHours(expDate.getHours() + 3)
      // window.localStorage.setItem('asani-exp-token', String(expDate))
    },
    remove() {
      localStorage.removeItem('app_token')
    }
  }

  return userToken
}
export default token()
