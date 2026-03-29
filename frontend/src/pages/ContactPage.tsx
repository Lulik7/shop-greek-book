

import { useState, useEffect, useRef } from 'react'
import { Box, Typography, Container, Grid, TextField, Button, CircularProgress } from '@mui/material'
import { keyframes } from '@mui/system'
import { Helmet } from 'react-helmet-async'



const marquee = keyframes`
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
`
const charAppear = keyframes`
    from { opacity: 0; transform: translateY(8px) rotate(-3deg); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0) rotate(0deg); filter: blur(0); }
`
const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
`
const drawLine = keyframes`
    from { width: 0; opacity: 0; }
    to   { width: 100%; opacity: 1; }
`
const goldShimmer = keyframes`
    0%   { border-color: rgba(201,168,76,0.3); box-shadow: 0 0 10px rgba(201,168,76,0.1); }
    25%  { border-color: rgba(245,215,142,0.9); box-shadow: 0 0 25px rgba(201,168,76,0.5), inset 0 0 15px rgba(201,168,76,0.1); }
    50%  { border-color: rgba(201,168,76,0.3); box-shadow: 0 0 10px rgba(201,168,76,0.1); }
    75%  { border-color: rgba(255,235,180,1);   box-shadow: 0 0 35px rgba(245,215,142,0.6), inset 0 0 20px rgba(201,168,76,0.15); }
    100% { border-color: rgba(201,168,76,0.3); box-shadow: 0 0 10px rgba(201,168,76,0.1); }
`
const meanderPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 h10 v-10 h20 v20 h-10 v10 h-20 v-20 h10' fill='none' stroke='%23C9A84C' stroke-width='1.5' opacity='0.3'/%3E%3C/svg%3E")`

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const quotes = [
    { text: 'Γνῶθι σεαυτόν',             author: '— Дельфийский оракул', translation: 'Познай самого себя' },
    { text: 'Ἓν οἶδα ὅτι οὐδὲν οἶδα',   author: '— Σωκράτης',           translation: 'Я знаю, что ничего не знаю' },
    { text: 'Ἄνθρωπος ζῷον πολιτικόν',   author: '— Ἀριστοτέλης',        translation: 'Человек — существо политическое' },
    { text: 'Πάντα ῥεῖ καὶ οὐδὲν μένει', author: '— Ἡράκλειτος',         translation: 'Всё течёт, ничто не остаётся' },
    { text: 'Μηδὲν ἄγαν',                author: '— Δελφοί',              translation: 'Ничего сверх меры' },
    { text: 'Ἀρχὴ ἥμισυ παντός',          author: '— Πλάτων',              translation: 'Начало — половина всего' },
]

const contacts = [
    { icon: '📍', title: 'НАШ АДРЕС',     lines: [' Верия, Северная Греция'] },
    { icon: '🕐', title: 'ВРЕМЯ РАБОТЫ',  lines: ['ПН-СБ: 9:00 - 18:00', 'ВС: выходной'] },
    { icon: '📞', title: 'СВЯЗЬ',         lines: [ 'Viber/Telegram/WhatsApp:', '+306982104110'] },
    { icon: '✉️', title: 'НАПИШИТЕ НАМ', lines: ['info@zoegreek.eu', 'zoepavlovska@gmail.com'] },
]

const useInView = (threshold = 0.3) => {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
    return { ref, inView }
}

const MarqueeBand = ({ dark = false }: { dark?: boolean }) => {
    const segment = '𐆊 ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ 𐆊 ꩜ 𐆊 ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ 𐆊 ꩜ '
    const repeated = segment.repeat(4)
    return (
        <Box sx={{
            bgcolor: dark ? '#0B1F3A' : '#C9A84C',
            overflow: 'hidden', py: 1.3,
            borderTop: dark ? 'none' : '1px solid rgba(201,168,76,0.5)',
            borderBottom: dark ? 'none' : '1px solid rgba(201,168,76,0.5)',
        }}>
            <Box sx={{ display: 'flex', width: 'max-content', animation: `${marquee} 30s linear infinite` }}>
                <Typography sx={{
                    fontFamily: '"Cinzel", serif', fontSize: '0.72rem', letterSpacing: '0.22em',
                    color: dark ? '#C9A84C' : '#0B1F3A', whiteSpace: 'nowrap', userSelect: 'none',
                }}>
                    {repeated}
                </Typography>
            </Box>
        </Box>
    )
}

