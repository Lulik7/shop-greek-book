import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

const CSS = `
.guitar-swing {
    animation: gSwing 3s ease-in-out 2.5s infinite;
    transform: rotate(30deg);
    transform-origin: 50% 5%;
    display: block;
    width: 100%;
    overflow: visible;
}
.guitar-visible .g-body   { animation: gBody    1.2s cubic-bezier(0.34,1.56,0.64,1) 0.0s both; }
.guitar-visible .g-neck   { animation: gNeck    1.2s cubic-bezier(0.34,1.56,0.64,1) 0.1s both; }
.guitar-visible .g-frets  { animation: gFade    1.0s ease                            0.3s both; }
.guitar-visible .g-tuners { animation: gTuners  0.6s ease                            0.4s both; }
.guitar-visible .g-pegs   { animation: gPop     0.6s cubic-bezier(0.34,1.56,0.64,1) 0.4s both; }
.guitar-visible .g-pickup { animation: gPop     0.8s cubic-bezier(0.34,1.56,0.64,1) 0.5s both; }
.guitar-visible .g-inlays { animation: gPop     0.8s cubic-bezier(0.34,1.56,0.64,1) 0.6s both; }
.guitar-visible .g-bridge { animation: gSlide   0.6s ease                            0.7s both; }
.guitar-visible .g-pots   { animation: gPop     0.8s cubic-bezier(0.34,1.56,0.64,1) 0.8s both; }
.guitar-visible .g-truss  { animation: gFade    0.5s ease                            0.9s both; }
.guitar-visible .g-strings{ animation: gStrings 1.2s ease                            1.0s both; }

.g-body, .g-neck, .g-frets, .g-tuners, .g-pegs,
.g-pickup, .g-inlays, .g-bridge, .g-pots, .g-truss, .g-strings {
    opacity: 0;
}
.guitar-visible .g-body, .guitar-visible .g-neck, .guitar-visible .g-frets,
.guitar-visible .g-tuners, .guitar-visible .g-pegs, .guitar-visible .g-pickup,
.guitar-visible .g-inlays, .guitar-visible .g-bridge, .guitar-visible .g-pots,
.guitar-visible .g-truss, .guitar-visible .g-strings {
    opacity: 1;
}

@keyframes gSwing {
    0%   { transform: rotate(20deg); }
    30%  { transform: rotate(38deg); }
    60%  { transform: rotate(18deg); }
    80%  { transform: rotate(35deg); }
    100% { transform: rotate(20deg); }
}
@keyframes gBody {
    0%   { opacity:0; transform: translateY(500px); }
    100% { opacity:1; transform: translateY(0); }
}
@keyframes gNeck {
    0%   { opacity:0; transform: translateY(-100px); }
    100% { opacity:1; transform: translateY(0); }
}
@keyframes gPop {
    0%   { opacity:0; transform: scale(0); }
    60%  { opacity:1; transform: scale(1.15); }
    100% { opacity:1; transform: scale(1); }
}
@keyframes gSlide {
    0%   { opacity:0; transform: translateY(-20px); }
    100% { opacity:1; transform: translateY(0); }
}
@keyframes gTuners {
    0%   { opacity:0; transform: translateX(-14px); }
    100% { opacity:1; transform: translateX(0); }
}
@keyframes gFade {
    0%   { opacity:0; }
    100% { opacity:1; }
}
@keyframes gStrings {
    0%   { opacity:0; transform: scaleY(0); transform-origin: 50% 0%; }
    100% { opacity:1; transform: scaleY(1); transform-origin: 50% 0%; }
}
`;

