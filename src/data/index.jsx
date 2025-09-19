export const SEFIROT_DATA = [
  {"id":"maljut","nombre":"Maljut — Reino / Manifestación","chakra":"Raíz","frecuenciaHz":174,"comando":"Yo anclo la luz en la materia, manifiesto abundancia y orden en mi vida terrenal. Hecho está.","tooltip":"Frecuencia de arraigo y presencia corporal.","orden":1,"significado":"'Reino'. Representa la materialización, lo concreto y lo terrenal.","energia":"Base de la existencia, manifestación de todas las sefirot en el mundo físico.","enTi":"Capacidad de accionar, encarnar tu propósito y habitar plenamente la realidad."},
  {"id":"yesod","nombre":"Yesod — Fundamento / Soporte","chakra":"Sacro","frecuenciaHz":285,"comando":"Yo activo el fundamento sagrado, alineo mis emociones y creo puentes de energía para manifestar lo invisible. Hecho está.","tooltip":"Integración etérica y emocional.","orden":2,"significado":"'Fundamento'. Es el puente entre lo espiritual y lo material.","energia":"Canal de integración de las fuerzas superiores hacia Maljut.","enTi":"Conexión, intuición práctica y sostén de proyectos y relaciones."},
  {"id":"hod","nombre":"Hod — Esplendor / Mente brillante","chakra":"Plexo solar (aspecto mental)","frecuenciaHz":396,"comando":"Yo despierto la claridad del esplendor, comunico con verdad y libero mi creatividad en forma divina. Hecho está.","tooltip":"Liberación de peso mental, claridad expresiva.","orden":3,"significado":"'Gloria'. Relacionado con la mente racional, la comunicación y la forma.","energia":"Claridad, estructura y capacidad de dar orden a la expresión.","enTi":"Expresar tu verdad, organizar pensamientos y comunicar con coherencia."},
  {"id":"netsaj","nombre":"Nétsaj — Victoria / Persistencia","chakra":"Plexo solar (voluntad)","frecuenciaHz":432,"comando":"Yo activo la energía de la victoria, avanzo con confianza y sostengo mis metas con perseverancia. Hecho está.","tooltip":"Coherencia, vitalidad y avance.","orden":4,"significado":"'Victoria'. Energía del impulso, la perseverancia y la creatividad vital.","energia":"Fuerza para superar obstáculos y sostener la vida con entusiasmo.","enTi":"Confianza, motivación y capacidad de disfrutar la experiencia."},
  {"id":"tiferet","nombre":"Tiféret — Belleza / Armonía","chakra":"Corazón","frecuenciaHz":528,"comando":"Yo equilibro mi corazón con la verdad, integro amor y fuerza en perfecta armonía. Hecho está.","tooltip":"Coherencia cardíaca, integración.","orden":5,"significado":"'Belleza'. El centro del Árbol, que armoniza rigor y misericordia.","energia":"Compasión, equilibrio y coherencia entre mente, corazón y acción.","enTi":"Conectar con tu corazón, irradiar amor y actuar con integridad."},
  {"id":"guevura","nombre":"Guevurá — Rigor / Fuerza","chakra":"Plexo (disciplina, límites)","frecuenciaHz":417,"comando":"Yo despierto el poder del límite sagrado, fortalezco mi voluntad y sostengo mi vida con disciplina. Hecho está.","tooltip":"Orden, corte de inercia, foco.","orden":6,"significado":"'Fuerza' o 'Rigor'. Representa la disciplina, los límites y la justicia.","energia":"Capacidad de discernir y establecer orden.","enTi":"Saber decir 'no', cortar con lo que no corresponde, poner límites sanos."},
  {"id":"jesed","nombre":"Jésed — Misericordia / Amor expansivo","chakra":"Corazón (compasión)","frecuenciaHz":639,"comando":"Yo activo la misericordia infinita, irradio compasión y amor incondicional en cada célula de mi ser. Hecho está.","tooltip":"Apertura afectiva, conexión.","orden":7,"significado":"'Misericordia'. Expansión, bondad y entrega.","energia":"Generosidad, apertura y amor incondicional.","enTi":"Dar desde la abundancia interior y confiar en el flujo de la vida."},
  {"id":"bina","nombre":"Biná — Entendimiento / Estructura","chakra":"Garganta / Tercer ojo (discernimiento)","frecuenciaHz":741,"comando":"Yo ordeno mis pensamientos con discernimiento, transformo la comprensión en acción justa y equilibrada. Hecho está.","tooltip":"Purificación mental, orden.","orden":8,"significado":"'Entendimiento'. La matriz que da forma y estructura a la sabiduría.","energia":"Receptividad, contención y discernimiento.","enTi":"Capacidad de comprender procesos y dar forma a ideas."},
  {"id":"jojma","nombre":"Jojmá — Sabiduría / Visión","chakra":"Tercer ojo (intuición)","frecuenciaHz":852,"comando":"Yo despierto la chispa de la sabiduría interior, libero la claridad y el entendimiento profundo en mi mente. Hecho está.","tooltip":"Intuición, visión superior.","orden":9,"significado":"'Sabiduría'. Es la chispa creadora, la inspiración que precede a la forma.","energia":"Intuición pura, visión sin límites.","enTi":"Ideas brillantes, creatividad espontánea, conexión con el origen de la inspiración."},
  {"id":"keter","nombre":"Kéter — Corona / Conexión divina","chakra":"Corona","frecuenciaHz":963,"comando":"Yo activo la luz pura de la creación, abro mi conciencia al Todo y recibo la sabiduría de la Fuente. Hecho está.","tooltip":"Unidad, estado contemplativo.","orden":10,"significado":"'Corona'. Es la unidad con lo divino, el punto más elevado del Árbol.","energia":"Fuente de toda la luz, voluntad pura y trascendencia.","enTi":"Unión con tu propósito superior, conexión con lo infinito y lo sagrado."},
  {"id":"daat","nombre":"Da'at — Puente de conciencia (opcional)","chakra":"Entre ceja y corona (integración)","frecuenciaHz":936,"comando":"Yo integro sabiduría y entendimiento en presencia consciente. Que el conocimiento se asiente en verdad. Hecho está.","tooltip":"Integración de mente superior.","orden":0,"opcional":true,"significado":"'Conocimiento'. Es la sefirá oculta, el punto de integración de todo el Árbol.","energia":"Conexión profunda entre lo humano y lo divino.","enTi":"Experiencias de expansión de conciencia, revelación y sabiduría intuitiva."}
].sort((a, b) => a.orden - b.orden);

