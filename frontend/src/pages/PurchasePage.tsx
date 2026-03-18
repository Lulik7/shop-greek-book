import { useState } from 'react'
import { Box, Typography, Container, Button, Divider, TextField } from '@mui/material'
import { keyframes } from '@mui/system'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { Helmet } from 'react-helmet-async'

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
    25%  { border-color: rgba(245,215,142,0.9); box-shadow: 0 0 25px rgba(201,168,76,0.5); }
    50%  { border-color: rgba(201,168,76,0.3); box-shadow: 0 0 10px rgba(201,168,76,0.1); }
    75%  { border-color: rgba(255,235,180,1);   box-shadow: 0 0 35px rgba(245,215,142,0.6); }
    100% { border-color: rgba(201,168,76,0.3); box-shadow: 0 0 10px rgba(201,168,76,0.1); }
`
const meanderPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 h10 v-10 h20 v20 h-10 v10 h-20 v-20 h10' fill='none' stroke='%23C9A84C' stroke-width='1.5' opacity='0.3'/%3E%3C/svg%3E")`

const fieldSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 0, fontFamily: '"Lato", sans-serif', color: '#0B1F3A',
        bgcolor: 'rgba(255,255,255,0.6)',
        '& fieldset': { borderColor: 'rgba(139,105,20,0.4)' },
        '&:hover fieldset': { borderColor: '#C9A84C' },
        '&.Mui-focused fieldset': { borderColor: '#C9A84C' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(11,31,58,0.6)' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#8B6914' },
}

const cardBeige = '#EDE0C4'

// Публичные ссылки — не секретные, можно хранить прямо в коде
const PAYPAL_URL = 'https://www.paypal.com/myaccount/transfer/send'
const REVOLUT_URL = 'https://revolut.me/zoiaqf34f'
const PAYPAL_EMAIL = 'zoepavlovska@gmail.com'

