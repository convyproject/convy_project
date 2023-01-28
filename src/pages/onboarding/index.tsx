// ** React Imports
import { ReactNode, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Components Imports
import MobilePreview from 'src/views/onboarding/MobilePreview'
import StepperCustom from 'src/components/Stepper'
import RestourantForm from 'src/views/onboarding/RestourantForm'
import MenuForm from 'src/views/onboarding/MenuForm'

// ** Image Imports

const Onboarding = () => {
  // ** State
  const [stepData] = useState<{ label: string; description: any }[]>([
    {
      label: 'Data Restoran',
      description: () => (
        <Typography variant='subtitle2'>
          Data Restoranmu akan digunakan pada tampilan aplikasi pelanggan jika pelanggan mengakses aplikasi tanpa
          menggunakan{' '}
          <i>
            <b>QR code</b>
          </i>
          . Datamu akan berguna jika pelanggan sedang memilih restoran-restoran yang ingin di kunjungi.
        </Typography>
      )
    },
    {
      label: 'Menu',
      description: () => (
        <Typography variant='subtitle2'>
          Buat daftar menu agar pelanggan dapat melakukan pemesanan lewat aplikasi setelah melakukan scan
          <i>
            <b>QR code</b>
          </i>
          . Pesanan pelanggan nantinya dapat dipantau melalui aplikasi. Ini akan memudahkan mereka untuk memesan tanpa
          harus berulang kali memanggil pramusaji.
        </Typography>
      )
    },
    {
      label: 'Selesai',
      description: () => (
        <Typography variant='subtitle2'>
          Tidak perlu khawatir, data-data tambahan dapat kamu tambahkan ketika sudah masuk ke aplikasi. Bagian ini hanya
          bertujuan untuk memberikan gambaran data yang akan di tampilkan di aplikasi pelanggan.
        </Typography>
      )
    }
  ])
  const [step, setStep] = useState<number>(1)

  return (
    <Container>
      <Box sx={{ mt: 6 }}>
        <img src={'/images/mainLogo.png'} alt='logo' />
      </Box>
      <Box sx={{ mt: '4rem' }}>
        <Grid container spacing={10}>
          <Grid item>
            <MobilePreview />
          </Grid>
          <Grid item>
            <StepperCustom data={stepData} orientation={'vertical'} stepperProps={{ activeStep: step }} />
          </Grid>
          <Grid item xs={6}>
            {step === 0 && <RestourantForm />}
            {step === 1 && <MenuForm />}
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
              <Button variant='contained' color='primary' sx={{ px: 10 }}>
                Selesai
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <br />
      <br />
    </Container>
  )
}

Onboarding.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Onboarding
