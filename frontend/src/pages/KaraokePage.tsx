import { useState, useEffect, useRef } from "react";
import {
    Box, Typography, IconButton, Slider, Stack, Tooltip, Container,
} from "@mui/material";
import { keyframes } from "@mui/system";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import GuitarAnimation from "./GuitarAnimation";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const marqueeAnim = keyframes`
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
`;
const charAppear = keyframes`
    from { opacity: 0; transform: translateY(8px) rotate(-3deg); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0) rotate(0deg); filter: blur(0); }
`;
const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
`;
const drawLine = keyframes`
    from { width: 0; opacity: 0; }
    to   { width: 100%; opacity: 1; }
`;
const goldShimmer = keyframes`
    0%   { border-color: rgba(201,168,76,0.3); box-shadow: 0 0 10px rgba(201,168,76,0.1); }
    25%  { border-color: rgba(245,215,142,0.9); box-shadow: 0 0 25px rgba(201,168,76,0.5); }
    50%  { border-color: rgba(201,168,76,0.3); box-shadow: 0 0 10px rgba(201,168,76,0.1); }
    75%  { border-color: rgba(255,235,180,1);   box-shadow: 0 0 35px rgba(245,215,142,0.6); }
    100% { border-color: rgba(201,168,76,0.3); box-shadow: 0 0 10px rgba(201,168,76,0.1); }
`;
const fadeInLine = keyframes`
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
`;
const countPop = keyframes`
    0%   { transform: scale(0.3); opacity: 0; }
    60%  { transform: scale(1.15); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
`;

const meanderPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 h10 v-10 h20 v20 h-10 v10 h-20 v-20 h10' fill='none' stroke='%23C9A84C' stroke-width='1.5' opacity='0.3'/%3E%3C/svg%3E")`;

// ─── Marquee band ─────────────────────────────────────────────────────────────
const MarqueeBand = () => {
    const segment = "𐆊 ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ 𐆊 ꩜ 𐆊 ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ 𐆊 ꩜ ";
    const repeated = segment.repeat(4);
    return (
        <Box sx={{ bgcolor: "#C9A84C", overflow: "hidden", py: 1.3, borderTop: "1px solid rgba(201,168,76,0.5)", borderBottom: "1px solid rgba(201,168,76,0.5)" }}>
            <Box sx={{ display: "flex", width: "max-content", animation: `${marqueeAnim} 30s linear infinite` }}>
                <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: "0.72rem", letterSpacing: "0.22em", color: "#0B1F3A", whiteSpace: "nowrap", userSelect: "none" }}>
                    {repeated}
                </Typography>
            </Box>
        </Box>
    );
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface SongLine {
    el: string;
    translit: string;
    ru: string;
    startTime: number;
}
interface Song {
    title: string;
    titleEl: string;
    artist: string;
    audioSrc: string;
    totalDuration: number;
    lines: SongLine[];
}

