import { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const navItems = [
    { label: 'Главная',  to: '/' },
    { label: 'Контакты', to: '/contact' },
]

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: '#1A2A40' }}>
                <Toolbar>
                    {/* Логотип */}
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1, fontWeight: 700, color: 'white',
                            textDecoration: 'none', letterSpacing: 2,
                            fontFamily: '"Cinzel", serif', fontSize: { xs: '1rem', md: '1.2rem' },
                        }}
                    >
                        ΕΛΛΗΝΙΚΑ
                    </Typography>

                    {/* Десктоп меню */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                        {navItems.map(item => (
                            <Button key={item.to} color="inherit" component={Link} to={item.to}
                                    sx={{ fontFamily: '"Cinzel", serif', fontSize: '1.05rem', letterSpacing: '0.12em' }}>
                                {item.label}
                            </Button>
                        ))}
                        <Button variant="outlined" component={Link} to="/login"
                                sx={{
                                    borderColor: '#C9A84C', color: '#C9A84C',
                                    fontFamily: '"Cinzel", serif', fontSize: '1.05rem',
                                    letterSpacing: '0.12em', borderRadius: 0,
                                    '&:hover': { bgcolor: 'rgba(201,168,76,0.1)', borderColor: '#C9A84C' },
                                }}>
                            Купить курс
                        </Button>
                    </Box>

                    {/* Мобильный бургер */}
                    <IconButton
                        color="inherit"
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Мобильное меню */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
                    PaperProps={{ sx: { bgcolor: '#1A2A40', width: 240 } }}>
                <List sx={{ pt: 4 }}>
                    {navItems.map(item => (
                        <ListItem key={item.to} disablePadding>
                            <ListItemButton component={Link} to={item.to} onClick={() => setDrawerOpen(false)}>
                                <ListItemText primary={item.label} primaryTypographyProps={{
                                    fontFamily: '"Cinzel", serif', fontSize: '1rem',
                                    letterSpacing: '0.12em', color: 'white',
                                }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding sx={{ mt: 2, px: 2 }}>
                        <Button fullWidth variant="outlined" component={Link} to="/login"
                                onClick={() => setDrawerOpen(false)}
                                sx={{
                                    borderColor: '#C9A84C', color: '#C9A84C',
                                    fontFamily: '"Cinzel", serif', fontSize: '0.9rem',
                                    letterSpacing: '0.12em', borderRadius: 0,
                                    '&:hover': { bgcolor: 'rgba(201,168,76,0.1)' },
                                }}>
                            Купить курс
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default Navbar
