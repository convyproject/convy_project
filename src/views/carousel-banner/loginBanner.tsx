import Carousel from 'react-material-ui-carousel'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

interface BannerType {
    name: string;
    url: string
}

const Img = styled('img')(() => ({
    objectFit:'contain',
    maxWidth:'30rem',
}))

function LoginBanner() {
    const banners: BannerType[] = [
        {
            name: 'Banner1',
            url: '/images/banner/Banner1.png' 
        },
        {
            name: 'Banner2',
            url: '/images/banner/Banner2.png' 
        }
    ]

    return (
        <Box sx={{height:'100vh', overflow:'hidden'}} >
            <Carousel
                indicatorContainerProps={{
                    style: {
                        position:'absolute',
                        bottom:'50px',
                        zIndex:99,
                        margin:0
                    }
                }} 
            >
                {
                    banners.map( (item: BannerType, i: number) => {
                    return (
                        <Box 
                            key={i} 
                            sx={{
                                backgroundColor:'#1ABC9C', 
                                height:'100vh', 
                                display:'flex', 
                                justifyContent:'center', 
                                alignItems:'center'
                                }} 
                            >
                                <div>
                                    <Img alt={item.name} src={item.url} />
                                </div>
                        </Box>
                    )})
                }
            </Carousel>
        </Box>
    )
}

export default LoginBanner