import React from 'react'
import PageWrapper from '../components/PageWrapper'
import Toast from '../components/Toast'
import { useUserPrefs } from '../context/UserPrefsContext'
import { SEFIROT_DATA } from '../data/index.jsx'

export default function SesionesPage() {
    const { prefs, sessions, setSessions } = useUserPrefs();
    const [toastMessage, setToastMessage] = React.useState('');
    const [showOpeningModal, setShowOpeningModal] = React.useState(false);
    
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
                {/* Step 1: Opening and Space Cleaning */}
                <fieldset className="space-y-4">
                    <legend className="text-xl sm:text-2xl font-serif text-[var(--heading-color)] mb-4">Paso 1: Apertura de la sesión y limpieza del espacio</legend>
                    <button 
                        onClick={() => setShowOpeningModal(true)}
                        className="w-full bg-[var(--primary-color)] text-white px-6 py-4 rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
                    >
                        Ver instrucciones de apertura y limpieza
                    </button>
                </fieldset>

                {/* Step 2: Consultant & Global Measurement */}
                <fieldset className="space-y-4">
                    <legend className="text-xl sm:text-2xl font-serif text-[var(--heading-color)] mb-4">Paso 2: Datos y Medición Global</legend>
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

                {/* Step 3: Sefirot Readings */}
                <fieldset>
                    <legend className="text-xl sm:text-2xl font-serif text-[var(--heading-color)] mb-4">Paso 3: Medición por Sefirá</legend>
                    <p className="text-[var(--text-color)]/80 mb-6 italic">
                        Usar el péndulo para medir en el biometro cada sefira y registrar su estado antes y después de la armonización.
                    </p>
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

                {/* Step 4: Final Global Measurement and Closing */}
                <fieldset>
                    <legend className="text-xl sm:text-2xl font-serif text-[var(--heading-color)] mb-4">Paso 4: Medición global y comando de cierre</legend>
                    <div className="space-y-6">
                        <div className="bg-[var(--primary-color)]/10 p-4 rounded-lg">
                            <p className="text-[var(--text-color)] mb-4">
                                <strong>1.</strong> Mide de nuevo la energía global situándote en el sefira Da'at
                            </p>
                            <label className="block">Energía Global Final (Da'at): <span className="font-bold text-lg">{currentSession.globalAfter}</span>
                                <input type="range" min="0" max="10" value={currentSession.globalAfter} onChange={e => setCurrentSession(p => ({...p, globalAfter: e.target.value}))} className="w-full mt-2"/>
                            </label>
                        </div>
                        
                        <div className="p-4 border border-[var(--primary-color)]/50 rounded-lg">
                            <h4 className="font-bold text-[var(--primary-color)] mb-2">2. Comando de Cierre</h4>
                            <p className="italic text-sm">"{closingCommand}"</p>
                        </div>
                    </div>
                </fieldset>
                
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
                    className="fixed inset-0 bg-black/80 z-50 overflow-y-auto backdrop-blur-sm" 
                    onClick={() => setShowOpeningModal(false)}
                >
                    <div 
                        className="bg-[var(--card-bg)] rounded-xl max-w-2xl w-full mx-auto mt-8 mb-8 p-6 sm:p-8 shadow-2xl border border-[var(--primary-color)]/20 relative" 
                        onClick={e => e.stopPropagation()}
                        style={{
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            backgroundColor: 'var(--card-bg)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                        }}
                    >
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--primary-color)]/20">
                            <h3 className="text-2xl font-serif text-[var(--heading-color)]">Apertura de la sesión</h3>
                            <button 
                                onClick={() => setShowOpeningModal(false)}
                                className="text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors p-2 hover:bg-[var(--primary-color)]/10 rounded-full"
                                aria-label="Cerrar modal"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-[var(--primary-color)]/20 to-[var(--primary-color)]/15 p-6 rounded-lg border-l-4 border-[var(--primary-color)] backdrop-blur-sm" style={{ backgroundColor: 'rgba(var(--card-bg-rgb, 30, 30, 45), 0.95)' }}>
                                <h4 className="font-bold text-[var(--primary-color)] mb-3 text-lg">🌟 1. Limpia el espacio</h4>
                                <p className="text-[var(--text-color)] leading-relaxed">
                                    Limpia el espacio con algún spray áurico, sahumo y haz unas pequeñas respiraciones para conectar con el momento presente.
                                </p>
                            </div>
                            
                            <div className="bg-gradient-to-r from-[var(--primary-color)]/20 to-[var(--primary-color)]/15 p-6 rounded-lg border-l-4 border-[var(--primary-color)] backdrop-blur-sm" style={{ backgroundColor: 'rgba(var(--card-bg-rgb, 30, 30, 45), 0.95)' }}>
                                <h4 className="font-bold text-[var(--primary-color)] mb-3 text-lg">✨ 2. Comando de Apertura</h4>
                                <div className="bg-[var(--card-bg)] p-4 rounded-lg border border-[var(--primary-color)]/30 shadow-inner" style={{ backgroundColor: 'rgba(var(--card-bg-rgb, 20, 20, 35), 0.98)' }}>
                                    <p className="italic text-[var(--text-color)] leading-relaxed text-center font-medium">
                                        "{openingCommand}"
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 text-center pt-6 border-t border-[var(--primary-color)]/20">
                            <button 
                                onClick={() => setShowOpeningModal(false)}
                                className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)]/80 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                            >
                                Entendido, continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
}