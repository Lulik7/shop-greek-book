import { Box, Typography } from '@mui/material'

interface GreekBookProps {
    mini?: boolean
}

const GreekBook = ({ mini = false }: GreekBookProps) => {

    if (mini) {
        return (
            <Box sx={{ width: '100%', height: '100%' }}>
                <style>{`
                    .gb-mini-scene {
                        display: flex; width: 100%; height: 100%;
                        justify-content: center; align-items: stretch;
                        perspective: 2000px; perspective-origin: 50% 0%;
                        overflow: visible;
                    }
                    .gb-mini-wrap {
                        position: relative; display: flex; width: 100%; height: 100%;
                        justify-content: center;
                        perspective: 2000px; perspective-origin: 50% 50%;
                        transform: translate3d(0px, 3%, -80px) rotateX(22deg) rotateY(0deg) rotateZ(-8deg);
                        transition: transform 1800ms cubic-bezier(.165, .84, .44, 1);
                        transform-style: preserve-3d;
                        overflow: visible;
                    }
                    .gb-mini-wrap:hover {
                        transform: translate3d(0px, 3%, -80px) rotateX(10deg) rotateY(0deg) rotateZ(-2deg);
                    }
                    .gb-mini-cover-l {
                        flex:1; border-top-left-radius:5%; border-bottom-left-radius:5%;
                        background-color:#0B1F3A;
                        box-shadow: inset 2px -2px 3px 1px #1B4A7A, inset 4px -4px 3px 0 #060E1C;
                        transform: translate3d(0,0,-1px); transform-style:preserve-3d;
                    }
                    .gb-mini-cover-r {
                        flex:1; border-top-right-radius:5%; border-bottom-right-radius:5%;
                        background-color:#0B1F3A;
                        box-shadow: inset -2px -2px 3px 1px #1B4A7A, inset -4px -4px 3px 0 #060E1C;
                    }
                    .gb-mini-center {
                        width:4%;
                        background-image:
                            radial-gradient(circle farthest-corner at 56% -8%, #C9A84C 8%, transparent 0),
                            radial-gradient(circle farthest-corner at 50% 108%, #C9A84C 8%, transparent 0),
                            linear-gradient(90deg,#1B4A7A,#0B1F3A 21%,#1B4A7A 30%,#0B1F3A 48%,#1B4A7A 68%,#0B1F3A 79%,#1B4A7A);
                    }
                    .gb-mini-left {
                        position:relative; display:flex; width:49%;
                        backface-visibility:hidden; perspective:2000px; perspective-origin:0% 50%;
                        transform: rotateY(18deg); transform-origin:100% 50%; transform-style:preserve-3d;
                    }
                    .gb-mini-right {
                        position:relative; display:flex; width:49%;
                        perspective:2000px; perspective-origin:0% 50%;
                        transform: rotateY(-1deg); transform-style:preserve-3d;
                    }
                    .gb-mini-layer { position:absolute;inset:0;display:flex;margin:6px 4px;justify-content:flex-start;transform:translate3d(0,0,3px);transform-style:preserve-3d; }
                    .gb-mini-page-l {
                        flex:1; border-radius: 0;
                        background-color:#FDFAF4;
                        box-shadow: inset 0 0 10px 1px #d8cccc, -1px 1px 5px 0 rgba(11,31,58,.7);
                    }
                    .gb-mini-page-r {
                        flex:1; border-radius: 0;
                        background-color:#FDFAF4;
                        box-shadow: inset 0 0 10px 1px #d8cccc, 1px 1px 5px 0 rgba(11,31,58,.7);
                    }
                    .gb-mini-text-layer {
                        position:absolute;inset:0;display:flex;width:96%;margin:6px 4px;
                        justify-content:flex-start;backface-visibility:hidden;
                        transform:translate3d(0,0,12px);transform-style:preserve-3d;
                    }
                    .gb-mini-text-layer.right { transform:translate3d(-8px,0,12px); }
                    .gb-mini-page-l2 {
                        position:relative;flex:1;
                        border-radius: 0;
                        background-color:#FDFAF4;
                        box-shadow:inset 0 0 4px 2px hsla(0,13%,82%,.43),-1px 1px 5px 0 rgba(11,31,58,.4);
                        backface-visibility:hidden;
                        transform:rotateY(15deg);transform-origin:100% 50%;
                        transition:transform 650ms cubic-bezier(.165,.84,.44,1);transform-style:preserve-3d;
                    }
                    .gb-mini-page-l2:hover { transform:rotateY(7deg); }
                    .gb-mini-page-r2 {
                        position:relative;flex:1;
                        border-radius: 0;
                        background-color:#FDFAF4;
                        box-shadow:inset 0 0 4px 2px hsla(0,13%,82%,.43),1px 1px 5px 0 rgba(11,31,58,.4);
                        backface-visibility:hidden;
                        transform:rotateY(-2deg);transform-origin:0% 50%;
                        transition:transform 850ms ease;transform-style:preserve-3d;
                    }
                    .gb-mini-page-r2:hover { transform:rotateY(-12deg); }
                    .gb-mini-txt {
                        width:82%;margin:16px auto 0;
                        font-family:'Cormorant Garamond',Georgia,serif;
                    }
                    .gb-mini-txt h4 {
                        margin:0 0 2px;font-size:9px;font-style:italic;font-weight:700;
                        color:#0B1F3A;line-height:1.2;
                    }
                    .gb-mini-txt span {
                        display:block;font-size:6px;font-family:'Cinzel',serif;
                        letter-spacing:0.1em;color:#C9A84C;text-transform:uppercase;margin-bottom:4px;
                    }
                    .gb-mini-div { width:16px;height:1px;background:#C9A84C;margin:3px 0;opacity:0.6; }
                    .gb-mini-txt p {
                        margin:0;font-size:7px;line-height:1.75;
                        color:#3A5A82;font-style:italic;
                    }
                `}</style>
                <div className="gb-mini-scene">
                    <div className="gb-mini-wrap">
                        <div className="gb-mini-left">
                            <div className="gb-mini-cover-l"></div>
                            <div className="gb-mini-layer"><div className="gb-mini-page-l"></div></div>
                            <div className="gb-mini-text-layer">
                                <div className="gb-mini-page-l2">
                                    <div className="gb-mini-txt">
                                        <h4>Ἰλιάς</h4>
                                        <span>Ὅμηρος · VIII в. до н.э.</span>
                                        <div className="gb-mini-div"></div>
                                        <p>Μῆνιν ἄειδε, θεά,</p>
                                        <p>Πηληϊάδεω Ἀχιλῆος</p>
                                        <p>οὐλομένην, ἣ μυρί᾽</p>
                                        <p>Ἀχαιοῖς ἄλγε᾽ ἔθηκεν,</p>
                                        <p>πολλὰς δ᾽ ἰφθίμους</p>
                                        <p>ψυχὰς Ἄϊδι προΐαψεν</p>
                                        <p>ἡρώων, αὐτοὺς δὲ</p>
                                        <p>ἑλώρια τεῦχε κύνεσσιν</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gb-mini-center"></div>
                        <div className="gb-mini-right">
                            <div className="gb-mini-cover-r"></div>
                            <div className="gb-mini-layer"><div className="gb-mini-page-r"></div></div>
                            <div className="gb-mini-text-layer right">
                                <div className="gb-mini-page-r2">
                                    <div className="gb-mini-txt" style={{ paddingLeft: '10%' }}>
                                        <h4>Ἀπολογία</h4>
                                        <span>Πλάτων · IV в. до н.э.</span>
                                        <div className="gb-mini-div"></div>
                                        <p>Ὅτι μὲν ὑμεῖς,</p>
                                        <p>ὦ ἄνδρες Ἀθηναῖοι,</p>
                                        <p>πεπόνθατε ὑπὸ τῶν</p>
                                        <p>ἐμῶν κατηγόρων,</p>
                                        <p>οὐκ οἶδα· ἐγὼ δ᾽ οὖν</p>
                                        <p>καὶ αὐτὸς ὑπ᾽ αὐτῶν</p>
                                        <p>ὀλίγου ἐμαυτοῦ</p>
                                        <p>ἐπελαθόμην, οὕτω.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        )
    }

    // ── Полноразмерная версия ─────────────────────────────
    return (
        <Box sx={{ width: '100%', bgcolor: '#F8F5EE', py: { xs: 8, md: 12 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="overline" sx={{ color: '#C9A84C', letterSpacing: '0.25em', fontFamily: '"Cinzel", serif', fontSize: '0.7rem' }}>
                    Из первоисточников
                </Typography>
                <Typography variant="h3" sx={{ color: '#0B1F3A', fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, fontSize: { xs: '2rem', md: '3rem' }, mt: 1 }}>
                    Читайте в оригинале
                </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <style>{`
                    .greek-scene { display:flex;width:100%;height:54vw;max-height:520px;justify-content:center;align-items:stretch;perspective:4000px;perspective-origin:50% 0%; }
                    .greek-book-wrap { position:relative;display:flex;width:57vw;max-width:680px;margin-top:4vw;margin-bottom:4vw;padding:0 1%;justify-content:center;perspective:4000px;perspective-origin:50% 50%;transform:translate3d(0px,5%,-264px) rotateX(27deg) rotateY(0deg) rotateZ(-10deg);transition:transform 2000ms cubic-bezier(.165,.84,.44,1);transform-style:preserve-3d; }
                    .greek-book-wrap:hover { transform:translate3d(0px,5%,-264px) rotateX(13deg) rotateY(0deg) rotateZ(-3deg); }
                    .gb-cover-left { flex:1;border-top-left-radius:4%;border-bottom-left-radius:4%;background-color:#0B1F3A;box-shadow:inset 4px -4px 4px 1px #1B4A7A,inset 7px -7px 4px 0 #060E1C;transform:translate3d(0px,0px,-1px);transform-style:preserve-3d; }
                    .gb-cover-right { flex:1;border-top-right-radius:4%;border-bottom-right-radius:4%;background-color:#0B1F3A;box-shadow:inset -4px -4px 4px 1px #1B4A7A,inset -7px -7px 4px 0 #060E1C; }
                    .gb-center { width:3%;background-image:radial-gradient(circle farthest-corner at 56% -8%,#C9A84C 8%,transparent 0),radial-gradient(circle farthest-corner at 50% 108%,#C9A84C 8%,transparent 0),linear-gradient(90deg,#1B4A7A,#0B1F3A 21%,#1B4A7A 30%,#0B1F3A 48%,#1B4A7A 68%,#0B1F3A 79%,#1B4A7A); }
                    .gb-left-side { position:relative;display:flex;width:49%;backface-visibility:hidden;perspective:4000px;perspective-origin:0% 50%;transform:rotateX(0deg) rotateY(20deg) rotateZ(0deg);transform-origin:100% 50%;transform-style:preserve-3d; }
                    .gb-right-side { position:relative;display:flex;width:49%;perspective:4000px;perspective-origin:0% 50%;transform:rotateX(0deg) rotateY(-1deg) rotateZ(0deg);transform-style:preserve-3d; }
                    .gb-layer1 { position:absolute;inset:0;display:flex;margin:20px 10px 10px;justify-content:flex-start;transform:translate3d(0px,0px,5px);transform-style:preserve-3d; }
                    .gb-layer2 { position:absolute;inset:0;display:flex;margin:20px 10px 13px;justify-content:flex-start;transform:translate3d(2px,0px,10px);transform-style:preserve-3d; }
                    .gb-layer2.right { transform:translate3d(-5px,0px,10px); }
                    .gb-layer3 { position:absolute;inset:0;display:flex;margin:20px 10px 13px;justify-content:flex-start;transform:translate3d(4px,0px,20px);transform-style:preserve-3d; }
                    .gb-layer3.right { transform:translate3d(-10px,0px,20px); }
                    .gb-layer4 { position:absolute;inset:0;display:flex;margin:20px 10px 15px;justify-content:flex-start;transform:translate3d(6px,0px,30px);transform-style:preserve-3d; }
                    .gb-layer4.right { transform:translate3d(-15px,0px,30px); }
                    .gb-page-left { flex:1;border-top-left-radius:1%;border-bottom-left-radius:1%;background-color:#FDFAF4;box-shadow:inset 0 0 26px 2px #d8cccc,-1px 1px 13px 0 rgba(11,31,58,.81); }
                    .gb-page-right { flex:1;border-top-right-radius:1%;border-bottom-right-radius:1%;background-color:#FDFAF4;box-shadow:inset 0 0 26px 2px #d8cccc,1px 1px 13px 0 rgba(11,31,58,.81); }
                    .gb-layer-text { position:absolute;inset:0;display:flex;width:97%;margin:20px 10px 18px;justify-content:flex-start;backface-visibility:hidden;perspective:4000px;perspective-origin:50% 50%;transform:translate3d(0px,0px,32px);transform-style:preserve-3d; }
                    .gb-layer-text.right { transform:translate3d(-37px,0px,32px); }
                    .gb-page-left-2 { position:relative;flex:1;border-top-left-radius:18%;border-bottom-left-radius:1%;background-color:#FDFAF4;box-shadow:inset 0 0 7px 4px hsla(0,13%,82%,.43),-1px 1px 13px 0 rgba(11,31,58,.49);backface-visibility:hidden;transform:rotateX(0deg) rotateY(17deg) rotateZ(0deg);transform-origin:100% 50%;transition:transform 650ms cubic-bezier(.165,.84,.44,1);transform-style:preserve-3d; }
                    .gb-page-left-2:hover { transform:rotateX(0deg) rotateY(7deg) rotateZ(0deg); }
                    .gb-page-right-2 { position:relative;flex:1;border-top-right-radius:1%;border-bottom-right-radius:1%;background-color:#FDFAF4;box-shadow:inset 0 0 7px 4px hsla(0,13%,82%,.43),1px 1px 13px 0 rgba(11,31,58,.49);backface-visibility:hidden;transform:rotateX(0deg) rotateY(-3deg) rotateZ(0deg);transform-origin:0% 50%;transition:transform 850ms ease;transform-style:preserve-3d; }
                    .gb-page-right-2:hover { transform:rotateX(0deg) rotateY(-17deg) rotateZ(0deg); }
                    .gb-corner-fold { position:absolute;left:0;top:0;width:30px;height:30px;border-right:1px solid hsla(0,13%,82%,.55);border-bottom:1px solid hsla(0,13%,82%,.55);background-image:linear-gradient(135deg,transparent 47%,#f0f0f0 48%,#fff 55%,#f6f6f6);box-shadow:6px 6px 9px -4px hsla(0,13%,82%,.53); }
                    .gb-corner { position:absolute;left:0;top:27px;width:5vw;height:5vw;background-image:linear-gradient(135deg,#fff 30%,transparent);box-shadow:inset 13px 0 17px -12px hsla(0,13%,82%,.43); }
                    .gb-corner2 { position:absolute;left:28px;top:0;width:5vw;height:5vw;background-image:linear-gradient(135deg,#fff 31%,transparent);box-shadow:inset 0 13px 17px -12px hsla(0,13%,82%,.43); }
                    .gb-page-text { position:relative;display:block;width:80%;margin:25px auto 0;font-family:'Cormorant Garamond',Georgia,serif;color:#0B1F3A; }
                    .gb-page-text h3 { margin:0 0 4px;font-size:1.6vw;font-style:italic;font-weight:700;color:#0B1F3A;font-family:'Cormorant Garamond',serif;line-height:1.2; }
                    .gb-page-text h6 { margin:0 0 8px;font-size:0.65vw;font-family:'Cinzel',serif;font-weight:400;letter-spacing:0.15em;color:#C9A84C;text-transform:uppercase; }
                    .gb-page-text p { margin:0;font-size:0.82vw;line-height:1.75;color:#3A5A82;font-family:'Cormorant Garamond',serif;font-style:italic; }
                    .gb-divider { width:30px;height:1px;background:#C9A84C;margin:6px 0;opacity:0.6; }
                `}</style>
                <div className="greek-scene">
                    <div className="greek-book-wrap">
                        <div className="gb-left-side">
                            <div className="gb-cover-left"></div>
                            <div className="gb-layer1"><div className="gb-page-left"></div></div>
                            <div className="gb-layer2"><div className="gb-page-left"></div></div>
                            <div className="gb-layer3"><div className="gb-page-left"></div></div>
                            <div className="gb-layer4"><div className="gb-page-left"></div></div>
                            <div className="gb-layer-text">
                                <div className="gb-page-left-2">
                                    <div className="gb-corner"></div>
                                    <div className="gb-corner2"></div>
                                    <div className="gb-corner-fold"></div>
                                    <div className="gb-page-text">
                                        <h3>Ἰλιάς</h3>
                                        <h6>Ὅμηρος · VIII в. до н.э.</h6>
                                        <div className="gb-divider"></div>
                                        <p>Μῆνιν ἄειδε, θεά, Πηληϊάδεω Ἀχιλῆος</p>
                                        <p>οὐλομένην, ἣ μυρί᾽ Ἀχαιοῖς ἄλγε᾽ ἔθηκεν,</p>
                                        <p>πολλὰς δ᾽ ἰφθίμους ψυχὰς Ἄϊδι προΐαψεν</p>
                                        <p>ἡρώων, αὐτοὺς δὲ ἑλώρια τεῦχε κύνεσσιν</p>
                                        <p>οἰωνοῖσί τε πᾶσι· Διὸς δ᾽ ἐτελείετο βουλή·</p>
                                        <p>ἐξ οὗ δὴ τὰ πρῶτα διαστήτην ἐρίσαντε</p>
                                        <p>Ἀτρεΐδης τε ἄναξ ἀνδρῶν καὶ δῖος Ἀχιλλεύς.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gb-center"></div>
                        <div className="gb-right-side">
                            <div className="gb-cover-right"></div>
                            <div className="gb-layer1"><div className="gb-page-right"></div></div>
                            <div className="gb-layer2 right"><div className="gb-page-right"></div></div>
                            <div className="gb-layer3 right"><div className="gb-page-right"></div></div>
                            <div className="gb-layer4 right"><div className="gb-page-right"></div></div>
                            <div className="gb-layer-text right">
                                <div className="gb-page-right-2">
                                    <div className="gb-page-text" style={{ paddingLeft: '8%' }}>
                                        <h3>Ἀπολογία Σωκράτους</h3>
                                        <h6>Πλάτων · IV в. до н.э.</h6>
                                        <div className="gb-divider"></div>
                                        <p>Ὅτι μὲν ὑμεῖς, ὦ ἄνδρες Ἀθηναῖοι,</p>
                                        <p>πεπόνθατε ὑπὸ τῶν ἐμῶν κατηγόρων,</p>
                                        <p>οὐκ οἶδα· ἐγὼ δ᾽ οὖν καὶ αὐτὸς ὑπ᾽ αὐτῶν</p>
                                        <p>ὀλίγου ἐμαυτοῦ ἐπελαθόμην, οὕτω</p>
                                        <p>πιθανῶς ἔλεγον. Καίτοι ἀληθές γε</p>
                                        <p>ὡς ἔπος εἰπεῖν οὐδὲν εἰρήκασιν.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default GreekBook
