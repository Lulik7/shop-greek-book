import { useState } from 'react'
import {
    Box, Typography, Container, Dialog, DialogContent,
    IconButton, Button
} from '@mui/material'
import { keyframes } from '@mui/system'

// ─── Шрифты и анимации (тот же стиль что в HomePage) ─────────────────────
const marquee = keyframes`
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
`
const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
`
const charAppear = keyframes`
    from { opacity: 0; transform: translateY(8px) rotate(-3deg); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0) rotate(0deg); filter: blur(0); }
`

const meanderPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 h10 v-10 h20 v20 h-10 v10 h-20 v-20 h10' fill='none' stroke='%23C9A84C' stroke-width='1.5' opacity='0.3'/%3E%3C/svg%3E")`

// ─── Данные книг ─────────────────────────────────────────────────────────
interface Book {
    id: number
    title: string
    author: string
    price: string
    cover: string
    category: string
    description: string
    excerpt: string
    pages: number
    year: number
}

const books: Book[] = Array.from({ length: 49 }, (_, i) => ({
    id: i + 1,
    title: [
        'Илиада', 'Одиссея', 'Теогония', 'Труды и дни', 'Энеида',
        'Метаморфозы', 'Государство', 'Пир', 'Федон', 'Апология',
        'Никомахова этика', 'Политика', 'Поэтика', 'Риторика',
        'История', 'Война пелопоннесская', 'Анабасис', 'Киропедия',
        'Жизнеописания', 'Моралии', 'Об ораторе', 'О природе вещей',
        'Эклоги', 'Георгики', 'Фиваида', 'Аргонавтика',
        'Электра', 'Антигона', 'Медея', 'Царь Эдип',
        'Птицы', 'Облака', 'Лягушки', 'Лисистрата',
        'Агамемнон', 'Прикованный Прометей', 'Семеро против Фив',
        'Гимны', 'Эпиграммы', 'Идиллии', 'Мимиямбы',
        'Диалоги', 'Пирронизм', 'О блаженной жизни',
        'Письма', 'Размышления', 'Руководство', 'Беседы', 'Энхиридион',
    ][i % 49],
    author: [
        'Гомер', 'Гесиод', 'Вергилий', 'Овидий', 'Платон',
        'Аристотель', 'Геродот', 'Фукидид', 'Ксенофонт',
        'Плутарх', 'Цицерон', 'Лукреций', 'Феокрит',
        'Софокл', 'Еврипид', 'Аристофан', 'Эсхил',
        'Марк Аврелий', 'Эпиктет', 'Сенека',
    ][i % 20],
    price: `${(i * 7 + 490) % 900 + 490} ₽`,
    cover: `https://picsum.photos/seed/book${i + 1}/200/280`,
    category: ['Эпос', 'Философия', 'История', 'Драма', 'Лирика'][i % 5],
    description: [
        'Великий эпос античности, повествующий о деяниях героев и богов древней Греции. Это произведение стало основой всей европейской литературной традиции.',
        'Фундаментальный философский трактат, исследующий природу бытия, познания и человеческой добродетели в диалоговой форме.',
        'Исторический труд, восстанавливающий события древнего мира с поразительной точностью и аналитической глубиной.',
        'Драматическое произведение, раскрывающее трагическую судьбу героя через призму античных ценностей и морали.',
    ][i % 4],
    excerpt: [
        'Гнев, богиня, воспой Ахиллеса, Пелеева сына,\nГрозный, который ахеянам тысячи бедствий содеял,\nМногие души могучие славных героев низринул\nВ мрачный Аид и самих распростёр их в корысть плотоядным\nПтицам окрестным и псам...',
        'Муза, скажи мне о том многоопытном муже, который\nДолго скитался с тех пор, как святой Илион им разрушен;\nМного людей городов посетил и обычаи видел,\nМного и горя терпел на морях, о спасенье заботясь\nЖизни своей и возврате товарищей...',
        'В начале было Слово, и Слово было у Бога,\nи Слово было Бог. Оно было в начале у Бога.\nВсё через него начало быть, и без него ничто\nне начало быть, что начало быть...',
        'Познай самого себя — вот высшая мудрость.\nТот, кто познал себя, познал всё. Ибо в душе\nчеловека отражается весь мир, как в капле воды\nотражается небо...',
    ][i % 4],
    pages: 120 + (i * 37) % 500,
    year: 1960 + (i * 3) % 63,
}))

// ─── Бегущая строка ───────────────────────────────────────────────────────
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