export const navItems = [
  { href: '/', label: 'Home', ariaLabel: 'Ir a Inicio', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3.2 3 10v9c0 .6.4 1 1 1h5c.6 0 1-.4 1-1v-4h4v4c0 .6.4 1 1 1h5c.6 0 1-.4 1-1v-9l-9-6.8Z"/>
    </svg>
  ) },
  { href: '/comandos', label: 'Comandos', ariaLabel: 'Explorar el Árbol Interactivo', icon: (
    /* Flor de la Vida (7 círculos) simplificada para 22px */
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="2.2"/>
      <circle cx="12" cy="6.8" r="2.2"/>
      <circle cx="12" cy="17.2" r="2.2"/>
      <circle cx="7.8" cy="9.4" r="2.2"/>
      <circle cx="16.2" cy="9.4" r="2.2"/>
      <circle cx="7.8" cy="14.6" r="2.2"/>
      <circle cx="16.2" cy="14.6" r="2.2"/>
    </svg>
  ) },
  { href: '/sesiones', label: 'Sesiones', ariaLabel: 'Ver Historial de Sesiones', icon: (
    /* Varita con destellos */
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m3.8 18.2 7.9-7.9 2.1 2.1-7.9 7.9c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1Z"/>
      <path d="M14.5 6.5 16 5l1.5 1.5L19 5l1.5 1.5L19 8l1.5 1.5L19 11l-1.5-1.5L16 11l-1.5-1.5L16 8l-1.5-1.5Z"/>
    </svg>
  ) },
  { href: '/diccionario', label: 'Diccionario', ariaLabel: 'Glosario y galería', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 3h12c.6 0 1 .4 1 1v14H6.8C5.8 18 5 18.8 5 19.8V21H4c-.6 0-1-.4-1-1V6c0-1.7 1.3-3 3-3Z"/>
      <path d="M18 4H7.5C6.1 4 5 5.1 5 6.5S6.1 9 7.5 9H18V4Z"/>
    </svg>
  ) },
  { href: '/quien-soy', label: 'Quién soy', ariaLabel: 'Sobre mí', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12.8a4.8 4.8 0 1 0 0-9.6 4.8 4.8 0 0 0 0 9.6Z"/>
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8H4Z"/>
    </svg>
  ) },
  { href: '/contacto', label: 'Contacto', ariaLabel: 'Formulario de Contacto', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.5 4h15c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5H10l-4.7 3.5c-.5.4-1.3 0-1.3-.6V6.5C4 4.7 4.7 4 5.5 4h-1Z"/>
      <circle cx="8" cy="10" r="1.2"/>
      <circle cx="12" cy="10" r="1.2"/>
      <circle cx="16" cy="10" r="1.2"/>
    </svg>
  ) },
  { href: '/configuracion', label: 'Configuración', ariaLabel: 'Ajustes del Portal', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/>
      <path d="M20.3 13.6c.1-.5.2-1.1.2-1.6s-.1-1.1-.2-1.6l2-1.6c.2-.2.3-.5.1-.8l-1.9-3.3c-.1-.3-.5-.4-.8-.3l-2.3.9c-.8-.6-1.6-1-2.6-1.3L14.6 1c-.1-.3-.4-.5-.7-.5h-3.8c-.3 0-.6.2-.7.5L8.7 3c-1 .3-1.8.7-2.6 1.3l-2.3-.9c-.3-.1-.7 0-.8.3L1 7c-.2.3-.1.6.1.8l2 1.6c-.1.5-.2 1.1-.2 1.6s.1 1.1.2 1.6l-2 1.6c-.2.2-.3.5-.1.8l1.9 3.3c.1.3.5.4.8.3l2.3-.9c.8.6 1.6 1 2.6 1.3l.7 2c.1.3.4.5.7.5h3.8c.3 0 .6-.2.7-.5l.7-2c1-.3 1.8-.7 2.6-1.3l2.3.9c.3.1.7 0 .8-.3l1.9-3.3c.2-.3.1-.6-.1-.8l-2-1.6Z"/>
    </svg>
  ) },
];