// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
// import { useRouter } from 'next/router'

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
import FormHelperText from '@mui/material/FormHelperText'
import { LoadingButton } from '@mui/lab'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import CircleSmall from 'mdi-material-ui/CircleSmall'

// ** Custom Component Imports
import LoginBanner from 'src/views/carousel-banner/loginBanner'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Type imports
import { RegisterSentDataType } from 'src/types/authTypes'

// ** Constant Imports
import { emailRegex, indonesianPhoneRegex, passwordCriteriaRegex } from 'src/constant/regex'

// ** Action Imports
import { register as registerAccount } from 'src/store/async/auth'

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

const RegisterPage = () => {
  // ** State
  const [confirmationPassword, setConfirmationPassword] = useState<string>('')
  const [reveal, setReveal] = useState<{ password: boolean; confirmPassword: boolean }>({
    password: false,
    confirmPassword: false
  })
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('')
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false)

  // ** Hook
  // const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm<RegisterSentDataType>({ mode: 'onChange' })

  const handleChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || event.target.value !== getValues('password')) {
      setErrorConfirmPassword('Password tidak cocok')
    } else {
      setErrorConfirmPassword('')
    }
    setConfirmationPassword(event.target.value)
  }

  const handleClickShowPassword = (type: 'password' | 'confirmPassword') => {
    setReveal({ ...reveal, [type]: !reveal[type] })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmitData = (data: RegisterSentDataType) => {
    if (confirmationPassword === '' || confirmationPassword !== data.password) {
      setErrorConfirmPassword('Password tidak cocok')
    } else {
      setLoadingRegister(true)
      dispatch(
        registerAccount({
          ...data,
          phoneNumber: `+62${data.phoneNumber}`
        })
      ).then(resp => {
        setLoadingRegister(false)
        if (resp.meta.requestStatus === 'fulfilled') {
          toast.success('Akun berhasil didaftarkan')
        }
        if (resp.meta.requestStatus === 'rejected' && resp.payload.errors) {
          if (resp.payload.errors.email === 'emailAlreadyExists') {
            setError('email', { type: 'validate', message: 'Email telah terdaftar' })
          } else {
            toast.error('APP_ERROR')
          }
        }
      })
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={7}>
        <LoginBanner />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card
          sx={{
            zIndex: 1,
            height: '100vh',
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
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
                  Registrasi Akun 🚀
                </Typography>
                <Typography variant='body2'>
                  Daftarkan bisnis anda untuk segala kemudahan yang akan anda dapatkan.
                </Typography>
              </Box>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(handleSubmitData)}>
                <FormControl fullWidth sx={{ marginBottom: 4 }}>
                  <TextField
                    {...register('fullName', { required: 'Kolom input tidak boleh kosong' })}
                    error={Boolean(errors.fullName)}
                    autoFocus
                    fullWidth
                    id='name'
                    label='Nama'
                  />
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.fullName?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 4 }}>
                  <TextField
                    {...register('email', {
                      required: 'Kolom input tidak boleh kosong',
                      pattern: { value: emailRegex, message: 'Email tidak sesuai' }
                    })}
                    fullWidth
                    id='email'
                    label='Email'
                  />
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.email?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 4 }}>
                  <InputLabel htmlFor='auth-phone-number'>Nomor Telepon</InputLabel>
                  <OutlinedInput
                    {...register('phoneNumber', {
                      required: 'Kolom input tidak boleh kosong',
                      pattern: { value: indonesianPhoneRegex, message: 'Nomor telepon tidak sesuai' }
                    })}
                    label='Nomor Telepon'
                    id='auth-phone-number'
                    type='number'
                    startAdornment={<InputAdornment position='start'>+62</InputAdornment>}
                  />
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.phoneNumber?.message}</FormHelperText>
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: 4 }}>
                  <InputLabel htmlFor='auth-login-password'>Kata Sandi</InputLabel>
                  <OutlinedInput
                    {...register('password', {
                      required: 'Kolom input tidak boleh kosong',
                      pattern: {
                        value: passwordCriteriaRegex,
                        message:
                          'Password harus terdiri dari minimal 8 karakter, 1 huruf kapital, 1 huruf, dan 1 angka.'
                      }
                    })}
                    label='Kata Sandi'
                    id='auth-login-password'
                    type={reveal.password ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => handleClickShowPassword('password')}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {reveal.password ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.password?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 4 }}>
                  <InputLabel htmlFor='auth-login-password'>Konfirmasi Kata Sandi</InputLabel>
                  <OutlinedInput
                    label='Konfirmasi Kata Sandi'
                    value={confirmationPassword}
                    id='auth-login-confirm-password'
                    onChange={handleChangeConfirmPassword}
                    type={reveal.confirmPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => handleClickShowPassword('confirmPassword')}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {reveal.confirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText sx={{ color: 'error.main' }}>{errorConfirmPassword || ''}</FormHelperText>
                </FormControl>
                <LoadingButton
                  fullWidth
                  size='large'
                  variant='contained'
                  sx={{ marginBottom: 2 }}
                  color={'primary'}
                  type={'submit'}
                  loading={loadingRegister}
                >
                  Daftar
                </LoadingButton>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'start' }}>
                  <Typography variant='body2' sx={{ marginRight: 2 }}>
                    Sudah punya akun?
                  </Typography>
                  <Typography variant='body2'>
                    <Link passHref href='/login'>
                      <LinkStyled>Masuk</LinkStyled>
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

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
