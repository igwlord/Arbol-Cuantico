import React from 'react'
import PageWrapper from '../components/PageWrapper'
import Toast from '../components/Toast'
import { useUserPrefs, themePalettes } from '../context/UserPrefsContext'

export default function ConfiguracionPage({ onLogout }) {
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
}