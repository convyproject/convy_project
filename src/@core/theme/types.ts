declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      main: string
      tableHeaderBg: string
      primaryGradient: string
    }
    link: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
    black: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
  }
  interface PaletteOptions {
    customColors?: {
      main?: string
      tableHeaderBg?: string
      primaryGradient?: string
    }
    link?: Palette['link']
  }
  interface PaletteOptions {
    customColors?: {
      main?: string
      tableHeaderBg?: string
      primaryGradient?: string
    }
    black?: Palette['black']
  }
}

// Update the Typography's color prop options
declare module '@mui/material/Typography' {
  interface ButtonPropsColorOverrides {
    link: true
  }
}

export {}