// ─── Карточка книги ───────────────────────────────────────────────────────
const BookCard = ({ book, onClick }: { book: Book; onClick: () => void }) => (
    <Box
        onClick={onClick}
        sx={{
            cursor: 'pointer',
            position: 'relative',
            width: '75%',
            mx: 'auto',
            aspectRatio: '4/5',
            bgcolor: '#FFFFFF',
            border: '2px solid rgba(201,168,76,0.35)',
            borderTop: '3px solid #C9A84C',
            boxShadow: '0 2px 12px rgba(11,31,58,0.08)',
            overflow: 'hidden',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            '&:hover': {
                transform: 'scale(1.08)',
                zIndex: 10,
                boxShadow: '0 20px 60px rgba(11,31,58,0.25)',
                borderTopColor: '#1B8FE0',
                '& .book-overlay': { opacity: 1 },
                '& .book-title': { color: '#1B8FE0' },
            },
        }}
    >
        {/* Фото */}
        <Box sx={{ height: '68%', overflow: 'hidden', position: 'relative' }}>
            <Box
                component="img"
                src={book.cover}
                alt={book.title}
                sx={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                    '.MuiBox-root:hover &': { transform: 'scale(1.05)' },
                }}
            />
            {/* Категория */}
            <Box sx={{
                position: 'absolute', top: 6, left: 6,
                bgcolor: 'rgba(11,31,58,0.75)',
                px: 0.8, py: 0.3, backdropFilter: 'blur(4px)',
            }}>
                <Typography sx={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: '0.45rem', letterSpacing: '0.15em',
                    color: '#C9A84C', textTransform: 'uppercase',
                }}>
                    {book.category}
                </Typography>
            </Box>
            {/* Ховер-оверлей */}
            <Box className="book-overlay" sx={{
                position: 'absolute', inset: 0,
                bgcolor: 'rgba(27,143,224,0.15)',
                opacity: 0, transition: 'opacity 0.3s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <Typography sx={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: '0.55rem', letterSpacing: '0.2em',
                    color: 'white', bgcolor: 'rgba(11,31,58,0.8)',
                    px: 1.5, py: 0.6,
                }}>
                    ПОДРОБНЕЕ
                </Typography>
            </Box>
        </Box>

        {/* Информация */}
        <Box sx={{ p: 1, height: '32%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
                <Typography className="book-title" sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: { xs: '0.65rem', sm: '0.72rem', md: '0.8rem' },
                    fontWeight: 700, color: '#0B1F3A',
                    lineHeight: 1.2,
                    transition: 'color 0.3s ease',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                }}>
                    {book.title}
                </Typography>
                <Typography sx={{
                    fontFamily: '"Lato", sans-serif',
                    fontSize: '0.58rem', color: '#3A5A82',
                    mt: 0.3, letterSpacing: '0.05em',
                }}>
                    {book.author}
                </Typography>
            </Box>
            <Typography sx={{
                fontFamily: '"Cinzel", serif',
                fontSize: '0.7rem', fontWeight: 600,
                color: '#C9A84C', letterSpacing: '0.1em',
            }}>
                {book.price}
            </Typography>
        </Box>
    </Box>
)

