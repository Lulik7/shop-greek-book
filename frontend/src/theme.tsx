import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface Palette {
        gold: Palette['primary']
        sea: Palette['primary']
    }
    interface PaletteOptions {
        gold?: PaletteOptions['primary']
        sea?: PaletteOptions['primary']
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#0B1F3A',       // тёмно-тёмно синий
            light: '#162F52',
            dark: '#060E1C',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#C9A84C',       // золотой
            light: '#DFC078',
            dark: '#A8852A',
            contrastText: '#0B1F3A',
        },
        background: {
            default: '#F4F7FB',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#0B1F3A',
            secondary: '#3A5A82',
        },
        gold: {
            main: '#C9A84C',       // золотой
            light: '#DFC078',
            dark: '#A8852A',
            contrastText: '#0B1F3A',
        },
        sea: {
            main: '#1B8FE0',       // ярко голубой
            light: '#4DAAED',
            dark: '#1070B8',
            contrastText: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: '"Cormorant Garamond", "Georgia", serif',
        h1: {
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 600,
        },
        h4: {
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 600,
        },
        h5: {
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 600,
        },
        h6: {
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 500,
        },
        overline: {
            fontFamily: '"Cinzel", serif',
            letterSpacing: '0.2em',
            fontSize: '0.7rem',
        },
        button: {
            fontFamily: '"Cinzel", serif',
            letterSpacing: '0.15em',
            fontWeight: 400,
        },
        body1: {
            fontFamily: '"Lato", sans-serif',
            lineHeight: 1.8,
        },
        body2: {
            fontFamily: '"Lato", sans-serif',
            lineHeight: 1.7,
        },
        subtitle1: {
            fontFamily: '"Lato", sans-serif',
        },
        subtitle2: {
            fontFamily: '"Lato", sans-serif',
        },
        caption: {
            fontFamily: '"Lato", sans-serif',
        },
    },
    shape: {
        borderRadius: 2,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    padding: '10px 28px',
                    textTransform: 'none',
                    fontSize: '0.8rem',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                outlined: {
                    borderWidth: '1.5px',
                    '&:hover': {
                        borderWidth: '1.5px',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: 'none',
                    border: '1px solid rgba(201, 168, 76, 0.2)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(201, 168, 76, 0.3)',
                },
            },
        },
    },
})

export default theme
