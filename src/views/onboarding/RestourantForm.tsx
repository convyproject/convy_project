import React, { useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'

// ** Constant Imports
import { indonesianPhoneRegex } from 'src/constant/regex'

const DayButton = styled(Chip)(() => ({
  boxShadow: '0px 3px 2px 0px rgb(58 53 65 / 10%)',
  backgroundColor: '#F8F8F9',
  color: 'rgba(76, 78, 100, 0.5)',
  fontWeight: 600,
  textTransform: 'capitalize',
  cursor: 'pointer'
}))

const DropZoneArea = styled('div')(() => ({
  border: '0.5px dashed #5b5b5b',
  borderRadius: '8px',
  width: '200px',
  height: '200px'
}))

// type Props = {
//   data: any
// }

const RestourantForm = () => {
  // ** Hooks
  const {
    register,
    // handleSubmit,
    // getValues,
    // setError,
    formState: { errors }
  } = useForm({ mode: 'onChange' })
  const { getRootProps, getInputProps } = useDropzone()

  // ** State
  const [days] = useState<{ value: number; title: string }[]>([
    {
      value: 1,
      title: 'senin'
    },
    {
      value: 2,
      title: 'selasa'
    },
    {
      value: 3,
      title: 'rabu'
    },
    {
      value: 4,
      title: 'kamis'
    },
    {
      value: 5,
      title: 'jumat'
    },
    {
      value: 6,
      title: 'sabtu'
    },
    {
      value: 7,
      title: 'minggu'
    }
  ])
  const [dayValue, setDayValue] = useState<number[]>([])

  const handleClickDay = (id: number) => {
    if (dayValue.indexOf(id) < 0) {
      setDayValue([...dayValue, id])
    } else {
      const newDayValue = dayValue.filter(el => el !== id)
      setDayValue(newDayValue)
    }
  }

  const handleClickAddData = () => {
    console.log('See here')
  }

  return (
    <Box>
      <Card>
        <CardHeader title='Data Restoran' />
        <CardContent>
          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <TextField
              {...register('name', { required: 'Kolom input tidak boleh kosong' })}
              error={Boolean(errors.name)}
              autoFocus
              fullWidth
              id='name'
              label='Nama Restoran'
            />
            <FormHelperText sx={{ color: 'error.main' }}>{errors.name?.message}</FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 4 }}>
            <TextField
              {...register('address', { required: 'Kolom input tidak boleh kosong' })}
              error={Boolean(errors.address)}
              autoFocus
              fullWidth
              id='address'
              label='Alamat Restoran'
            />
            <FormHelperText sx={{ color: 'error.main' }}>{errors.address?.message}</FormHelperText>
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
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant='subtitle2' sx={{ mb: 2 }}>
              Pilih Hari Buka
            </Typography>
            <Grid container spacing={2}>
              {days.map((item, index) => (
                <Grid item key={index}>
                  <DayButton
                    onClick={() => handleClickDay(item.value)}
                    label={item.title}
                    sx={{
                      backgroundColor: dayValue.indexOf(item.value) >= 0 ? 'primary.main' : null,
                      color: dayValue.indexOf(item.value) >= 0 ? '#FFFFFF' : null
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Grid container spacing={2} sx={{ marginBottom: 4 }}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  {...register('openTime', { required: 'Kolom input tidak boleh kosong' })}
                  error={Boolean(errors.openTime)}
                  autoFocus
                  fullWidth
                  id='openTime'
                  label='Jam Buka'
                />
                <FormHelperText sx={{ color: 'error.main' }}>{errors.openTime?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  {...register('closeTime', { required: 'Kolom input tidak boleh kosong' })}
                  error={Boolean(errors.closeTime)}
                  autoFocus
                  fullWidth
                  id='closeTime'
                  label='Jam Tutup'
                />
                <FormHelperText sx={{ color: 'error.main' }}>{errors.closeTime?.message}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Card sx={{ width: 'fit-content', padding: '.5rem 1rem' }}>
            <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 500 }}>
              Unggah Logo
            </Typography>
            <DropZoneArea {...getRootProps()}>
              <input {...getInputProps()} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1rem',
                  height: '100%'
                }}
              >
                <img src='/images/icons/addImage.svg' alt='Add Logo' />
                <Typography sx={{ fontSize: '10px', textAlign: 'center', mt: 2, p: 2 }}>
                  <b>Seret dan lepas berkas disini</b>, atau tekan untuk memilih berkas{' '}
                </Typography>
              </Box>
            </DropZoneArea>
          </Card>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' color='secondary' onClick={handleClickAddData}>
              + Tambahkan
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RestourantForm