export default function GuitarAnimation() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const style = document.createElement("style");
        style.setAttribute("data-guitar", "1");
        style.textContent = CSS;
        document.head.appendChild(style);
        return () => {
            const existing = document.querySelector("style[data-guitar='1']");
            if (existing) existing.remove();
        };
    }, []);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Box ref={wrapRef} sx={{ width: "100%", height: "100%" }}>
            <svg
                className={`guitar-swing${visible ? " guitar-visible" : ""}`}
                viewBox="0 0 560 1000"
                style={{ overflow: "visible", display: "block", width: "100%" }}
            >
                <g className="g-neck">
                    <path fill="#DBBB37" d="M286.8,202.4c0.1-5.1,0.8-12.5,3.8-20.9c2.7-7.8,6.4-13.7,9.3-17.7c-1.7-11.9-2.9-24.9-3.3-38.9c-0.8-31.4,2.8-58.9,7.5-81.1c-8.5,26.5-17,53-25.5,79.5l9.8,41.5c0.4,13.7-0.8,20.6-2,24.4c-0.4,1.3-2.1,5.8-0.6,10.8C286.1,201,286.5,201.9,286.8,202.4z"/>
                    <path fill="#6D4326" d="M287.1,202.5c2,148,4,296,6,444c-17.7-0.1-35.3-0.2-53-0.3c1.7-147.9,3.3-295.8,5-443.7C259.1,202.5,273.1,202.5,287.1,202.5z"/>
                    <path fill="#141413" d="M245.1,203c0.7-4,1.5-12-1-21.3c-2.2-8.4-6.2-14.3-8.8-17.7c2-18.3,3-40.4,1.3-65.2c-1.5-20.9-4.6-39.4-8.3-55.1c5.1,0.1,9.4-0.4,12.6-0.9c7-1.2,10.5-1.8,13-3.5c0.4-0.3,3.1-2.2,6.1-2.4c0.9-0.1,1.9-0.1,2.9,0.5c0.5,0.3,1.3,0.6,1.8,1.5c0.4,1.4,0.9,2.8,1.3,4.3c0.4-1.7,0.8-3.3,1.3-5c0.2-0.4,0.7-1.3,1.8-1.9c0.5-0.3,1.3-0.6,2.8-0.5c2.4,0.1,4.2,1.2,4.5,1.4c3.2,1.9,7.8,3.1,14.8,4.8c2.9,0.7,7.2,1.5,12.8,1.3c-3.7,15.3-6.9,33.5-8.3,54.3c-1.7,25.2-0.2,47.4,2.3,65.3c-2.7,3.5-6.5,9.2-9,17.1c-3,9.6-2.6,18.5-2,22.5C273.1,203,259.1,203,245.1,203z"/>
                    <path fill="#774C2F" d="M240.1,646.2c11-146.7,22.1-293.3,33.1-440c-9.3,0-18.6,0.1-27.9,0.1C243.6,353,241.8,499.6,240.1,646.2z"/>
                </g>
                <g className="g-tuners">
                    <rect x="295.3" y="140.9" fill="#565654" width="8.8" height="2.5"/>
                    <ellipse fill="#F4F4F2" cx="310.2" cy="142.2" rx="6.3" ry="9.2"/>
                    <rect x="294.1" y="105.9" fill="#565654" width="11" height="2.5"/>
                    <ellipse fill="#F4F4F2" cx="311.2" cy="107.2" rx="6.3" ry="9.2"/>
                    <rect x="297.3" y="70.9" fill="#565654" width="8.8" height="2.5"/>
                    <ellipse fill="#F4F4F2" cx="312.2" cy="72.2" rx="6.3" ry="9.2"/>
                    <rect x="228.5" y="140.9" fill="#565654" width="8.8" height="2.5"/>
                    <ellipse fill="#F4F4F2" cx="222.4" cy="142.2" rx="6.3" ry="9.2"/>
                    <rect x="227.5" y="105.9" fill="#565654" width="11" height="2.5"/>
                    <ellipse fill="#F4F4F2" cx="221.4" cy="107.2" rx="6.3" ry="9.2"/>
                    <rect x="226.5" y="70.9" fill="#565654" width="8.8" height="2.5"/>
                    <ellipse fill="#F4F4F2" cx="220.4" cy="72.2" rx="6.3" ry="9.2"/>
                </g>
                <g className="g-body">
                    <path fill="#EFC822" d="M272.6,647.6c35-0.9,40.7,2.5,52-4c12.8-7.3,18.7-14.7,18.7-14.7c6.1-7.7,6.7-13.2,12-14.7c6.2-1.7,13.5,3.5,17.3,8.5c8.1,10.7,4.4,25.8,2.5,30.5c-0.2,0.5-1.2,3-2.7,6.2c-1.5,3.3-2.5,5.2-4.6,9.2c0,0-1.5,2.5-4.3,8.6c-6.8,14.9-10.4,22.9-9.5,33.5c0.9,10.6,5.9,18.9,7.5,21.5c1.4,2.2,5.1,6.5,12.5,15c11.3,13,11.8,13.6,13,15c0,0,7.7,9.4,15,21.5c6.9,11.5,17.4,29.4,21,55c4,28.6-2.7,51.4-6.3,61.3c-5.8,16.2-13.7,28.2-19.6,35.7c0,0-38,50.7-126.2,52.8c-1.6,0-4,0.1-7.2,0.1c-12.9-0.1-86.5-0.8-129.1-55.7c-20.7-26.8-24.9-54.5-25.7-61.1c-0.3-2.5-4.7-39.8,12.8-73.3c10.6-20.3,22.7-34.2,22.7-34.2s5.2-6.1,7.3-8.5c0.6-0.7,3.3-4.3,8.6-11.5c0,0,1.1-1.5,6-8.2c3-4.1,3.6-5,4.5-6.3c0,0,3-4.2,4.5-8.5c3.2-9,2.2-18.2,2-19.5c-2.5-20.6-19.1-34.7-23-59.5c-0.7-4.2-4.1-27,9-38.5c4-3.5,11.7-7.8,17-5.2c6.8,3.3,2.3,14,11.5,28.2c6,9.2,13.6,13.5,15.5,14.5c4.8,2.6,9,3.5,11.5,4C237.4,648.9,261.1,647.9,272.6,647.6z"/>
                    <path fill="#333333" d="M231.1,646c-2.5,5-7.4,15-6.8,28.8c0.6,15.1,7.4,25.6,10.3,29.9c9.3,13.7,21.5,19.9,26,22c4.8,2.3,3.8,1.1,26,8.2c11.8,3.8,18,4.7,24.7,10c5.9,4.7,9,9.8,9.6,10.8c2.8,4.9,3.4,8.5,6.1,26.5c1.6,10.7,2.5,16.1,3.7,17.7c5.6,7.4,17.1,7.7,28.7,8c10.2,0.2,18.6-1.2,24.3-2.7c1.1-0.5,7.2-3.4,9.7-10.7c2.8-8.2-1.6-15-2.2-15.8c-2.9-4-7.9-10.6-14.3-18.5c-17.4-21.7-22.7-25.1-26.3-36.5c-4-12.7-2.3-24.1-1.8-26.3c0.4-1.9,1-4.6,2.1-7.8c1.6-5,3.2-8.2,5.4-12.7c3.9-7.8,6.9-14.5,9-19.7c1.3-3.3,3.3-7.3,3.5-12.8c0.1-2.6-0.2-4-0.7-5.2c-1.2-3.1-4.1-6.2-8-6.9c-2.3-0.4-4.1,0.1-4.9,0.4c-3.8,1.2-6,4-7.3,5.5c-3,3.5-6.5,5.2-13.3,8.8c-3.3,1.7-13.4,6.7-25.8,4.6c-6.2-1.1-10.9-3.6-13.8-5.6C273.8,646,252.4,646,231.1,646z"/>
                </g>
                <g className="g-pickup">
                    <path fill="#474747" d="M210.8,770.2c-0.4-0.5-1.3-2-1.3-4c0-0.6,0.2-2.3,1.3-4c5.3-5,10.2-10,16.2-14.9v36.9L210.8,770.2z"/>
                    <path fill="#474747" d="M306,783.8c4-5,10.1-10,15.3-15c0.5-1.5,0.1-2.9-0.1-3.4c-0.2-0.7-0.3-1.2-0.5-1.6c-5.3-4.9-11.4-9.8-15.4-14.7C306,759.6,306,771.7,306,783.8z"/>
                    <path fill="#333333" d="M307.1,749.5V782c0,1.7-1.4,3-3,3h-75.8c-1.7,0-3-1.3-3-3v-32.5c0-1.6,1.3-3,3-3h75.8C305.7,746.5,307.1,747.8,307.1,749.5z"/>
                    <circle fill="#666666" cx="241" cy="765.6" r="3.1"/>
                    <circle fill="#666666" cx="251" cy="765.6" r="3.1"/>
                    <circle fill="#666666" cx="261" cy="765.6" r="3.1"/>
                    <circle fill="#666666" cx="271" cy="765.6" r="3.1"/>
                    <circle fill="#666666" cx="281" cy="765.6" r="3.1"/>
                    <circle fill="#666666" cx="291" cy="765.6" r="3.1"/>
                </g>
                <g className="g-bridge">
                    <path fill="#BCBCBB" d="M319.1,804.7v4.8c0,3.7-3,6.8-6.8,6.8h-91.5c-3.7,0-6.8-3-6.8-6.8v-4.8c0-3.7,3-6.8,6.8-6.8h91.5C316.1,798,319.1,801,319.1,804.7z"/>
                    <circle fill="#A0A0A0" cx="228.7" cy="801" r="7.8"/>
                    <circle fill="#A0A0A0" cx="306.9" cy="801.3" r="7.5"/>
                </g>
                <g className="g-pots">
                    <circle fill="#3A3A3A" cx="335.8" cy="849.8" r="13.7"/>
                    <circle fill="#494949" cx="332" cy="851" r="8.9"/>
                    <circle fill="#3A3A3A" cx="335.8" cy="906.8" r="13.7"/>
                    <circle fill="#494949" cx="332" cy="909" r="8.9"/>
                </g>
                <g className="g-frets">
                    <rect x="245.1" y="202.2" fill="#F2F2F2" width="42.3" height="3.8"/>
                    <rect x="244.4" y="239"   fill="#9E9E9B" width="43.4" height="1.7"/>
                    <rect x="244.3" y="270.6" fill="#9E9E9B" width="43.8" height="1.7"/>
                    <rect x="243.9" y="300.1" fill="#9E9E9B" width="44.6" height="1.7"/>
                    <rect x="243.6" y="328.3" fill="#9E9E9B" width="45.3" height="1.7"/>
                    <rect x="242.9" y="380.3" fill="#9E9E9B" width="46.5" height="1.7"/>
                    <rect x="242.4" y="426.6" fill="#9E9E9B" width="47.8" height="1.7"/>
                    <rect x="241.8" y="486.5" fill="#9E9E9B" width="49.1" height="1.7"/>
                    <rect x="240.9" y="565.8" fill="#9E9E9B" width="51.1" height="1.7"/>
                    <rect x="240.1" y="635.4" fill="#9E9E9B" width="52.9" height="1.7"/>
                </g>
                <g className="g-inlays">
                    <circle fill="#F2F2F2" cx="266.4" cy="545.6" r="3.3"/>
                    <circle fill="#F2F2F2" cx="249.4" cy="496.6" r="3.3"/>
                    <circle fill="#F2F2F2" cx="283.4" cy="496.6" r="3.3"/>
                    <circle fill="#F2F2F2" cx="266.4" cy="437.6" r="3.3"/>
                    <circle fill="#F2F2F2" cx="266.4" cy="342.6" r="3.3"/>
                    <circle fill="#F2F2F2" cx="266.4" cy="286.6" r="3.3"/>
                </g>
                <g className="g-strings">
                    <rect x="245.9" y="144.1" fill="#C9C9C9" width="1.5" height="663.3"/>
                    <rect x="254.4" y="202.4" fill="#C9C9C9" width="1.6" height="605"/>
                    <rect x="261.7" y="202.4" fill="#C9C9C9" width="1.6" height="605.6"/>
                    <rect x="270.2" y="202.3" fill="#878787" width="1.6" height="605.8"/>
                    <rect x="277.2" y="202.2" fill="#878787" width="1.6" height="605.8"/>
                    <rect x="284.5" y="144.1" fill="#878787" width="1.5" height="663.8"/>
                </g>
                <g className="g-pegs">
                    <circle fill="#898988" cx="245.8" cy="144.3" r="5"/>
                    <circle fill="#898988" cx="245.8" cy="108.3" r="5"/>
                    <circle fill="#898988" cx="243.8" cy="76.3"  r="5"/>
                    <circle fill="#C9C9C9" cx="286.8" cy="144.3" r="5"/>
                    <circle fill="#C9C9C9" cx="286.8" cy="108.3" r="5"/>
                    <circle fill="#C9C9C9" cx="288.8" cy="76.3"  r="5"/>
                </g>
                <g className="g-truss">
                    <path fill="#212120" d="M268.7,150.9c1.9,1.1,5.1,3.2,7.7,6.9c1.8,2.6,2.8,5,3.3,6.8c-1.6,2.4-4.4,7.5-4.9,14.5c-0.4,6.3,1.3,11.2,2.4,13.8c1.7,2,3.5,4,5.2,6c-1.7,0.1-4.3-0.1-6.6-1.3c-1.8-1-1.9-1.7-3.6-2.3c-3.3-1.1-6.8,0.3-7.5,0.6c-2.3,0.9-2.4,1.7-4.4,2.6c-2.5,1-5.2,0.9-7.4,0.5c2.1-1.7,4.3-3.5,6.4-5.2c1.2-3,2.6-8.2,2-14.5c-0.6-6.6-3.1-11.7-4.9-14.5c1.2-1.9,2.6-4.1,4.5-6.3C263.6,155.2,266.3,152.8,268.7,150.9z"/>
                </g>
            </svg>
        </Box>
    );
}