const PurchasePage = () => {
    const [status, setStatus] = useState<'idle' | 'payment' | 'card_form' | 'success'>('idle')
    const [buyerForm, setBuyerForm] = useState({ name: '', email: '', phone: '' })
    const [formError, setFormError] = useState('')
    const [cardForm, setCardForm] = useState({ name: '', note: '' })
    const [sending, setSending] = useState(false)
    const [shown, setShown] = useState(false)

    const handleFormSubmit = () => {
        setFormError('')
        if (!buyerForm.name) { setFormError('Введите ваше имя'); return }
        if (!buyerForm.email || !buyerForm.email.includes('@')) { setFormError('Введите корректный email'); return }
        setStatus('payment')
    }

    const handlePayPal = async () => {
        await sendNotification('PayPal')
        window.open(PAYPAL_URL, '_blank')
        setStatus('success')
    }

    const handleRevolut = async () => {
        await sendNotification('Revolut')
        window.open(REVOLUT_URL, '_blank')
        setStatus('success')
    }

    const handleCardSubmit = async () => {
        await sendNotification('Банковская карта')
        setStatus('success')
    }

    // Секретные ключи EmailJS — берём из .env
    const sendNotification = async (method: string) => {
        setSending(true)
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: buyerForm.name,
                    email: buyerForm.email,
                    message: `Способ оплаты: ${method}\nТелефон: ${buyerForm.phone || 'не указан'}\nСумма: 30 EUR\nКурс: Греческий за 45 дней (А1-А2)`,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
        } catch (e) { console.error('Email failed:', e) }
        setSending(false)
    }

    const showCourseCard = status === 'idle' || status === 'payment'

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#162D4E', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <Helmet>
                <title>Купить курс греческого · Зоя Павловская</title>
                <meta name="description" content="Купите курс «Греческий за 45 дней» — оплата через PayPal или Revolut. Доступ сразу после оплаты." />
            </Helmet>

            <Box sx={{ position: 'absolute', inset: 0, backgroundImage: meanderPattern, backgroundSize: '40px 40px', opacity: 0.15, pointerEvents: 'none', zIndex: 0 }} />

            <Box sx={{ position: 'relative', zIndex: 3, flex: 1, py: 6 }}>
                <Container maxWidth="md">

                    {/* Заголовок */}
                    <Box sx={{ textAlign: 'center', mb: 5 }}>
                        <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.75rem', letterSpacing: '0.35em', color: '#C9A84C', mb: 2, animation: `${fadeUp} 0.6s ease both` }}>
                            ОФОРМЛЕНИЕ ПОКУПКИ
                        </Typography>
                        <Typography variant="h3" sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 600, color: '#F8F5EE', animation: `${fadeUp} 0.6s ease 0.1s both`, opacity: 0 }}>
                            Купить курс
                        </Typography>
                        <Box sx={{ width: 0, height: '2px', mx: 'auto', mt: 2, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', animation: `${drawLine} 0.8s ease 0.3s forwards` }} />
                    </Box>

                    {/* УСПЕХ */}
                    {status === 'success' ? (
                        <Box sx={{ textAlign: 'center', p: 6, bgcolor: cardBeige, border: '2px solid rgba(201,168,76,0.4)', maxWidth: 520, mx: 'auto' }}>
                            <Typography sx={{ fontSize: '3rem', mb: 2 }}>✦</Typography>
                            <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: '#0B1F3A', fontWeight: 700, mb: 2 }}>
                                Заявка принята!
                            </Typography>
                            <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '1rem', color: '#2A3A52', mb: 1, lineHeight: 1.8 }}>
                                Спасибо, <strong>{buyerForm.name}</strong>!
                            </Typography>
                            <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.9rem', color: '#3A5A82', mb: 4, lineHeight: 1.8 }}>
                                После подтверждения оплаты мы отправим материалы на<br />
                                <strong style={{ color: '#8B6914' }}>{buyerForm.email}</strong>
                            </Typography>
                            <Divider sx={{ borderColor: 'rgba(139,105,20,0.3)', mb: 3 }} />
                            <Typography component={Link} to="/" sx={{ fontFamily: '"Cinzel", serif', fontSize: '1rem', color: '#8B6914', letterSpacing: '0.15em', textDecoration: 'none', borderBottom: '1px solid rgba(139,105,20,0.4)', pb: 0.3 }}>
                                ← Вернуться на главную
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: showCourseCard ? '1fr 1fr' : '1fr' }, gap: 4, alignItems: 'stretch', transition: 'grid-template-columns 0.4s ease' }}>

                            {/* Карточка курса */}
                            {showCourseCard && (
                                <Box>
                                    <Box sx={{ p: 4, bgcolor: cardBeige, border: '2px solid rgba(201,168,76,0.4)', borderTop: '3px solid #C9A84C', animation: `${goldShimmer} 3s ease-in-out infinite`, height: '100%', boxSizing: 'border-box' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Box>
                                                <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#8B6914', mb: 0.5 }}>ИНТЕНСИВНЫЙ КУРС</Typography>
                                                <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 700, color: '#0B1F3A', lineHeight: 1.2 }}>
                                                    «Греческий за 45 дней»
                                                </Typography>
                                                <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#8B6914', mt: 0.5 }}>УРОВНИ А1 · А2</Typography>
                                            </Box>
                                            <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', fontWeight: 700, color: '#C9A84C', lineHeight: 1 }}>30€</Typography>
                                        </Box>
                                        <Divider sx={{ borderColor: 'rgba(139,105,20,0.3)', my: 2 }} />
                                        {['45 видео-лекций', 'Аудио-материалы и QR-коды', 'Домашние задания с ответами', 'Обратная связь с преподавателем', 'Обучение в любое время', 'Доступ без ограничений'].map((item, i) => (
                                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                                <Typography sx={{ color: '#C9A84C', fontSize: '0.75rem' }}>✦</Typography>
                                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.9rem', color: '#2A3A52' }}>{item}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {/* Правая колонка */}
                            <Box>
                                {/* Шаг 1 */}
                                {status === 'idle' && (
                                    <Box sx={{ p: 4, bgcolor: cardBeige, border: '2px solid rgba(201,168,76,0.4)', borderTop: '3px solid #C9A84C', animation: `${goldShimmer} 3s ease-in-out infinite`, height: '100%', boxSizing: 'border-box' }}>
                                        <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.75rem', letterSpacing: '0.25em', color: '#8B6914', mb: 3, textAlign: 'center' }}>
                                            ШАГ 1 · ВАШИ ДАННЫЕ
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                            <TextField label="Ваше имя *" value={buyerForm.name}
                                                       onChange={e => setBuyerForm({ ...buyerForm, name: e.target.value })}
                                                       fullWidth variant="outlined" sx={fieldSx} />
                                            <TextField label="Email *" type="email" value={buyerForm.email}
                                                       onChange={e => setBuyerForm({ ...buyerForm, email: e.target.value })}
                                                       fullWidth variant="outlined" sx={fieldSx} />
                                            <TextField label="Телефон" value={buyerForm.phone}
                                                       onChange={e => setBuyerForm({ ...buyerForm, phone: e.target.value })}
                                                       fullWidth variant="outlined" sx={fieldSx} />
                                            {formError && (
                                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.85rem', color: '#CC3333', textAlign: 'center' }}>
                                                    {formError}
                                                </Typography>
                                            )}
                                            <Button onClick={handleFormSubmit} variant="contained" sx={{
                                                bgcolor: '#C9A84C', color: '#0B1F3A', py: 1.8,
                                                fontFamily: '"Cinzel", serif', fontSize: '1rem',
                                                letterSpacing: '0.2em', borderRadius: 0, fontWeight: 700, mt: 1,
                                                '&:hover': { bgcolor: '#DFC078' }, transition: 'all 0.3s ease',
                                            }}>
                                                Выбрать способ оплаты →
                                            </Button>
                                        </Box>
                                    </Box>
                                )}

                                {/* Шаг 2 */}
                                {status === 'payment' && (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Box sx={{ p: 2, bgcolor: 'rgba(237,224,196,0.3)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.15em', mb: 0.3 }}>ПОКУПАТЕЛЬ</Typography>
                                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.9rem', color: '#F8F5EE', fontWeight: 600 }}>{buyerForm.name}</Typography>
                                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.8rem', color: 'rgba(248,245,238,0.6)' }}>{buyerForm.email}</Typography>
                                            </Box>
                                            <Box onClick={() => setStatus('idle')} sx={{ cursor: 'pointer', color: 'rgba(201,168,76,0.8)', fontFamily: '"Cinzel", serif', fontSize: '1rem', '&:hover': { color: '#C9A84C' } }}>
                                                изменить
                                            </Box>
                                        </Box>

                                        <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.75rem', letterSpacing: '0.25em', color: '#F8F5EE', textAlign: 'center', py: 1 }}>
                                            ШАГ 2 · ВЫБЕРИТЕ СПОСОБ ОПЛАТЫ
                                        </Typography>

                                        {/* PayPal */}
                                        <Box
                                            onClick={handlePayPal}
                                            sx={{ p: 3, cursor: 'pointer', bgcolor: cardBeige, border: '2px solid rgba(0,156,222,0.4)', display: 'flex', alignItems: 'center', gap: 2, transition: 'all 0.2s', '&:hover': { borderColor: '#009CDE', boxShadow: '0 0 16px rgba(0,156,222,0.4)' } }}
                                        >
                                            <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#009CDE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>💳</Box>
                                            <Box>
                                                <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.9rem', color: '#003087', fontWeight: 700, letterSpacing: '0.1em', mb: 0.5 }}>PayPal</Typography>
                                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.85rem', color: '#3A5A82' }}>
                                                    Зайдите в PayPal → Отправить деньги
                                                </Typography>
                                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.85rem', color: '#3A5A82' }}>
                                                    Аккаунт: <strong style={{ color: '#003087' }}>{PAYPAL_EMAIL}</strong>
                                                </Typography>
                                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.85rem', color: '#3A5A82' }}>
                                                    Сумма: <strong>30 EUR</strong>
                                                </Typography>
                                            </Box>
                                            <Typography sx={{ ml: 'auto', color: '#009CDE', fontSize: '1.2rem' }}>→</Typography>
                                        </Box>

                                        {/* Revolut */}
                                        <Box
                                            onClick={handleRevolut}
                                            sx={{ p: 3, cursor: 'pointer', bgcolor: cardBeige, border: '2px solid rgba(93,95,239,0.4)', display: 'flex', alignItems: 'center', gap: 2, transition: 'all 0.2s', '&:hover': { borderColor: '#5D5FEF', boxShadow: '0 0 16px rgba(93,95,239,0.4)' } }}
                                        >
                                            <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#5D5FEF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>🔵</Box>
                                            <Box>
                                                <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.9rem', color: '#191C1F', fontWeight: 700, letterSpacing: '0.1em' }}>Revolut</Typography>
                                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.8rem', color: '#3A5A82' }}>Перейти на Revolut для оплаты 30€</Typography>
                                            </Box>
                                            <Typography sx={{ ml: 'auto', color: '#5D5FEF', fontSize: '1.2rem' }}>→</Typography>
                                        </Box>

                                        {/* Карта */}
                                        <Box
                                            onClick={() => setStatus('card_form')}
                                            sx={{ p: 3, cursor: 'pointer', bgcolor: cardBeige, border: '2px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', gap: 2, transition: 'all 0.2s', '&:hover': { borderColor: '#C9A84C', boxShadow: '0 0 16px rgba(201,168,76,0.4)' } }}
                                        >
                                            <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>💳</Box>
                                            <Box>
                                                <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.9rem', color: '#0B1F3A', fontWeight: 700, letterSpacing: '0.1em' }}>Банковская карта</Typography>
                                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.8rem', color: '#3A5A82' }}>Заполнить форму для перевода</Typography>
                                            </Box>
                                            <Typography sx={{ ml: 'auto', color: '#C9A84C', fontSize: '1.2rem' }}>→</Typography>
                                        </Box>
                                    </Box>
                                )}

                                {/* Шаг 3 — банковский перевод */}
                                {status === 'card_form' && (
                                    <Box sx={{ p: 4, bgcolor: cardBeige, border: '2px solid rgba(201,168,76,0.4)', borderTop: '3px solid #C9A84C', animation: `${goldShimmer} 3s ease-in-out infinite`, maxWidth: 520, mx: 'auto' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                            <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '1rem', letterSpacing: '0.25em', color: '#8B6914' }}>
                                                БАНКОВСКИЙ ПЕРЕВОД
                                            </Typography>
                                            <Box onClick={() => setStatus('payment')} sx={{ cursor: 'pointer', color: '#8B6914', fontFamily: '"Cinzel", serif', fontSize: '1rem', '&:hover': { color: '#C9A84C' } }}>
                                                ← назад
                                            </Box>
                                        </Box>

                                        <Box sx={{ p: 2.5, mb: 3, bgcolor: 'rgba(255,255,255,0.5)', border: '1px solid rgba(139,105,20,0.2)' }}>
                                            <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.8rem', color: '#8B6914', letterSpacing: '0.15em', mb: 1.5 }}>
                                                РЕКВИЗИТЫ ДЛЯ ПЕРЕВОДА
                                            </Typography>

                                            {[
                                                ['Получатель', 'Zoia Pavlovska'],
                                                ['Сумма', '30 EUR'],
                                                ['Назначение', 'Греческий курс А1-А2'],
                                            ].map(([label, value]) => (
                                                <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                                                    <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '1rem', color: '#3A5A82' }}>{label}:</Typography>
                                                    <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '1rem', color: '#0B1F3A', fontWeight: 800 }}>{value}</Typography>
                                                </Box>
                                            ))}

                                            {/* IBAN — защищённый */}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '1rem', color: '#3A5A82' }}>IBAN:</Typography>
                                                {shown ? (
                                                    <Box sx={{ display: 'flex', gap: '5px', userSelect: 'none', pointerEvents: 'none' }}>
                                                        {['LT88', '3250', '0563', '6744', '1990'].map((part, i) => (
                                                            <Typography key={i} sx={{ fontFamily: '"Lato", sans-serif', fontSize: '1rem', color: '#0B1F3A', fontWeight: 800 }}>
                                                                {part}
                                                            </Typography>
                                                        ))}
                                                    </Box>
                                                ) : (
                                                    <Box
                                                        onClick={() => setShown(true)}
                                                        sx={{
                                                            cursor: 'pointer',
                                                            fontFamily: '"Cinzel", serif',
                                                            fontSize: '0.75rem',
                                                            color: '#8B6914',
                                                            letterSpacing: '0.1em',
                                                            borderBottom: '1px solid rgba(139,105,20,0.4)',
                                                            pb: 0.2,
                                                            '&:hover': { color: '#C9A84C' },
                                                        }}
                                                    >
                                                        Показать IBAN
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>

                                        <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: '0.8rem', letterSpacing: '0.2em', color: '#8B6914', mb: 2 }}>
                                            ПОДТВЕРДИТЕ ПЕРЕВОД
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <TextField label="Ваше имя (как в переводе)" value={cardForm.name}
                                                       onChange={e => setCardForm({ ...cardForm, name: e.target.value })}
                                                       fullWidth variant="outlined" sx={fieldSx} />
                                            <TextField label="Примечание к переводу" value={cardForm.note}
                                                       onChange={e => setCardForm({ ...cardForm, note: e.target.value })}
                                                       fullWidth variant="outlined" sx={fieldSx}
                                                       placeholder="Напр.: перевод выполнен 17.03.2026" />
                                            <Button
                                                onClick={handleCardSubmit}
                                                disabled={sending}
                                                variant="contained"
                                                sx={{ bgcolor: '#C9A84C', color: '#0B1F3A', py: 1.8, fontFamily: '"Cinzel", serif', fontSize: '1rem', letterSpacing: '0.2em', borderRadius: 0, fontWeight: 700, mt: 1, '&:hover': { bgcolor: '#DFC078' } }}
                                            >
                                                {sending ? 'Отправка...' : 'Я перевёл оплату ✦'}
                                            </Button>
                                        </Box>
                                        <Typography sx={{ textAlign: 'center', mt: 2, fontFamily: '"Lato", sans-serif', fontSize: '0.95rem', color: 'rgba(11,31,58,0.7)', fontWeight: 600 }}>
                                            После проверки перевода мы пришлём доступ к курсу
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ position: 'relative', zIndex: 3, py: 3, textAlign: 'center', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                <Typography sx={{ fontFamily: '"Cinzel", serif', color: 'rgba(201,168,76,0.6)', fontSize: '1.2rem', letterSpacing: '0.3em', mb: 1 }}>ΕΛΛΗΝΙΚΑ</Typography>
                <Typography sx={{ fontFamily: '"Lato", sans-serif', color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>© 2026 · Все права защищены</Typography>
            </Box>
        </Box>
    )
}

export default PurchasePage
