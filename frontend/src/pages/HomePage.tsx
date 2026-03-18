
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
const glowPulse = keyframes`
    0%, 100% { box-shadow: 0 0 0 2px rgba(30,120,255,0.8), 0 0 8px 2px rgba(30,120,255,0.5), 0 0 16px 4px rgba(30,120,255,0.2); }
    50%       { box-shadow: 0 0 0 2px rgba(60,160,255,1), 0 0 12px 4px rgba(60,160,255,0.8), 0 0 28px 8px rgba(60,160,255,0.4), 0 0 40px 12px rgba(60,160,255,0.15); }
`
const shimmerSlow = keyframes`
    0%   { background-position: -300% center; }
    100% { background-position: 300% center; }
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
    { name: 'Elena Komarova',    text: 'Зоя, благодарю! Вы прекрасный учитель - у меня появилось ощущение, что я и правда смогу выучить греческий)) Дали мне хороший пинок начать и теперь самое главное не останавливаться.' },
    { name: 'Liudmyla Boiko-Koasidis', text: 'Спасибо большое за Ваши лекции! Вы вывели меня из ленивого состояния и заставили снова взяться за учёбу! Буду продолжать изучение греческого, так как мне это действительно необходимо.' },
    { name: 'Natalia Natalia',  text: 'Понравились ваши видео уроки - короткие по времени, но емкие по содержанию, где мы познакомились с грамматикой и лексикой языка. Я научилась писать буквы (перестала их вырисовывать) и даже по памяти писать некоторые слова. Нравится дикция и произношение преподавателя' },
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
                fontSize: { xs: '2.4rem', md: '5rem' },
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

const HeroVideo = ({ inline = false }: { inline?: boolean }) => {
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
            sx={inline ? {
                position: 'relative',
                width: '100%',
                maxWidth: 280,
                cursor: 'pointer',
                mx: 'auto',
            } : {
                position: 'absolute',
                left: '57%',
                top: '52%',
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                width: { md: 320, lg: 400 },
                cursor: 'pointer',
            }}
        >
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

            <Box sx={{
                position: 'absolute',
                left: 58,
                top: '50%',
                transform: 'translateY(-50%) scaleX(-1)',
                zIndex: 4,
                pointerEvents: 'none',
                opacity: hovered ? 0 : 1,
                transition: 'opacity 0.3s ease',
                fontSize: '1.6rem',
                lineHeight: 1,
                filter: 'grayscale(1) brightness(0.45)',
            }}>🔊</Box>

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
            </Box>
        </Box>
    )
}

const MeanderBorder = ({ color = '%23C9A84C' }: { color?: string }) => (
    <>
        <Box sx={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '8px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='14' viewBox='0 0 40 14'%3E%3Crect x='0' y='0' width='14' height='2' fill='${color}'/%3E%3Crect x='0' y='0' width='2' height='14' fill='${color}'/%3E%3Crect x='0' y='12' width='10' height='2' fill='${color}'/%3E%3Crect x='8' y='4' width='2' height='10' fill='${color}'/%3E%3Crect x='4' y='4' width='6' height='2' fill='${color}'/%3E%3Crect x='4' y='4' width='2' height='6' fill='${color}'/%3E%3Crect x='12' y='6' width='8' height='2' fill='${color}'/%3E%3Crect x='20' y='0' width='14' height='2' fill='${color}'/%3E%3Crect x='20' y='0' width='2' height='14' fill='${color}'/%3E%3Crect x='20' y='12' width='10' height='2' fill='${color}'/%3E%3Crect x='28' y='4' width='2' height='10' fill='${color}'/%3E%3Crect x='24' y='4' width='6' height='2' fill='${color}'/%3E%3Crect x='24' y='4' width='2' height='6' fill='${color}'/%3E%3Crect x='32' y='6' width='8' height='2' fill='${color}'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '20px 8px',
        }} />
        <Box sx={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '8px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='14' viewBox='0 0 40 14'%3E%3Crect x='0' y='12' width='14' height='2' fill='${color}'/%3E%3Crect x='0' y='0' width='2' height='14' fill='${color}'/%3E%3Crect x='0' y='0' width='10' height='2' fill='${color}'/%3E%3Crect x='8' y='0' width='2' height='10' fill='${color}'/%3E%3Crect x='4' y='8' width='6' height='2' fill='${color}'/%3E%3Crect x='4' y='4' width='2' height='6' fill='${color}'/%3E%3Crect x='12' y='6' width='8' height='2' fill='${color}'/%3E%3Crect x='20' y='12' width='14' height='2' fill='${color}'/%3E%3Crect x='20' y='0' width='2' height='14' fill='${color}'/%3E%3Crect x='20' y='0' width='10' height='2' fill='${color}'/%3E%3Crect x='28' y='0' width='2' height='10' fill='${color}'/%3E%3Crect x='24' y='8' width='6' height='2' fill='${color}'/%3E%3Crect x='24' y='4' width='2' height='6' fill='${color}'/%3E%3Crect x='32' y='6' width='8' height='2' fill='${color}'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '20px 8px',
        }} />
        <Box sx={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='40' viewBox='0 0 14 40'%3E%3Crect x='0' y='0' width='2' height='14' fill='${color}'/%3E%3Crect x='0' y='0' width='14' height='2' fill='${color}'/%3E%3Crect x='12' y='0' width='2' height='10' fill='${color}'/%3E%3Crect x='4' y='8' width='10' height='2' fill='${color}'/%3E%3Crect x='4' y='4' width='2' height='6' fill='${color}'/%3E%3Crect x='4' y='4' width='6' height='2' fill='${color}'/%3E%3Crect x='6' y='12' width='2' height='8' fill='${color}'/%3E%3Crect x='0' y='20' width='2' height='14' fill='${color}'/%3E%3Crect x='0' y='20' width='14' height='2' fill='${color}'/%3E%3Crect x='12' y='20' width='2' height='10' fill='${color}'/%3E%3Crect x='4' y='28' width='10' height='2' fill='${color}'/%3E%3Crect x='4' y='24' width='2' height='6' fill='${color}'/%3E%3Crect x='4' y='24' width='6' height='2' fill='${color}'/%3E%3Crect x='6' y='32' width='2' height='8' fill='${color}'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-y',
            backgroundSize: '8px 20px',
        }} />
        <Box sx={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '8px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='40' viewBox='0 0 14 40'%3E%3Crect x='0' y='0' width='2' height='14' fill='${color}'/%3E%3Crect x='0' y='0' width='14' height='2' fill='${color}'/%3E%3Crect x='12' y='0' width='2' height='10' fill='${color}'/%3E%3Crect x='4' y='8' width='10' height='2' fill='${color}'/%3E%3Crect x='4' y='4' width='2' height='6' fill='${color}'/%3E%3Crect x='4' y='4' width='6' height='2' fill='${color}'/%3E%3Crect x='6' y='12' width='2' height='8' fill='${color}'/%3E%3Crect x='0' y='20' width='2' height='14' fill='${color}'/%3E%3Crect x='0' y='20' width='14' height='2' fill='${color}'/%3E%3Crect x='12' y='20' width='2' height='10' fill='${color}'/%3E%3Crect x='4' y='28' width='10' height='2' fill='${color}'/%3E%3Crect x='4' y='24' width='2' height='6' fill='${color}'/%3E%3Crect x='4' y='24' width='6' height='2' fill='${color}'/%3E%3Crect x='6' y='32' width='2' height='8' fill='${color}'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-y',
            backgroundSize: '8px 20px',
        }} />
    </>
)

const CourseDescriptionBlock = ({ shimmer, courseDescription, setCurrentPage, setPagesOpen, glowPulse }: any) => {
    const [expanded, setExpanded] = React.useState(false)
    const shortItems = courseDescription.slice(0, 6)
    const visibleItems = expanded ? courseDescription : shortItems

    return (
        <>
            <Box sx={{
                position: 'relative',
                overflow: 'hidden',
                transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
                {visibleItems.map((item: any, j: number) => (
                    typeof item === 'string' ? (
                        <Typography key={j} sx={{ fontFamily: '"Lato", sans-serif', fontSize: { xs: '0.95rem', md: '1.08rem' }, color: 'rgba(248,245,238,0.85)', lineHeight: 2.0, mb: 2 }}>
                            {item}
                        </Typography>
                    ) : (
                        <Typography key={j} sx={{ fontFamily: '"Lato", sans-serif', fontSize: { xs: '0.95rem', md: '1.08rem' }, color: 'rgba(248,245,238,0.85)', lineHeight: 2.0, mb: 2 }}>
                            <Box component="span" sx={{
                                fontFamily: '"Cinzel", serif',
                                fontSize: { xs: '0.8rem', md: '1rem' },
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

                {!expanded && (
                    <Box sx={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
                        background: 'linear-gradient(to bottom, transparent, #162D4E)',
                        pointerEvents: 'none',
                    }} />
                )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                <Box
                    onClick={() => setExpanded(!expanded)}
                    sx={{
                        display: 'inline-flex', alignItems: 'center', gap: 1,
                        cursor: 'pointer', color: '#C9A84C',
                        fontFamily: '"Cinzel", serif', fontSize: '0.8rem',
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        borderBottom: '1px solid rgba(201,168,76,0.4)',
                        pb: 0.3, transition: 'all 0.2s ease',
                        '&:hover': { color: '#F5D78E', borderBottomColor: '#F5D78E' },
                    }}
                >
                    {expanded ? '▲ Свернуть' : '▼ Читать подробнее'}
                </Box>
            </Box>

            <Box sx={{ mt: 2, pt: 3, borderTop: '1px solid rgba(201,168,76,0.2)', display: 'flex', justifyContent: 'center' }}>
                <Box
                    onClick={() => { setCurrentPage(0); setPagesOpen(true); }}
                    sx={{
                        display: 'inline-block', position: 'relative',
                        bgcolor: '#1B5FA8', px: { xs: 3, md: 4 }, py: 1.8,
                        cursor: 'pointer', transition: 'background-color 0.3s ease',
                        overflow: 'hidden',
                        boxShadow: '0 0 0 1.5px rgba(27,95,168,0.9), 0 0 6px 1px rgba(27,95,168,0.5)',
                        animation: `${glowPulse} 2.5s ease-in-out infinite`,
                        '&:hover': { bgcolor: '#2272C3' },
                    }}
                >
                    <MeanderBorder color="%23C9A84C" />
                    <Box sx={{ textAlign: 'center', px: 1, py: 0.5 }}>
                        <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: { xs: '0.9rem', md: '1.1rem' }, letterSpacing: '0.2em', color: '#C9A84C', fontWeight: 600 }}>
                            📖 Просмотр страниц книги
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

const SectionTitle = () => {
    const [visible, setVisible] = React.useState(false)
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
            { threshold: 0.4 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <Box ref={ref} sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
                variant="overline"
                sx={{
                    display: 'block',
                    color: '#C9A84C',
                    letterSpacing: '0.3em',
                    fontFamily: '"Cinzel", serif',
                    fontSize: '0.95rem',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
            >
                Что мы предлагаем
            </Typography>

            <Box sx={{ position: 'relative', display: 'inline-block', overflow: 'visible', mt: 1 }}>
                <Typography
                    variant="h3"
                    sx={{
                        color: '#0B1F3A',
                        fontFamily: '"Cormorant Garamond", serif',
                        fontWeight: 700,
                        fontStyle: 'italic',
                        fontSize: { xs: '2.2rem', md: '3.2rem' },
                        display: 'block',
                        clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                        transition: visible ? 'clip-path 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s' : 'none',
                    }}
                >
                    О нашем курсе:
                </Typography>
                <Box sx={{
                    position: 'absolute', top: '50%', left: 0,
                    width: '6px', height: '6px', borderRadius: '50%',
                    bgcolor: '#0B1F3A', transform: 'translateY(-50%)',
                    boxShadow: '0 0 10px #0B1F3A, 0 0 20px #0B1F3A',
                    opacity: visible ? 1 : 0,
                    animation: visible ? `${penDot} 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both` : 'none',
                    zIndex: 10,
                }} />
                <Box sx={{
                    position: 'absolute', right: '-4px', bottom: '8px',
                    width: '2px', height: '0.9em', bgcolor: '#0B1F3A', opacity: 0,
                    animation: visible ? `${writeLeft} 0.01s linear 1.75s forwards, ${penBlink} 0.8s step-end 1.8s 4` : 'none',
                }} />
                <Box sx={{
                    position: 'absolute', bottom: '-4px', left: 0, height: '2px',
                    background: 'linear-gradient(90deg, #C9A84C, #C9A84CCC, #C9A84C40)',
                    borderRadius: '1px',
                    width: 0,
                    animation: visible ? `${drawLine} 0.8s ease-out 1.6s forwards` : 'none',
                }} />
            </Box>
        </Box>
    )
}

const TestimonialsTitle = () => {
    const [visible, setVisible] = React.useState(false)
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
            { threshold: 0.4 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <Box ref={ref} sx={{ textAlign: 'center', mb: 8 }}>
            <Box sx={{ position: 'relative', display: 'inline-block', overflow: 'visible', mt: 1 }}>
                <Typography
                    variant="h3"
                    sx={{
                        color: '#0B1F3A',
                        fontFamily: '"Cormorant Garamond", serif',
                        fontWeight: 700,
                        fontStyle: 'italic',
                        fontSize: { xs: '2.2rem', md: '3.2rem' },
                        display: 'block',
                        clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                        transition: visible ? 'clip-path 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s' : 'none',
                    }}
                >
                    Отзывы учеников
                </Typography>
                <Box sx={{
                    position: 'absolute', top: '50%', left: 0,
                    width: '6px', height: '6px', borderRadius: '50%',
                    bgcolor: '#0B1F3A', transform: 'translateY(-50%)',
                    boxShadow: '0 0 10px #0B1F3A, 0 0 20px #0B1F3A',
                    opacity: visible ? 1 : 0,
                    animation: visible ? `${penDot} 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both` : 'none',
                    zIndex: 10,
                }} />
                <Box sx={{
                    position: 'absolute', right: '-4px', bottom: '8px',
                    width: '2px', height: '0.9em', bgcolor: '#0B1F3A', opacity: 0,
                    animation: visible ? `${writeLeft} 0.01s linear 1.75s forwards, ${penBlink} 0.8s step-end 1.8s 4` : 'none',
                }} />
                <Box sx={{
                    position: 'absolute', bottom: '-4px', left: 0, height: '2px',
                    background: 'linear-gradient(90deg, #C9A84C, #C9A84CCC, #C9A84C40)',
                    borderRadius: '1px',
                    width: 0,
                    animation: visible ? `${drawLine} 0.8s ease-out 1.6s forwards` : 'none',
                }} />
            </Box>
        </Box>
    )
}

const HomePage = () => {
    const [pagesOpen, setPagesOpen] = React.useState(false)
    const [currentPage, setCurrentPage] = React.useState(0)
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
            if (clamped <= 1) { setDragMode(false) }
            return clamped
        })
    }, [])

    return (
        <Box sx={{ fontFamily: '"Cormorant Garamond", serif', overflowX: 'hidden' }}>
            {/* HERO */}
            <Box sx={{ position: 'relative', minHeight: { xs: 'auto', md: '92vh' }, display: 'flex', alignItems: 'center', overflow: 'hidden', bgcolor: '#F8F5EE', pb: { xs: 6, md: 0 } }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: meanderPattern, backgroundSize: '40px 40px', opacity: 0.4 }} />

                {/* Санторини: на десктопе справа, на мобиле полупрозрачный фон на всю высоту */}
                <Box sx={{
                    position: 'absolute',
                    right: 0, top: 0, bottom: 0,
                    width: { xs: '100%', md: '42%' },
                    clipPath: { xs: 'none', md: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)' },
                    overflow: 'hidden',
                    opacity: { xs: 0.13, md: 1 },
                    pointerEvents: 'none',
                }}>
                    <Box component="img" src="/assets/santoriny.jpg" alt="Санторини" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                    <Box sx={{ position: 'absolute', inset: 0, background: { xs: 'none', md: 'linear-gradient(to right, rgba(11,31,58,0.3) 0%, transparent 60%)' } }} />
                </Box>

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Box sx={{ pr: { md: 6 }, pt: { xs: 5, md: 0 } }}>
                                <Typography variant="overline" sx={{ color: '#C9A84C', letterSpacing: '0.25em', fontSize: '0.7rem', fontFamily: '"Cinzel", serif', display: 'block', mb: 3, opacity: 0, animation: `${slideUp} 0.8s ease 0.2s forwards` }}>
                                    Такой древний и такой современный
                                </Typography>
                                <Box sx={{ mb: 1 }}>
                                    <HandwrittenTitle color="#0B1F3A" delay={0.5}>Греческий - язык богов</HandwrittenTitle>
                                </Box>
                                <Box sx={{ mb: 4 }}>
                                    <HandwrittenTitle color="#1B8FE0" delay={2.3} italic>и философов</HandwrittenTitle>
                                </Box>
                                <Box sx={{ width: 80, height: 2, bgcolor: '#C9A84C', mb: 4, opacity: 0, animation: `${drawLine} 0.6s ease 4.2s forwards` }} />

                                <Typography sx={{ color: '#3A5A82', fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.9, mb: { xs: 3, md: 5 }, maxWidth: 480, fontFamily: '"Lato", sans-serif', fontWeight: 300, opacity: 0, animation: `${slideUp} 0.8s ease 4.5s forwards` }}>
                                    Откройте мир, где каждое слово несёт в себе тысячелетия.
                                    Изучайте греческий — язык Гомера и Платона, язык моря и солнца.
                                </Typography>

                                {/* Видео — только на мобиле */}
                                <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mb: 3, opacity: 0, animation: `${slideUp} 0.8s ease 4.7s forwards` }}>
                                    <HeroVideo inline />
                                </Box>

                                {/* КНОПКА КУПИТЬ — по центру на мобиле */}
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', opacity: 0, animation: `${slideUp} 0.8s ease 4.8s forwards`, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                    <Box
                                        component={Link}
                                        to="/purchase"
                                        sx={{
                                            display: 'inline-block',
                                            textDecoration: 'none',
                                            position: 'relative',
                                            bgcolor: '#1B5FA8',
                                            px: { xs: 3, md: 5 }, py: { xs: 2, md: 2.5 },
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease',
                                            overflow: 'hidden',
                                            boxShadow: '0 0 0 1.5px rgba(27,95,168,0.9), 0 0 6px 1px rgba(27,95,168,0.5)',
                                            animation: `${glowPulse} 2.5s ease-in-out 5.5s infinite`,
                                            '&:hover': { bgcolor: '#2272C3' },
                                        }}
                                    >
                                        <MeanderBorder color="%23C9A84C" />
                                        <Box sx={{ textAlign: 'center', px: 1, py: 0.5 }}>
                                            <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: { xs: '0.9rem', md: '1.2rem' }, letterSpacing: '0.3em', color: '#C9A84C', mb: 0.5 }}>✦ КУПИТЬ ✦</Typography>
                                            <Typography sx={{
                                                fontFamily: '"Cormorant Garamond", serif',
                                                fontSize: { xs: '1.6rem', md: '2.2rem' }, fontWeight: 700, lineHeight: 1.3,
                                                background: 'linear-gradient(90deg, #F8F5EE 0%, #F8F5EE 35%, #C9A84C 48%, #FFF8DC 50%, #C9A84C 52%, #F8F5EE 65%, #F8F5EE 100%)',
                                                backgroundSize: '300% auto',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                animation: `${shimmerSlow} 14s linear 5.5s infinite`,
                                            }}>Интенсивный курс</Typography>
                                            <Typography sx={{
                                                fontFamily: '"Cormorant Garamond", serif',
                                                fontSize: { xs: '1.4rem', md: '2rem' }, fontStyle: 'italic', lineHeight: 1.3,
                                                background: 'linear-gradient(90deg, #F8F5EE 0%, #F8F5EE 35%, #C9A84C 48%, #FFF8DC 50%, #C9A84C 52%, #F8F5EE 65%, #F8F5EE 100%)',
                                                backgroundSize: '300% auto',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                animation: `${shimmerSlow} 14s linear 6s infinite`,
                                            }}>«Греческий за 45 дней»</Typography>
                                            <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: { xs: '0.9rem', md: '1.2rem' }, letterSpacing: '0.2em', color: '#C9A84C', mt: 0.5 }}>УРОВНИ А1 · А2</Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* STUDENTS */}
                                <Box sx={{ display: 'flex', gap: { xs: 3, md: 5 }, mt: { xs: 5, md: 7 }, pt: 4, borderTop: '1px solid rgba(201,168,76,0.3)', opacity: 0, animation: `${slideUp} 0.8s ease 5.1s forwards` }}>
                                    {[{ n: '2 400+', label: 'Учеников' }, { n: '48', label: 'Курсов' }, { n: '18', label: 'Лет опыта' }].map(s => (
                                        <Box key={s.label}>
                                            <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 700, color: '#0B1F3A', lineHeight: 1 }}>{s.n}</Typography>
                                            <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: '#3A5A82', letterSpacing: '0.1em', textTransform: 'uppercase', mt: 0.5 }}>{s.label}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)' }} />

                {/* Видео — только на десктопе */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <HeroVideo />
                </Box>
            </Box>

            <MarqueeBand dark={false} />

            {/* QUOTE BAND */}
            <Box sx={{ bgcolor: '#0B1F3A', py: { xs: 4, md: 5 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <Box component="img" src="/assets/prometey.jpg" alt="Прометей" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', zIndex: 0, opacity: 0.45 }} />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(11,31,58,0.6) 0%, rgba(6,14,28,0.7) 100%)', zIndex: 1 }} />
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px)`, backgroundSize: '24px 24px', zIndex: 2 }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3 }}>
                    <Typography sx={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.8rem', letterSpacing: '0.4em', mb: 2 }}>✦ ✦ ✦</Typography>
                    <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: '1.3rem', md: '2.4rem' }, fontStyle: 'italic', color: '#C9A84C', letterSpacing: '0.05em', lineHeight: 1.4, mb: 2 }}>
                        «Ἓν οἶδα ὅτι οὐδὲν οἶδα»
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 1.5 }}>
                        <Box sx={{ width: 40, height: '1px', bgcolor: 'rgba(201,168,76,0.35)' }} />
                        <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: '0.95rem', md: '1.35rem' }, fontStyle: 'italic', color: 'rgba(248,245,238,0.8)' }}>
                            «Я знаю только то, что ничего не знаю»
                        </Typography>
                        <Box sx={{ width: 40, height: '1px', bgcolor: 'rgba(201,168,76,0.35)' }} />
                    </Box>
                    <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.65rem', color: 'rgba(201,168,76,0.55)', letterSpacing: '0.25em', textTransform: 'uppercase', mt: 1.5 }}>
                        Σωκράτης · Сократ · 470–399 до н.э.
                    </Typography>
                    <Typography sx={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.8rem', letterSpacing: '0.4em', mt: 2 }}>✦ ✦ ✦</Typography>
                </Container>
            </Box>

            {/* FEATURES + О КУРСЕ */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F8F5EE', overflow: 'visible', overflowX: 'clip', position: 'relative' }}>
                <Container maxWidth="lg" sx={{ overflow: 'visible', position: 'relative' }}>
                    <Box sx={{ position: 'relative', mb: 4, overflow: 'visible' }}>
                        <SectionTitle />
                        <Box component="img" src="/assets/olive.jpg" alt="" sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', right: { md: -312, lg: -352 }, top: 'calc(50% + 38px)', transform: 'translateY(-50%) scaleX(-1) rotate(5deg)', width: { md: 200, lg: 240 }, height: 'auto', pointerEvents: 'none', zIndex: 10, mixBlendMode: 'multiply', transformOrigin: 'left center', opacity: 0, animation: `${fadeInBranchRight} 1s ease 0.4s forwards, ${floatRight} 5s ease-in-out 1.4s infinite` }} />
                        <Box component="img" src="/assets/olive.jpg" alt="" sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', left: { md: -84, lg: -124 }, top: 'calc(50% + 20px)', transform: 'translateY(-50%) rotate(8deg) scale(0.75)', width: { md: 200, lg: 240 }, height: 'auto', pointerEvents: 'none', zIndex: 9, mixBlendMode: 'multiply', transformOrigin: 'right center', opacity: 0, animation: `${fadeInBranch} 1s ease 0.6s forwards, ${floatLeft} 6s ease-in-out 1.6s infinite` }} />
                        <Box component="img" src="/assets/olive.jpg" alt="" sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', right: { md: -272, lg: -312 }, top: 'calc(50% - 22px)', transform: 'translateY(-50%) scaleX(-1) rotate(8deg) scale(0.75)', width: { md: 200, lg: 240 }, height: 'auto', pointerEvents: 'none', zIndex: 9, mixBlendMode: 'multiply', transformOrigin: 'left center', opacity: 0, animation: `${fadeInBranchRight} 1s ease 0.8s forwards, ${floatRight} 6s ease-in-out 1.8s infinite` }} />
                        <Box sx={{ display: { xs: 'none', lg: 'block' }, position: 'absolute', top: -60, right: -20, width: 280, height: 210, zIndex: 10 }}>
                            <GreekBook mini />
                        </Box>
                    </Box>

                    <Box sx={{ mt: 4, position: 'relative' }}>
                        {/* Статуи: на десктопе оригинальный размер, на мобиле/планшете скрыты */}
                        <Box component="img" src="/assets/stature2.png" alt="" sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', left: { md: -120, lg: -160 }, bottom: 0, height: { md: '440px', lg: '520px' }, width: 'auto', opacity: 0.95, pointerEvents: 'none', userSelect: 'none', zIndex: 5, filter: 'drop-shadow(0 12px 28px rgba(11,31,58,0.15))' }} />
                        <Box component="img" src="/assets/stature2.png" alt="" sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', right: { md: -120, lg: -160 }, bottom: 0, height: { md: '440px', lg: '520px' }, width: 'auto', opacity: 0.95, pointerEvents: 'none', userSelect: 'none', zIndex: 5, transform: 'scaleX(-1)', filter: 'drop-shadow(0 12px 28px rgba(11,31,58,0.15))' }} />
                        <Grid container spacing={3} justifyContent="center">
                            {features.map((f) => (
                                <Grid key={f.title} size={{ xs: 12, md: 10 }} sx={{ mx: 'auto' }}>
                                    <Card sx={{ height: '100%', border: '1px solid rgba(201,168,76,0.25)', borderTop: '3px solid #C9A84C', bgcolor: '#162D4E', p: 1, transition: 'all 0.3s ease', '&:hover': { borderTopColor: '#1B8FE0', transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(27,143,224,0.12)' } }}>
                                        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                                            <CourseDescriptionBlock
                                                shimmer={shimmer}
                                                courseDescription={courseDescription}
                                                setCurrentPage={setCurrentPage}
                                                setPagesOpen={setPagesOpen}
                                                glowPulse={glowPulse}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>

            {/* МОДАЛЬНОЕ ОКНО */}
            <Dialog
                open={pagesOpen}
                onClose={() => { setPagesOpen(false); setScale(1); setDragMode(false); }}
                maxWidth={false}
                fullScreen
                slotProps={{ paper: { sx: { bgcolor: '#1a1008', borderRadius: 0, overflow: 'hidden' } } }}
            >
                <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 2, md: 3 }, py: 1, bgcolor: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(201,168,76,0.15)', flexShrink: 0 }}>
                        <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: '0.75rem', md: '0.9rem' }, color: 'rgba(201,168,76,0.7)', letterSpacing: '0.15em', fontStyle: 'italic' }}>
                            Зоя Павловская · «Греческий за 45 дней»
                        </Typography>
                        <IconButton onClick={() => { setPagesOpen(false); setScale(1); setDragMode(false); }} sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#C9A84C' } }}>
                            <Typography sx={{ fontSize: '1.3rem', lineHeight: 1 }}>✕</Typography>
                        </IconButton>
                    </Box>

                    <Box
                        ref={imgContainerRef}
                        sx={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', p: { xs: 1, sm: 2, md: 4 }, cursor: dragMode ? (dragging ? 'grabbing' : 'grab') : 'default', userSelect: 'none' }}
                        onMouseDown={(e) => { if (!dragMode) return; setDragging(true); const el = imgContainerRef.current!; setDragStart({ x: e.clientX + el.scrollLeft, y: e.clientY + el.scrollTop }) }}
                        onMouseMove={(e) => { if (!dragging || !dragMode) return; const el = imgContainerRef.current!; el.scrollLeft = dragStart.x - e.clientX; el.scrollTop = dragStart.y - e.clientY }}
                        onMouseUp={() => setDragging(false)}
                        onMouseLeave={() => setDragging(false)}
                        onWheel={handleWheel}
                    >
                        <Box sx={{ position: 'relative', width: '100%', maxWidth: '1100px', transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
                            <Box sx={{ position: 'absolute', inset: '-16px -16px -16px -16px', borderRadius: '6px', boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.3)', background: 'linear-gradient(135deg, #8B4513 0%, #6B2E0A 30%, #5C2208 50%, #6B2E0A 70%, #8B4513 100%)' }} />
                            <Box sx={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, bgcolor: '#fff', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)' }}>
                                <Box sx={{ position: 'relative', p: { xs: '1.5em', md: '2em' }, minHeight: { xs: 'auto', md: '75vh' }, display: 'flex', flexDirection: 'column', '&::after': { content: '""', position: 'absolute', top: 0, bottom: 0, right: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.08) 80%, transparent)', display: { xs: 'none', md: 'block' } } }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '0.5em', mb: '1em', borderBottom: '1px solid #ddd' }}>
                                        <Typography sx={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#333' }}>Зоя Павловская</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {currentPage > 0 ? (
                                            <Box component="img" src={bookPages[currentPage - 1]} alt="" sx={{ maxWidth: '100%', maxHeight: { xs: '40vh', md: '65vh' }, objectFit: 'contain', display: 'block', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                                        ) : (
                                            <Box sx={{ textAlign: 'center', py: { xs: 3, md: 6 }, px: 3 }}>
                                                <Typography sx={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', mb: 4 }}>Интенсивный курс</Typography>
                                                <Typography sx={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 900, letterSpacing: '0.05em', color: '#1a1a1a', lineHeight: 1.2, textTransform: 'uppercase', mb: 3 }}>Греческий<br/>за 45 дней</Typography>
                                                <Box sx={{ width: '3em', height: '2px', bgcolor: '#1a1a1a', mx: 'auto', my: 2 }} />
                                                <Typography sx={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: '0.9rem', fontStyle: 'italic', color: '#555' }}>Зоя Павловская</Typography>
                                                <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C9A84C', mt: 3, textTransform: 'uppercase' }}>Уровни А1 · А2</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box sx={{ display: { xs: 'none', md: 'block' }, pt: '0.5em', mt: '1em', borderTop: '1px solid #ddd' }}>
                                        <Typography sx={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: '0.75rem', fontWeight: 700, color: '#555' }}>{currentPage > 0 ? currentPage : ''}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', left: '50%', top: 0, bottom: 0, width: '4em', transform: 'translateX(-50%)', background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.15) 48%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.15) 52%, rgba(0,0,0,0.04) 70%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
                                <Box sx={{ p: '2em', minHeight: { xs: 'auto', md: '75vh' }, flexDirection: 'column', display: { xs: 'none', md: 'flex' } }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: '0.5em', mb: '1em', borderBottom: '1px solid #ddd' }}>
                                        <Typography sx={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#333' }}>Греческий за 45 дней</Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box component="img" src={bookPages[currentPage]} alt={`Страница ${currentPage + 1}`} sx={{ maxWidth: '100%', maxHeight: '65vh', objectFit: 'contain', display: 'block', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: '0.5em', mt: '1em', borderTop: '1px solid #ddd' }}>
                                        <Typography sx={{ fontFamily: '"Playfair Display", "Cormorant Garamond", serif', fontSize: '0.75rem', fontWeight: 700, color: '#555' }}>{currentPage + 1}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: { xs: 'flex', md: 'none' }, p: 2, alignItems: 'center', justifyContent: 'center' }}>
                                    <Box component="img" src={bookPages[currentPage]} alt="" sx={{ maxWidth: '100%', maxHeight: '45vh', objectFit: 'contain' }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ flexShrink: 0, borderTop: '1px solid rgba(201,168,76,0.15)', bgcolor: 'rgba(0,0,0,0.4)', px: { xs: 1.5, md: 3 }, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                        <Button onClick={(e) => { e.stopPropagation(); setCurrentPage(p => Math.max(0, p - 1)); setScale(1); setDragMode(false); }} disabled={currentPage === 0} variant="outlined" sx={{ fontFamily: '"Cinzel", serif', fontSize: { xs: '0.6rem', md: '0.7rem' }, color: '#F8F5EE', borderColor: 'rgba(201,168,76,0.4)', borderRadius: 0, minWidth: { xs: 70, md: 100 }, '&:hover': { borderColor: '#C9A84C', bgcolor: 'rgba(201,168,76,0.05)' } }}>← Назад</Button>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton onClick={(e) => { e.stopPropagation(); if (scale > 1) { setScale(1); setDragMode(false); } else { setScale(1.6); } }} sx={{ color: scale > 1 ? '#C9A84C' : 'rgba(255,255,255,0.6)', border: '1px solid', borderColor: scale > 1 ? '#C9A84C' : 'rgba(255,255,255,0.2)', borderRadius: '50%', width: 36, height: 36, transition: 'all 0.2s ease', '&:hover': { borderColor: '#C9A84C', color: '#C9A84C' } }}>
                                <Typography sx={{ fontSize: '1rem', lineHeight: 1 }}>{scale > 1 ? '🔍✕' : '🔍'}</Typography>
                            </IconButton>
                            {scale > 1 && (
                                <IconButton onClick={(e) => { e.stopPropagation(); setDragMode(d => !d); }} sx={{ color: dragMode ? '#C9A84C' : 'rgba(255,255,255,0.6)', border: '1px solid', borderColor: dragMode ? '#C9A84C' : 'rgba(255,255,255,0.2)', borderRadius: '50%', width: 36, height: 36, transition: 'all 0.2s ease', '&:hover': { borderColor: '#C9A84C', color: '#C9A84C' } }}>
                                    <Typography sx={{ fontSize: '1rem', lineHeight: 1 }}>✋</Typography>
                                </IconButton>
                            )}
                        </Box>
                        <Button onClick={(e) => { e.stopPropagation(); setCurrentPage(p => Math.min(bookPages.length - 1, p + 1)); setScale(1); setDragMode(false); }} disabled={currentPage === bookPages.length - 1} variant="outlined" sx={{ fontFamily: '"Cinzel", serif', fontSize: { xs: '0.6rem', md: '0.7rem' }, color: '#F8F5EE', borderColor: 'rgba(201,168,76,0.4)', borderRadius: 0, minWidth: { xs: 70, md: 100 }, '&:hover': { borderColor: '#C9A84C', bgcolor: 'rgba(201,168,76,0.05)' } }}>Вперёд →</Button>
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
                    <Typography variant="h2" sx={{ color: '#F8F5EE', fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 400, fontSize: { xs: '1.6rem', md: '3.2rem' }, lineHeight: 1.4, mt: 2, mb: 4 }}>
                        "Язык — это не просто слова.<br />Это мышление цивилизации"
                    </Typography>
                    <Box sx={{ width: 60, height: 2, bgcolor: '#C9A84C', mx: 'auto', mb: 4 }} />
                    <Typography sx={{ fontFamily: '"Lato", sans-serif', color: 'rgba(248,245,238,0.7)', fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.9, maxWidth: 600, mx: 'auto', fontWeight: 300 }}>
                        Мы убеждены: изучать греческий — значит думать иначе.
                        Каждый урок открывает не просто грамматику, но целый способ
                        видеть мир — через призму тех, кто заложил основы западной мысли.
                    </Typography>
                </Container>
            </Box>

            {/* TESTIMONIALS */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F8F5EE' }}>
                <Container maxWidth="lg">
                    <TestimonialsTitle />
                    <Grid container spacing={3} justifyContent="center">
                        {testimonials.map(t => (
                            <Grid key={t.name} size={{ xs: 12, md: 4 }}>
                                <Box sx={{ bgcolor: '#FFFFFF', p: { xs: 3, md: 4 }, border: '1px solid rgba(201,168,76,0.2)', height: '100%' }}>
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

            {/* ВЕТКИ — только на десктопе */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, position: 'relative', bgcolor: '#F8F5EE', overflow: 'visible', justifyContent: 'center', alignItems: 'center', gap: { md: 16, lg: 24 }, pt: 2, pb: 0, pl: '152px' }}>
                <Box component="img" src="/assets/olive.jpg" alt="" sx={{ position: 'relative', top: '38px', transform: 'rotate(-5deg)', width: { md: 200 }, height: 'auto', mixBlendMode: 'multiply', transformOrigin: 'right center', opacity: 0, animation: `${fadeInBranch} 1s ease 0.3s forwards, ${floatLeft} 5s ease-in-out 1.3s infinite` }} />
                <Box component="img" src="/assets/olive.jpg" alt="" sx={{ position: 'relative', top: '38px', transform: 'scaleX(-1) rotate(-5deg)', width: { md: 200 }, height: 'auto', mixBlendMode: 'multiply', transformOrigin: 'left center', opacity: 0, animation: `${fadeInBranchRight} 1s ease 0.5s forwards, ${floatRight} 5s ease-in-out 1.5s infinite` }} />
            </Box>

            {/* КУПИТЬ КУРС */}
            <Box sx={{ py: { xs: 8, md: 10 }, background: 'linear-gradient(135deg, #0B1F3A 0%, #060E1C 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.06) 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
                <Container maxWidth="sm" sx={{ position: 'relative' }}>
                    <Typography sx={{ color: '#C9A84C', fontSize: '0.75rem', letterSpacing: '0.25em', fontFamily: '"Cinzel", serif', mb: 2, display: 'block', textTransform: 'uppercase' }}>Первый шаг</Typography>
                    <Typography variant="h3" sx={{ color: '#F8F5EE', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, fontSize: { xs: '1.8rem', md: '2.8rem' }, mb: 3 }}>Начните сегодня</Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Box component={Link} to="/purchase" sx={{ display: 'inline-block', textDecoration: 'none', position: 'relative', bgcolor: '#C9A84C', px: { xs: 3, md: 5 }, py: 2, cursor: 'pointer', transition: 'background-color 0.3s ease', overflow: 'hidden', boxShadow: '0 0 0 1.5px rgba(27,95,168,0.9), 0 0 6px 1px rgba(27,95,168,0.5)', animation: `${glowPulse} 2.5s ease-in-out infinite`, '&:hover': { bgcolor: '#DFC078' } }}>
                            <MeanderBorder color="%230B1F3A" />
                            <Box sx={{ textAlign: 'center', px: 1, py: 0.5 }}>
                                <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: { xs: '0.85rem', md: '1rem' }, letterSpacing: '0.25em', color: '#0B1F3A', fontWeight: 700 }}>✦ КУПИТЬ КУРС ✦</Typography>
                            </Box>
                        </Box>
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