const FormTitle = () => {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
            { threshold: 0.4 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])
    return (
        <Box ref={ref} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', gap: { xs: 0, md: 3 } }}>
            {['Форма', 'обращения'].map((word, wi) => {
                const offset = wi === 0 ? 0 : 'Форма'.length + 1
                return (
                    <Box key={wi} sx={{ display: 'flex' }}>
                        {word.split('').map((char, ci) => (
                            <Box key={ci} component="span" sx={{
                                fontFamily: '"Great Vibes", cursive',
                                fontSize: { xs: '3.2rem', md: '5rem' },
                                fontWeight: 400, color: '#F8F5EE',
                                letterSpacing: '0.02em', display: 'inline-block', opacity: 0,
                                animation: inView
                                    ? `${charAppear} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${(offset + ci) * 0.06}s forwards`
                                    : 'none',
                                textShadow: '0 2px 20px rgba(201,168,76,0.3)',
                            }}>
                                {char}
                            </Box>
                        ))}
                    </Box>
                )
            })}
        </Box>
    )
}

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)
    const [error, setError] = useState('')
    const { ref: wisdomRef, inView: wisdomInView } = useInView(0.3)

    const handleSubmit = async () => {
        setError('')
        if (!form.name || !form.email || !form.message) {
            setError('Пожалуйста, заполните все поля')
            return
        }
        setSending(true)
        try {
            const ejs = (window as any).emailjs
            if (!ejs) throw new Error('EmailJS not loaded')
            ejs.init(EMAILJS_PUBLIC_KEY)
            await ejs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                { name: form.name, email: form.email, message: form.message, reply_to: form.email }
            )
            setSent(true)
        } catch (e) {
            console.error('EmailJS error:', e)
            setError('Ошибка отправки. Попробуйте снова или напишите нам напрямую.')
        } finally {
            setSending(false)
        }
    }

    return (
        <Box sx={{ fontFamily: '"Cormorant Garamond", serif', bgcolor: '#F8F5EE', minHeight: '100vh' }}>

            {/*-------------------meta tags*/}
            <Helmet>
                <title>Контакты · Зоя Павловская</title>
                <meta name="description" content="Свяжитесь с преподавателем греческого языка Зоей Павловской." />
            </Helmet>

            {/*------------------meta tags*/}


            {/* HERO */}
            <Box sx={{ position: 'relative', bgcolor: '#0B1F3A', py: { xs: 4, md: 7 }, overflow: 'hidden', textAlign: 'center' }}>
                <Box component="video" autoPlay muted loop playsInline sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.4, objectPosition: 'center top' }}>
                    <source src="/assets/parfenonvideo.mp4" type="video/mp4" />
                </Box>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: meanderPattern, backgroundSize: '40px 40px', opacity: 0.15, zIndex: 1 }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem', letterSpacing: '0.35em', color: '#C9A84C', mb: 3, animation: `${fadeUp} 0.8s ease 0.1s both` }}>
                        СВЯЖИТЕСЬ С НАМИ
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 3 }}>
                        {'Контакты'.split('').map((char, i) => (
                            <Box key={i} component="span" sx={{
                                fontFamily: '"Great Vibes", cursive',
                                fontSize: { xs: '3rem', md: '4.5rem' },
                                fontWeight: 400, color: '#F8F5EE',
                                letterSpacing: '0.04em', display: 'inline-block', opacity: 0,
                                animation: `${charAppear} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.3 + i * 0.1}s forwards`,
                                textShadow: '0 2px 20px rgba(201,168,76,0.3)',
                            }}>{char}</Box>
                        ))}
                    </Box>
                    <Box sx={{ width: 0, height: '2px', mx: 'auto', mb: 4, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', animation: `${drawLine} 1s ease 1.5s forwards` }} />
                    <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: '1.2rem', md: '1.6rem' }, fontStyle: 'italic', color: '#C9A84C', animation: `${fadeUp} 0.8s ease 1.8s both`, opacity: 0 }}>
                        «Φίλος ἀνὴρ — φίλη γλῶσσα»
                    </Typography>
                    <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', mt: 1, animation: `${fadeUp} 0.8s ease 2s both`, opacity: 0 }}>
                        «Друг — это дружественный язык»
                    </Typography>
                </Container>
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)', zIndex: 2 }} />
            </Box>

            <MarqueeBand dark={false} />

            {/* БЛОК КОНТАКТОВ */}
            <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F8F5EE' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {contacts.map((c, i) => (
                            <Grid key={c.title} size={{ xs: 12, sm: 6, md: 3 }}>
                                <Box sx={{
                                    p: 3, border: '1px solid rgba(201,168,76,0.2)', borderTop: '3px solid #C9A84C',
                                    bgcolor: 'rgba(255,255,255,0.92)', height: '100%', transition: 'all 0.3s ease',
                                    animation: `${fadeUp} 0.6s ease ${i * 0.15}s both`, opacity: 0,
                                    '&:hover': { boxShadow: '0 8px 30px rgba(11,31,58,0.1)', transform: 'translateY(-4px)' },
                                }}>
                                    <Typography sx={{ fontSize: '2.2rem', mb: 1.5 }}>{c.icon}</Typography>
                                    <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.85rem', letterSpacing: '0.2em', color: '#C9A84C', mb: 1.5 }}>
                                        {c.title}
                                    </Typography>
                                    {c.lines.map((line, j) => (
                                        <Typography key={j} sx={{ fontFamily: '"Lato", sans-serif', fontSize: '1.1rem', color: '#3A5A82', lineHeight: 1.9 }}>
                                            {line}
                                        </Typography>
                                    ))}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ЦИТАТЫ */}
            <Box ref={wisdomRef} sx={{ bgcolor: '#0B1F3A', py: { xs: 6, md: 8 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: meanderPattern, backgroundSize: '40px 40px', opacity: 0.12 }} />
                <Container maxWidth="lg" sx={{ position: 'relative' }}>
                    {/* Адаптивный заголовок — каждое слово на своей строке на мобильных */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', gap: { xs: 0, md: 3 }, mb: 2 }}>
                        {['Мудрость', 'древних'].map((word, wi) => {
                            const offset = wi === 0 ? 0 : 'Мудрость'.length + 1
                            return (
                                <Box key={wi} sx={{ display: 'flex' }}>
                                    {word.split('').map((char, ci) => (
                                        <Box key={ci} component="span" sx={{
                                            fontFamily: '"Great Vibes", cursive', fontSize: { xs: '3rem', md: '4.5rem' },
                                            fontWeight: 400, color: '#F8F5EE', letterSpacing: '0.04em', display: 'inline-block',
                                            opacity: wisdomInView ? undefined : 0,
                                            animation: wisdomInView ? `${charAppear} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${(offset + ci) * 0.08}s forwards` : 'none',
                                            textShadow: '0 2px 20px rgba(201,168,76,0.3)',
                                        }}>
                                            {char}
                                        </Box>
                                    ))}
                                </Box>
                            )
                        })}
                    </Box>
                    <Box sx={{ width: wisdomInView ? undefined : 0, height: '2px', mx: 'auto', mb: 5, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: wisdomInView ? undefined : 0, animation: wisdomInView ? `${drawLine} 1s ease 1.3s forwards` : 'none' }} />
                    <Grid container spacing={3}>
                        {quotes.map((q, i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Box sx={{ height: 160, perspective: '1000px', animation: `${fadeUp} 0.6s ease ${i * 0.1}s both`, opacity: 0, cursor: 'pointer', '&:hover .flip-inner': { transform: 'rotateY(180deg)' } }}>
                                    <Box className="flip-inner" sx={{ position: 'relative', width: '100%', height: '100%', transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)', transformStyle: 'preserve-3d' }}>
                                        <Box sx={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', p: 3, textAlign: 'center', border: '1px solid rgba(201,168,76,0.15)', bgcolor: 'rgba(201,168,76,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontStyle: 'italic', color: '#C9A84C', mb: 1, lineHeight: 1.4 }}>{q.text}</Typography>
                                            <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{q.author}</Typography>
                                        </Box>
                                        <Box sx={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', p: 3, textAlign: 'center', bgcolor: '#C9A84C', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontStyle: 'italic', color: '#0B1F3A', mb: 1, fontWeight: 600 }}>{q.translation}</Typography>
                                            <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.6rem', color: 'rgba(11,31,58,0.6)', letterSpacing: '0.1em' }}>{q.author}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ФОРМА */}
            <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#0B1F3A', position: 'relative', overflow: 'hidden' }}>
                <Box component="video" autoPlay muted loop playsInline sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.35 }}>
                    <source src="/assets/korablik.mp4" type="video/mp4" />
                </Box>
                <Box sx={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0.3) 50%, rgba(11,31,58,0.7) 100%)' }} />
                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ textAlign: 'center', mb: 5 }}>
                        <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.85rem', letterSpacing: '0.3em', color: '#C9A84C', mb: 2 }}>
                            НАПИШИТЕ НАМ
                        </Typography>
                        <FormTitle />
                        <Box sx={{ width: 60, height: 2, bgcolor: '#C9A84C', mx: 'auto', mt: 2 }} />
                    </Box>

                    {sent ? (
                        <Box sx={{ textAlign: 'center', p: 5, border: '1px solid rgba(201,168,76,0.3)', bgcolor: 'rgba(255,255,255,0.05)' }}>
                            <Typography sx={{ fontSize: '3rem', mb: 2 }}>✦</Typography>
                            <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', color: '#F8F5EE', fontWeight: 600 }}>
                                Сообщение отправлено!
                            </Typography>
                            <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.9rem', color: 'rgba(248,245,238,0.6)', mt: 1 }}>
                                Мы свяжемся с вами в ближайшее время.
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.05)', border: '2px solid rgba(201,168,76,0.3)', borderTop: '3px solid #C9A84C', backdropFilter: 'blur(10px)', animation: `${goldShimmer} 3s ease-in-out infinite` }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {[
                                    { label: 'Ваше имя',       key: 'name',    type: 'text',  multiline: false },
                                    { label: 'Email',           key: 'email',   type: 'email', multiline: false },
                                    { label: 'Ваше сообщение', key: 'message', type: 'text',  multiline: true  },
                                ].map(({ label, key, type, multiline }) => (
                                    <TextField key={key} label={label} type={type}
                                               value={form[key as keyof typeof form]}
                                               onChange={e => setForm({ ...form, [key]: e.target.value })}
                                               fullWidth variant="outlined" multiline={multiline} rows={multiline ? 5 : undefined}
                                               sx={{
                                                   '& .MuiOutlinedInput-root': { borderRadius: 0, fontFamily: '"Lato", sans-serif', color: '#F8F5EE', '& fieldset': { borderColor: 'rgba(201,168,76,0.3)' }, '&:hover fieldset': { borderColor: '#C9A84C' }, '&.Mui-focused fieldset': { borderColor: '#C9A84C' } },
                                                   '& .MuiInputLabel-root': { color: 'rgba(248,245,238,0.5)' },
                                                   '& .MuiInputLabel-root.Mui-focused': { color: '#C9A84C' },
                                               }}
                                    />
                                ))}
                                {error && (
                                    <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.85rem', color: '#FF6B6B', textAlign: 'center' }}>
                                        {error}
                                    </Typography>
                                )}
                                <Button onClick={handleSubmit} disabled={sending} variant="contained" sx={{
                                    bgcolor: '#C9A84C', color: '#0B1F3A', py: 2,
                                    fontFamily: '"Cinzel", serif', fontSize: '1.1rem',
                                    letterSpacing: '0.2em', borderRadius: 0, fontWeight: 700,
                                    '&:hover': { bgcolor: '#F5D78E' },
                                    '&:disabled': { bgcolor: 'rgba(201,168,76,0.5)' },
                                    transition: 'all 0.3s ease',
                                }}>
                                    {sending ? <CircularProgress size={22} sx={{ color: '#0B1F3A' }} /> : 'Отправить сообщение'}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Container>
            </Box>

            {/* FOOTER */}
            <Box sx={{ height: 3, background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)' }} />
            <Box sx={{ bgcolor: '#060E1C', py: 3, textAlign: 'center' }}>
                <Typography sx={{ fontFamily: '"Cinzel", serif', color: 'rgba(201,168,76,0.6)', fontSize: '1.2rem', letterSpacing: '0.3em' }}>ΕΛΛΗΝΙΚΑ</Typography>
                <Typography sx={{ fontFamily: '"Lato", sans-serif', color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', mt: 1, letterSpacing: '0.1em' }}>© 2026 · Все права защищены</Typography>
            </Box>
        </Box>
    )
}

export default ContactPage
