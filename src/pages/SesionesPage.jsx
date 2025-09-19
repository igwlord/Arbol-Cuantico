import React from 'react'
import PageWrapper from '../components/PageWrapper'
import useBodyScrollLock from '../hooks/useBodyScrollLock'
import Toast from '../components/Toast'
import SefirotMeasurementGrid from '../components/SefirotMeasurementGrid'
import GlobalMeasurementGrid from '../components/GlobalMeasurementGrid'
import { useUserPrefs } from '../context/UserPrefsContext'
import { SEFIROT_DATA } from '../data/index.jsx'
import useFocusTrap from '../hooks/useFocusTrap'

export default function SesionesPage() {
    const { prefs, sessions, setSessions } = useUserPrefs();
    const [toastMessage, setToastMessage] = React.useState('');
    const [showOpeningModal, setShowOpeningModal] = React.useState(false);
    const openModalButtonRef = React.useRef(null);
    const modalContainerRef = React.useRef(null);
    const modalCloseButtonRef = React.useRef(null);
    
    // Estados para acordeones (en móvil)
    const [expandedSteps, setExpandedSteps] = React.useState({
        step1: false,
        step2: false,
        step3: false,
        step4: false
    });

    // Detectar desktop para desactivar el colapso en pantallas grandes
    const [isDesktop, setIsDesktop] = React.useState(() =>
        typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false
    );
    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(min-width: 768px)');
        const onChange = (e) => setIsDesktop(e.matches);
        mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
        setIsDesktop(mq.matches);
        return () => {
            mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange);
        };
    }, []);

    // Refs y alturas medidas para cada sección (mejor fiabilidad en móviles)
    const stepRefs = React.useRef({ step1: null, step2: null, step3: null, step4: null });
    const [measuredHeights, setMeasuredHeights] = React.useState({ step1: 0, step2: 0, step3: 0, step4: 0 });
    const measureHeights = React.useCallback(() => {
        setMeasuredHeights((prev) => ({
            step1: stepRefs.current.step1?.scrollHeight || 0,
            step2: stepRefs.current.step2?.scrollHeight || 0,
            step3: stepRefs.current.step3?.scrollHeight || 0,
            step4: stepRefs.current.step4?.scrollHeight || 0,
        }));
    }, []);
    React.useEffect(() => {
        // Medir al montar y cuando cambia el estado de expansión
        measureHeights();
    }, [expandedSteps.step1, expandedSteps.step2, expandedSteps.step3, expandedSteps.step4, measureHeights]);
    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        const onResize = () => measureHeights();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [measureHeights]);
    
    const toggleStep = (step) => {
        setExpandedSteps(prev => ({
            ...prev,
            [step]: !prev[step]
        }));
    };

    // Función para abrir modal y posicionarlo correctamente
    const openModal = () => {
        setShowOpeningModal(true)
        // Asegurar que el modal aparezca en la parte superior del viewport
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 100)
    }

    // iOS-safe scroll lock when modal is open
    useBodyScrollLock(showOpeningModal)
    useFocusTrap({
        containerRef: modalContainerRef,
        isOpen: showOpeningModal,
        initialFocusRef: modalCloseButtonRef,
        closeOnEscape: true,
        onClose: () => setShowOpeningModal(false),
        returnFocusRef: openModalButtonRef,
    })
    
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
            <header className="text-center mb-12" aria-hidden={showOpeningModal ? 'true' : undefined}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--heading-color)] mb-4">Registro de Sesión</h1>
                <p className="text-lg text-[var(--text-color)]/80 max-w-3xl mx-auto">Sigue los pasos para registrar y guardar la sesión de un consultante.</p>
            </header>

            <div className="bg-[var(--card-bg)] rounded-xl p-4 sm:p-6 md:p-8 space-y-4 md:space-y-8" aria-hidden={showOpeningModal ? 'true' : undefined}>
                {/* Step 1: Opening and Space Cleaning */}
                <div className="border border-white/10 rounded-lg">
                    {/* Header clicable en móvil */}
                    <button
                        onClick={() => toggleStep('step1')}
                        className="md:hidden w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-t-lg hover:from-[var(--primary-color)]/20 hover:to-[var(--secondary-color)]/20 transition-all duration-200"
                    >
                        <span className="text-lg font-serif text-[var(--heading-color)]">Paso 1: Apertura y limpieza</span>
                        <span className={`text-[var(--primary-color)] transform transition-transform duration-200 ${expandedSteps.step1 ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>
                    
                    {/* Header fijo en desktop */}
                    <div className="hidden md:block p-4 bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-t-lg">
                        <h3 className="text-xl sm:text-2xl font-serif text-[var(--heading-color)]">Paso 1: Apertura de la sesión y limpieza del espacio</h3>
                    </div>
                    
                    {/* Contenido colapsable (altura medida para móviles) */}
                    <div
                        className={`md:block overflow-hidden transition-[max-height] duration-300 ease-in-out`}
                        style={{
                            maxHeight: isDesktop ? 'none' : expandedSteps.step1 ? `${measuredHeights.step1}px` : '0px',
                        }}
                    >
                        <div ref={(el) => (stepRefs.current.step1 = el)} className="p-4 space-y-4">
                            <button 
                                onClick={openModal}
                                ref={openModalButtonRef}
                                className="w-full bg-[var(--primary-color)] text-white px-6 py-4 rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
                            >
                                Ver instrucciones de apertura y limpieza
                            </button>
                        </div>
                    </div>
                </div>

                {/* Step 2: Consultant & Global Measurement */}
                <div className="border border-white/10 rounded-lg">
                    {/* Header clicable en móvil */}
                    <button
                        onClick={() => toggleStep('step2')}
                        className="md:hidden w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-t-lg hover:from-[var(--primary-color)]/20 hover:to-[var(--secondary-color)]/20 transition-all duration-200"
                    >
                        <span className="text-lg font-serif text-[var(--heading-color)]">Paso 2: Datos y Medición Global</span>
                        <span className={`text-[var(--primary-color)] transform transition-transform duration-200 ${expandedSteps.step2 ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>
                    
                    {/* Header fijo en desktop */}
                    <div className="hidden md:block p-4 bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-t-lg">
                        <h3 className="text-xl sm:text-2xl font-serif text-[var(--heading-color)]">Paso 2: Datos y Medición Global</h3>
                    </div>
                    
                    {/* Contenido colapsable (altura medida para móviles) */}
                    <div
                        className={`md:block overflow-hidden transition-[max-height] duration-300 ease-in-out`}
                        style={{
                            maxHeight: isDesktop ? 'none' : expandedSteps.step2 ? `${measuredHeights.step2}px` : '0px',
                        }}
                    >
                        <div ref={(el) => (stepRefs.current.step2 = el)} className="p-4 space-y-4">
                            <input
                                type="text"
                                placeholder="Nombre del Consultante"
                                value={currentSession.consultantName}
                                onChange={e => setCurrentSession(p => ({...p, consultantName: e.target.value}))}
                                className="form-input text-lg"
                            />
                            
                            <div className="space-y-2">
                                <GlobalMeasurementGrid
                                    label="Energía Global Inicial"
                                    description="Medición inicial de la energía global del consultante"
                                    value={currentSession.globalBefore}
                                    onChange={(value) => setCurrentSession(p => ({...p, globalBefore: value}))}
                                    color="gold"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3: Sefirot Readings */}
                <div className="border border-white/10 rounded-lg">
                    {/* Header clicable en móvil */}
                    <button
                        onClick={() => toggleStep('step3')}
                        className="md:hidden w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-t-lg hover:from-[var(--primary-color)]/20 hover:to-[var(--secondary-color)]/20 transition-all duration-200"
                    >
                        <span className="text-lg font-serif text-[var(--heading-color)]">Paso 3: Medición por Sefirá</span>
                        <span className={`text-[var(--primary-color)] transform transition-transform duration-200 ${expandedSteps.step3 ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>
                    
                    {/* Header fijo en desktop */}
                    <div className="hidden md:block p-4 bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-t-lg">
                        <h3 className="text-xl sm:text-2xl font-serif text-[var(--heading-color)]">Paso 3: Medición por Sefirá</h3>
                    </div>
                    
                    {/* Contenido colapsable (altura medida para móviles) */}
                    <div
                        className={`md:block overflow-hidden transition-[max-height] duration-300 ease-in-out`}
                        style={{
                            maxHeight: isDesktop ? 'none' : expandedSteps.step3 ? `${measuredHeights.step3}px` : '0px',
                        }}
                    >
                        <div ref={(el) => (stepRefs.current.step3 = el)} className="p-4 space-y-4">
                            <p className="text-[var(--text-color)]/80 italic">
                                Usar el péndulo para medir en el biometro cada sefira y registrar su estado antes y después de la armonización.
                            </p>
                            
                            <SefirotMeasurementGrid 
                                readings={currentSession.readings}
                                onReadingChange={handleReadingChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Step 4: Final Global Measurement */}
                <div className="border border-white/10 rounded-lg">
                    {/* Header clicable en móvil */}
                    <button
                        onClick={() => toggleStep('step4')}
                        className="md:hidden w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-t-lg hover:from-[var(--primary-color)]/20 hover:to-[var(--secondary-color)]/20 transition-all duration-200"
                    >
                        <span className="text-lg font-serif text-[var(--heading-color)]">Paso 4: Medición final</span>
                        <span className={`text-[var(--primary-color)] transform transition-transform duration-200 ${expandedSteps.step4 ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>
                    
                    {/* Header fijo en desktop */}
                    <div className="hidden md:block p-4 bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 rounded-t-lg">
                        <h3 className="text-xl sm:text-2xl font-serif text-[var(--heading-color)]">Paso 4: Medición global y comando de cierre</h3>
                    </div>
                    
                    {/* Contenido colapsable (altura medida para móviles) */}
                    <div
                        className={`md:block overflow-hidden transition-[max-height] duration-300 ease-in-out`}
                        style={{
                            maxHeight: isDesktop ? 'none' : expandedSteps.step4 ? `${measuredHeights.step4}px` : '0px',
                        }}
                    >
                        <div ref={(el) => (stepRefs.current.step4 = el)} className="p-4 space-y-6">
                            <div className="space-y-4">
                                <p className="text-[var(--text-color)] mb-4">
                                    <strong>1.</strong> Mide de nuevo la energía global situándote en el sefira Da'at
                                </p>
                                
                                <GlobalMeasurementGrid
                                    label="Energía Global Final (Da'at)"
                                    description="Medición final de la energía global del consultante"
                                    value={currentSession.globalAfter}
                                    onChange={(value) => setCurrentSession(p => ({...p, globalAfter: value}))}
                                    color="gold"
                                />
                            </div>
                            
                            <div className="p-4 border border-[var(--primary-color)]/50 rounded-lg">
                                <h4 className="font-bold text-[var(--primary-color)] mb-2">2. Comando de Cierre</h4>
                                <p className="italic text-sm">"{closingCommand}"</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                 {/* Actions */}
                <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-white/10">
                    <button onClick={handleSaveSession} className="utility-btn flex-1 !bg-[var(--primary-color)] !text-white">Guardar Sesión</button>
                    <button onClick={() => downloadCSV(currentSession)} className="utility-btn flex-1">Exportar a Excel (CSV)</button>
                    <button onClick={resetForm} className="utility-btn flex-1">Limpiar Formulario</button>
                </div>
            </div>

            {/* Opening Modal */}
            {showOpeningModal && (
                <div 
                    className="fixed inset-0 bg-black/90 z-50 overflow-y-auto backdrop-blur-sm flex items-start justify-center p-3" 
                    onClick={() => setShowOpeningModal(false)}
                    role="dialog" aria-modal="true" aria-labelledby="opening-modal-title"
                >
                    <div 
                        className="bg-[var(--card-bg)] rounded-2xl max-w-md sm:max-w-2xl w-full mt-6 mb-6 max-h-[90vh] overflow-y-auto nice-scroll shadow-2xl border border-white/10 relative flex flex-col" 
                        onClick={e => e.stopPropagation()}
                        ref={modalContainerRef}
                        tabIndex={-1}
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                        }}
                    >
                        {/* Header mejorado para móviles */}
                        <div className="bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 p-4 sm:p-6 rounded-t-2xl border-b border-white/10 flex-shrink-0">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
                                        <span className="text-xs">Paso 1</span>
                                        <span className="text-xs text-[var(--text-color)]/70">Preparación del espacio</span>
                                    </div>
                                    <h3 id="opening-modal-title" className="text-xl sm:text-2xl font-serif text-[var(--heading-color)]">✨ Apertura de Sesión</h3>
                                </div>
                                <button 
                                    onClick={() => setShowOpeningModal(false)}
                                    className="ml-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[var(--text-color)] hover:text-[var(--primary-color)] transition-all duration-200 flex items-center justify-center flex-shrink-0"
                                    aria-label="Cerrar modal"
                                    ref={modalCloseButtonRef}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        {/* Contenido optimizado para móviles */}
                        <div className="p-4 sm:p-6 space-y-5 flex-1 relative">
                            {/* Fade superior e inferior para indicar scroll */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[var(--card-bg)] to-transparent rounded-t-2xl" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[var(--card-bg)] to-transparent rounded-b-2xl" />
                            <div className="max-w-md mx-auto space-y-5">
                                {/* Paso 1: Limpieza */}
                                <div className="p-4 rounded-xl border border-white/10 bg-white/5 shadow-inner">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-500/15 ring-1 ring-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-lg">🌿</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-green-300 mb-2 text-base">Limpia el espacio</h4>
                                            <p className="text-[var(--text-color)]/80 text-sm leading-relaxed">
                                                Usa spray áurico, sahumo o incienso. Respira profundo para conectar con el momento presente.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Paso 2: Comando */}
                                <div className="p-4 rounded-xl border border-white/10 bg-white/5 shadow-inner">
                                    {/* Header: icono + título a la izquierda, copiar a la derecha */}
                                    <div className="flex items-center justify-between gap-3 mb-2">
                                        <div className="inline-flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-full bg-[var(--primary-color)]/15 ring-1 ring-[var(--primary-color)]/30 flex items-center justify-center flex-shrink-0">
                                                <span className="text-lg">✨</span>
                                            </div>
                                            <h4 className="font-semibold text-[var(--primary-color)] text-base">Comando de Apertura</h4>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => { navigator.clipboard?.writeText(`\"${openingCommand}\"`); showToast('Comando copiado'); }}
                                            className="text-xs px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
                                            aria-label="Copiar comando"
                                        >Copiar</button>
                                    </div>
                                    {/* Quote a ancho completo */}
                                    <div className="bg-[var(--card-bg)]/80 p-4 rounded-lg border border-white/10 shadow-inner">
                                        <p className="text-[var(--text-color)] text-[0.95rem] leading-6 sm:leading-relaxed italic">
                                            "{openingCommand}"
                                        </p>
                                    </div>
                                    <div className="mt-3 text-xs text-[var(--text-color)]/60">
                                        💡 Recita este comando en voz alta con intención clara
                                    </div>
                                </div>

                                {/* Recordatorio adicional */}
                                <div className="p-3 rounded-lg border border-white/10 bg-white/5">
                                    <div className="flex items-center gap-2 text-[var(--text-color)]/80 text-sm">
                                        <span>🔮</span>
                                        <span className="font-medium">Mantén la intención pura y el corazón abierto durante todo el proceso</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Footer del modal (con safe-area) */}
                        <div className="p-4 sm:p-6 bg-gradient-to-r from-[var(--card-bg)] to-[var(--card-bg)]/95 border-t border-white/10 rounded-b-2xl flex-shrink-0" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
                            <button 
                                onClick={() => setShowOpeningModal(false)}
                                className="w-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)]/80 text-white px-6 py-3 rounded-full hover:opacity-90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base"
                            >
                                ✓ Entendido, continuar con la sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Session History */}
            <div className="mt-16" aria-hidden={showOpeningModal ? 'true' : undefined}>
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
}