// ─── Songs ────────────────────────────────────────────────────────────────────
const SONGS: Song[] = [
    {
        title: "Звезда по имени Солнце",
        titleEl: "Αστέρι με όνομα Ήλιος",
        artist: "Кино · Виктор Цой",
        audioSrc: "/assets/Zvezda.mp3",
        totalDuration: 232,
        lines: [
            { el: "Άσπρο χιόνι, γκρίζος πάγος", translit: "Áspro chióni, gkrízos págos", ru: "Белый снег, серый лёд", startTime: 22 },
            { el: "Πάνω στα διψασμένα φυτά,", translit: "Páno sta dipsasména fytá,", ru: "На растрескавшейся земле,", startTime: 25.5 },
            { el: "Σαν κουβέρτα πολύχρωμα πάνω", translit: "San kouérta políchrома páno", ru: "Одеялом лоскутным на ней", startTime: 29 },
            { el: "Πόλη στου δρόμου τη θηλιά.", translit: "Póli stu drómu ti thiliá.", ru: "Город в дорожной петле.", startTime: 32.5 },
            { el: "Πάνω απ' την πόλη συννεφιά", translit: "Páno ap' tin póli synnefiá", ru: "А над городом плывут облака,", startTime: 38 },
            { el: "Που σκεπάζει το φως των ουρανών,", translit: "Pu skepázi to fos ton uranón,", ru: "Закрывая небесный свет,", startTime: 41.5 },
            { el: "Κίτρινος πυκνός καπνός,", translit: "Kítrinos pyknós kapnós,", ru: "А над городом жёлтый дым,", startTime: 45 },
            { el: "Η πόλη είναι δυο χιλιάδων ετών", translit: "I póli íne dío chiliádon etón", ru: "Городу две тысячи лет,", startTime: 48.5 },
            { el: "Κάτω απ' το φως του αστέρα", translit: "Káto ap' to fos tu astéra", ru: "Прожитых под светом звезды", startTime: 52 },
            { el: "Που λέγεται Ήλιος.", translit: "Pu légete Ílios.", ru: "По имени Солнце.", startTime: 55.5 },
        ],
    },
    {
        title: "Прогулки по воде",
        titleEl: "Βόλτες στο νερό",
        artist: "Наутилус Помпилиус",
        audioSrc: "/assets/nautilus.mp3",
        totalDuration: 208,
        lines: [
            { el: "Στο μόλο ψαρεύει ο Ανδρέας σκυφτός", translit: "Sto mólo psarévi o Andréas skiftós", ru: "С причала рыбачил апостол Андрей,", startTime: 46 },
            { el: "Κι ο Ιησούς στο νερό περπατεί", translit: "Ki o Iisús sto neró perpatí", ru: "А Спаситель ходил по воде,", startTime: 51 },
            { el: "Ο απόστολος πιάνει τσιπούρες, κι αυτός", translit: "O apóstolos piáni tsipúres, ki aftós", ru: "И Андрей доставал из воды пескарей,", startTime: 56 },
            { el: "Τους ανθρώπους που έχουν πνιγεί.", translit: "Tus anthrópus pu échun pnigí.", ru: "А Спаситель — погибших людей.", startTime: 61 },
            { el: "Κι ο Ανδρέας φωνάζει: «Σαλτάρω κι εγώ,", translit: "Ki o Andréas fonázi: «Saltáro ki egó,", ru: "И Андрей закричал: «Я покину причал,", startTime: 66 },
            { el: "Αν μ'ανοίξεις το μυστικό»", translit: "An m'aníxis to mistikó»", ru: "Если ты не откроешь секрет!»", startTime: 71 },
            { el: "Και ο Μεσσίας απάντησε: «Σώπα, Ανδρέα,", translit: "Ke o Messías apándise: «Sópa, Andréa,", ru: "И Спаситель ответил: «Спокойно, Андрей,", startTime: 76 },
            { el: "Μυστικό δεν υπάρχει εδώ.", translit: "Mistikó den ipárchi edó.", ru: "Никакого секрета здесь нет.", startTime: 81 },
            { el: "Κοίτα, εκεί στο βουνό", translit: "Kíta, ekí sto vunó", ru: "Видишь там, на горе,", startTime: 86 },
            { el: "Είναι ένας σταυρός,", translit: "Íne énas stavrós,", ru: "Возвышается крест,", startTime: 90 },
            { el: "Από κάτω στρατιώτες πολλοί,", translit: "Apó káto stratiótes polí,", ru: "Под ним десяток солдат,", startTime: 94 },
            { el: "Για κρεμάσου εκεί!", translit: "Ya kremásu ekí!", ru: "Повиси-ка на нём!", startTime: 98 },
            { el: "Κι όταν πια βαρεθείς, έλα πίσω εδώ,", translit: "Ki ótan pia varethís, éla píso edó,", ru: "А когда надоест — возвращайся назад,", startTime: 103 },
            { el: "Να κάνουμε βόλτες,", translit: "Na kánume vóltes,", ru: "Гулять по воде,", startTime: 109 },
            { el: "Να κάνουμε βόλτες,", translit: "Na kánume vóltes,", ru: "Гулять по воде,", startTime: 113 },
            { el: "Μαζί πάνω στο νερό».", translit: "Mazí páno sto neró».", ru: "Гулять по воде со мной!", startTime: 117 },
        ],
    },
    {
        title: "Пачка сигарет",
        titleEl: "Ένα πακέτο τσιγάρα",
        artist: "Кино · Виктор Цой",
        audioSrc: "/assets/pachka.mp3",
        totalDuration: 210,
        lines: [
            { el: "Κάθομαι και κοιτώ στο ξένο σπίτι τον ξένο ουρανό", translit: "Káthome ke kitó sto xéno spíti ton xéno uranó", ru: "Я сижу и смотрю в чужое небо из чужого окна", startTime: 20 },
            { el: "Και δε βλέπω ούτε ένα αστέρι γνωστό", translit: "Ke de vlépo úte éna astéri gnostó", ru: "И не вижу ни одной знакомой звезды", startTime: 25 },
            { el: "Περπατούσα όλους τους δρόμους πέρα δώθε αργά", translit: "Perpatúsa ólus tus drómus péra dóthe argá", ru: "Я ходил по всем дорогам и туда, и сюда", startTime: 30 },
            { el: "Μα τα ίχνη δε βρίσκει όποιος πίσω κοιτά", translit: "Ma ta íchni de vrísci ópoios píso kitá", ru: "Обернулся и не смог разглядеть следы", startTime: 35 },
            { el: "Μα αν στην τσέπη μου τσιγάρα μπορώ να βρω,", translit: "Ma an stin tsépi mu tsigára boró na vro,", ru: "Но если есть в кармане пачка сигарет —", startTime: 42 },
            { el: "Τότε σίγουρα η μέρα θα πάει καλά", translit: "Tóte síyura i méra tha páei kalá", ru: "Значит, всё не так уж плохо на сегодняшний день", startTime: 47 },
            { el: "Με προσμένει αεροπλάνο μ'ασημένιο φτερό", translit: "Me prosmény aeroplanó m'asiménio fteró", ru: "И билет на самолёт с серебристым крылом,", startTime: 52 },
            { el: "Που πετώντας θα αφήσει στη γη μια σκιά.", translit: "Pu petóntas tha afísi sti yi mia skiá.", ru: "Что, взлетая, оставляет земле лишь тень.", startTime: 57 },
        ],
    },
    {
        title: "Цветочки",
        titleEl: "Λουλουδάκια",
        artist: "Наталья Масленникова",
        audioSrc: "/assets/tsvetochki.mp3",
        totalDuration: 150,
        lines: [
            { el: "Μα γιατί στην κεφαλή", translit: "Ma yatí stin kefalí", ru: "Отчего на голове не растут цветочки,", startTime: 3 },
            { el: "Δε φυτρώνουν λουλουδάκια,", translit: "De fytrónum lulududákia,", ru: "А растут они в траве и на каждой кочке.", startTime: 6 },
            { el: "Παρά μόνο στην αυλή,", translit: "Pará móno stin avlí,", ru: "Если волосы растут, значит их сажают,", startTime: 9 },
            { el: "Σε κήπους και χωράφια;", translit: "Se kípus ke choráfia;", ru: "Отчего сажать цветы мне не разрешают...", startTime: 13 },
            { el: "Να μπορούσα μια φορά", translit: "Na boroúsa mia forá", ru: "Хорошо бы сделать так:", startTime: 18 },
            { el: "Να κόψω τις μπουκλίτσες,", translit: "Na kópso tis buklítses,", ru: "Срезать все кудряшки,", startTime: 20 },
            { el: "Παπαρούνα στην κορφή,", translit: "Paparoúna stin korfí,", ru: "На макушке красный мак,", startTime: 22 },
            { el: "Και γύρω μαργαρίτες.", translit: "Ke gýro margarítes.", ru: "А вокруг — ромашки!", startTime: 24 },
            { el: "Να μπορούσα μια φορά", translit: "Na boroúsa mia forá", ru: "Хорошо бы сделать так:", startTime: 26 },
            { el: "Να κόψω τις μπουκλίτσες,", translit: "Na kópso tis buklítses,", ru: "Срезать все кудряшки,", startTime: 28 },
            { el: "Παπαρούνα στην κορφή,", translit: "Paparoúna stin korfí,", ru: "На макушке красный мак,", startTime: 30 },
            { el: "Και γύρω μαργαρίτες.", translit: "Ke gýro margarítes.", ru: "А вокруг — ромашки!", startTime: 31 },
            { el: "Της αδελφής μου θα φυτέψω", translit: "Tis adelfís mu tha fitépso", ru: "А сестрёнке посажу я, конечно, розу —", startTime: 34 },
            { el: "Ρόδο στο κεφαλάκι", translit: "Ródo sto kefaláki", ru: "Нет прекраснее цветов!", startTime: 37 },
            { el: "Μα έκλαψε λιγάκι:", translit: "Ma éklapse ligáki:", ru: "А сестрёнка — в слёзы:", startTime: 40 },
            { el: "«Στη μαμά μου θα το πω, θα κρυφτώ, θα τρέξω!»", translit: "«Sti mamá mu tha to po, tha kriftó, tha tréxo!»", ru: "«Я всё маме расскажу, убегу и спрячусь!»", startTime: 42 },
            { el: "Άμα είσαι τέτοια εσύ, κάκτο θα σου φυτέψω!", translit: "Áma ísai tétoia esý, kákto tha su fitépso!", ru: "Вот возьму и посажу ей за это кактус.", startTime: 46 },
            { el: "Να μπορούσα μια φορά", translit: "Na boroúsa mia forá", ru: "Хорошо бы сделать так:", startTime: 50 },
            { el: "Να κόψω τις μπουκλίτσες,", translit: "Na kópso tis buklítses,", ru: "Срезать все кудряшки,", startTime: 52 },
            { el: "Παπαρούνα στην κορφή,", translit: "Paparoúna stin korfí,", ru: "На макушке красный мак,", startTime: 54 },
            { el: "Και γύρω μαργαρίτες.", translit: "Ke gýro margarítes.", ru: "А вокруг — ромашки!", startTime: 55 },
            { el: "Να μπορούσα μια φορά", translit: "Na boroúsa mia forá", ru: "Хорошо бы сделать так:", startTime: 57 },
            { el: "Να κόψω τις μπουκλίτσες,", translit: "Na kópso tis buklítses,", ru: "Срезать все кудряшки,", startTime: 59 },
            { el: "Παπαρούνα στην κορφή,", translit: "Paparoúna stin korfí,", ru: "На макушке красный мак,", startTime: 61 },
            { el: "Και γύρω μαργαρίτες.", translit: "Ke gýro margarítes.", ru: "А вокруг — ромашки!", startTime: 62 },
        ],
    },
];

