// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Reduc Imports
import { useAppDispatch } from 'src/store/hooks'

// Third party Import
import { useSelector } from 'react-redux'

// Type import
import { RootState } from 'src/store'

// Function import
import token from 'src/utils/token'

// Actions
import { requestMyDataAction } from 'src/store/async/auth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const { userData, onReqGetMyData } = useSelector((state: RootState) => state.auth)
  const { guestPath } = useSelector((state: RootState) => state.path)

  // Hooks
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(
    () => {
      const userToken = token.get()
      // Handle rendering page
      if (!router.isReady) {
        return
      }

      // if there is token and user data not exit, then need to fetch user data
      if (!userData && userToken) {
        dispatch(requestMyDataAction())
      }

      // if there is token but user try to access guest path, it will direct to dashboard
      if (userToken && guestPath.indexOf(router.pathname) >= 0) {
        router.replace({
          pathname: '/dashboard'
        })
      }

      // if there is no token and user try to access user path, then it will direct to login
      if (!userToken && guestPath.indexOf(router.pathname) < 0) {
        router.replace({
          pathname: '/login'
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, userData]
  )

  if (onReqGetMyData && guestPath.indexOf(router.pathname) < 0) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
