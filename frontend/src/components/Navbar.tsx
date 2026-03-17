import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ bgcolor: '#1A2A40' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1, fontWeight: 700, color: 'white', textDecoration: 'none', letterSpacing: 2, fontFamily: '"Cinzel", serif', fontSize: '1.2rem' }}
                >
                    ΕΛΛΗΝΙΚΑ
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/"
                            sx={{ fontFamily: '"Cinzel", serif', fontSize: '1.05rem', letterSpacing: '0.12em' }}>
                        Главная
                    </Button>
                    <Button color="inherit" component={Link} to="/contact"
                            sx={{ fontFamily: '"Cinzel", serif', fontSize: '1.05rem', letterSpacing: '0.12em' }}>
                        Контакты
                    </Button>
                    {/* ✅ Купить курс → /login, Регистрация убрана */}
                    <Button variant="outlined" component={Link} to="/login"
                            sx={{
                                borderColor: '#C9A84C', color: '#C9A84C',
                                fontFamily: '"Cinzel", serif', fontSize: '1.05rem',
                                letterSpacing: '0.12em', borderRadius: 0,
                                '&:hover': { bgcolor: 'rgba(201,168,76,0.1)', borderColor: '#C9A84C' },
                            }}>
                        Купить курс
                    </Button>
                    <IconButton color="inherit" component={Link} to="/books">
                        <Badge badgeContent={0} color="error">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar