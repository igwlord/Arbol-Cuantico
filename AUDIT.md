# Auditoría Técnica y UX/UI — Árbol Cuántico (2025-09-19)

Este documento resume el estado actual del proyecto, hallazgos (código, arquitectura, rendimiento, accesibilidad), problemas detectados (incluye acordeones móviles) y recomendaciones priorizadas. Incluye además checklist de calidad y próximos pasos.

## 1) Resumen del proyecto
- Framework: React 18.3.1 + Vite 5.4.x
- Estilos: TailwindCSS 3.4.x + CSS utilitario propio en `src/styles/global.css`
- Deploy: Netlify (`netlify.toml` con SPA redirects y headers)
- Audio: WebAudio/Audio tags; players múltiples (Pro, Simple y uno legacy)
- Estado global: Context API (`UserPrefsContext`, `AudioContext`)

## 2) Estructura actual relevante
- src/
  - App.jsx: navegación sin router; gestiona splash, páginas y navbar dock
  - components/
    - NavbarDock.jsx (z-40, menú móvil expandible)
    - Starfield.jsx (canvas fijo -z-10)
    - SplashScreen.jsx (Typewriter, GrowingTree, AmbientSoundPlayer)
    - FrequencyPlayer.jsx (legacy, con logs), FrequencyPlayerPro.jsx (en uso), FrequencyPlayerSimple.jsx (no referenciado en páginas actuales)
    - SefirotMeasurementGrid.jsx, GlobalMeasurementGrid.jsx
    - TreeOfLifeDiagram.jsx, Toast.jsx, PageWrapper.jsx
  - pages/
    - HomePage.jsx (tarjetas flip, CTA)
    - ComandosPage.jsx (usa FrequencyPlayerPro, TreeOfLife)
    - SesionesPage.jsx (acordeones móviles, modal de apertura)
    - QuienSoyPage.jsx (modal de servicios)
    - ConfiguracionPage.jsx (preferencias)
  - context/
    - UserPrefsContext.jsx (temas + persistencia)
    - AudioContext.jsx (gestión global de audio)
  - data/index.jsx (SEFIROT_DATA y navItems no usados por App.jsx)
  - styles/global.css (animaciones y utilidades)

## 3) Valores y configuración actuales
- vite.config.js: minify=terser, manualChunks vendor, chunkSizeWarningLimit=1000, ports dev=5173/preview=4173
- tailwind.config.js: content apunta a `./src/**/*.{js,jsx,ts,tsx}`
- netlify.toml: SPA redirects, headers de seguridad y cache; NODE_VERSION=18
- Navbar z-index: z-40; modales típicamente z-50/z-[60]
- PageWrapper: padding-bottom pb-20 para dar espacio al dock

## 4) Hallazgos técnicos (code smells, duplicación, dead code)
- Duplicación de datos SEFIROT:
  - App.jsx contiene SEFIROT_DATA inline
  - src/data/index.jsx define SEFIROT_DATA extendido (significado/energia/enTi) y navItems
  Recomendación: centralizar datos en `src/data/index.jsx` y consumir desde ahí. Evitar dos fuentes.

- Jugadores de audio múltiples:
  - FrequencyPlayerPro.jsx (en uso)
  - FrequencyPlayer.jsx (legacy) — tiene múltiples `console.log` de depuración
  - FrequencyPlayerSimple.jsx — no parece referenciado por páginas; solo import de utils
  Recomendación: eliminar o archivar `FrequencyPlayer.jsx` y `FrequencyPlayerSimple.jsx` si no se usan; migrar llamadas a `AudioContext` o unificar en Pro. Alternativa: mover legacy a `legacy/` y documentar.

- Console logs en producción:
  - FrequencyPlayer.jsx y utils/audioPlayer.js registran varios `console.log`. No fallan el build pero ensucian la consola.
  Recomendación: usar un flag (NODE_ENV) o un simple logger condicional y remover logs ruidosos.

- Datos de navegación duplicados:
  - `App.jsx` define navItems propios (ids: home, comandos, sesiones, quien-soy, contacto)
  - `src/data/index.jsx` define `navItems` con hrefs (pensado para un router)
  Recomendación: unificar. Si no hay React Router, mantener el formato id en un solo archivo (p. ej., `src/data/nav.js`).

- Accesibilidad y semántica:
  - Varios botones con iconos carecen de `aria-label` (NavbarDock móvil/desktop ya tiene `title`, se puede agregar aria-label)
  - `canvas` Starfield tiene `aria-hidden` — bien
  - Contrastes adecuados gracias a variables — chequear con tooling más adelante

