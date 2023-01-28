import React from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'

// ** Constant Imports

const DropZoneArea = styled('div')(() => ({
  border: '0.5px dashed #5b5b5b',
  borderRadius: '8px'
}))

// type Props = {
//   data: any
// }

const AddMenuForm = () => {
  // ** Hooks
  const {
    register,
    // handleSubmit,
    // getValues,
    // setError,
    formState: { errors }
  } = useForm({ mode: 'onChange' })
  const { getRootProps, getInputProps } = useDropzone()

  return (
    <Card sx={{ width: 'fit-content', padding: '.5rem 1rem' }}>
      <DropZoneArea {...getRootProps()}>
        <input {...getInputProps()} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            gap: '1rem'
          }}
        >
          <img src='/images/icons/noImageBlue.svg' width={100} alt='No Image' />
          <Button variant='contained' color='primary'>
            Unggah
          </Button>
        </Box>
      </DropZoneArea>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
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
      <FormControl fullWidth sx={{ marginTop: 2 }}>
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
      <FormControl fullWidth sx={{ marginTop: 2 }}>
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
      <FormControl fullWidth sx={{ marginTop: 2 }}>
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', mt: 2 }}>
        <Button variant='outlined'>Batal</Button>
        <Button variant='contained' color='primary'>
          Simpan
        </Button>
      </Box>
    </Card>
  )
}

const MenuForm = () => {
  return (
    <Box>
      <Card>
        <CardHeader title='Data Menu' />
        <CardContent>
          <Grid container spacing={4}>
            <Grid xs={6} item>
              <AddMenuForm />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default MenuForm
