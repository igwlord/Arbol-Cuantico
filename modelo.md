<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Árbol Cuántico – עץ קוונטי</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- React Libraries -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    
    <!-- Babel Compiler (for JSX) -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>
        /* This style block will be managed by the React component */
    </style>
</head>
<body class="transition-colors duration-500 ease-in-out">
    <div id="root"></div>

    <script type="text/babel">
        // The entire React application code goes here
        
        // FONT IMPORT (Simulated for this environment)
        const WebFont = ({ families }) => {
          React.useEffect(() => {
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css2?${families.map(f => `family=${f.replace(/ /g, '+')}:wght@400;700`).join('&')}&display=swap`;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
            return () => {
              document.head.removeChild(link);
            };
          }, [families]);
          return null;
        };

        //===============================================
        // 1. DATA & TYPES (from /lib/schema.ts & data)
        //===============================================

        const SEFIROT_DATA = [
          {"id":"maljut","nombre":"Maljut — Reino / Manifestación","chakra":"Raíz","frecuenciaHz":174,"comando":"Yo anclo la luz en la materia, manifiesto abundancia y orden en mi vida terrenal. Hecho está.","tooltip":"Frecuencia de arraigo y presencia corporal.","orden":1},
          {"id":"yesod","nombre":"Yesod — Fundamento / Soporte","chakra":"Sacro","frecuenciaHz":285,"comando":"Yo activo el fundamento sagrado, alineo mis emociones y creo puentes de energía para manifestar lo invisible. Hecho está.","tooltip":"Integración etérica y emocional.","orden":2},
          {"id":"hod","nombre":"Hod — Esplendor / Mente brillante","chakra":"Plexo solar (aspecto mental)","frecuenciaHz":396,"comando":"Yo despierto la claridad del esplendor, comunico con verdad y libero mi creatividad en forma divina. Hecho está.","tooltip":"Liberación de peso mental, claridad expresiva.","orden":3},
          {"id":"netsaj","nombre":"Nétsaj — Victoria / Persistencia","chakra":"Plexo solar (voluntad)","frecuenciaHz":432,"comando":"Yo activo la energía de la victoria, avanzo con confianza y sostengo mis metas con perseverancia. Hecho está.","tooltip":"Coherencia, vitalidad y avance.","orden":4},
          {"id":"tiferet","nombre":"Tiféret — Belleza / Armonía","chakra":"Corazón","frecuenciaHz":528,"comando":"Yo equilibro mi corazón con la verdad, integro amor y fuerza en perfecta armonía. Hecho está.","tooltip":"Coherencia cardíaca, integración.","orden":5},
          {"id":"guevura","nombre":"Guevurá — Rigor / Fuerza","chakra":"Plexo (disciplina, límites)","frecuenciaHz":417,"comando":"Yo despierto el poder del límite sagrado, fortalezco mi voluntad y sostengo mi vida con disciplina. Hecho está.","tooltip":"Orden, corte de inercia, foco.","orden":6},
          {"id":"jesed","nombre":"Jésed — Misericordia / Amor expansivo","chakra":"Corazón (compasión)","frecuenciaHz":639,"comando":"Yo activo la misericordia infinita, irradio compasión y amor incondicional en cada célula de mi ser. Hecho está.","tooltip":"Apertura afectiva, conexión.","orden":7},
          {"id":"bina","nombre":"Biná — Entendimiento / Estructura","chakra":"Garganta / Tercer ojo (discernimiento)","frecuenciaHz":741,"comando":"Yo ordeno mis pensamientos con discernimiento, transformo la comprensión en acción justa y equilibrada. Hecho está.","tooltip":"Purificación mental, orden.","orden":8},
          {"id":"jojma","nombre":"Jojmá — Sabiduría / Visión","chakra":"Tercer ojo (intuición)","frecuenciaHz":852,"comando":"Yo despierto la chispa de la sabiduría interior, libero la claridad y el entendimiento profundo en mi mente. Hecho está.","tooltip":"Intuición, visión superior.","orden":9},
          {"id":"keter","nombre":"Kéter — Corona / Conexión divina","chakra":"Corona","frecuenciaHz":963,"comando":"Yo activo la luz pura de la creación, abro mi conciencia al Todo y recibo la sabiduría de la Fuente. Hecho está.","tooltip":"Unidad, estado contemplativo.","orden":10},
          {"id":"daat","nombre":"Da’at — Puente de conciencia (opcional)","chakra":"Entre ceja y corona (integración)","frecuenciaHz":936,"comando":"Yo integro sabiduría y entendimiento en presencia consciente. Que el conocimiento se asiente en verdad. Hecho está.","tooltip":"Integración de mente superior.","orden":0,"opcional":true}
        ].sort((a, b) => a.orden - b.orden);

        const navItems = [
          { href: '/', label: 'Home', ariaLabel: 'Ir a Inicio', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> },
          { href: '/comandos', label: 'Comandos', ariaLabel: 'Explorar el Árbol Interactivo', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> },
          { href: '/sesiones', label: 'Sesiones', ariaLabel: 'Ver Historial de Sesiones', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> },
          { href: '/quien-soy', label: 'Quién soy', ariaLabel: 'Sobre mí', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
          { href: '/contacto', label: 'Contacto', ariaLabel: 'Formulario de Contacto', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><polyline points="4 6 12 13 20 6"></polyline></svg> },
          { href: '/configuracion', label: 'Configuración', ariaLabel: 'Ajustes del Portal', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg> },
        ];

        const themePalettes = {
          default_dark: { name: 'Oscuro', vars: { '--bg-color': '#1a102c', '--text-color': '#FFFFFF', '--heading-color': '#FFD700', '--primary-color': '#a855f7', '--secondary-color': '#FFD700', '--card-bg': 'rgba(26, 16, 44, 0.6)' }},
          default_light: { name: 'Claro', vars: { '--bg-color': '#FFF5E1', '--text-color': '#1A1A1A', '--heading-color': '#D97706', '--primary-color': '#10B981', '--secondary-color': '#F59E0B', '--card-bg': 'rgba(255, 245, 225, 0.6)' }},
          galaxy: { name: 'Galaxia', vars: { '--bg-color': '#000000', '--text-color': '#E0E0E0', '--heading-color': '#33A1C9', '--primary-color': '#9B59B6', '--secondary-color': '#33A1C9', '--card-bg': 'rgba(20, 20, 40, 0.7)' }},
          earth: { name: 'Tierra', vars: { '--bg-color': '#2F3E46', '--text-color': '#F2F2F2', '--heading-color': '#A4AC86', '--primary-color': '#84A98C', '--secondary-color': '#A4AC86', '--card-bg': 'rgba(84, 110, 122, 0.5)' }}
        };

        //===============================================
        // 2. CONTEXT & HOOKS (from /lib, state management)
        //===============================================

        const UserPrefsContext = React.createContext(null);

        const useUserPrefs = () => {
          const context = React.useContext(UserPrefsContext);
          if (!context) {
            throw new Error('useUserPrefs must be used within a UserPrefsProvider');
          }
          return context;
        };

        const UserPrefsProvider = ({ children }) => {
          const [prefs, setPrefs] = React.useState({
            name: '',
            theme: 'default_dark',
            fontSize: 'normal',
            motion: 'full',
          });
          const [sessions, setSessions] = React.useState([]);
          const [isHydrated, setIsHydrated] = React.useState(false);
          const [lastRoute, setLastRoute] = React.useState('/');

          // Hydrate from localStorage on initial client load
          React.useEffect(() => {
            try {
              const storedPrefs = localStorage.getItem('arbolCuanticoPrefs');
              const storedRoute = localStorage.getItem('arbolCuanticoLastRoute');
              const storedSessions = localStorage.getItem('arbolCuanticoSessions');
              if (storedPrefs) setPrefs(JSON.parse(storedPrefs));
              if (storedRoute) setLastRoute(JSON.parse(storedRoute));
              if (storedSessions) setSessions(JSON.parse(storedSessions));
            } catch (error) {
              console.error('Failed to parse user preferences from localStorage:', error);
            }
            setIsHydrated(true);
          }, []);

          // Persist preferences & sessions to localStorage whenever they change
          React.useEffect(() => {
            if (isHydrated) {
              try {
                localStorage.setItem('arbolCuanticoPrefs', JSON.stringify(prefs));
                localStorage.setItem('arbolCuanticoSessions', JSON.stringify(sessions));
              } catch (error) {
                console.error('Failed to save data to localStorage:', error);
              }
            }
          }, [prefs, sessions, isHydrated]);
          
          // Persist last route
          const handleSetLastRoute = (route) => {
            setLastRoute(route);
            if(isHydrated){
              try {
                localStorage.setItem('arbolCuanticoLastRoute', JSON.stringify(route));
              } catch (error) { console.error('Failed to save last route to localStorage:', error); }
            }
          }

          // Apply theme and font size to the document
          React.useEffect(() => {
            const root = document.documentElement;
            const palette = themePalettes[prefs.theme] || themePalettes.default_dark;
            
            Object.entries(palette.vars).forEach(([key, value]) => {
              root.style.setProperty(key, value);
            });

            root.classList.toggle('dark', palette.name.includes('Oscuro') || palette.name.includes('Galaxia'));
            root.classList.toggle('text-large', prefs.fontSize === 'large');
          }, [prefs.theme, prefs.fontSize]);

          const value = { prefs, setPrefs, sessions, setSessions, isHydrated, lastRoute, setLastRoute: handleSetLastRoute };

          return (
            <UserPrefsContext.Provider value={value}>
              {children}
            </UserPrefsContext.Provider>
          );
        };

        //===============================================
        // 3. CORE UI COMPONENTS (from /components)
        //===============================================

        // --- Starfield Component with mouse interaction ---
        const Starfield = React.memo(({ starCount = 1500 }) => {
            const canvasRef = React.useRef(null);
            const mousePos = React.useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

            React.useEffect(() => {
                const handleMouseMove = (event) => {
                    mousePos.current = { x: event.clientX, y: event.clientY };
                };
                window.addEventListener('mousemove', handleMouseMove);

                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                let animationFrameId;

                const resize = () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                };
                window.addEventListener('resize', resize);
                resize();

                const stars = Array.from({ length: starCount }, () => ({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z: Math.random() * canvas.width,
                    radius: Math.random() * 0.8 + 0.2,
                }));

                const render = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;

                    const focalX = centerX - (mousePos.current.x - centerX) * 0.1;
                    const focalY = centerY - (mousePos.current.y - centerY) * 0.1;

                    stars.forEach(star => {
                        star.z -= 0.2;
                        if (star.z <= 0) {
                            star.z = canvas.width;
                        }

                        const k = 128 / star.z;
                        const px = (star.x - focalX) * k + focalX;
                        const py = (star.y - focalY) * k + focalY;

                        if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
                            const size = (1 - star.z / canvas.width) * 2;
                            const alpha = (1 - star.z / canvas.width) * 0.8;
                            ctx.beginPath();
                            ctx.arc(px, py, size * star.radius, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                            ctx.fill();
                        }
                    });

                    animationFrameId = requestAnimationFrame(render);
                };
                
                render();

                return () => {
                    cancelAnimationFrame(animationFrameId);
                    window.removeEventListener('resize', resize);
                    window.removeEventListener('mousemove', handleMouseMove);
                };
            }, [starCount]);

            return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" aria-hidden="true" />;
        });

        // --- Toast Component ---
        const Toast = ({ message, show }) => {
            if (!show) return null;
            return (
                <div 
                  className="fixed bottom-24 sm:bottom-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg z-50 animate-fade-in-out"
                  role="alert"
                  aria-live="assertive"
                >
                    {message}
                </div>
            );
        };

        // --- Typewriter Component ---
        const Typewriter = ({ text, onFinished, speed = 50 }) => {
            const { prefs } = useUserPrefs();
            const [displayedText, setDisplayedText] = React.useState('');
            
            const skip = React.useCallback(() => {
                setDisplayedText(text);
                if(onFinished) onFinished();
            }, [text, onFinished]);

            React.useEffect(() => {
                if (prefs.motion === 'reduced') {
                    skip();
                    return;
                }

                if (displayedText.length === text.length) {
                    if(onFinished) onFinished();
                    return;
                }

                const timeoutId = setTimeout(() => {
                    setDisplayedText(text.slice(0, displayedText.length + 1));
                }, speed);

                return () => clearTimeout(timeoutId);
            }, [displayedText, text, onFinished, prefs.motion, skip, speed]);

            return <p aria-live="polite" className="min-h-[1.2em]">{displayedText}</p>;
        };

        // --- FrequencyPlayer Component ---
        const FrequencyPlayer = ({ hz, label }) => {
            const [isPlaying, setIsPlaying] = React.useState(false);
            const audioContextRef = React.useRef(null);
            const oscillatorRef = React.useRef(null);
            const [toastMessage, setToastMessage] = React.useState('');
            
            const stop = React.useCallback(() => {
              if (oscillatorRef.current) {
                oscillatorRef.current.stop();
                oscillatorRef.current.disconnect();
                oscillatorRef.current = null;
              }
              setIsPlaying(false);
            }, []);

            const play = React.useCallback(() => {
                if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                    audioContextRef.current.resume();
                } else if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                }

                const context = audioContextRef.current;
                const oscillator = context.createOscillator();
                const gainNode = context.createGain();
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(hz, context.currentTime);
                gainNode.gain.setValueAtTime(0.3, context.currentTime);
                oscillator.connect(gainNode);
                gainNode.connect(context.destination);
                oscillator.start();
                
                oscillatorRef.current = oscillator;

                setIsPlaying(true);
                setToastMessage(`Reproduciendo ${hz} Hz — ${label}`);
                setTimeout(() => setToastMessage(''), 3000);
            }, [hz, label]);

            const togglePlay = () => {
              if (isPlaying) {
                stop();
              } else {
                play();
              }
            };
            
            React.useEffect(() => {
                return () => { // Cleanup on unmount
                    stop();
                    if (audioContextRef.current) {
                        audioContextRef.current.close().catch(e => console.error(e));
                        audioContextRef.current = null;
                    }
                };
            }, [stop]);

            return (
                <React.Fragment>
                    <button
                        onClick={togglePlay}
                        aria-label={isPlaying ? `Detener frecuencia ${hz} Hz (${label})` : `Reproducir frecuencia ${hz} Hz (${label})`}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 border border-[var(--secondary-color)] text-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color)] hover:text-[var(--bg-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--card-bg)] focus:ring-[var(--secondary-color)] transition-all duration-300 ${isPlaying ? 'animate-pulse-strong' : ''}`}
                    >
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        )}
                        <span>{isPlaying ? `${hz} Hz` : `Reproducir`}</span>
                    </button>
                    <div role="alert" aria-live="assertive" className="sr-only">
                      {isPlaying ? `Iniciada reproducción de ${hz} Hz para ${label}`: ''}
                    </div>
                    <Toast show={!!toastMessage} message={toastMessage} />
                </React.Fragment>
            );
        };

        //===============================================
        // 4. LAYOUT COMPONENTS (from /app/(public-layout))
        //===============================================
        const AnimatedSymbol = () => (
            <svg width="100" height="100" viewBox="0 0 100 100" className="mb-8">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <circle cx="50" cy="50" r="10" fill="var(--primary-color)" filter="url(#glow)" className="animate-seed-center" />
                {[0, 60, 120, 180, 240, 300].map(angle => (
                    <circle 
                        key={angle}
                        cx="50" cy="50" r="20"
                        stroke="var(--secondary-color)"
                        strokeWidth="2"
                        fill="none"
                        transform={`rotate(${angle} 50 50)`}
                        className="animate-seed-petal"
                        style={{ animationDelay: `${angle / 300}s`}}
                    />
                ))}
            </svg>
        );


        const AmbientSoundPlayer = () => {
            const [isMuted, setIsMuted] = React.useState(true);
            const audioContextRef = React.useRef(null);
            const gainNodeRef = React.useRef(null);

            const toggleMute = () => {
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                    const context = audioContextRef.current;
                    const oscillator = context.createOscillator();
                    const gainNode = context.createGain();
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(111, context.currentTime); // A calming frequency
                    gainNode.gain.setValueAtTime(0, context.currentTime);
                    oscillator.connect(gainNode);
                    gainNode.connect(context.destination);
                    oscillator.start();
                    gainNodeRef.current = gainNode;
                }

                const gainNode = gainNodeRef.current;
                if (isMuted) {
                    gainNode.gain.exponentialRampToValueAtTime(0.05, audioContextRef.current.currentTime + 1);
                } else {
                    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContextRef.current.currentTime + 1);
                }
                setIsMuted(!isMuted);
            };

            return (
                <button 
                    onClick={toggleMute} 
                    aria-label={isMuted ? "Activar sonido ambiental" : "Silenciar sonido ambiental"}
                    className="fixed top-4 right-4 z-50 p-2 text-white/50 hover:text-white/80 transition-colors"
                >
                    {isMuted ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                    }
                </button>
            );
        };


        // --- SplashScreen Component ---
        const SplashScreen = ({ onStart }) => {
            const [symbolFinished, setSymbolFinished] = React.useState(false);
            const [titleFinished, setTitleFinished] = React.useState(false);
            
            React.useEffect(() => {
                const timer = setTimeout(() => setSymbolFinished(true), 2500); // Animation duration
                return () => clearTimeout(timer);
            }, []);

            return (
                <div className="w-screen h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] text-center p-4">
                    <Starfield />
                    <AmbientSoundPlayer />
                    <div className="relative z-10 flex flex-col items-center">
                        {!symbolFinished && <AnimatedSymbol />}
                        {symbolFinished && 
                            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-[var(--heading-color)] font-bold tracking-wider animate-subtle-glow">
                                <Typewriter text="Árbol Cuántico – עץ קוונטי" onFinished={() => setTitleFinished(true)} speed={80} />
                            </h1>
                        }
                        {titleFinished && (
                            <div className="mt-12 animate-fade-in">
                                <button 
                                    onClick={onStart}
                                    className="bg-[var(--primary-color)] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-xl sm:text-2xl font-bold hover:opacity-90 transition-opacity shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] focus-visible:ring-[var(--primary-color)]"
                                >
                                    Iniciar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
        };

        // --- NavbarDock Component ---
        const NavbarDock = ({ activePath, onNavigate }) => {
            return (
                <nav role="navigation" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
                    <div className="flex items-center gap-1 sm:gap-2 bg-[var(--card-bg)] backdrop-blur-md p-2 rounded-full border border-white/10 shadow-lg">
                        {navItems.map(item => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => { e.preventDefault(); onNavigate(item.href); }}
                                aria-label={item.ariaLabel}
                                aria-current={activePath === item.href ? 'page' : undefined}
                                className={`
                                    flex items-center justify-center gap-2 h-10 sm:h-auto w-10 sm:w-auto sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all duration-300 relative group
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] focus-visible:ring-[var(--primary-color)]
                                    ${activePath === item.href 
                                        ? 'bg-[var(--primary-color)] text-white shadow-md' 
                                        : 'text-[var(--text-color)] hover:bg-white/10'
                                    }
                                `}
                            >
                                {item.icon}
                                <span className="hidden sm:inline">{item.label}</span>
                                <span className="sm:hidden absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max bg-gray-900/80 backdrop-blur-sm text-white text-xs font-normal rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                                    {item.ariaLabel}
                                </span>
                            </a>
                        ))}
                    </div>
                </nav>
            );
        };


        // --- Page Wrapper for consistent padding and animations ---
        const PageWrapper = ({ children }) => {
            const { prefs } = useUserPrefs();
            return (
              <div 
                className={`w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pb-32 ${prefs.motion === 'full' ? 'animate-page-transition' : ''}`}
              >
                {children}
              </div>
            );
        }

        //===============================================
        // 5. PAGE COMPONENTS (from /app/*)
        //===============================================

        // --- Home Page ---
        const HomePage = ({ onNavigate }) => {
            const DiamondIcon = () => (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--primary-color)] mt-1 flex-shrink-0">
                    <path d="M12 2L2 12l10 10 10-12L12 2z" />
                </svg>
            );

            return (
                <PageWrapper>
                    <div className="flex flex-col items-center justify-center text-center space-y-8 sm:space-y-10">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[var(--heading-color)] font-serif max-w-4xl">
                            Un portal práctico para armonizar tus cuerpos con intención, sonido y geometría sagrada.
                        </h1>
                        
                        <p className="text-base sm:text-lg text-[var(--text-color)]/80 max-w-3xl mx-auto">
                            Árbol Cuántico – עץ קוונטי es una herramienta de acompañamiento y sanación energética que integra Cábala vivencial, radiestesia, cristales y frecuencias armónicas junto con el poder de la geometría sagrada. Está pensada para operadores y practicantes que desean medir, enfocar y armonizar sus procesos internos de forma simple, responsable y reproducible.
                        </p>
                        
                        <ul className="space-y-4 text-md sm:text-lg text-[var(--text-color)]/90 text-left max-w-2xl w-full">
                            <li className="flex items-start gap-4">
                              <DiamondIcon /> <span>Coherencia mente-corazón-acción en sesiones cortas.</span>
                            </li>
                            <li className="flex items-start gap-4">
                              <DiamondIcon /> <span>Protocolo claro: medir → decidir → armonizar → verificar.</span>
                            </li>
                            <li className="flex items-start gap-4">
                              <DiamondIcon /> <span>Frecuencias guía por sefirá y relación con cada dominio, chakras, frecuencias de luz.</span>
                            </li>
                            <li className="flex items-start gap-4">
                              <DiamondIcon /> <span>Personalización por nombre y tema visual (claro/oscuro).</span>
                            </li>
                        </ul>
                        
                        <footer className="text-center pt-8 space-y-4">
                            <button 
                              onClick={() => onNavigate('/comandos')}
                              className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-full text-lg sm:text-xl font-bold hover:opacity-90 transition-opacity shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] focus-visible:ring-[var(--primary-color)]"
                            >
                              Ir a Comandos
                            </button>
                            <p className="text-xs text-[var(--text-color)]/50 pt-8 max-w-md mx-auto">
                              Herramienta complementaria de bienestar. Es un complemento más, no reemplaza asesoramiento médico o psicológico.
                            </p>
                        </footer>
                    </div>
                </PageWrapper>
            );
        };

        // --- Comandos Page ---
        const TreeOfLifeDiagram = ({ onNodeClick }) => {
            const positions = {
                keter: { cx: 50, cy: 10 }, jojma: { cx: 30, cy: 25 }, bina: { cx: 70, cy: 25 },
                daat: { cx: 50, cy: 35 }, jesed: { cx: 30, cy: 45 }, guevura: { cx: 70, cy: 45 },
                tiferet: { cx: 50, cy: 60 }, netsaj: { cx: 30, cy: 75 }, hod: { cx: 70, cy: 75 },
                yesod: { cx: 50, cy: 90 }, maljut: { cx: 50, cy: 110 },
            };
            const paths = [
                { d: "M 50 10 V 35" }, { d: "M 50 35 V 60" }, { d: "M 50 60 V 90" }, { d: "M 50 90 V 110" },
                { d: "M 30 25 V 45" }, { d: "M 30 45 V 75" }, { d: "M 70 25 V 45" }, { d: "M 70 45 V 75" },
                { d: "M 30 25 L 70 25" }, { d: "M 30 45 L 70 45" }, { d: "M 30 75 L 70 75" },
                { d: "M 50 10 L 30 25" }, { d: "M 50 10 L 70 25" }, { d: "M 30 25 L 50 60" }, { d: "M 70 25 L 50 60" },
                { d: "M 30 45 L 50 60" }, { d: "M 70 45 L 50 60" }, { d: "M 30 75 L 50 90" }, { d: "M 70 75 L 50 90" },
                { d: "M 50 60 L 30 75" }, { d: "M 50 60 L 70 75" }, { d: "M 30 25 L 70 45" }, { d: "M 70 25 L 30 45" },
                { d: "M 30 25 L 50 35", strokeDasharray: "2,2" }, { d: "M 70 25 L 50 35", strokeDasharray: "2,2" },
                { d: "M 30 45 L 50 35", strokeDasharray: "2,2" }, { d: "M 70 45 L 50 35", strokeDasharray: "2,2" },
            ];
            return (
                <svg viewBox="0 0 100 120" className="w-full max-w-sm mx-auto">
                    <g>{paths.map((p, i) => (<path key={i} d={p.d} stroke="var(--primary-color)" strokeOpacity="0.3" strokeWidth="0.5" fill="none" strokeDasharray={p.strokeDasharray || "none"} />))}</g>
                    <g>{SEFIROT_DATA.map(sefira => {
                            const pos = positions[sefira.id];
                            if (!pos) return null;
                            return (
                                <g key={sefira.id} onClick={() => onNodeClick(sefira)} className="cursor-pointer group">
                                    <circle cx={pos.cx} cy={pos.cy} r="6" fill="var(--card-bg)" stroke="var(--secondary-color)" strokeWidth="0.5" className="group-hover:stroke-[var(--primary-color)] transition-all" />
                                    <circle cx={pos.cx} cy={pos.cy} r="6" fill="var(--primary-color)" className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ filter: 'url(#glow)' }}/>
                                    <text x={pos.cx} y={pos.cy + 1.5} textAnchor="middle" fontSize="3.5" fill="var(--text-color)" className="pointer-events-none font-sans">{sefira.nombre.split('—')[0].trim()}</text>
                                </g>
                            )
                        })}
                    </g>
                </svg>
            )
        }
        const ComandosPage = () => {
            const [selectedSefira, setSelectedSefira] = React.useState(null);
            return (
                <PageWrapper>
                    <header className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--heading-color)] mb-4">Árbol de la Vida Interactivo</h1>
                        <p className="text-lg text-[var(--text-color)]/80 max-w-3xl mx-auto">Selecciona una Sefirá para ver su comando, frecuencia y detalles. Mide antes y después de cada sesión para registrar tu progreso.</p>
                    </header>
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="w-full lg:w-1/2"><TreeOfLifeDiagram onNodeClick={setSelectedSefira} /></div>
                        <div className="w-full lg:w-1/2">
                            {selectedSefira ? (
                                <div className="bg-[var(--card-bg)] backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col space-y-4 text-center shadow-lg animate-fade-in">
                                    <h3 className="text-2xl font-serif text-[var(--heading-color)]">{selectedSefira.nombre}</h3>
                                    <div className="flex justify-center gap-4 text-sm text-[var(--text-color)]/70">
                                        <span>{selectedSefira.chakra}</span> | <span>{selectedSefira.frecuenciaHz} Hz</span>
                                    </div>
                                    <p className="text-base italic text-[var(--text-color)]/90 flex-grow">"{selectedSefira.comando}"</p>
                                    <div title={selectedSefira.tooltip}><FrequencyPlayer hz={selectedSefira.frecuenciaHz} label={selectedSefira.nombre} /></div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center min-h-[24rem] bg-[var(--card-bg)]/50 rounded-lg text-center p-8">
                                    <p className="text-xl text-[var(--text-color)]/70">Selecciona un nodo del Árbol para comenzar.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </PageWrapper>
            );
        };

        // --- Sesiones Page ---
        const SesionesPage = () => {
            const { prefs, sessions, setSessions } = useUserPrefs();
            const [toastMessage, setToastMessage] = React.useState('');
            
            const initialReadings = SEFIROT_DATA.reduce((acc, sefira) => {
                acc[sefira.id] = { antes: 5, despues: 5 };
                return acc;
            }, {});

            const [currentSession, setCurrentSession] = React.useState({
                id: null,
                consultantName: '',
                date: new Date().toISOString(),
                globalBefore: 5,
                globalAfter: 5,
                readings: initialReadings
            });

            const handleReadingChange = (sefiraId, stage, value) => {
                setCurrentSession(prev => ({
                    ...prev,
                    readings: {
                        ...prev.readings,
                        [sefiraId]: { ...prev.readings[sefiraId], [stage]: value }
                    }
                }));
            };

            const resetForm = () => {
                setCurrentSession({
                    id: null,
                    consultantName: '',
                    date: new Date().toISOString(),
                    globalBefore: 5,
                    globalAfter: 5,
                    readings: initialReadings
                });
            };

            const handleSaveSession = () => {
                if (!currentSession.consultantName) {
                    showToast("Por favor, ingresa el nombre del consultante.");
                    return;
                }
                const newSession = { ...currentSession, id: Date.now(), date: new Date().toISOString() };
                setSessions(prev => [newSession, ...prev]);
                showToast("Sesión guardada con éxito.");
                resetForm();
            };

            const handleDeleteSession = (sessionId) => {
                setSessions(prev => prev.filter(s => s.id !== sessionId));
                showToast("Sesión eliminada.");
            };

            const showToast = (message) => {
                setToastMessage(message);
                setTimeout(() => setToastMessage(''), 3000);
            };

            const generateCSV = (session) => {
                let csvContent = "data:text/csv;charset=utf-8,";
                csvContent += `Sesión Árbol Cuántico\n`;
                csvContent += `Consultante:,"${session.consultantName}"\n`;
                csvContent += `Fecha:,"${new Date(session.date).toLocaleString()}"\n\n`;
                csvContent += `Medición Global Antes:,${session.globalBefore}\n`;
                csvContent += `Medición Global Después:,${session.globalAfter}\n\n`;
                csvContent += "Sefirá,Medición Antes,Medición Después\n";

                SEFIROT_DATA.forEach(sefira => {
                    const reading = session.readings[sefira.id];
                    csvContent += `"${sefira.nombre}",${reading.antes},${reading.despues}\n`;
                });
                
                return encodeURI(csvContent);
            };

            const downloadCSV = (session) => {
                const link = document.createElement("a");
                link.setAttribute("href", generateCSV(session));
                link.setAttribute("download", `sesion_${session.consultantName.replace(' ', '_')}_${new Date(session.date).toLocaleDateString('sv')}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            const openingCommand = `Elevo este espacio a la séptima dimensión, invoco la asistencia de las altas esferas de luz, de la fuente divina. Lleno y sello un campo puro para el trabajo de ${currentSession.consultantName || prefs.name || '(nombre)'}. Que mi intención sea clara, mi corazón coherente y la verdad guíe cada paso. Hecho está, muéstramelo.`;
            const closingCommand = `Cierro este espacio sagrado, agradezco la asistencia de la luz y anclo los cambios en perfecta armonía. Que la sanación se integre con gracia y facilidad. Hecho está, gracias, gracias, gracias.`;

            return (
                <PageWrapper>
                    <header className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--heading-color)] mb-4">Registro de Sesión</h1>
                        <p className="text-lg text-[var(--text-color)]/80 max-w-3xl mx-auto">Sigue los pasos para registrar y guardar la sesión de un consultante.</p>
                    </header>

                    <div className="bg-[var(--card-bg)] rounded-xl p-4 sm:p-6 md:p-8 space-y-8">
                        {/* Step 1: Consultant & Global */}
                        <fieldset className="space-y-4">
                            <legend className="text-xl sm:text-2xl font-serif text-[var(--heading-color)] mb-4">Paso 1: Datos y Medición Global</legend>
                            <input
                                type="text"
                                placeholder="Nombre del Consultante"
                                value={currentSession.consultantName}
                                onChange={e => setCurrentSession(p => ({...p, consultantName: e.target.value}))}
                                className="form-input text-lg"
                            />
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="block">Energía Global (Antes): <span className="font-bold text-lg">{currentSession.globalBefore}</span>
                                    <input type="range" min="0" max="10" value={currentSession.globalBefore} onChange={e => setCurrentSession(p => ({...p, globalBefore: e.target.value}))} className="w-full mt-2"/>
                                </label>
                                <label className="block">Energía Global (Después): <span className="font-bold text-lg">{currentSession.globalAfter}</span>
                                    <input type="range" min="0" max="10" value={currentSession.globalAfter} onChange={e => setCurrentSession(p => ({...p, globalAfter: e.target.value}))} className="w-full mt-2"/>
                                </label>
                            </div>
                        </fieldset>

                        {/* Step 2: Commands */}
                        <fieldset>
                             <legend className="text-xl sm:text-2xl font-serif text-[var(--heading-color)] mb-4">Paso 2: Comandos de Apertura y Cierre</legend>
                             <div className="space-y-4">
                                <div className="p-4 border border-[var(--primary-color)]/50 rounded-lg">
                                    <h4 className="font-bold text-[var(--primary-color)]">Comando de Apertura</h4>
                                    <p className="italic text-sm mt-2">"{openingCommand}"</p>
                                </div>
                                 <div className="p-4 border border-[var(--primary-color)]/50 rounded-lg">
                                    <h4 className="font-bold text-[var(--primary-color)]">Comando de Cierre</h4>
                                    <p className="italic text-sm mt-2">"{closingCommand}"</p>
                                </div>
                             </div>
                        </fieldset>

                        {/* Step 3: Sefirot Readings */}
                        <fieldset>
                            <legend className="text-xl sm:text-2xl font-serif text-[var(--heading-color)] mb-4">Paso 3: Medición por Sefirá</legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                {SEFIROT_DATA.map(sefira => (
                                    <div key={sefira.id}>
                                        <h4 className="font-bold text-md mb-2">{sefira.nombre.split("—")[0]}</h4>
                                        <div className="space-y-2">
                                           <label className="block"> Antes: <span className="font-bold">{currentSession.readings[sefira.id].antes}</span>
                                                <input type="range" min="0" max="10" value={currentSession.readings[sefira.id].antes} onChange={e => handleReadingChange(sefira.id, 'antes', e.target.value)} className="w-full"/>
                                            </label>
                                            <label className="block"> Después: <span className="font-bold">{currentSession.readings[sefira.id].despues}</span>
                                                <input type="range" min="0" max="10" value={currentSession.readings[sefira.id].despues} onChange={e => handleReadingChange(sefira.id, 'despues', e.target.value)} className="w-full"/>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                        
                         {/* Step 4: Actions */}
                        <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-white/10">
                            <button onClick={handleSaveSession} className="utility-btn flex-1 !bg-[var(--primary-color)] !text-white">Guardar Sesión</button>
                            <button onClick={() => downloadCSV(currentSession)} className="utility-btn flex-1">Exportar a Excel (CSV)</button>
                            <button onClick={resetForm} className="utility-btn flex-1">Limpiar Formulario</button>
                        </div>
                    </div>

                    {/* Session History */}
                    <div className="mt-16">
                        <h2 className="text-2xl sm:text-3xl font-serif text-[var(--heading-color)] mb-6 text-center">Historial de Sesiones</h2>
                        {sessions.length > 0 ? (
                            <div className="space-y-4">
                                {sessions.map(session => (
                                    <div key={session.id} className="bg-[var(--card-bg)] p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <div className="text-center sm:text-left">
                                            <p className="font-bold">{session.consultantName}</p>
                                            <p className="text-sm text-[var(--text-color)]/70">{new Date(session.date).toLocaleString()}</p>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button onClick={() => downloadCSV(session)} className="p-2 hover:bg-white/10 rounded-full" aria-label="Exportar"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg></button>
                                            <button onClick={() => handleDeleteSession(session.id)} className="p-2 hover:bg-white/10 rounded-full text-red-400" aria-label="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-[var(--text-color)]/70">No hay sesiones guardadas.</p>
                        )}
                    </div>

                    <Toast show={!!toastMessage} message={toastMessage} />
                </PageWrapper>
            );
        };


        // --- QuienSoy Page ---
        const QuienSoyPage = ({ onNavigate }) => {
            return (
                <PageWrapper>
                    <header className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--heading-color)] mb-2">Quién soy</h1>
                        <p className="text-xl italic text-[var(--text-color)]/80">Un camino entre la luz, el diseño y la conciencia</p>
                    </header>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                        <img src="https://placehold.co/150x150/FFF5E1/D97706?text=GDP" alt="Guido Di Pietro" className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-[var(--secondary-color)]"/>
                        <div className="text-lg text-[var(--text-color)]/90 space-y-4 text-center md:text-left">
                            <p>Soy Guido Di Pietro, coach ontológico y terapeuta holístico con más de 10 años de experiencia acompañando procesos de transformación.</p>
                            <p>Mi camino comenzó en la infancia, inspirado por mi madre, una gran maestra espiritual, quien me introdujo en prácticas de Reiki, Registros Akáshicos y talleres de armonización.</p>
                            <p>Trabajé en diseño gráfico y tecnología, adquirí una visión estética y estructurada; en paralelo profundicé en gemoterapia, radiestesia y geometría sagrada.</p>
                            <p>Soy un buscador incansable: integro lo ancestral con lo moderno para llevar tecnologías de luz a la vida cotidiana.</p>
                            <p>Hoy comparto mesas cuánticas y procesos de reprogramación para que más personas vivan con dicha, paz y armonía.</p>
                        </div>
                    </div>
                    <div className="my-16">
                        <div className="bg-[var(--card-bg)] border-l-4 border-[var(--secondary-color)] p-6 rounded-r-lg">
                            <blockquote className="text-xl sm:text-2xl italic text-center text-[var(--heading-color)] font-serif">“Creo en unir lo ancestral con lo moderno para transformar la vida cotidiana.”</blockquote>
                        </div>
                    </div>
                    <div className="text-center mb-16">
                        <button onClick={() => onNavigate('/contacto')} className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-full text-lg font-bold hover:opacity-90 transition-opacity shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] focus-visible:ring-[var(--primary-color)]">
                            Explorar mis servicios
                        </button>
                    </div>
                </PageWrapper>
            );
        };

        // --- Contacto Page ---
        const ContactoPage = () => {
            const [status, setStatus] = React.useState('idle');
            const [toastMessage, setToastMessage] = React.useState('');

            const showToast = (message) => {
                setToastMessage(message);
                setTimeout(() => setToastMessage(''), 4000);
            };

            const handleSubmit = async (e) => {
                e.preventDefault();
                setStatus('sending');
                const form = e.target;
                const data = new FormData(form);

                try {
                    // IMPORTANT: Replace this placeholder with your own Formspree endpoint!
                    // Get your endpoint from formspree.io
                    const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_UNIQUE_ID_HERE";
                    
                    if (FORMSPREE_ENDPOINT === "https://formspree.io/f/YOUR_UNIQUE_ID_HERE") {
                        showToast("Configuración requerida por el desarrollador.");
                        setStatus('error');
                        return;
                    }

                    const response = await fetch(FORMSPREE_ENDPOINT, {
                        method: 'POST',
                        body: data,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        setStatus('success');
                        showToast('¡Mensaje enviado con éxito!');
                        form.reset();
                    } else {
                        setStatus('error');
                        showToast('Hubo un error al enviar el mensaje.');
                    }
                } catch (error) {
                    setStatus('error');
                    showToast('Hubo un error de red.');
                } finally {
                    setTimeout(() => setStatus('idle'), 4000);
                }
            };

            return (
                <PageWrapper>
                    <header className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--heading-color)] mb-4">Contacto</h1>
                        <p className="text-lg text-[var(--text-color)]/80">¿Consultas, sesiones o colaboraciones? Escribime y te respondo a la brevedad.</p>
                    </header>
                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[var(--text-color)]/80 mb-1">Nombre</label>
                            <input type="text" id="name" name="name" required className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-color)]/80 mb-1">Email</label>
                            <input type="email" id="email" name="_replyto" required className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-[var(--text-color)]/80 mb-1">Mensaje</label>
                            <textarea id="message" name="message" rows="5" required className="form-input"></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" disabled={status === 'sending'} className="w-full bg-[var(--primary-color)] text-white px-8 py-3 rounded-full text-lg font-bold hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] focus-visible:ring-[var(--primary-color)]">
                                {status === 'sending' ? 'Enviando...' : 'Enviar'}
                            </button>
                            <p className="text-xs text-[var(--text-color)]/60 mt-4">Tus datos se usan solo para responderte. Nada de spam.</p>
                        </div>
                    </form>
                    <Toast show={!!toastMessage} message={toastMessage} />
                </PageWrapper>
            );
        };


        // --- Configuracion Page ---
        const ConfiguracionPage = ({ onLogout }) => {
            const { prefs, setPrefs } = useUserPrefs();
            const [toastMessage, setToastMessage] = React.useState('');

            const showToast = (message) => {
                setToastMessage(message);
                setTimeout(() => setToastMessage(''), 3000);
            };

            const handleSaveName = (e) => {
                e.preventDefault();
                const newName = e.target.elements.name.value;
                setPrefs(p => ({ ...p, name: newName }));
                showToast(`¡Hecho! Hola, ${newName}.`);
            };
            
            return (
                <PageWrapper>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--heading-color)] mb-12 text-center">Configuración</h1>
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-2xl font-serif text-[var(--heading-color)] mb-4">Nombre de usuario</h2>
                            <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row gap-4 items-center">
                                <input type="text" name="name" defaultValue={prefs.name} placeholder="Nombre completo" className="form-input flex-grow" />
                                <button type="submit" className="w-full sm:w-auto config-btn">Guardar nombre</button>
                            </form>
                        </section>
                        <section>
                            <h2 className="text-2xl font-serif text-[var(--heading-color)] mb-4">Tema visual</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(themePalettes).map(([key, {name}]) => (
                                     <button key={key} onClick={() => setPrefs(p => ({ ...p, theme: key }))} className={`config-btn ${prefs.theme === key ? 'active' : ''}`}>{name}</button>
                                ))}
                            </div>
                        </section>
                         <section>
                            <h2 className="text-2xl font-serif text-[var(--heading-color)] mb-4">Sesión</h2>
                            <button onClick={onLogout} className="config-btn !bg-red-500/80 hover:!bg-red-600/80">Cerrar sesión</button>
                        </section>
                    </div>
                    <Toast show={!!toastMessage} message={toastMessage} />
                </PageWrapper>
            );
        };

        //===============================================
        // 6. MAIN APP COMPONENT (The Root of Everything)
        //===============================================

        const App = () => {
            const { lastRoute, setLastRoute } = useUserPrefs();
            const [currentPage, setCurrentPage] = React.useState('/');
            const { isHydrated } = useUserPrefs();
            const [sessionStarted, setSessionStarted] = React.useState(false);

            React.useEffect(() => {
                if (isHydrated) {
                    if (lastRoute && lastRoute !== '/') {
                        setSessionStarted(true);
                    }
                    setCurrentPage(lastRoute || '/');
                }
            }, [isHydrated, lastRoute]);
            
            const handleNavigate = (path) => {
                setCurrentPage(path);
                setLastRoute(path);
                window.scrollTo(0, 0);
            };
            
            const handleLogout = () => {
                setSessionStarted(false);
                handleNavigate('/');
            };
            
            const renderPage = () => {
                switch (currentPage) {
                    case '/': return <HomePage onNavigate={handleNavigate} />;
                    case '/comandos': return <ComandosPage />;
                    case '/sesiones': return <SesionesPage />;
                    case '/quien-soy': return <QuienSoyPage onNavigate={handleNavigate} />;
                    case '/contacto': return <ContactoPage />;
                    case '/configuracion': return <ConfiguracionPage onLogout={handleLogout} />;
                    default: return <HomePage onNavigate={handleNavigate} />;
                }
            };
            
            if (!isHydrated) {
                return <div className="bg-black w-screen h-screen"></div>; 
            }

            if (!sessionStarted) {
                return <SplashScreen onStart={() => { setSessionStarted(true); handleNavigate('/'); }} />;
            }

            return (
                <React.Fragment>
                    <WebFont families={['Cinzel', 'Marcellus', 'Inter', 'Nunito']} />
                    <style>{`
                        :root { font-family: 'Inter', sans-serif; }
                        .dark { color-scheme: dark; }
                        body { background-color: var(--bg-color); color: var(--text-color); transition: background-color 0.5s ease, color 0.5s ease; }
                        .font-serif { font-family: 'Cinzel', serif; }
                        h1,h2,h3,h4,h5,h6 { font-family: 'Marcellus', serif; }
                        .text-large { font-size: 1.1rem; }
                        .timeline-item { padding: 10px; border-left: 2px solid var(--secondary-color); position: relative; }
                        .timeline-item::before { content: ''; position: absolute; left: -9px; top: 12px; width: 16px; height: 16px; border-radius: 50%; background-color: var(--bg-color); border: 2px solid var(--secondary-color); }
                        .timeline-year { font-weight: bold; color: var(--heading-color); margin-right: 1em; }
                        input[type="range"] { -webkit-appearance: none; appearance: none; width: 100%; height: 8px; background: var(--text-color)/.2; border-radius: 5px; outline: none; }
                        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; background: var(--primary-color); cursor: pointer; border-radius: 50%; }
                        input[type="range"]::-moz-range-thumb { width: 20px; height: 20px; background: var(--primary-color); cursor: pointer; border-radius: 50%; }

                        /* Animations */
                        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
                        @keyframes pageTransition { 0% { opacity: 0; } 100% { opacity: 1; } }
                        .animate-page-transition { animation: pageTransition 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
                        @keyframes fadeInOut { 0%, 100% { opacity: 0; transform: translate(-50%, 20px) ; } 10%, 90% { opacity: 1; transform: translate(-50%, 0); } }
                        .animate-fade-in-out { animation: fadeInOut 3s ease-in-out forwards; }
                        @keyframes subtleGlow { 0%, 100% { text-shadow: 0 0 5px var(--secondary-color), 0 0 10px var(--secondary-color), 0 0 15px var(--primary-color); } 50% { text-shadow: 0 0 10px var(--secondary-color), 0 0 20px var(--primary-color), 0 0 30px var(--primary-color); } }
                        .animate-subtle-glow { animation: subtleGlow 4s ease-in-out infinite; }
                        @keyframes pulse-strong { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 var(--secondary-color)/.7; } 50% { transform: scale(1.02); box-shadow: 0 0 10px 5px var(--secondary-color)/0; } }
                        .animate-pulse-strong { animation: pulse-strong 2s infinite cubic-bezier(0.4, 0, 0.6, 1); }
                        @keyframes seed-center-anim { 0% { r: 0; } 50% { r: 12; } 100% { r: 10; } }
                        .animate-seed-center { animation: seed-center-anim 1.5s ease-out forwards; }
                        @keyframes seed-petal-anim { from { stroke-dasharray: 0 126; } to { stroke-dasharray: 126 126; } }
                        .animate-seed-petal { animation: seed-petal-anim 1.5s ease-out forwards; }

                        /* Other Styles */
                        .utility-btn, .config-btn { padding: 10px 20px; border: 1px solid var(--primary-color); color: var(--primary-color); border-radius: 8px; transition: all 0.2s; text-align: center;}
                        .utility-btn:hover, .config-btn:hover { background-color: var(--primary-color); color: var(--bg-color, white); }
                        .config-btn.active { background-color: var(--primary-color); color: var(--bg-color, white); font-weight: bold; }
                        .form-input { width: 100%; background-color: rgba(125,125,125,0.1); border: 1px solid var(--text-color)/20; color: var(--text-color); border-radius: 8px; padding: 10px 14px; transition: all 0.2s; }
                        .form-input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 2px var(--primary-color)/50; }
                    `}</style>
                    
                    <div className="relative z-10 min-h-screen">
                        <Starfield/>
                        <main>
                            <PageWrapper key={currentPage}>{renderPage()}</PageWrapper>
                        </main>
                        <NavbarDock activePath={currentPage} onNavigate={handleNavigate} />
                    </div>
                </React.Fragment>
            );
        };

        const RootComponent = () => (
            <UserPrefsProvider>
                <App />
            </UserPrefsProvider>
        );

        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<RootComponent />);
    </script>
</body>
</html>
