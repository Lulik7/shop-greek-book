import React from 'react'
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material'
import { Link } from 'react-router-dom'
import { keyframes } from '@mui/system'
import GreekBook from '../components/GreekBook'

const slideUp = keyframes`
    from { transform: translateY(120px); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
`
const marquee = keyframes`
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
`
const writeLeft = keyframes`
    from { clip-path: inset(0 100% 0 0); }
    to   { clip-path: inset(0 0% 0 0); }
`
const drawLine = keyframes`
    from { width: 0; opacity: 0; }
    to   { width: 100%; opacity: 1; }
`
const penBlink = keyframes`
    0%, 49%  { opacity: 1; }
    50%, 100% { opacity: 0; }
`
const penDot = keyframes`
    0%   { transform: translateX(-100%); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateX(0%);   opacity: 0; }
`
const floatLeft = keyframes`
    0%   { transform: rotate(-2deg) translateY(0px); }
    33%  { transform: rotate(-1deg) translateY(-6px); }
    66%  { transform: rotate(-3deg) translateY(-3px); }
    100% { transform: rotate(-2deg) translateY(0px); }
`
const floatRight = keyframes`
    0%   { transform: scaleX(-1) rotate(-2deg) translateY(0px); }
    33%  { transform: scaleX(-1) rotate(-1deg) translateY(-6px); }
    66%  { transform: scaleX(-1) rotate(-3deg) translateY(-3px); }
    100% { transform: scaleX(-1) rotate(-2deg) translateY(0px); }
`
const fadeInBranch = keyframes`
    from { opacity: 0; transform: rotate(-2deg) translateY(12px); }
    to   { opacity: 1; transform: rotate(-2deg) translateY(0px); }
`
const fadeInBranchRight = keyframes`
    from { opacity: 0; transform: scaleX(-1) rotate(-2deg) translateY(12px); }
    to   { opacity: 1; transform: scaleX(-1) rotate(-2deg) translateY(0px); }
`

const features = [
    { title: 'Курсы',    desc: 'От алфавита до свободного чтения Гомера', emoji: '📚', label: 'Mathēmata' },
    { title: 'Книги',    desc: 'Учебники, словари, классика в оригинале',  emoji: '🏛️', label: 'Bibliothēkē' },
    { title: 'Культура', desc: 'Мифология, история, философия Греции',     emoji: '🌿', label: 'Mousikē' },
]

const testimonials = [
    { name: 'Анна К.',    text: 'Через полгода смогла читать Платона в оригинале. Невероятный опыт.', city: 'Москва' },
    { name: 'Сергей М.', text: 'Лучшая структура курса из всех, что я пробовал. Язык ожил.',         city: 'Санкт-Петербург' },
    { name: 'Мария Д.',  text: 'Преподаватели влюблены в предмет — это чувствуется в каждом уроке.', city: 'Киев' },
]

const meanderPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 h10 v-10 h20 v20 h-10 v10 h-20 v-20 h10' fill='none' stroke='%23C9A84C' stroke-width='1.5' opacity='0.3'/%3E%3C/svg%3E")`

// ─── Компонент заголовка с эффектом пера ──────────────────────────────────
const HandwrittenTitle = ({ children, color, delay = 0, italic = false }: {
    children: React.ReactNode
    color: string
    delay?: number
    italic?: boolean
}) => (
    <Box sx={{ position: 'relative', display: 'inline-block', overflow: 'visible' }}>
        <Typography
            variant="h1"
            sx={{
                fontWeight: italic ? 400 : 700,
                fontStyle: italic ? 'italic' : 'normal',
                color,
                fontSize: { xs: '3.2rem', md: '5rem' },
                lineHeight: 1.05,
                fontFamily: '"Cormorant Garamond", serif',
                display: 'block',
                clipPath: 'inset(0 0% 0 0)',
                animation: `${writeLeft} 1.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
            }}
        >
            {children}
        </Typography>
        <Box sx={{
            position: 'absolute', top: '50%', left: 0,
            width: '6px', height: '6px', borderRadius: '50%',
            bgcolor: color, transform: 'translateY(-50%)',
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
            animation: `${penDot} 1.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
            zIndex: 10,
        }} />
        <Box sx={{
            position: 'absolute', right: '-4px', bottom: '8px',
            width: '2px', height: '0.9em', bgcolor: color, opacity: 0,
            animation: `${writeLeft} 0.01s linear ${delay + 1.55}s forwards, ${penBlink} 0.8s step-end ${delay + 1.6}s 4`,
        }} />
        <Box sx={{
            position: 'absolute', bottom: '-4px', left: 0, height: '2px',
            background: italic
                ? `linear-gradient(90deg, ${color}00, ${color}80, ${color}00)`
                : `linear-gradient(90deg, ${color}, ${color}CC, ${color}40)`,
            borderRadius: '1px', width: 0,
            animation: `${drawLine} 0.8s ease-out ${delay + 1.4}s forwards`,
        }} />
    </Box>
)

