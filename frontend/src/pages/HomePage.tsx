import React from 'react'
import { Box, Typography, Button, Container, Grid, Card, CardContent, Dialog, DialogContent, IconButton } from '@mui/material'
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
const shimmer = keyframes`
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
`

const features = [
    { title: 'Книги', desc: 'Учебники, словари, классика в оригинале', emoji: '🏛️', label: 'Bibliothēkē' },
]

const bookPages = [
    '/assets/page1.jpeg',
    '/assets/page2.jpeg',
    '/assets/page3.jpeg',
    '/assets/page4.jpeg',
    '/assets/page5.jpeg',
    '/assets/page6.jpeg',
]

const testimonials = [
    { name: 'Анна К.',    text: 'Через полгода смогла читать Платона в оригинале. Невероятный опыт.', city: 'Москва' },
    { name: 'Сергей М.', text: 'Лучшая структура курса из всех, что я пробовал. Язык ожил.',         city: 'Санкт-Петербург' },
    { name: 'Мария Д.',  text: 'Преподаватели влюблены в предмет — это чувствуется в каждом уроке.', city: 'Киев' },
]

const meanderPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 h10 v-10 h20 v20 h-10 v10 h-20 v-20 h10' fill='none' stroke='%23C9A84C' stroke-width='1.5' opacity='0.3'/%3E%3C/svg%3E")`

const courseDescription: Array<{ caps?: string; rest: string } | string> = [
    'Вы точно сможете выучить греческий язык.',
    { caps: 'С ЧЕГО НАЧИНАЕМ:', rest: ' с нуля.' },
    { caps: 'К ЧЕМУ ПРИХОДИМ:', rest: ' уровень базового знания греческого языка.' },
    { caps: 'ЗАНЯТИЯ:', rest: ' самостоятельно, в любое удобное время.' },
    { caps: 'СКОЛЬКО ВРЕМЕНИ НУЖНО:', rest: ' 45 дней, по 30 мин. - 1,5 часа в день.' },
    'Четкий план работы и конкретные задания на каждый день. Домашка и проверка. Постоянная поддержка преподавателя, обратная связь.',
    { caps: 'СТОИМОСТЬ:', rest: ' 30 евро.' },
    'Курс греческого языка для начинающих с нуля и продолжающих (уровни А1+А2), 45 лекций для самостоятельных занятий с видео- и аудио-материалами, домашними заданиями и ответами, обратная связь с учителем. Над ним можно работать полностью самостоятельно, в любое удобное время и в любом темпе, даже с полного нуля. Учимся читать, писать, говорить и понимать по-гречески!',
    '«Греческий за 45 дней» — это ПОШАГОВОЕ пособие, которое плавно перемещает вас от начала (А0), когда у вас совсем нет никаких знаний греческого языка, к полусреднему уровню (А2), когда вы уже будете знать все главные грамматические темы, иметь серьёзный запас лексики, понимать на слух долгие диалоги, писать разнообразные предложения и тексты, и, конечно же, разговаривать. Курс учитывает все аспекты, необходимые для грамотного самостоятельного освоения языка.',
    'В каждой лекции – всего их 45 — формируется цель дня, даётся план выполнения и материалы для занятия; есть домашние задания и ключи к ним. Если у вас возник вопрос – немедленно обращайтесь ко мне (контакты даны в конце книги)!',
    'Присутствуют ссылки на видео- и аудио-ресурсы. Все ссылки представлены также в форме QR-кодов, удобных для считывания мобильным устройством.',
    'Курс рассчитан на взрослых русскоязычных учеников, но подойдёт и детям с 11 лет.',
]

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

