// ** React Imports
import { MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Redux Import
import { useAppDispatch } from 'src/store/hooks'

// ** MUI Components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Grid'
import CardActions from '@mui/material/CardActions'
import { LoadingButton } from '@mui/lab'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import CircleSmall from 'mdi-material-ui/CircleSmall'

// ** Custom Component Imports
import LoginBanner from 'src/views/carousel-banner/loginBanner'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

// API Imports
import { login } from 'src/store/async/auth'

// Type Imports
import { LoginSentDataType } from 'src/types/authTypes'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 'auto' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.link.main
}))

const Img = styled('img')(({ theme }) => ({
  width: '15rem',
  borderRadius: theme.shape.borderRadius
}))

const LoginPage = () => {
  // ** State
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [onReqLogin, setOnReqLogin] = useState<boolean>(false)

  // ** Hook
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSentDataType>({ mode: 'onChange' })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmitData = (data: LoginSentDataType) => {
    setOnReqLogin(true)
    dispatch(login(data)).then(resp => {
      setOnReqLogin(false)
      if (resp.meta.requestStatus === 'fulfilled') {
        router.push('/dashboard')
      } else {
        if (resp.payload.status === 422 && resp.payload.errors.email.message) {
          toast.error(resp.payload.errors.email.message)
        } else {
          toast.error('APP_ERROR')
        }
      }
    })
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={7}>
        <LoginBanner />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card sx={{ zIndex: 1, height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <CardContent
            sx={{
              padding: theme => `${theme.spacing(12, 15, 7)} !important`,
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box>
              <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
                <Img src='/images/mainLogo.png' alt='Main Logo' />
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                  Selamat Datang! 👋🏻
                </Typography>
                <Typography variant='body2'>Silahkan isi email dan sandi untuk masuk.</Typography>
              </Box>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(handleSubmitData)}>
                <FormControl fullWidth sx={{ marginBottom: 4 }}>
                  <TextField
                    {...register('email', { required: 'Kolom input tidak boleh kosong' })}
                    error={Boolean(errors.email)}
                    autoFocus
                    fullWidth
                    id='email'
                    label='Email'
                  />
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.email?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel htmlFor='auth-login-password'>Kata Sandi</InputLabel>
                  <OutlinedInput
                    {...register('password', {
                      required: 'Kolom input tidak boleh kosong'
                    })}
                    label='Kata Sandi'
                    id='auth-login-password'
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.password?.message}</FormHelperText>
                </FormControl>
                <Box
                  sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}
                >
                  <Link passHref href='/'>
                    <LinkStyled onClick={e => e.preventDefault()}>Lupa sandi?</LinkStyled>
                  </Link>
                </Box>
                <LoadingButton
                  fullWidth
                  size='large'
                  variant='contained'
                  sx={{ marginBottom: 2 }}
                  type={'submit'}
                  color={'primary'}
                  loading={onReqLogin}
                >
                  Masuk
                </LoadingButton>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'start' }}>
                  <Typography variant='body2' sx={{ marginRight: 2 }}>
                    Belum punya akun?
                  </Typography>
                  <Typography variant='body2'>
                    <Link passHref href='/register'>
                      <LinkStyled>Daftar</LinkStyled>
                    </Link>
                  </Typography>
                </Box>
              </form>
            </Box>
          </CardContent>
          <CardActions>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'start' }}>
              <Typography variant='body2'>Privacy Policy</Typography>
              <CircleSmall color='primary' fontSize='large' />
              <Typography variant='body2'>Term & Condition</Typography>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
