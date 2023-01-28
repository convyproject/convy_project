// ** React Imports
import { useEffect, ReactNode, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// Icons Import
import Check from 'mdi-material-ui/CheckCircle'
import CloseCircelOutline from 'mdi-material-ui/CloseCircleOutline'

// API Imports
import authApi from 'src/pages/api/authApi'

// Util Imports
import token from 'src/utils/token'

const AcceptInvitationPages = () => {
  // ** Hooks
  const router = useRouter()

  // ** States
  const [fetchingState, setFetchingState] = useState<'success' | 'error' | 'loading'>('loading')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (router.query && router.query.token) {
      handleConfirmEmail(typeof router.query.token === 'string' ? router.query.token : '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  async function handleConfirmEmail(hash: string) {
    try {
      setFetchingState('loading')
      const responseData = await authApi.confirmEmail(hash)
      if (responseData.token) {
        token.save(responseData.token)
      }
      setMessage('Sukses melakukan verifikasi email')
      setFetchingState('success')
    } catch (error) {
      setMessage('Gagal melakukan verifikasi email')
      setFetchingState('error')
    }
  }

  const handleClickConfirmButton = () => {
    const userToken = token.get()
    if (userToken) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              textAlign: 'center',
              maxWidth: '20rem',
              alignItems: 'center',
              flexDirection: 'column',
              padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
            }}
          >
            {fetchingState === 'loading' ? (
              <CircularProgress sx={{ mb: '2rem' }} />
            ) : (
              <>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    marginBottom: 2.25,
                    color: 'common.white',
                    backgroundColor: fetchingState === 'success' ? 'primary.main' : 'error.main'
                  }}
                >
                  {fetchingState === 'success' && <Check sx={{ fontSize: '2rem' }} />}
                  {fetchingState === 'error' && <CloseCircelOutline sx={{ fontSize: '2rem' }} />}
                </Avatar>
                <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
                  {message}
                </Typography>
              </>
            )}
            <Button
              variant='contained'
              onClick={handleClickConfirmButton}
              sx={{ padding: theme => theme.spacing(1.75, 5.5) }}
            >
              {fetchingState === 'success' ? 'Login' : 'Back'}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

AcceptInvitationPages.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default AcceptInvitationPages