const HeroVideo = () => {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const [hovered, setHovered] = React.useState(false)

    const handleEnter = () => {
        setHovered(true)
        const v = videoRef.current
        if (!v) return
        v.muted = false
        v.currentTime = 0
        v.play().catch(() => {})
    }

    const handleLeave = () => {
        setHovered(false)
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
            videoRef.current.muted = true
        }
    }

    return (
        <Box
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            sx={{
                position: 'absolute',
                left: { xs: '50%', md: '57%' },
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                width: { xs: 240, md: 320, lg: 400 },
                cursor: 'pointer',
            }}
        >
            {/* Смайлик "наведи мышку" */}
            <Box sx={{
                position: 'absolute',
                bottom: -3,
                left: 'calc(50% + 8px)',
                transform: 'translateX(-50%)',
                zIndex: 4,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                opacity: hovered ? 0 : 1,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
            }}>
                <Typography sx={{ fontSize: '2rem', lineHeight: 1, animation: `${slideUp} 1s ease infinite alternate` }}>
                    ❤️
                </Typography>
                <Typography sx={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                    color: '#0B1F3A',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    background: 'rgba(248,245,238,0.92)',
                    px: 1.5, py: 0.5,
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}>наведи мышку</Typography>
            </Box>

            {/* Первый кадр видео — всегда виден как постер */}
            {/* Само видео — стоит пока не навели */}
            <Box
                ref={videoRef}
                component="video"
                loop
                playsInline
                muted
                preload="auto"
                sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    filter: 'drop-shadow(0 16px 40px rgba(11,31,58,0.3))',
                    transition: 'filter 0.3s ease',
                }}
            >
                <source src="/assets/ZoyaTalk2.webm" type="video/webm" />
                <source src="/assets/ZoyaVideoTalk.mp4" type="video/mp4" />
            </Box>
        </Box>
    )
}

