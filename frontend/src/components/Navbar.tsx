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
                    sx={{ flexGrow: 1, fontWeight: 700, color: 'white', textDecoration: 'none', letterSpacing: 2 }}
                >
                    ΕΛΛΗΝΙΚΑ
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button color="inherit" component={Link} to="/courses">Курсы</Button>
                    <Button color="inherit" component={Link} to="/books">Книги</Button>
                    <Button color="inherit" component={Link} to="/blog">Блог</Button>
                    <Button color="inherit" component={Link} to="/contact">Контакты</Button>
                    <Button color="inherit" component={Link} to="/login">Войти</Button>
                    <Button variant="outlined" color="inherit" component={Link} to="/register"
                            sx={{ borderColor: '#C9A84C', color: '#C9A84C' }}>
                        Регистрация
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