const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function KaraokePage() {
    const [songIndex, setSongIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [displayedIndex, setDisplayedIndex] = useState(0);
    const [countdown, setCountdown] = useState<number | null>(null);
    const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const countdownShown = useRef(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const song = SONGS[songIndex];

    const lineIndex = (() => {
        let idx = 0;
        for (let i = 0; i < song.lines.length; i++) {
            if (currentTime >= song.lines[i].startTime) idx = i;
            else break;
        }
        return idx;
    })();

    useEffect(() => {
        if (delayRef.current) clearTimeout(delayRef.current);
        const delay = songIndex === 0 && lineIndex >= 18 ? 0 : songIndex === 1 ? 0 : songIndex === 2 ? 1800 : songIndex === 3 ? 0 : 800;
        delayRef.current = setTimeout(() => setDisplayedIndex(lineIndex), delay);
        return () => { if (delayRef.current) clearTimeout(delayRef.current); };
    }, [lineIndex, songIndex]);

    const firstLineTime = song.lines[0]?.startTime ?? 0;

    useEffect(() => {
        countdownShown.current = false;
        setCountdown(null);
        if (countdownRef.current) clearInterval(countdownRef.current);
    }, [songIndex]);

    useEffect(() => {
        if (!playing) return;
        const timeUntilFirst = firstLineTime - currentTime;
        if (timeUntilFirst <= 5 && timeUntilFirst > 0 && !countdownShown.current) {
            countdownShown.current = true;
            const startCount = Math.min(Math.ceil(timeUntilFirst), 2);
            setCountdown(startCount);
            let count = startCount;
            if (countdownRef.current) clearInterval(countdownRef.current);
            countdownRef.current = setInterval(() => {
                count--;
                if (count > 0) setCountdown(count);
                else if (count === 0) setCountdown(0);
                else { clearInterval(countdownRef.current!); setCountdown(null); }
            }, 1000);
        }
    }, [currentTime, playing, firstLineTime]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            if (audio.duration && audio.duration - audio.currentTime <= 8) {
                audio.volume = Math.max(0, (audio.duration - audio.currentTime) / 8) * volume;
            } else if (!muted) {
                audio.volume = Math.min(1, volume * 1.3);
            }
        };
        const onDurationChange = () => setDuration(audio.duration);
        const onEnded = () => { setPlaying(false); if (audioRef.current) audioRef.current.volume = volume; };
        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("durationchange", onDurationChange);
        audio.addEventListener("ended", onEnded);
        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("durationchange", onDurationChange);
            audio.removeEventListener("ended", onEnded);
        };
    }, [songIndex, volume, muted]);

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (playing) {
            audio.pause(); setPlaying(false);
            if (countdownRef.current) { clearInterval(countdownRef.current); setCountdown(null); }
            countdownShown.current = false;
        } else { audio.play(); setPlaying(true); }
    };

    const handleRestart = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (countdownRef.current) { clearInterval(countdownRef.current); setCountdown(null); }
        countdownShown.current = false;
        audio.pause(); audio.currentTime = 0;
        setCurrentTime(0); setDisplayedIndex(0); setPlaying(false);
    };

    const handleSongSelect = (idx: number) => {
        const audio = audioRef.current;
        if (countdownRef.current) { clearInterval(countdownRef.current); setCountdown(null); }
        if (audio) { audio.pause(); audio.currentTime = 0; }
        setCurrentTime(0); setDisplayedIndex(0); setPlaying(false); setSongIndex(idx);
    };

    const handleSeek = (_: Event, value: number | number[]) => {
        const t = value as number;
        setCurrentTime(t);
        if (audioRef.current) audioRef.current.currentTime = t;
    };

    const handleVolume = (_: Event, value: number | number[]) => {
        const v = value as number;
        setVolume(v); setMuted(v === 0);
        if (audioRef.current) audioRef.current.volume = v;
    };

    const handleMute = () => {
        setMuted(m => { if (audioRef.current) audioRef.current.muted = !m; return !m; });
    };

    const totalSec = duration || song.totalDuration;

    return (
        <Box sx={{ fontFamily: '"Cormorant Garamond", serif', bgcolor: "#0B1F3A", minHeight: "100vh" }}>
            <audio ref={audioRef} src={song.audioSrc} preload="metadata" muted={muted} />

            {/* ── HERO ── */}
            <Box sx={{ position: "relative", bgcolor: "#0B1F3A", py: { xs: 5, md: 8 }, overflow: "hidden", textAlign: "center" }}>
                <Box component="video" autoPlay muted loop playsInline sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3, zIndex: 0 }}>
                    <source src="/assets/greek3video.mp4" type="video/mp4" />
                </Box>
                <Box sx={{ position: "absolute", inset: 0, backgroundImage: meanderPattern, backgroundSize: "40px 40px", opacity: 0.12, zIndex: 1 }} />
                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
                    <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: "0.75rem", letterSpacing: "0.35em", color: "#C9A84C", mb: 2, animation: `${fadeUp} 0.8s ease 0.1s both` }}>
                        ΜΑΘΕ ΕΛΛΗΝΙΚΑ ΤΡΑΓΟΥΔΩΝΤΑΣ
                    </Typography>
                    {["Пойте с нами", "давно знакомые", "песни на греческом!"].map((line, lineIdx) => {
                        const offset = lineIdx === 0 ? 0 : lineIdx === 1 ? "Пойте с нами,".length + 1 : "Пойте с нами,".length + 1 + "давно знакомые,".length + 1;
                        return (
                            <Box key={lineIdx} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mb: -5 }}>
                                {line.split("").map((char, ci) => (
                                    <Box key={ci} component="span" sx={{
                                        fontFamily: '"Great Vibes", cursive',
                                        fontSize: { xs: "3rem", md: "5rem" },
                                        fontWeight: 400, color: "#F8F5EE",
                                        letterSpacing: "0.02em", display: "inline-block", opacity: 0,
                                        animation: `${charAppear} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${(offset + ci) * 0.07}s forwards`,
                                        textShadow: "0 2px 20px rgba(201,168,76,0.3)",
                                    }}>
                                        {char === " " ? "\u00A0" : char}
                                    </Box>
                                ))}
                            </Box>
                        );
                    })}
                    <Box sx={{ width: 0, height: "2px", mx: "auto", mt: 2, mb: 4, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", animation: `${drawLine} 1s ease 2.5s forwards`, opacity: 0 }} />
                </Container>
                <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)", zIndex: 2 }} />
            </Box>

            <MarqueeBand />

            {/* ── SONG SELECTOR ── */}
            <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: "#0B1F3A" }}>
                <Container maxWidth="lg">
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                        gap: { xs: 1.5, sm: 2, md: 2 },
                    }}>
                        {SONGS.map((s, i) => (
                            <Box
                                key={i}
                                onClick={() => handleSongSelect(i)}
                                sx={{
                                    p: { xs: 1.5, sm: 2, md: 3 },
                                    border: i === songIndex ? "2px solid #C9A84C" : "1px solid rgba(201,168,76,0.25)",
                                    borderTop: i === songIndex ? "3px solid #C9A84C" : "3px solid rgba(201,168,76,0.4)",
                                    bgcolor: i === songIndex ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.03)",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    animation: `${fadeUp} 0.6s ease ${i * 0.15}s both`,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    height: { xs: 90, sm: 100, md: 115 },
                                    "&:hover": { bgcolor: "rgba(201,168,76,0.1)", transform: "translateY(-4px)", boxShadow: "0 8px 30px rgba(201,168,76,0.15)" },
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <MusicNoteIcon sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" }, color: "#C9A84C", flexShrink: 0 }} />
                                    <Typography sx={{
                                        fontFamily: '"Cinzel", serif',
                                        fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                                        color: "#C9A84C",
                                        letterSpacing: "0.06em",
                                        lineHeight: 1.2,
                                    }}>
                                        {s.titleEl}
                                    </Typography>
                                </Box>
                                <Typography sx={{
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                                    fontWeight: 700,
                                    color: "#F8F5EE",
                                    lineHeight: 1.2,
                                    py: 0.5,
                                }}>
                                    {s.title}
                                </Typography>
                                <Typography sx={{
                                    fontFamily: '"Lato", sans-serif',
                                    fontSize: { xs: "0.62rem", sm: "0.68rem", md: "0.72rem" },
                                    color: "rgba(248,245,238,0.4)",
                                    letterSpacing: "0.04em",
                                }}>
                                    {s.artist}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ── KARAOKE CARD ── */}
            <Box sx={{ pb: { xs: 6, md: 10 }, bgcolor: "#0B1F3A" }}>
                <Container maxWidth="md">
                    <Box sx={{
                        position: "relative",
                        border: "2px solid rgba(201,168,76,0.3)",
                        borderTop: "3px solid #C9A84C",
                        bgcolor: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(12px)",
                        animation: `${goldShimmer} 4s ease-in-out infinite`,
                        overflow: "hidden",
                    }}>
                        {countdown !== null && (
                            <Box sx={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(11,31,58,0.92)", backdropFilter: "blur(6px)" }}>
                                <Box key={countdown} sx={{ textAlign: "center", animation: `${countPop} 0.6s cubic-bezier(0.175,0.885,0.32,1.275)` }}>
                                    {countdown > 0 ? (
                                        <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: { xs: "7rem", md: "10rem" }, fontWeight: 700, lineHeight: 1, background: "linear-gradient(135deg, #F8F5EE, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 30px rgba(201,168,76,0.5))" }}>
                                            {countdown}
                                        </Typography>
                                    ) : (
                                        <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: { xs: "2.5rem", md: "3.5rem" }, fontWeight: 700, letterSpacing: "0.2em", background: "linear-gradient(135deg, #1B8FE0, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 20px rgba(27,143,224,0.6))" }}>
                                            СТАРТ!
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        )}

                        <Box sx={{ px: { xs: 2, md: 4 }, py: 2.5, borderBottom: "1px solid rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: "rgba(201,168,76,0.05)" }}>
                            <Box>
                                <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: { xs: "0.7rem", md: "0.85rem" }, color: "#C9A84C", letterSpacing: "0.12em", opacity: 0.85 }}>
                                    {song.titleEl} · {song.artist}
                                </Typography>
                                <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: "1.4rem", md: "1.9rem" }, fontWeight: 700, color: "#F8F5EE", lineHeight: 1.2 }}>
                                    {song.title}
                                </Typography>
                            </Box>
                            <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: "0.85rem", color: "rgba(248,245,238,0.4)", flexShrink: 0, ml: 2 }}>
                                {displayedIndex + 1} / {song.lines.length}
                            </Typography>
                        </Box>

                        <Box sx={{ display: { xs: "none", md: "grid" }, gridTemplateColumns: "1fr 1fr", px: 4, pt: 3, pb: 1, borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                            <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: "0.72rem", color: "#C9A84C", letterSpacing: "0.18em", opacity: 0.7 }}>
                                ΕΛΛΗΝΙΚΑ + **ΜΕΤΆΦΡΑΣΗ**
                            </Typography>
                            <Typography sx={{ fontFamily: '"Cinzel", serif', fontSize: "0.72rem", color: "rgba(248,245,238,0.4)", letterSpacing: "0.18em", pl: 3 }}>
                                ПЕРЕВОД
                            </Typography>
                        </Box>

                        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 }, minHeight: { xs: 140, md: 170 }, display: "flex", alignItems: "center" }}>
                            {(() => {
                                const line = song.lines[displayedIndex];
                                if (!line) return null;
                                return (
                                    <Box key={displayedIndex} sx={{
                                        display: "grid",
                                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                        gap: { xs: 0.5, md: 0 },
                                        width: "100%",
                                        borderLeft: "3px solid #C9A84C",
                                        pl: { xs: 1.5, md: 2.5 },
                                        py: { xs: 1, md: 1.5 },
                                        bgcolor: "rgba(201,168,76,0.04)",
                                        animation: `${fadeInLine} 0.5s ease`,
                                    }}>
                                        <Box sx={{ pr: { md: 4 } }}>
                                            <Typography sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: { xs: "1.2rem", md: "1.7rem" }, fontWeight: 700, color: "#F8F5EE", lineHeight: 1.3 }}>
                                                {line.el}
                                            </Typography>
                                            <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: { xs: "0.72rem", md: "0.85rem" }, color: "rgba(201,168,76,0.8)", fontStyle: "italic", letterSpacing: "0.03em", mt: 0.5 }}>
                                                {line.translit}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ borderLeft: { md: "1px solid rgba(201,168,76,0.15)" }, borderTop: { xs: "1px solid rgba(201,168,76,0.1)", md: "none" }, pl: { md: 4 }, pt: { xs: 0.5, md: 0 }, display: "flex", alignItems: "center" }}>
                                            <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: { xs: "0.85rem", md: "1rem" }, color: "rgba(248,245,238,0.8)", lineHeight: 1.5 }}>
                                                {line.ru}
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })()}
                        </Box>

                        <Box sx={{ px: { xs: 2, md: 4 }, pb: 1 }}>
                            <Slider value={currentTime} min={0} max={totalSec || 1} step={0.5} onChange={handleSeek}
                                    sx={{ color: "#1B8FE0", height: 3, "& .MuiSlider-thumb": { width: 12, height: 12, bgcolor: "#C9A84C", "&:hover": { boxShadow: "0 0 0 6px rgba(201,168,76,0.2)" } }, "& .MuiSlider-rail": { bgcolor: "rgba(255,255,255,0.1)" } }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: -1 }}>
                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: "0.72rem", color: "rgba(248,245,238,0.35)" }}>{formatTime(currentTime)}</Typography>
                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: "0.72rem", color: "rgba(248,245,238,0.35)" }}>{formatTime(totalSec)}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 2.5 }, display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "space-between" }, borderTop: "1px solid rgba(201,168,76,0.1)", flexWrap: "wrap", gap: 2 }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 130, display: { xs: "none", md: "flex" } }}>
                                <Tooltip title={muted ? "Включить" : "Выключить"}>
                                    <IconButton onClick={handleMute} sx={{ color: "rgba(248,245,238,0.5)", p: 0.5 }}>
                                        {muted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
                                    </IconButton>
                                </Tooltip>
                                <Slider value={muted ? 0 : volume} min={0} max={1} step={0.05} onChange={handleVolume}
                                        sx={{ width: 80, color: "#C9A84C", height: 3, "& .MuiSlider-thumb": { width: 10, height: 10 }, "& .MuiSlider-rail": { bgcolor: "rgba(255,255,255,0.1)" } }} />
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Tooltip title="Сначала / Από την αρχή">
                                    <IconButton onClick={handleRestart} sx={{ color: "rgba(248,245,238,0.4)", border: "1px solid rgba(201,168,76,0.2)", transition: "all 0.2s", "&:hover": { color: "#C9A84C", borderColor: "#C9A84C", bgcolor: "rgba(201,168,76,0.08)" } }}>
                                        <RestartAltIcon />
                                    </IconButton>
                                </Tooltip>
                                <IconButton onClick={handlePlayPause} sx={{ width: { xs: 56, md: 64 }, height: { xs: 56, md: 64 }, bgcolor: playing ? "#C9A84C" : "transparent", border: playing ? "none" : "2px solid #C9A84C", color: playing ? "#0B1F3A" : "#C9A84C", boxShadow: playing ? "0 4px 20px rgba(201,168,76,0.4)" : "none", transition: "all 0.3s ease", "&:hover": { bgcolor: "#C9A84C", color: "#0B1F3A", transform: "scale(1.08)" } }}>
                                    {playing ? <PauseIcon sx={{ fontSize: 28 }} /> : <PlayArrowIcon sx={{ fontSize: 28 }} />}
                                </IconButton>
                                <IconButton onClick={handleMute} sx={{ display: { xs: "flex", md: "none" }, color: muted ? "rgba(248,245,238,0.3)" : "rgba(248,245,238,0.6)", border: "1px solid rgba(201,168,76,0.2)" }}>
                                    {muted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
                                </IconButton>
                            </Stack>

                            <Box sx={{ minWidth: 50, textAlign: "right", display: { xs: "none", md: "block" } }}>
                                <Typography sx={{ fontFamily: '"Lato", sans-serif', fontSize: "0.72rem", color: "rgba(248,245,238,0.3)" }}>
                                    {Math.round(totalSec > 0 ? (currentTime / totalSec) * 100 : 0)}%
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/*---------------------------------------------------------------------*/}
            {/* ── GUITAR + YOUTUBE ── */}
            <Box sx={{ pb: { xs: 6, md: 8 }, bgcolor: "#0B1F3A" }}>
                <Container maxWidth="md">
                    <Box sx={{ position: "relative" }}>
                        {/* Видео */}
                        <Box sx={{
                            position: "relative",
                            paddingTop: "56.25%",
                            border: "2px solid rgba(201,168,76,0.3)",
                            borderTop: "3px solid #C9A84C",
                            overflow: "hidden",
                        }}>
                            <Box
                                component="iframe"
                                src="https://www.youtube.com/embed/LPCX8R1IeLU"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                            />
                        </Box>
                        {/* Гитара поверх видео — левый верхний край */}
                        <Box sx={{
                            position: "absolute",
                            top: { xs: "-40px", md: "-60px" },
                            left: { xs: "-10px", md: "-30px" },
                            width: { xs: "100px", sm: "130px", md: "160px" },
                            zIndex: 2,
                            pointerEvents: "none",
                        }}>
                            <GuitarAnimation />
                        </Box>
                    </Box>
                </Container>
            </Box>
            {/*-------------------------------------------*/}
            {/* ── FOOTER ── */}
            <Box sx={{ height: 3, background: "linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)" }} />
            <Box sx={{ bgcolor: "#060E1C", py: 3, textAlign: "center" }}>
                <Typography sx={{ fontFamily: '"Cinzel", serif', color: "rgba(201,168,76,0.6)", fontSize: "1.2rem", letterSpacing: "0.3em" }}>ΕΛΛΗΝΙΚΑ</Typography>
                <Typography sx={{ fontFamily: '"Lato", sans-serif', color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", mt: 1, letterSpacing: "0.1em" }}>© 2026 · Все права защищены</Typography>
            </Box>
        </Box>
    );
}
