// ** React Imports
import { useState } from 'react'

// ** MUI Components
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import CartOutline from 'mdi-material-ui/CartOutline'
import Magnify from 'mdi-material-ui/Magnify'

const MobileContainer = styled('div')(() => ({
  width: '240px',
  height: '474px',
  backgroundColor: '#FFF',
  border: '10px solid #000',
  borderRadius: '20px',
  padding: '1rem'
}))

const DayButton = styled(Chip)(() => ({
  boxShadow: '0px 3px 2px 0px rgb(58 53 65 / 10%)',
  backgroundColor: '#F8F8F9',
  color: 'rgba(76, 78, 100, 0.5)',
  fontWeight: 600,
  textTransform: 'capitalize',
  cursor: 'pointer',
  fontSize: '12px',
  width: 'fit-content'
}))

const MenuTag = styled(Chip)(({ theme }) => ({
  boxShadow: '0px 3px 2px 0px rgb(58 53 65 / 10%)',
  backgroundColor: '#F8F8F9',
  color: 'rgba(76, 78, 100, 0.5)',
  fontWeight: 600,
  textTransform: 'capitalize',
  width: 'fit-content',
  padding: theme.spacing(0),
  fontSize: '.65rem'
  //   height: '20px',
  //   'MuiChip-label': {
  //     padding: '0.5rem'
  //   }
}))

// type Props = {}

const CardMenu = () => {
  return (
    <Card sx={{ width: '90px' }}>
      <CardMedia sx={{ height: '5rem' }} image='/images/cards/watch-on-hand.jpg' />
      <CardContent sx={{ padding: theme => `${theme.spacing(1, 1, 1)} !important` }}>
        <Typography variant='subtitle2' sx={{ marginBottom: 2, fontSize: '0.75rem', color: 'black.main' }}>
          Salad
        </Typography>
        <Typography variant='subtitle2' sx={{ marginBottom: 2, fontSize: '0.50rem' }}>
          Terdiri dari bayam, sawi, tomat, minyak zaitun
        </Typography>
        <Typography variant='subtitle2' sx={{ marginBottom: 2, color: 'primary.main', fontSize: '0.75rem' }}>
          Rp. 50.000
        </Typography>
        <Grid container spacing={1}>
          <Grid item>
            <MenuTag size='small' label='Sehat' />
          </Grid>
          <Grid item>
            <MenuTag label='Diet' />
          </Grid>
          <Grid item>
            <MenuTag label='Sayuran' />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const MobilePreview = () => {
  // ** State
  const [filterList] = useState<string[]>(['populer', 'makanan', 'minuman'])
  const [currentFilter, setCurrentFilter] = useState<string>('')
  const [menuList, setMenuList] = useState(['', ''])
  console.log('See here')

  return (
    <MobileContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src='/images/icons/addLogo.svg' alt='Add Photo' width={'35px'} />
        <CartOutline sx={{ fontSize: '25px', color: 'primary.main' }} />
      </Box>
      <form onSubmit={() => null}>
        <FormControl fullWidth sx={{ my: 2 }}>
          <OutlinedInput
            placeholder='Search'
            sx={{ height: '2rem', fontSize: '12px' }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton edge='end'>
                  <Magnify />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          paddingBottom: '10px',
          overflow: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '::-webkit-scrollbar': { width: 0, height: 0 }
        }}
      >
        {filterList.map((item, index) => (
          <DayButton
            onClick={() => setCurrentFilter(item === currentFilter ? '' : item)}
            key={index}
            label={item}
            sx={{
              backgroundColor: currentFilter === item ? 'primary.main' : null,
              color: currentFilter === item ? '#FFFFFF' : null
            }}
          />
        ))}
      </Box>
      <Grid container spacing={2}>
        {menuList.map((item, index) => (
          <Grid key={index} item>
            <CardMenu />
          </Grid>
        ))}
      </Grid>
    </MobileContainer>
  )
}

export default MobilePreview