- Estilos globales con colores CSS var — ok. Algunas líneas usan `var(--text-color)/.2` (no válido en CSS puro). Tailwind permite slash opacity con colores de tema, pero en CSS plano esas combinaciones no aplican. En clases utilitarias personalizadas conviene usar rgba() calculado.

## 5) Problema reportado: acordeones en móviles
- SesionesPage.jsx implementa acordeones con botones `md:hidden` y transiciones CSS controladas por `expandedSteps.stepX ? 'max-h-…' : 'max-h-0'`.
- Posible causa de “no funcionan” en algunos móviles:
  1) Contenedor principal con `overflow-hidden` + hijos con `overflow` y transiciones de altura — algunos navegadores móviles no animan bien `max-height` sin altura explícita.
  2) Icono rotatorio depende de state pero el contenedor colapsable usa `max-h-96` (limitado) y en pasos 2-4 usa `max-h-screen` — puede cortar contenido en móviles pequeños.
  3) Área clicable: el botón cubre bien el ancho; no parece un tema de hitbox.
- Recomendación de fix robusto:
  - Medir el contenido con `ref` y setear `style={{ maxHeight: expanded ? contentHeight : 0 }}` en línea, disparando reflow al toggle.
  - Alternativa simple: usar `details/summary` nativos con polyfill visual y Tailwind.
  - Asegurar `overflow-hidden` en el wrapper, pero `overflow-visible` dentro del contenido; evitar `max-h-screen` y usar altura calculada.

## 6) Modales y z-index (móvil)
- QuienSoyPage modal ajustado a `z-[60]` y `mb-24`, `max-h-[80vh]` + CTA en footer fijo — correcto para evitar conflicto con NavbarDock (z-40).
- Recomendación adicional: al abrir modales, añadir una clase `overflow-y-hidden` al `html` además del body para iOS-Safari.

## 7) Rendimiento
- Build: OK (≈ 96 kB app + 140 kB vendor gzip). Correcto para SPA mediana.
- Starfield.jsx: 1500 estrellas por defecto. En HomePage se usa otro StarField (div pulses). Dos efectos distintos.
  - Recomendación: asegurar que no se rendericen ambos en la misma vista si no se desea. PageWrapper ya usa Starfield de components/Starfield.jsx — en HomePage también hay un StarField inline distinto. Sugerencia: consolidar en un solo sistema de estrellas y parametrizar densidad.

## 8) UX/UI recomendaciones
- Navegación:
  - Agregar “Config” como ítem en el dock móvil (ya existe botón en expandido). En compacto quizá un long-press o doble tap para abrir config.
  - Mantener visibilidad del ítem activo con etiqueta mini (tooltip accesible) en móvil.
- Modales:
  - En móviles, usar `safe-area-inset-bottom` con padding `pb-[env(safe-area-inset-bottom)]` en footers.
  - Bloquear scroll en `html, body` y restaurar al cerrar; también evitar layout shift del fondo (añadir compensación de scrollbar en desktop).
- Acordeones móviles (prioridad alta):
  - Migrar a `details/summary` nativo o implementar altura medida con `ref` para transiciones confiables.
- Forms (Contacto):
  - Añadir autofill hints (`autoComplete`), `aria-invalid` cuando hay errores, focus styles visibles.
- Accesibilidad general:
  - Añadir `aria-label` a botones icónicos del Navbar; roles a secciones si aplica; `prefers-reduced-motion` para animaciones intensas.

## 9) Mantenimiento y limpieza
- Eliminar o mover a `legacy/`:
  - `src/components/FrequencyPlayer.jsx` (legacy, logs)
  - `src/components/FrequencyPlayerSimple.jsx` (sin uso aparente)
  - Duplicación Starfield: decidir uno solo.
- Centralizar datos en `src/data/index.jsx`; eliminar SEFIROT_DATA inline en `App.jsx` y usar import.
- Unificar `navItems` en un solo origen (si sin router, usar ids; si con router, adoptar React Router y hrefs).
- Revisar CSS personalizado con opacidad tipo `var(--text-color)/.2`; reemplazar por `rgba()` o Tailwind classes.

## 10) Calidad y pruebas (quality gates)
- Build: PASS (npm run build)
- Lint/Typecheck: No hay ESLint/TS configurados — recomendar agregar ESLint + Prettier
- Unit tests: No existen — opcional agregar pruebas de utilidades (audio utils) y componentes críticos sin canvas.
- Smoke test manual: Modales y navegación funcionan; pendiente corregir acordeones en móviles.

## 11) Plan de mejoras priorizadas
1. Acordeones móviles confiables (ref altura o details/summary) — Alta
2. Centralizar SEFIROT_DATA y navItems — Alta
3. Limpieza de jugadores legacy/logs y unificar Starfield — Media
4. Accesibilidad: aria-labels en Navbar, focus states, reduced motion — Media
5. Infra: ESLint + Prettier, scripts `lint` y `format` — Media
6. UX móvil: safe-area paddings, bloqueo scroll html/body en modales — Media