const HomePage = () => {
    const [pagesOpen, setPagesOpen] = React.useState(false)
    const [currentPage, setCurrentPage] = React.useState(0)
    const [zoomed, setZoomed] = React.useState(false)
    const [scale, setScale] = React.useState(1)
    const [dragging, setDragging] = React.useState(false)
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })
    const [dragMode, setDragMode] = React.useState(false)
    const imgContainerRef = React.useRef<HTMLDivElement>(null)

    const handleWheel = React.useCallback((e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault()
        setScale(s => {
            const next = e.deltaY < 0 ? s + 0.1 : s - 0.1
            const clamped = Math.min(5, Math.max(0.5, next))
            if (clamped <= 1) { setZoomed(false); setDragMode(false) }
            else setZoomed(true)
            return clamped
        })
    }, [])

    return (
        <Box sx={{ fontFamily: '"Cormorant Garamond", serif' }}>
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
                                <Typography variant="overline" sx={{ color: '#C9A84C', letterSpacing: '0.25em', fontSize: '0.7rem', fontFamily: '"Cinzel", serif', display: 'block', mb: 3, opacity: 0, animation: `${slideUp} 0.8s ease 0.2s forwards` }}>
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
                                    {/* Кнопка с анимированным греческим меандром */}
                                    <Box
                                        component={Link}
                                        to="/books"
                                        sx={{
                                            display: 'inline-block',
                                            textDecoration: 'none',
                                            position: 'relative',
                                            bgcolor: '#0B1F3A',
                                            px: 5, py: 2.5,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            overflow: 'hidden',
                                            '&:hover': { bgcolor: '#1B3A6A', boxShadow: '0 4px 24px rgba(201,168,76,0.3)' },
                                        }}
                                    >
                                        {/* Меандр сверху — анимация слева направо */}
                                        <Box sx={{
                                            position: 'absolute', top: 0, left: 0, right: 0, height: '10px',
                                            overflow: 'hidden',
                                        }}>
                                            <Box sx={{
                                                height: '10px',
                                                width: '200%',
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='10' viewBox='0 0 40 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 h5 v-5 h10 v10 h-5 v-5 h-5 M20 5 h5 v-5 h10 v10 h-5 v-5 h-5' fill='none' stroke='%23C9A84C' stroke-width='1.5'/%3E%3C/svg%3E")`,
                                                backgroundRepeat: 'repeat-x',
                                                backgroundSize: '40px 10px',
                                                animation: `${marquee} 6s linear infinite`,
                                            }} />
                                        </Box>
                                        {/* Меандр снизу — анимация справа налево */}
                                        <Box sx={{
                                            position: 'absolute', bottom: 0, left: 0, right: 0, height: '10px',
                                            overflow: 'hidden',
                                        }}>
                                            <Box sx={{
                                                height: '10px',
                                                width: '200%',
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='10' viewBox='0 0 40 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 h5 v-5 h10 v10 h-5 v-5 h-5 M20 5 h5 v-5 h10 v10 h-5 v-5 h-5' fill='none' stroke='%23C9A84C' stroke-width='1.5'/%3E%3C/svg%3E")`,
                                                backgroundRepeat: 'repeat-x',
                                                backgroundSize: '40px 10px',
                                                animation: `${marquee} 6s linear infinite reverse`,
                                            }} />
                                        </Box>
                                        {/* Текст */}
                                        <Box sx={{ textAlign: 'center', px: 1, py: 0.5 }}>
                                            <Typography sx={{
                                                fontFamily: '"Cinzel", serif',
                                                fontSize: '0.6rem', letterSpacing: '0.3em',
                                                color: '#C9A84C', mb: 0.5,
                                            }}>✦ КУПИТЬ ✦</Typography>
                                            <Typography sx={{
                                                fontFamily: '"Cormorant Garamond", serif',
                                                fontSize: '1.1rem', fontWeight: 700,
                                                color: '#F8F5EE', lineHeight: 1.3,
                                            }}>Интенсивный курс</Typography>
                                            <Typography sx={{
                                                fontFamily: '"Cormorant Garamond", serif',
                                                fontSize: '1rem', fontStyle: 'italic',
                                                color: '#F8F5EE', lineHeight: 1.3,
                                            }}>«Греческий за 45 дней»</Typography>
                                            <Typography sx={{
                                                fontFamily: '"Cinzel", serif',
                                                fontSize: '0.6rem', letterSpacing: '0.2em',
                                                color: '#C9A84C', mt: 0.5,
                                            }}>УРОВНИ А1 · А2</Typography>
                                        </Box>
                                    </Box>
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

                {/* ВИДЕО */}
                <HeroVideo />
            </Box>

            <MarqueeBand dark={false} />

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

            {/* FEATURES + О КУРСЕ */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F8F5EE', overflow: 'visible', overflowX: 'clip', position: 'relative' }}>
                <Container maxWidth="lg" sx={{ overflow: 'visible', position: 'relative' }}>
                    <Box sx={{ position: 'relative', mb: 4, overflow: 'visible' }}>

                        {/* Заголовок */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="overline" sx={{ color: '#C9A84C', letterSpacing: '0.25em', fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}>
                                Что мы предлагаем
                            </Typography>
                            <Typography variant="h3" sx={{ color: '#0B1F3A', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, fontSize: { xs: '2rem', md: '3rem' }, mt: 1 }}>
                                О курсе:
                            </Typography>
                        </Box>

                        {/* ПРАВАЯ ВЕТКА */}
                        <Box component="img" src="/assets/olive.jpg" alt="" sx={{ position: 'absolute', right: { xs: -232, md: -312, lg: -352 }, top: 'calc(50% + 38px)', transform: 'translateY(-50%) scaleX(-1) rotate(5deg)', width: { xs: 140, md: 200, lg: 240 }, height: 'auto', pointerEvents: 'none', zIndex: 10, mixBlendMode: 'multiply', transformOrigin: 'left center', opacity: 0, animation: `${fadeInBranchRight} 1s ease 0.4s forwards, ${floatRight} 5s ease-in-out 1.4s infinite` }} />
                        {/* ЛЕВАЯ ВЕТКА */}
                        <Box component="img" src="/assets/olive.jpg" alt="" sx={{ position: 'absolute', left: { xs: -4, md: -84, lg: -124 }, top: 'calc(50% + 20px)', transform: 'translateY(-50%) rotate(8deg) scale(0.75)', width: { xs: 140, md: 200, lg: 240 }, height: 'auto', pointerEvents: 'none', zIndex: 9, mixBlendMode: 'multiply', transformOrigin: 'right center', opacity: 0, animation: `${fadeInBranch} 1s ease 0.6s forwards, ${floatLeft} 6s ease-in-out 1.6s infinite` }} />
                        {/* ДОПОЛНИТЕЛЬНАЯ ПРАВАЯ ВЕТКА */}
                        <Box component="img" src="/assets/olive.jpg" alt="" sx={{ position: 'absolute', right: { xs: -202, md: -272, lg: -312 }, top: 'calc(50% - 22px)', transform: 'translateY(-50%) scaleX(-1) rotate(8deg) scale(0.75)', width: { xs: 140, md: 200, lg: 240 }, height: 'auto', pointerEvents: 'none', zIndex: 9, mixBlendMode: 'multiply', transformOrigin: 'left center', opacity: 0, animation: `${fadeInBranchRight} 1s ease 0.8s forwards, ${floatRight} 6s ease-in-out 1.8s infinite` }} />

                        <Box sx={{ display: { xs: 'none', lg: 'block' }, position: 'absolute', top: -60, right: -20, width: 280, height: 210, zIndex: 10 }}>
                            <GreekBook mini />
                        </Box>
                    </Box>

                    {/* Карточка с текстом + статуи по бокам */}
                    <Box sx={{ mt: 4, position: 'relative' }}>
                        {/* СТАТУЯ СЛЕВА */}
                        <Box
                            component="img"
                            src="/assets/stature2.png"
                            alt=""
                            sx={{
                                position: 'absolute',
                                left: { xs: -40, md: -80, lg: -100 },
                                bottom: 0,
                                height: { xs: '300px', md: '440px', lg: '520px' },
                                width: 'auto',
                                opacity: 0.95,
                                pointerEvents: 'none',
                                userSelect: 'none',
                                zIndex: 5,
                                filter: 'drop-shadow(0 12px 28px rgba(11,31,58,0.15))',
                            }}
                        />

                        {/* СТАТУЯ СПРАВА (зеркальная) */}
                        <Box
                            component="img"
                            src="/assets/stature2.png"
                            alt=""
                            sx={{
                                position: 'absolute',
                                right: { xs: -40, md: -80, lg: -100 },
                                bottom: 0,
                                height: { xs: '300px', md: '440px', lg: '520px' },
                                width: 'auto',
                                opacity: 0.95,
                                pointerEvents: 'none',
                                userSelect: 'none',
                                zIndex: 5,
                                transform: 'scaleX(-1)',
                                filter: 'drop-shadow(0 12px 28px rgba(11,31,58,0.15))',
                            }}
                        />

                        <Grid container spacing={3} justifyContent="center">
                            {features.map((f) => (
                                <Grid key={f.title} size={{ xs: 12, md: 10 }} sx={{ mx: 'auto' }}>
                                    <Card sx={{ height: '100%', border: '1px solid rgba(201,168,76,0.25)', borderTop: '3px solid #C9A84C', bgcolor: '#FFFFFF', p: 1, transition: 'all 0.3s ease', '&:hover': { borderTopColor: '#1B8FE0', transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(27,143,224,0.12)' } }}>
                                        <CardContent sx={{ p: 4 }}>
                                            {courseDescription.map((item, j) => (
                                                typeof item === 'string' ? (
                                                    <Typography key={j} sx={{ fontFamily: '"Lato", sans-serif', fontSize: '1.08rem', color: '#3A5A82', lineHeight: 2.0, mb: 2 }}>
                                                        {item}
                                                    </Typography>
                                                ) : (
                                                    <Typography key={j} sx={{ fontFamily: '"Lato", sans-serif', fontSize: '1.08rem', color: '#3A5A82', lineHeight: 2.0, mb: 2 }}>
                                                        <Box component="span" sx={{
                                                            fontFamily: '"Cinzel", serif',
                                                            fontSize: '1rem',
                                                            fontWeight: 700,
                                                            background: 'linear-gradient(90deg, #C9A84C 0%, #F5D78E 25%, #0d3d7a 50%, #F5D78E 75%, #C9A84C 100%)',
                                                            backgroundSize: '200% auto',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            backgroundClip: 'text',
                                                            animation: `${shimmer} 3s linear ${j * 0.3}s infinite`,
                                                            letterSpacing: '0.08em',
                                                        }}>
                                                            {item.caps}
                                                        </Box>
                                                        {item.rest}
                                                    </Typography>
                                                )
                                            ))}
                                            {/* Кнопка просмотра страниц */}
                                            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(201,168,76,0.2)', display: 'flex', justifyContent: 'center' }}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => { setCurrentPage(0); setPagesOpen(true); }}
                                                    sx={{
                                                        borderColor: '#C9A84C',
                                                        color: '#0B1F3A',
                                                        px: 5, py: 1.6,
                                                        fontFamily: '"Cinzel", serif',
                                                        fontSize: '1.1rem',
                                                        letterSpacing: '0.12em',
                                                        borderRadius: 0,
                                                        borderWidth: '1.5px',
                                                        '&:hover': { bgcolor: 'rgba(201,168,76,0.08)', borderWidth: '1.5px' },
                                                    }}
                                                >
                                                    📖 Просмотр страниц книги
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>

            {/* МОДАЛЬНОЕ ОКНО — ПРОСМОТР СТРАНИЦ */}
            <Dialog
                open={pagesOpen}
                onClose={() => { setPagesOpen(false); setZoomed(false); setScale(1); setDragMode(false); }}
                maxWidth={false}
                fullScreen
                PaperProps={{
                    sx: { bgcolor: '#060E1C', borderRadius: 0, overflow: 'hidden' }
                }}
            >
                <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                    {/* Верхняя панель */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 1.5, borderBottom: '1px solid rgba(201,168,76,0.2)', flexShrink: 0 }}>
                        <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 700, color: '#F8F5EE' }}>
                            «Греческий за 45 дней» &nbsp;
                            <Box component="span" sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.65rem', color: '#C9A84C', letterSpacing: '0.2em' }}>
                                {currentPage + 1} / {bookPages.length}
                                {scale !== 1 && ` · ${Math.round(scale * 100)}%`}
                            </Box>
                        </Typography>
                        <IconButton onClick={() => { setPagesOpen(false); setZoomed(false); setScale(1); setDragMode(false); }} sx={{ color: '#F8F5EE' }}>
                            <Typography sx={{ fontSize: '1.4rem', lineHeight: 1 }}>✕</Typography>
                        </IconButton>
                    </Box>

                    {/* Страница — занимает всё доступное место */}
                    <Box
                        ref={imgContainerRef}
                        sx={{
                            flex: 1,
                            overflow: zoomed ? 'auto' : 'hidden',
                            display: 'flex',
                            alignItems: zoomed ? 'flex-start' : 'center',
                            justifyContent: 'center',
                            cursor: dragMode && zoomed ? (dragging ? 'grabbing' : 'grab') : (zoomed ? 'zoom-out' : 'default'),
                            p: zoomed ? 2 : 0,
                            userSelect: 'none',
                        }}
                        onMouseDown={(e) => {
                            if (!dragMode || !zoomed) return
                            setDragging(true)
                            const el = imgContainerRef.current!
                            setDragStart({ x: e.clientX + el.scrollLeft, y: e.clientY + el.scrollTop })
                        }}
                        onMouseMove={(e) => {
                            if (!dragging || !dragMode) return
                            const el = imgContainerRef.current!
                            el.scrollLeft = dragStart.x - e.clientX
                            el.scrollTop = dragStart.y - e.clientY
                        }}
                        onMouseUp={() => setDragging(false)}
                        onMouseLeave={() => setDragging(false)}
                        onWheel={handleWheel}
                        onClick={() => { if (!dragMode && zoomed) { setZoomed(false); setScale(1) } }}
                    >
                        <Box
                            component="img"
                            src={bookPages[currentPage]}
                            alt={`Страница ${currentPage + 1}`}
                            sx={{
                                width: zoomed ? 'auto' : '100%',
                                height: zoomed ? 'auto' : '100%',
                                maxWidth: zoomed ? 'none' : '100%',
                                maxHeight: zoomed ? 'none' : '100%',
                                objectFit: zoomed ? 'none' : 'contain',
                                transform: `scale(${scale})`,
                                transformOrigin: 'top left',
                                transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                display: 'block',
                                userSelect: 'none',
                                pointerEvents: 'none',
                            }}
                        />
                    </Box>

                    {/* Нижняя панель */}
                    <Box sx={{ flexShrink: 0, borderTop: '1px solid rgba(201,168,76,0.2)', px: 3, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                        <Button
                            onClick={(e) => { e.stopPropagation(); setCurrentPage(p => Math.max(0, p - 1)); setZoomed(false); setScale(1); setDragMode(false); }}
                            disabled={currentPage === 0}
                            variant="outlined"
                            sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem', color: '#F8F5EE', borderColor: 'rgba(201,168,76,0.5)', borderRadius: 0, minWidth: 100 }}
                        >← Назад</Button>

                        {/* Кнопки управления */}
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            {/* Лупа */}
                            <IconButton
                                onClick={(e) => { e.stopPropagation(); if (zoomed) { setZoomed(false); setScale(1); setDragMode(false); } else { setZoomed(true); setScale(2.2); } }}
                                sx={{
                                    color: zoomed ? '#C9A84C' : '#F8F5EE',
                                    border: '1px solid',
                                    borderColor: zoomed ? '#C9A84C' : 'rgba(255,255,255,0.3)',
                                    borderRadius: '50%',
                                    width: 48, height: 48,
                                    transition: 'all 0.2s ease',
                                    '&:hover': { borderColor: '#C9A84C', color: '#C9A84C' },
                                }}
                            >
                                <Typography sx={{ fontSize: '1.3rem', lineHeight: 1 }}>{zoomed ? '🔍✕' : '🔍'}</Typography>
                            </IconButton>
                            {/* Рука — перетаскивание (только когда увеличено) */}
                            {zoomed && (
                                <IconButton
                                    onClick={(e) => { e.stopPropagation(); setDragMode(d => !d); }}
                                    sx={{
                                        color: dragMode ? '#C9A84C' : '#F8F5EE',
                                        border: '1px solid',
                                        borderColor: dragMode ? '#C9A84C' : 'rgba(255,255,255,0.3)',
                                        borderRadius: '50%',
                                        width: 48, height: 48,
                                        transition: 'all 0.2s ease',
                                        '&:hover': { borderColor: '#C9A84C', color: '#C9A84C' },
                                    }}
                                >
                                    <Typography sx={{ fontSize: '1.3rem', lineHeight: 1 }}>✋</Typography>
                                </IconButton>
                            )}
                        </Box>

                        <Button
                            onClick={(e) => { e.stopPropagation(); setCurrentPage(p => Math.min(bookPages.length - 1, p + 1)); setZoomed(false); setScale(1); setDragMode(false); }}
                            disabled={currentPage === bookPages.length - 1}
                            variant="outlined"
                            sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem', color: '#F8F5EE', borderColor: 'rgba(201,168,76,0.5)', borderRadius: 0, minWidth: 100 }}
                        >Вперёд →</Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* PHILOSOPHY */}
            <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: '#0B1F3A', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
                <Box component="video" autoPlay muted loop playsInline sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.3 }}>
                    <source src="/assets/hero-video.mp4" type="video/mp4" />
                </Box>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: meanderPattern, backgroundSize: '40px 40px', opacity: 0.15, zIndex: 1 }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="overline" sx={{ color: '#C9A84C', letterSpacing: '0.25em', fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}>Наша философия</Typography>
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

            {/* TESTIMONIALS */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F8F5EE' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography variant="overline" sx={{ color: '#C9A84C', letterSpacing: '0.25em', fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}>Отзывы</Typography>
                        <Typography variant="h3" sx={{ fontFamily: '"Cormorant Garamond", serif', color: '#0B1F3A', fontWeight: 600, fontSize: { xs: '2rem', md: '3rem' }, mt: 1 }}>Голоса учеников</Typography>
                    </Box>
                    <Grid container spacing={3} justifyContent="center">
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
                <Box component="img" src="/assets/olive.jpg" alt="" sx={{ position: 'relative', top: '38px', transform: 'rotate(-5deg)', width: { xs: 140, md: 200 }, height: 'auto', mixBlendMode: 'multiply', transformOrigin: 'right center', opacity: 0, animation: `${fadeInBranch} 1s ease 0.3s forwards, ${floatLeft} 5s ease-in-out 1.3s infinite` }} />
                <Box component="img" src="/assets/olive.jpg" alt="" sx={{ position: 'relative', top: '38px', transform: 'scaleX(-1) rotate(-5deg)', width: { xs: 140, md: 200 }, height: 'auto', mixBlendMode: 'multiply', transformOrigin: 'left center', opacity: 0, animation: `${fadeInBranchRight} 1s ease 0.5s forwards, ${floatRight} 5s ease-in-out 1.5s infinite` }} />
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
