import { useEffect, useRef, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Box } from '@mui/material'
import './ExercisesLayout.css'

/* ─── animated title hook ─── */
function useAnimatedTitle(line1: string, line2: string) {
    const ref1 = useRef<HTMLSpanElement>(null)
    const ref2 = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        const BASE = 0.2, GAP = 0.07
        function build(el: HTMLSpanElement | null, text: string, startDelay: number) {
            if (!el) return
            Array.from(el.children).forEach(c => {
                if (!(c as HTMLElement).classList.contains('ex-pen-dot')) el.removeChild(c)
            })
            const dot = el.querySelector('.ex-pen-dot') as HTMLElement | null
            text.split('').forEach((ch, i) => {
                const span = document.createElement('span')
                span.className = 'ex-letter'
                span.textContent = ch === ' ' ? '\u00A0' : ch
                span.style.animationDelay = `${startDelay + i * GAP}s`
                el.appendChild(span)
            })
            if (dot) dot.style.animation = `exPenTravel ${text.length * GAP + 0.1}s linear ${startDelay}s forwards`
        }
        const d1 = BASE
        const d2 = d1 + line1.length * GAP + 0.25
        build(ref1.current, line1, d1)
        build(ref2.current, line2, d2)
    }, [line1, line2])
    return { ref1, ref2 }
}

/* ─── ExCard: collapsible answer card ─── */
export function ExCard({ num, title, sub, hint, children, answers }: {
    num: number | string
    title: string
    sub?: string
    hint?: ReactNode
    children: ReactNode
    answers: ReactNode
}) {
    const btnRef = useRef<HTMLButtonElement>(null)
    const boxRef = useRef<HTMLDivElement>(null)
    function toggle() {
        const btn = btnRef.current!
        const box = boxRef.current!
        const open = box.classList.contains('show')
        box.classList.toggle('show', !open)
        btn.classList.toggle('open', !open)
        btn.textContent = open ? 'Ответы ↓' : 'Скрыть ↑'
    }
    return (
        <div className="ex-block">
            <div className="ex-head">
                <div className="ex-num">{num}</div>
                <div className="ex-titles">
                    <div className="ex-title">{title}</div>
                    {sub && <div className="ex-sub">{sub}</div>}
                </div>
                <div className="ex-line" />
            </div>
            <div className="ex-card">
                {hint && <div className="ex-hint">{hint}</div>}
                {children}
                <button className="ex-btn-ans" ref={btnRef} onClick={toggle}>Ответы ↓</button>
                <div className="ex-ansbox" ref={boxRef}>
                    <div className="ex-anstitle">Ответы — задание {num}</div>
                    {answers}
                </div>
            </div>
        </div>
    )
}

export function Ans({ children }: { children: ReactNode }) {
    return <div className="ex-arow">{children}</div>
}

export function IField({ w }: { w?: number }) {
    return <input className="ex-ifield" style={w ? { minWidth: w } : undefined} />
}

export function AField({ rows = 1 }: { rows?: number }) {
    function autoResize(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
    }
    return <textarea className="ex-afield" rows={rows} placeholder="..." onInput={autoResize as any} />
}

/* ─── Layout wrapper ─── */
export default function ExercisesLayout({ children, active }: { children: ReactNode; active: 0 | 1 }) {
    const { ref1, ref2 } = useAnimatedTitle('Греческая', 'Тренажёрка')
    const location = useLocation()

    useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

    return (
        <Box sx={{ bgcolor: '#0B1F3A', minHeight: '100vh' }}>
            <Helmet>
                <title>Греческая Тренажёрка · Зоя Павловская</title>
                <meta name="description" content="Упражнения по греческому языку от Зои Павловской" />
            </Helmet>

            <div className="ex-wrap">
                <header className="ex-page-header">
                    <div className="ex-brand">Ελληνική Γλώσσα · Упражнения</div>
                    <div className="ex-h-title">
                        <span className="ex-h-title-line" ref={ref1}>
                            <span className="ex-pen-dot" />
                        </span>
                        <span className="ex-h-title-line" ref={ref2}>
                            <span className="ex-pen-dot" />
                        </span>
                    </div>
                    <div className="ex-h-sub">Журнал упражнений по греческому языку</div>
                    <div className="ex-h-author">
                        Преподаватель: <a href="mailto:zoepavlovska@gmail.com">Зоя Павловская</a>
                    </div>
                </header>

                <nav className="ex-tabs">
                    <Link className={`ex-tab${active === 0 ? ' active' : ''}`} to="/exercises/0">
                        Пробный выпуск №0
                    </Link>
                    <Link className={`ex-tab${active === 1 ? ' active' : ''}`} to="/exercises/1">
                        Выпуск №1
                    </Link>
                </nav>

                {children}
            </div>

            <footer className="ex-footer">
                <div className="ex-footer-logo">ΕΛΛΗΝΙΚΑ</div>
                <div className="ex-footer-copy">© 2026 · Все права защищены · </div>
            </footer>
        </Box>
    )
}