// ─── Модальное окно книги ─────────────────────────────────────────────────
const BookModal = ({ book, isOpen, onClose }: { book: Book | null; isOpen: boolean; onClose: () => void }) => {
    const [tab, setTab] = useState<'desc' | 'excerpt'>('desc')

    if (!book) return null

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: '#F8F5EE',
                    borderRadius: 0,
                    border: '1px solid rgba(201,168,76,0.3)',
                    overflow: 'hidden',
                }
            }}
        >
            <DialogContent sx={{ p: 0 }}>
                {/* Верхняя полоска */}
                <Box sx={{ height: 3, background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)' }} />

                <Box sx={{ display: 'flex', gap: 0 }}>
                    {/* Обложка */}
                    <Box sx={{ width: 220, flexShrink: 0, position: 'relative' }}>
                        <Box
                            component="img"
                            src={book.cover}
                            alt={book.title}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        <Box sx={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to right, transparent 60%, rgba(248,245,238,0.8) 100%)',
                        }} />
                    </Box>

                    {/* Контент */}
                    <Box sx={{ flex: 1, p: 4 }}>
                        {/* Закрыть */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                            <Box>
                                <Typography sx={{
                                    fontFamily: '"Cinzel", serif',
                                    fontSize: '0.65rem', color: '#C9A84C',
                                    letterSpacing: '0.25em', mb: 1,
                                }}>
                                    {book.category}
                                </Typography>
                                <Typography sx={{
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: '1.8rem', fontWeight: 700,
                                    color: '#0B1F3A', lineHeight: 1.1,
                                }}>
                                    {book.title}
                                </Typography>
                                <Typography sx={{
                                    fontFamily: '"Lato", sans-serif',
                                    fontSize: '0.85rem', color: '#3A5A82', mt: 0.5,
                                }}>
                                    {book.author}
                                </Typography>
                            </Box>
                            <IconButton onClick={onClose} sx={{ color: '#0B1F3A', mt: -1, mr: -1 }}>
                                <Typography sx={{ fontSize: '1.2rem', fontFamily: '"Cinzel", serif' }}>✕</Typography>
                            </IconButton>
                        </Box>

                        {/* Мета */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            {[
                                { label: 'Страниц', val: book.pages },
                                { label: 'Год', val: book.year },
                                { label: 'Цена', val: book.price },
                            ].map(m => (
                                <Box key={m.label} sx={{ textAlign: 'center', px: 2, borderLeft: '1px solid rgba(201,168,76,0.3)' }}>
                                    <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 700, color: '#0B1F3A' }}>{m.val}</Typography>
                                    <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: '0.6rem', color: '#3A5A82', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.label}</Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* Табы */}
                        <Box sx={{ display: 'flex', gap: 0, mb: 3, borderBottom: '1px solid rgba(201,168,76,0.3)' }}>
                            {(['desc', 'excerpt'] as const).map(t => (
                                <Box
                                    key={t}
                                    onClick={() => setTab(t)}
                                    sx={{
                                        px: 3, py: 1, cursor: 'pointer',
                                        fontFamily: '"Cinzel", serif',
                                        fontSize: '0.65rem', letterSpacing: '0.15em',
                                        color: tab === t ? '#0B1F3A' : '#3A5A82',
                                        borderBottom: tab === t ? '2px solid #C9A84C' : '2px solid transparent',
                                        transition: 'all 0.2s ease',
                                        mb: '-1px',
                                    }}
                                >
                                    {t === 'desc' ? 'ОПИСАНИЕ' : 'ОТРЫВОК'}
                                </Box>
                            ))}
                        </Box>

                        {/* Контент таба */}
                        <Box sx={{ minHeight: 120 }}>
                            {tab === 'desc' ? (
                                <Typography sx={{
                                    fontFamily: '"Lato", sans-serif',
                                    fontSize: '0.9rem', color: '#3A5A82',
                                    lineHeight: 1.8,
                                }}>
                                    {book.description}
                                </Typography>
                            ) : (
                                <Box sx={{
                                    bgcolor: '#FFFFFF',
                                    border: '1px solid rgba(201,168,76,0.2)',
                                    borderLeft: '3px solid #C9A84C',
                                    p: 2,
                                }}>
                                    <Typography sx={{
                                        fontFamily: '"Cormorant Garamond", serif',
                                        fontSize: '0.95rem', fontStyle: 'italic',
                                        color: '#0B1F3A', lineHeight: 1.9,
                                        whiteSpace: 'pre-line',
                                    }}>
                                        {book.excerpt}
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Кнопка */}
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Button variant="contained" sx={{
                                bgcolor: '#0B1F3A', color: 'white',
                                px: 4, py: 1.2,
                                fontFamily: '"Cinzel", serif',
                                fontSize: '0.7rem', letterSpacing: '0.15em',
                                borderRadius: 0,
                                '&:hover': { bgcolor: '#C9A84C', color: '#0B1F3A' },
                                transition: 'all 0.3s ease',
                            }}>
                                Купить
                            </Button>
                            <Button variant="outlined" sx={{
                                borderColor: '#C9A84C', color: '#0B1F3A',
                                px: 3, py: 1.2,
                                fontFamily: '"Cinzel", serif',
                                fontSize: '0.7rem', letterSpacing: '0.15em',
                                borderRadius: 0, borderWidth: '1.5px',
                                '&:hover': { bgcolor: 'rgba(201,168,76,0.08)', borderWidth: '1.5px' },
                            }}>
                                В корзину
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

// ─── Главная страница книг ────────────────────────────────────────────────
const BooksPage = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null)
    const [filter, setFilter] = useState<string>('Все')

    const categories = ['Все', 'Эпос', 'Философия', 'История', 'Драма', 'Лирика']
    const filtered = filter === 'Все' ? books : books.filter(b => b.category === filter)

    return (
        <Box sx={{ fontFamily: '"Cormorant Garamond", serif', bgcolor: '#F8F5EE', minHeight: '100vh' }}>
            {/* HERO HEADER */}
            <Box sx={{
                position: 'relative',
                bgcolor: '#0B1F3A',
                py: { xs: 6, md: 10 },
                overflow: 'hidden',
                textAlign: 'center',
            }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: meanderPattern, backgroundSize: '40px 40px', opacity: 0.15 }} />
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.06) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

                <Container maxWidth="lg" sx={{ position: 'relative' }}>
                    <Typography sx={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: '0.7rem', letterSpacing: '0.35em',
                        color: '#C9A84C', mb: 2,
                        animation: `${fadeUp} 0.8s ease 0.1s both`,
                    }}>
                        КНИЖНЫЙ МАГАЗИН
                    </Typography>
                    <Box sx={{
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                        mb: 1, lineHeight: 1.1,
                        animation: `${fadeUp} 0.01s ease 0.2s both`,
                    }}>
                        {'Зои Павловской'.split('').map((char, i) => (
                            <Box
                                key={i}
                                component="span"
                                sx={{
                                    fontFamily: '"Great Vibes", cursive',
                                    fontSize: { xs: '3.5rem', md: '5.8rem' },
                                    fontWeight: 400,
                                    color: '#F8F5EE',
                                    letterSpacing: '0.06em',
                                    textShadow: '0 2px 20px rgba(201,168,76,0.3)',
                                    display: 'inline-block',
                                    opacity: 0,
                                    animation: `${charAppear} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.3 + i * 0.08}s forwards`,
                                    whiteSpace: char === ' ' ? 'pre' : 'normal',
                                }}
                            >
                                {char === ' ' ? ' ' : char}
                            </Box>
                        ))}
                    </Box>
                    <Typography variant="h2" sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: { xs: '1.5rem', md: '2.2rem' },
                        fontWeight: 400, fontStyle: 'italic',
                        color: '#1B8FE0', mb: 4,
                        animation: `${fadeUp} 0.8s ease 0.3s both`,
                    }}>
                        Учебники, словари, классика в оригинале
                    </Typography>
                    <Box sx={{ width: 80, height: 2, bgcolor: '#C9A84C', mx: 'auto', mb: 4, animation: `${fadeUp} 0.8s ease 0.4s both` }} />

                    {/* Фильтры по категориям */}
                    <Box sx={{
                        display: 'flex', gap: 1, flexWrap: 'wrap',
                        justifyContent: 'center',
                        animation: `${fadeUp} 0.8s ease 0.5s both`,
                    }}>
                        {categories.map(cat => (
                            <Box
                                key={cat}
                                onClick={() => setFilter(cat)}
                                sx={{
                                    px: 2.5, py: 0.8, cursor: 'pointer',
                                    fontFamily: '"Cinzel", serif',
                                    fontSize: '0.65rem', letterSpacing: '0.15em',
                                    color: filter === cat ? '#0B1F3A' : 'rgba(248,245,238,0.6)',
                                    bgcolor: filter === cat ? '#C9A84C' : 'transparent',
                                    border: `1px solid ${filter === cat ? '#C9A84C' : 'rgba(201,168,76,0.3)'}`,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: '#C9A84C',
                                        borderColor: '#C9A84C',
                                    },
                                }}
                            >
                                {cat}
                            </Box>
                        ))}
                    </Box>
                </Container>

                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)' }} />
            </Box>

            <MarqueeBand dark={false} />

            {/* СЕТКА КНИГ */}
            <Container maxWidth={false} sx={{ px: { xs: 8, md: 14 }, py: { xs: 4, md: 6 } }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: { xs: 2, md: 3 },
                }}>
                    {filtered.map((book, i) => (
                        <Box
                            key={book.id}
                            sx={{
                                animation: `${fadeUp} 0.5s ease ${(i % 7) * 0.05}s both`,
                            }}
                        >
                            <BookCard book={book} onClick={() => setSelectedBook(book)} />
                        </Box>
                    ))}
                </Box>

                {/* Счётчик */}
                <Box sx={{ textAlign: 'center', mt: 4, pb: 2 }}>
                    <Typography sx={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: '0.65rem', letterSpacing: '0.2em',
                        color: '#3A5A82',
                    }}>
                        {filtered.length} ИЗДАНИЙ
                    </Typography>
                </Box>
            </Container>

            {/* FOOTER */}
            <Box sx={{ height: 3, background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)' }} />
            <Box sx={{ bgcolor: '#060E1C', py: 3, textAlign: 'center' }}>
                <Typography sx={{ fontFamily: '"Cinzel", serif', color: 'rgba(201,168,76,0.6)', fontSize: '1.2rem', letterSpacing: '0.3em' }}>ΕΛΛΗΝΙΚΑ</Typography>
                <Typography sx={{ fontFamily: '"Lato", sans-serif', color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', mt: 1, letterSpacing: '0.1em' }}>© 2026 · Все права защищены</Typography>
            </Box>

            {/* МОДАЛЬНОЕ ОКНО */}
            <BookModal
                book={selectedBook}
                isOpen={Boolean(selectedBook)}
                onClose={() => setSelectedBook(null)}
            />
        </Box>
    )
}

export default BooksPage
