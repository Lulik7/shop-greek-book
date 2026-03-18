import React from 'react'
import { Box, Typography } from '@mui/material'
import { keyframes } from '@mui/system'

const glowBorder = keyframes`
    0%   { border-color: rgba(245,215,142,0.4); box-shadow: 0 0 6px rgba(245,215,142,0.2); }
    25%  { border-color: rgba(245,215,142,1);   box-shadow: 0 0 20px rgba(245,215,142,0.7), 0 0 40px rgba(245,215,142,0.3); }
    50%  { border-color: rgba(245,215,142,0.4); box-shadow: 0 0 6px rgba(245,215,142,0.2); }
    75%  { border-color: rgba(255,235,180,1);   box-shadow: 0 0 30px rgba(255,235,180,0.8), 0 0 60px rgba(245,215,142,0.4); }
    100% { border-color: rgba(245,215,142,0.4); box-shadow: 0 0 6px rgba(245,215,142,0.2); }
`

const ShopBanner = () => {
    const [visible, setVisible] = React.useState(false)
    const [dismissed, setDismissed] = React.useState(false)

    React.useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 3000)
        return () => clearTimeout(timer)
    }, [])

    if (dismissed) return null

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 32,
            right: 0,
            zIndex: 1000,
            transform: visible ? 'translateX(0)' : 'translateX(110%)',
            transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'flex',
            alignItems: 'center',
            filter: 'drop-shadow(-4px 8px 20px rgba(11,31,58,0.6))',
        }}>
            {/* Треугольник-хвост слева */}
            <Box sx={{
                width: 0, height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderRight: '12px solid #F5D78E',
                flexShrink: 0,
            }} />

            <Box sx={{
                bgcolor: '#0D3060',
                border: '2px solid #F5D78E',
                borderLeft: 'none',
                px: 2.5, py: 1.8,
                maxWidth: 240,
                position: 'relative',
                animation: `${glowBorder} 2.5s ease-in-out infinite`,
            }}>
                {/* Кнопка закрыть */}
                <Box
                    onClick={() => setDismissed(true)}
                    sx={{
                        position: 'absolute', top: 6, right: 8,
                        cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.85rem', lineHeight: 1,
                        '&:hover': { color: '#fff' },
                    }}
                >✕</Box>

                <Typography sx={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: '#F5D78E',
                    mb: 0.8,
                    textTransform: 'uppercase',
                }}>
                    💡 Знаете ли вы?
                </Typography>

                <Typography sx={{
                    fontFamily: '"Lato", sans-serif',
                    fontSize: '0.85rem',
                    color: '#FFFFFF',
                    lineHeight: 1.6,
                    mb: 1.2,
                    fontWeight: 500,
                }}>
                    У нас есть еще магазин с другими книгами и курсами!
                </Typography>

                <Box
                    component="a"
                    href="https://zoegreek.eu/shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontFamily: '"Cinzel", serif',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        color: '#F5D78E',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(245,215,142,0.6)',
                        pb: 0.2,
                        '&:hover': { color: '#fff', borderBottomColor: '#fff' },
                    }}
                >
                    zoegreek.eu/shop →
                </Box>
            </Box>
        </Box>
    )
}

export default ShopBanner