const MarqueeBand = ({ dark = false }: { dark?: boolean }) => {
    const segment = '𐆊 ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ 𐆊 ꩜ 𐆊 ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ 𐆊 ꩜ '
    const repeated = segment.repeat(4)
    return (
        <Box sx={{
            bgcolor: dark ? '#0B1F3A' : '#C9A84C',
            overflow: 'hidden', py: 1.3,
            borderTop:    dark ? 'none' : '1px solid rgba(201,168,76,0.5)',
            borderBottom: dark ? 'none' : '1px solid rgba(201,168,76,0.5)',
        }}>
            <Box sx={{ display: 'flex', width: 'max-content', animation: `${marquee} 30s linear infinite` }}>
                <Typography sx={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: '0.72rem', letterSpacing: '0.22em',
                    color: dark ? '#C9A84C' : '#0B1F3A',
                    whiteSpace: 'nowrap', userSelect: 'none',
                }}>
                    {repeated}
                </Typography>
            </Box>
        </Box>
    )
}

const GreekQuotesMarquee = () => {
    const quotes = [
        { text: 'Γνῶθι σεαυτόν',                author: '— Дельфийский оракул' },
        { text: 'Ἓν οἶδα ὅτι οὐδὲν οἶδα',      author: '— Σωκράτης' },
        { text: 'Ἄνθρωπος ζῷον πολιτικόν',      author: '— Ἀριστοτέλης' },
        { text: 'Πάντα ῥεῖ καὶ οὐδὲν μένει',    author: '— Ἡράκλειτος' },
        { text: 'Ἀρχὴ ἥμισυ παντός',             author: '— Πλάτων' },
        { text: 'Μηδὲν ἄγαν',                    author: '— Δελφοί' },
        { text: 'Ὁ ἀνεξέταστος βίος οὐ βιωτός', author: '— Σωκράτης' },
        { text: 'Ἐν ἀρχῇ ἦν ὁ Λόγος',           author: '— Εὐαγγέλιον Ἰωάννου' },
    ]
    const Segment = () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {quotes.map((q, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem', fontStyle: 'italic', color: '#C9A84C', letterSpacing: '0.04em', px: 1 }}>{q.text}</Typography>
                    <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.65rem', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.12em', px: 1 }}>{q.author}</Typography>
                    <Typography sx={{ color: 'rgba(201,168,76,0.3)', fontSize: '1.2rem', px: 2, userSelect: 'none' }}>✦</Typography>
                </Box>
            ))}
        </Box>
    )
    return (
        <Box sx={{ bgcolor: '#0B1F3A', overflow: 'hidden', py: 2, borderTop: '1px solid rgba(201,168,76,0.25)', borderBottom: '1px solid rgba(201,168,76,0.25)' }}>
            <Box sx={{ display: 'flex', width: 'max-content', animation: `${marquee} 60s linear infinite` }}>
                <Segment /><Segment />
            </Box>
        </Box>
    )
}