## 12) Acciones sugeridas (rápidas)
- Añadir clase util `modal-open` en body/html al abrir modales; remover al cerrar.
- Sustituir `max-h-screen` por alturas medidas dinámicamente en acordeones.
- Reemplazar los `console.log` ruidosos por un logger con `if (import.meta.env.DEV)`.
- Crear `src/data/nav.js` y `src/data/sefirot.js` separados, importados por páginas.

---

He creado un backup de seguridad:
- Branch: backup/pre-audit-2025-09-19
- Tag: backup-2025-09-19-pre-audit

Si apruebas, puedo implementar los fixes de acordeones y la centralización de datos en una rama `feat/audit-fixes` con commits atómicos y pruebas básicas.





Fase 1 — Alta prioridad
Fix acordeones móviles en SesionesPage
Objetivo: que abran/cerren confiable en todos los móviles, sin cortes.
Enfoque recomendado:
Opción A (nativa): Migrar a details/summary (estilizados) para máxima compatibilidad.
Opción B (custom): Usar ref para medir altura real del contenido y setear maxHeight dinámico con transición; evitar max-h-96 o max-h-screen.
Aceptación:
Se abre/cierra en Android/iOS.
No corta contenido en ninguno de los pasos.
Animación suave, sin saltos.
Entregable: PR con cambios en SesionesPage.jsx + comentarios en código.
Centralizar SEFIROT_DATA y navItems
Objetivo: una sola fuente de verdad.
Acciones:
Extraer SEFIROT_DATA de App.jsx.
Usar index.jsx como origen único (o separar en src/data/sefirot.js y src/data/nav.js).
Unificar navItems: mantener IDs (sin router) o planificar transición a Router después.
Aceptación:
App compila y navega igual.
No hay datos duplicados.
Entregable: PR con imports actualizados en App.jsx y limpieza de datos duplicados.
Fase 2 — Mantenimiento y limpieza
Limpiar players legacy y logs ruidosos
Acción:
Confirmar usos de FrequencyPlayer.jsx y FrequencyPlayerSimple.jsx.
Si están sin uso, mover a src/legacy/ o eliminar.
Reemplazar console.log por un logger protegido con if (import.meta.env.DEV).
Aceptación:
ComandosPage sigue funcionando con FrequencyPlayerPro.
Consola limpia en producción.
Entregable: PR con refactor + notas en AUDIT.md.
Consolidar Starfield
Acción:
Elegir un único sistema de estrellas (preferible canvas Starfield.jsx por rendimiento).
Remover el StarField inline de HomePage y parametrizar densidad desde PageWrapper o prop.
Aceptación:
Efecto visual consistente y fluido.
Menor render redundante.
Entregable: PR simplificando HomePage/Wrapper.
Fase 3 — UX/UI fortalecimiento
Fortalecer modales
Acción:
Scroll-lock en html y body durante modales (iOS safe).
Footer con pb-[env(safe-area-inset-bottom)] y safe-area-inset-* donde aplique.
Verificar z-index contra NavbarDock en todas las páginas.
Aceptación:
Sin scroll del fondo en iOS/Android.
Botones siempre visibles y accesibles.
Entregable: PR con helper de scroll-lock y ajustes en QuienSoyPage.jsx y modales similares.
Accesibilidad
Acción:
aria-label en botones icónicos del dock y controles.
Focus styles claros.
Respeto a prefers-reduced-motion para animaciones fuertes (Starfield, flips).
Aceptación:
Navegación con teclado viable.
Animaciones reducidas cuando el usuario lo prefiere.
Entregable: PR con mejoras ARIA + motion.
Fase 4 — Tooling y calidad
ESLint + Prettier
Acción:
Agregar configuración mínima (React, hooks, import/order).
Scripts: lint, format, lint:fix.
Aceptación:
Repo con estándares consistentes.
CI futura lista para integrar.
Entregable: PR con configs y primera pasada de formato.
QA + Deploy
Acción:
Smoke tests en móvil real (Android/iOS).
npm run build y push a main, revisar Netlify.
Si algo falla: rollback a tag backup-2025-09-19-pre-audit.
Entregable: despliegue verificado.
Orden sugerido y estimación
Día 1:
Fase 1 (acordeones + datos/nav) — prioridad máxima.
Día 2:
Fase 2 (players/logs + starfield) — limpieza.
Día 3:
Fase 3 (modales + accesibilidad) — UX sólido.
Día 4:
Fase 4 (tooling + QA + deploy).