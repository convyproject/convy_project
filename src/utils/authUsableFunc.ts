const authUsableFunc = () => {
  const usableFunc = {
    logout() {
      localStorage.removeItem('app-token')
    }
  }

  return usableFunc
}

export default authUsableFunc()