const HomePage = () => {
    return (
        <Box sx={{ fontFamily: '"Cormorant Garamond", serif' }}>

   {/*------------------------------------         */}

            {/* HERO */}
            <Box sx={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden', bgcolor: '#F8F5EE' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: meanderPattern, backgroundSize: '40px 40px', opacity: 0.4 }} />
                <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: { xs: '0%', md: '42%' }, clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)', overflow: 'hidden' }}>
                    <Box component="img" src="/assets/santoriny.jpg" alt="Санторини" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', animation: `${slideUp} 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both` }} />
                    <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,31,58,0.3) 0%, transparent 60%)' }} />
                </Box>

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Box sx={{ pr: { md: 6 } }}>
                                <Typography variant="overline" sx={{
                                    color: '#C9A84C', letterSpacing: '0.25em', fontSize: '0.7rem',
                                    fontFamily: '"Cinzel", serif', display: 'block', mb: 3,
                                    opacity: 0,
                                    animation: `${slideUp} 0.8s ease 0.2s forwards`,
                                }}>
                                    Древний и современный
                                </Typography>
                                <Box sx={{ mb: 1 }}>
                                    <HandwrittenTitle color="#0B1F3A" delay={0.5}>Язык богов</HandwrittenTitle>
                                </Box>
                                <Box sx={{ mb: 4 }}>
                                    <HandwrittenTitle color="#1B8FE0" delay={2.3} italic>и философов</HandwrittenTitle>
                                </Box>
                                <Box sx={{ width: 80, height: 2, bgcolor: '#C9A84C', mb: 4, opacity: 0, animation: `${drawLine} 0.6s ease 4.2s forwards` }} />
                                <Typography sx={{ color: '#3A5A82', fontSize: '1.15rem', lineHeight: 1.9, mb: 5, maxWidth: 480, fontFamily: '"Lato", sans-serif', fontWeight: 300, opacity: 0, animation: `${slideUp} 0.8s ease 4.5s forwards` }}>
                                    Откройте мир, где каждое слово несёт в себе тысячелетия.
                                    Изучайте древнегреческий — язык Гомера, Платона и Евангелия.
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', opacity: 0, animation: `${slideUp} 0.8s ease 4.8s forwards` }}>
                                    <Button variant="contained" component={Link} to="/courses" sx={{ bgcolor: '#0B1F3A', color: 'white', px: 4, py: 1.5, fontFamily: '"Cinzel", serif', fontSize: '0.75rem', letterSpacing: '0.15em', borderRadius: 0, '&:hover': { bgcolor: '#C9A84C', color: '#0B1F3A' }, transition: 'all 0.3s ease' }}>
                                        Начать обучение
                                    </Button>
                                    <Button variant="outlined" component={Link} to="/books" sx={{ borderColor: '#C9A84C', color: '#0B1F3A', px: 4, py: 1.5, fontFamily: '"Cinzel", serif', fontSize: '0.75rem', letterSpacing: '0.15em', borderRadius: 0, borderWidth: '1.5px', '&:hover': { bgcolor: 'rgba(201,168,76,0.08)', borderColor: '#C9A84C', borderWidth: '1.5px' } }}>
                                        Книжный магазин
                                    </Button>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 5, mt: 7, pt: 4, borderTop: '1px solid rgba(201,168,76,0.3)', opacity: 0, animation: `${slideUp} 0.8s ease 5.1s forwards` }}>
                                    {[{ n: '2 400+', label: 'Учеников' }, { n: '48', label: 'Курсов' }, { n: '12', label: 'Лет опыта' }].map(s => (
                                        <Box key={s.label}>
                                            <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 700, color: '#0B1F3A', lineHeight: 1 }}>{s.n}</Typography>
                                            <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: '#3A5A82', letterSpacing: '0.1em', textTransform: 'uppercase', mt: 0.5 }}>{s.label}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)' }} />
            </Box>

            <MarqueeBand dark={false} />
{/*-------------------------------------*/}
            {/* QUOTE BAND */}
            <Box sx={{ bgcolor: '#0B1F3A', py: 4, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
                <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: '1.4rem', md: '2rem' }, fontStyle: 'italic', color: '#C9A84C', letterSpacing: '0.05em', position: 'relative' }}>
                    «Γνῶθι σεαυτόν»
                </Typography>
                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', mt: 1, position: 'relative' }}>
                    Познай самого себя — Дельфийский оракул
                </Typography>
            </Box>

            {/* FEATURES + мини-книга */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F8F5EE', overflow: 'visible', overflowX: 'clip', position: 'relative' }}>
                <Container maxWidth="lg" sx={{ overflow: 'visible', position: 'relative' }}>
                    <Box sx={{ position: 'relative', mb: 4, overflow: 'visible' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="overline" sx={{ color: '#C9A84C', letterSpacing: '0.25em', fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}>
                                Что мы предлагаем
                            </Typography>
                            <Typography variant="h3" sx={{ color: '#0B1F3A', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, fontSize: { xs: '2rem', md: '3rem' }, mt: 1 }}>
                                Три пути к языку
                            </Typography>
                        </Box>

                        {/* ПРАВАЯ ВЕТКА */}
                        <Box
                            component="img"
                            src="/assets/olive.jpg"
                            alt=""
                            sx={{
                                position: 'absolute',
                                right: { xs: -232, md: -312, lg: -352 },
                                top: 'calc(50% + 38px)',
                                transform: 'translateY(-50%) scaleX(-1) rotate(5deg)',
                                width: { xs: 140, md: 200, lg: 240 },
                                height: 'auto',
                                pointerEvents: 'none',
                                zIndex: 10,
                                mixBlendMode: 'multiply',
                                transformOrigin: 'left center',
                                opacity: 0,
                                animation: `${fadeInBranchRight} 1s ease 0.4s forwards, ${floatRight} 5s ease-in-out 1.4s infinite`,
                            }}
                        />

                        {/* ЛЕВАЯ ВЕТКА */}
                        <Box
                            component="img"
                            src="/assets/olive.jpg"
                            alt=""
                            sx={{
                                position: 'absolute',
                                left: { xs: -4, md: -84, lg: -124 },
                                top: 'calc(50% + 20px)',
                                transform: 'translateY(-50%) rotate(8deg) scale(0.75)',
                                width: { xs: 140, md: 200, lg: 240 },
                                height: 'auto',
                                pointerEvents: 'none',
                                zIndex: 9,
                                mixBlendMode: 'multiply',
                                transformOrigin: 'right center',
                                opacity: 0,
                                animation: `${fadeInBranch} 1s ease 0.6s forwards, ${floatLeft} 6s ease-in-out 1.6s infinite`,
                            }}
                        />

                        {/* ДОПОЛНИТЕЛЬНАЯ ПРАВАЯ ВЕТКА */}
                        <Box
                            component="img"
                            src="/assets/olive.jpg"
                            alt=""
                            sx={{
                                position: 'absolute',
                                right: { xs: -202, md: -272, lg: -312 },
                                top: 'calc(50% - 22px)',
                                transform: 'translateY(-50%) scaleX(-1) rotate(8deg) scale(0.75)',
                                width: { xs: 140, md: 200, lg: 240 },
                                height: 'auto',
                                pointerEvents: 'none',
                                zIndex: 9,
                                mixBlendMode: 'multiply',
                                transformOrigin: 'left center',
                                opacity: 0,
                                animation: `${fadeInBranchRight} 1s ease 0.8s forwards, ${floatRight} 6s ease-in-out 1.8s infinite`,
                            }}
                        />

                        <Box sx={{ display: { xs: 'none', lg: 'block' }, position: 'absolute', top: -60, right: -20, width: 280, height: 210, zIndex: 10 }}>
                            <GreekBook mini />
                        </Box>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Grid container spacing={3}>
                            {features.map((f, i) => (
                                <Grid key={f.title} size={{ xs: 12, md: 4 }}>
                                    <Card sx={{ height: '100%', border: '1px solid rgba(201,168,76,0.25)', borderTop: '3px solid #C9A84C', bgcolor: '#FFFFFF', p: 1, transition: 'all 0.3s ease', '&:hover': { borderTopColor: '#1B8FE0', transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(27,143,224,0.12)' } }}>
                                        <CardContent sx={{ p: 4 }}>
                                            <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.65rem', color: '#C9A84C', letterSpacing: '0.2em', mb: 2, display: 'block' }}>
                                                {String(i + 1).padStart(2, '0')} — {f.label}
                                            </Typography>
                                            <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>{f.emoji}</Typography>
                                            <Typography variant="h5" sx={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 700, color: '#0B1F3A', mb: 2, fontSize: '1.6rem' }}>{f.title}</Typography>
                                            <Typography sx={{ fontFamily: '"Lato", sans-serif', color: '#3A5A82', lineHeight: 1.8, fontSize: '0.95rem' }}>{f.desc}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
{/*----------------------------------------*/}
            {/* PHILOSOPHY */}
            {/*<Box sx={{ py: { xs: 8, md: 14 }, bgcolor: '#0B1F3A', position: 'relative', overflow: 'hidden' }}>*/}
            {/*    <Box sx={{ position: 'absolute', inset: 0, backgroundImage: meanderPattern, backgroundSize: '40px 40px', opacity: 0.15 }} />*/}
            {/*    <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>*/}
            {/*        <Typography variant="overline" sx={{ color: '#C9A84C', letterSpacing: '0.25em', fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}>Наша философия</Typography>*/}
            {/*        <Typography variant="h2" sx={{ color: '#F8F5EE', fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 400, fontSize: { xs: '2rem', md: '3.2rem' }, lineHeight: 1.4, mt: 2, mb: 4 }}>*/}
            {/*            "Язык — это не просто слова.<br />Это мышление цивилизации"*/}
            {/*        </Typography>*/}
            {/*        <Box sx={{ width: 60, height: 2, bgcolor: '#C9A84C', mx: 'auto', mb: 4 }} />*/}
            {/*        <Typography sx={{ fontFamily: '"Lato", sans-serif', color: 'rgba(248,245,238,0.7)', fontSize: '1.05rem', lineHeight: 1.9, maxWidth: 600, mx: 'auto', fontWeight: 300 }}>*/}
            {/*            Мы убеждены: изучать греческий — значит думать иначе.*/}
            {/*            Каждый урок открывает не просто грамматику, но целый способ*/}
            {/*            видеть мир — через призму тех, кто заложил основы западной мысли.*/}
            {/*        </Typography>*/}
            {/*    </Container>*/}
            {/*</Box>*/}

            {/* PHILOSOPHY */}
            <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: '#0B1F3A', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>

                {/* ВИДЕО-ФОН */}
                <Box
                    component="video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        opacity: 0.3,
                    }}
                >
                    <source src="/assets/hero-video.mp4" type="video/mp4" />
                </Box>

                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: meanderPattern, backgroundSize: '40px 40px', opacity: 0.15, zIndex: 1 }} />

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="overline" sx={{ color: '#C9A84C', letterSpacing: '0.25em', fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}>
                        Наша философия
                    </Typography>
                    <Typography variant="h2" sx={{ color: '#F8F5EE', fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 400, fontSize: { xs: '2rem', md: '3.2rem' }, lineHeight: 1.4, mt: 2, mb: 4 }}>
                        "Язык — это не просто слова.<br />Это мышление цивилизации"
                    </Typography>
                    <Box sx={{ width: 60, height: 2, bgcolor: '#C9A84C', mx: 'auto', mb: 4 }} />
                    <Typography sx={{ fontFamily: '"Lato", sans-serif', color: 'rgba(248,245,238,0.7)', fontSize: '1.05rem', lineHeight: 1.9, maxWidth: 600, mx: 'auto', fontWeight: 300 }}>
                        Мы убеждены: изучать греческий — значит думать иначе.
                        Каждый урок открывает не просто грамматику, но целый способ
                        видеть мир — через призму тех, кто заложил основы западной мысли.
                    </Typography>
                </Container>

            </Box>
{/*------------------------------------------------*/}
            {/* TESTIMONIALS */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F8F5EE' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="overline" sx={{ color: '#C9A84C', letterSpacing: '0.25em', fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}>Отзывы</Typography>
                        <Typography variant="h3" sx={{ fontFamily: '"Cormorant Garamond", serif', color: '#0B1F3A', fontWeight: 600, fontSize: { xs: '2rem', md: '3rem' }, mt: 1 }}>Голоса учеников</Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {testimonials.map(t => (
                            <Grid key={t.name} size={{ xs: 12, md: 4 }}>
                                <Box sx={{ bgcolor: '#FFFFFF', p: 4, border: '1px solid rgba(201,168,76,0.2)', height: '100%' }}>
                                    <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '4rem', color: '#C9A84C', lineHeight: 0.8, mb: 2, opacity: 0.5 }}>"</Typography>
                                    <Typography sx={{ fontFamily: '"Lato", sans-serif', color: '#0B1F3A', lineHeight: 1.8, mb: 3, fontStyle: 'italic', fontSize: '0.95rem' }}>{t.text}</Typography>
                                    <Box sx={{ borderTop: '1px solid rgba(201,168,76,0.3)', pt: 2 }}>
                                        <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.75rem', color: '#0B1F3A', letterSpacing: '0.1em' }}>{t.name}</Typography>
                                        <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.7rem', color: '#3A5A82', mt: 0.3 }}>{t.city}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ВЕТКИ ПОД ГОЛОСАМИ УЧЕНИКОВ */}
            <Box sx={{ position: 'relative', bgcolor: '#F8F5EE', overflow: 'visible', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: { xs: 8, md: 16, lg: 24 }, pt: 2, pb: 0, pl: '152px' }}>
                <Box
                    component="img"
                    src="/assets/olive.jpg"
                    alt=""
                    sx={{
                        position: 'relative',
                        top: '38px',
                        transform: 'rotate(-5deg)',
                        width: { xs: 140, md: 200 },
                        height: 'auto',
                        mixBlendMode: 'multiply',
                        transformOrigin: 'right center',
                        opacity: 0,
                        animation: `${fadeInBranch} 1s ease 0.3s forwards, ${floatLeft} 5s ease-in-out 1.3s infinite`,
                    }}
                />
                <Box
                    component="img"
                    src="/assets/olive.jpg"
                    alt=""
                    sx={{
                        position: 'relative',
                        top: '38px',
                        transform: 'scaleX(-1) rotate(-5deg)',
                        width: { xs: 140, md: 200 },
                        height: 'auto',
                        mixBlendMode: 'multiply',
                        transformOrigin: 'left center',
                        opacity: 0,
                        animation: `${fadeInBranchRight} 1s ease 0.5s forwards, ${floatRight} 5s ease-in-out 1.5s infinite`,
                    }}
                />
            </Box>

            {/* CTA */}
            <Box sx={{ py: { xs: 8, md: 10 }, background: 'linear-gradient(135deg, #0B1F3A 0%, #060E1C 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.06) 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
                <Container maxWidth="sm" sx={{ position: 'relative' }}>
                    <Typography sx={{ color: '#C9A84C', fontSize: '0.75rem', letterSpacing: '0.25em', fontFamily: '"Cinzel", serif', mb: 2, display: 'block', textTransform: 'uppercase' }}>Первый шаг</Typography>
                    <Typography variant="h3" sx={{ color: '#F8F5EE', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, fontSize: { xs: '2rem', md: '2.8rem' }, mb: 3 }}>Начните сегодня</Typography>
                    <Typography sx={{ fontFamily: '"Lato", sans-serif', color: 'rgba(248,245,238,0.65)', mb: 5, fontWeight: 300, lineHeight: 1.8 }}>
                        Первый урок бесплатно. Никаких обязательств. Только вы и три тысячи лет мудрости.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button variant="contained" component={Link} to="/register" sx={{ bgcolor: '#C9A84C', color: '#0B1F3A', px: 5, py: 1.6, fontFamily: '"Cinzel", serif', fontSize: '0.75rem', letterSpacing: '0.15em', borderRadius: 0, fontWeight: 600, '&:hover': { bgcolor: '#DFC078' } }}>
                            Зарегистрироваться
                        </Button>
                        <Button variant="outlined" component={Link} to="/courses" sx={{ borderColor: 'rgba(248,245,238,0.4)', color: '#F8F5EE', px: 5, py: 1.6, fontFamily: '"Cinzel", serif', fontSize: '0.75rem', letterSpacing: '0.15em', borderRadius: 0, '&:hover': { borderColor: '#C9A84C', color: '#C9A84C' } }}>
                            Смотреть курсы
                        </Button>
                    </Box>
                </Container>
            </Box>

            <GreekQuotesMarquee />

            {/* FOOTER */}
            <Box sx={{ bgcolor: '#060E1C', py: 3, textAlign: 'center' }}>
                <Typography sx={{ fontFamily: '"Cinzel", serif', color: 'rgba(201,168,76,0.6)', fontSize: '1.2rem', letterSpacing: '0.3em' }}>ΕΛΛΗΝΙΚΑ</Typography>
                <Typography sx={{ fontFamily: '"Lato", sans-serif', color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', mt: 1, letterSpacing: '0.1em' }}>© 2026 · Все права защищены</Typography>
            </Box>

        </Box>
    )
}

export default HomePage
