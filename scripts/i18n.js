// Global i18n helper for all pages. Uses localStorage('language') and data-i18n attributes.
(function(){
  const saved = localStorage.getItem('language');
  const LANG = saved === 'spanish' ? 'spanish' : 'english';
  if (!saved) localStorage.setItem('language', LANG);

  // Page-specific release date (optional, fallback text if used as placeholder)
  const RELEASE_DATE = '19/11/2026';

  const COMMON = {
    english: {
      'nav.home': 'Home',
      'nav.countdown': 'Countdown',
      'nav.trailers': 'Trailers',
      'nav.info': 'Information',
      'nav.forum': 'Forum',
      'credits.text': '© Dg203302 - 2025',
      'theme.toDark': 'Dark mode',
      'theme.toLight': 'Light mode',
    },
    spanish: {
      'nav.home': 'Inicio',
      'nav.countdown': 'Cuenta regresiva',
      'nav.trailers': 'Tráilers',
      'nav.info': 'Información',
      'nav.forum': 'Foro',
      'credits.text': '© Dg203302 - 2025',
      'theme.toDark': 'Modo oscuro',
      'theme.toLight': 'Modo claro',
    }
  };

  // Shared INFO dictionary used by Info page and Conteo page (which embeds info section)
  const INFO_DICT = {
    english: {
      'info.header': 'Information about GTA VI',
      // Table of contents (mirrors section titles)
      'toc.status': 'Status & Release date',
      'toc.trailers': 'Trailers',
      'toc.story': 'Story & Protagonists',
      'toc.setting': 'Setting & World',
      'toc.gameplay': 'Gameplay',
      'toc.leaks': 'Leaks & Controversies',
      'toc.online': 'Online & Monetization',
      'toc.editions': 'Editions & Price',
      'toc.delays': 'Delays & Rumors',
      'toc.music': 'Music & Impact',
      'toc.unconfirmed': 'Still Unconfirmed',
      'toc.timeline': 'Timeline',
      'toc.press': 'Press & Community',
      'toc.bigPicture': 'Big Picture',
      'toc.leakAnalysis': 'Leak Analysis',
      // Section bodies
      'status.paragraph': '<strong>Release Date:</strong> <time datetime="2026-11-19">November 19, 2026</time> (confirmed by Rockstar) <br>\
          <strong>Platforms:</strong> PlayStation 5 and Xbox Series X|S at launch. <br>\
          <em>PC release not announced; based on Rockstar’s history, PC is expected later.</em>',
      'trailers.point1': '<strong>First trailer:</strong> December 2023 – initial reveal.',
      'trailers.point2': '<strong>Second trailer:</strong> May 6, 2025 – more gameplay and story.',
      'trailers.point3': 'Both trailers recorded “in-engine on PS5.”',
      'trailers.point4': 'Trailers broke YouTube and social media records.',
      'story.paragraph': '<strong>Protagonists:</strong> Lucia Caminos and Jason Duval.<br>\
          <strong>Theme:</strong> Bonnie & Clyde vibe – partners in crime, navigating a conspiracy.<br>\
          <strong>Trailer highlights:</strong> Lucia released from prison, Jason picking her up, robberies, chases, and chaos in Vice City.',
      'setting.point1': '<strong>Main location:</strong> Vice City (modern Miami-like city).',
      'setting.point2': '<strong>State of Leonida:</strong> swamps, rural areas, highways, Everglades-like zones, other towns.',
      'setting.point3': 'Expected to be Rockstar’s largest map ever.',
      'gameplay.point1': 'Extremely detailed graphics (crowds, lighting, reflections, dense NPCs).',
      'gameplay.point2': 'Improved police AI, chases, stealth, and gunplay.',
      'gameplay.point3': 'Activities: small robberies, large-scale heists.',
      'gameplay.point4': '“Living, breathing” open world with deeper interactivity than GTA V.',
      'leaks.point1': '<strong>2022 leak:</strong> Over 90 videos of early gameplay leaked. Rockstar confirmed and condemned the breach.',
      'leaks.point2': 'Many “map leaks” and “early screenshots” circulated; Rockstar pursued legal action.',
      'online.point1': 'Rockstar job listings and investor calls hint at a major online component.',
      'online.point2': '<strong>Confirmed:</strong> Nothing concrete yet on GTA Online 2, microtransactions, or subscriptions.',
      'online.point3': '<strong>Expected:</strong> Huge multiplayer follow-up to GTA Online.',
      'editions.point1': 'No confirmed pricing or special editions (yet).',
      'editions.point2': 'Analysts speculate GTA VI may be priced higher than GTA V.',
      'delays.point1': '<strong>Initial target:</strong> Fall 2025 (publicly mentioned).',
      'delays.point2': '<strong>First official date:</strong> May 26, 2026 (announced May 2, 2025).',
      'delays.point3': '<strong>Current date:</strong> November 19, 2026 (announced November 6, 2025).',
      'music.point1': 'Licensed songs in trailers (Tom Petty’s “Love Is a Long Road”, The Pointer Sisters, etc.) surged in streams.',
      'music.point2': 'Rockstar’s marketing often revives classics through GTA soundtracks.',
      'unconfirmed.point1': 'No official PC release date.',
      'unconfirmed.point2': 'No full details on GTA Online 2 / multiplayer.',
      'unconfirmed.point3': 'No special/collector’s editions officially confirmed.',
      'unconfirmed.point4': 'Exact map size and all city/region names unknown.',
      'unconfirmed.point5': 'No full DLC or long-term roadmap yet.',
      'timeline.short.2022': '2022: Major development leak.',
      'timeline.short.2023': 'Dec 2023: Official reveal &amp; first trailer.',
      'timeline.short.2025_05_06': 'May 6, 2025: Second trailer released.',
      'timeline.short.2025_05_02': 'May 2, 2025: Rockstar announces delay to May 26, 2026.',
      'timeline.short.2025_11_06': 'Nov 6, 2025: Rockstar announces further delay to November 19, 2026.',
      'press.point1': 'Universal excitement over graphics, scale, and protagonists.',
      'press.point2': 'Debates around story tone (more intimate &amp; character-driven than GTA V).',
      'press.point3': 'Concerns about monetization in the online era.',
      'press.point4': 'Speculation about whether it can surpass GTA V’s cultural impact.',
      'big.point1': '<strong>Guaranteed:</strong> Biggest, most detailed Rockstar world yet. Dual-protagonist campaign. Record-breaking launch in November 2026 (if no further delay).',
      'big.point2': '<strong>Pending:</strong> PC confirmation, online/multiplayer reveal, post-launch support details.',
      'section.status': 'Official Status and Release Date',
      'section.trailers': 'Trailers, Marketing, and Reception',
      'section.story': 'Story, Protagonists, and Tone',
      'section.setting': 'Setting and World (Map)',
      'section.gameplay': 'Gameplay Mechanics and Improvements',
      'section.leaks': 'Leaks, Hacks, and Controversies',
      'section.online': 'Online and Monetization (Speculation vs Facts)',
      'section.editions': 'Editions, Price, and Sales Expectations',
      'section.delays': 'Delays and Rumors',
      'section.music': 'Music and Cultural Impact',
      'section.unconfirmed': 'Still Unconfirmed',
      'section.timeline': 'Timeline of Key Events',
      'section.press': 'Press and Community Reactions',
      'section.bigPicture': 'Big Picture',
      'section.leakAnalysis': 'Leak Analysis',
      'timeline.2018_2021': '🔹 2018–2021 (Rumors & Pre-production)',
      'timeline.2022': '🔹 2022 — The Big Leak',
      'timeline.2023': '🔹 2023 — Official Announcement',
      'timeline.2024': '🔹 2024',
      'timeline.2025': '🔹 2025 — Second Trailer & Release Date Update',
      'timeline.2026': '🔹 2026 — Current Release Date',
      'leak.seen.title': '📂 The 2022 Leak (What Was Seen)',
      'leak.confirmed.title': '✅ What Got Confirmed',
      'leak.changed.title': '❌ What Was Scrapped or Changed',
      'leak.uncertain.title': '🤔 Still Uncertain',
      'timeline.2018_2021.li1': 'Early rumors spread that Rockstar was working on the next Grand Theft Auto.',
      'timeline.2018_2021.li2': 'Rockstar job postings hinted at a very large-scale project.',
      'timeline.2022.li1': 'September 2022: a massive hack hits Rockstar.',
      'timeline.2022.li2': 'Over 90 clips of very early (pre-alpha) gameplay are leaked.',
      'timeline.2022.li3': 'Reveals two protagonists: a Latina woman and a blond man (later confirmed as Lucia and Jason).',
      'timeline.2022.li4': 'Locations and references point to Miami/Florida-inspired settings.',
      'timeline.2022.li5': 'Rockstar confirms the leak is real but from an early stage.',
      'timeline.2023.li1': 'December 4, 2023: Rockstar drops the first official trailer on YouTube.',
      'timeline.2023.li2': 'Confirms the return to Vice City and the new state of Leonida.',
      'timeline.2023.li3': 'Introduces Lucia (seen in prison).',
      'timeline.2023.li4': 'Announces 2025 as the initial release window.',
      'timeline.2023.li5': 'Trailer smashes YouTube records in views and likes.',
      'timeline.2024.li1': 'Ongoing marketing beats and community speculation.',
      'timeline.2025.li1': 'May 6, 2025: Rockstar releases the second trailer. ',
      'timeline.2025.li2': 'Footage confirmed as captured on PS5.',
      'timeline.2025.li3': 'New screenshots added to the official website.',
      'timeline.2025.li4': 'Sparks debate about a possible later PC version.',
      'timeline.2026.li1': 'November 19, 2026: confirmed worldwide console launch date.',
      'leak.seen.li1': 'Over 90 leaked clips from a pre-alpha build.',
      'leak.seen.env': 'Environment: streets, stores, diners, vehicles, cops, nightlife → strongly Miami/Florida vibe.',
      'leak.seen.mechanics.title': 'Early mechanics being tested:',
      'leak.seen.mechanics.cover': 'New cover system.',
      'leak.seen.mechanics.npc': 'Improved NPC movement.',
      'leak.seen.mechanics.robberies': 'Small robberies (store stick-ups).',
      'leak.seen.mechanics.code': 'Some code snippets referencing "Vice City" and "Leonida".',
      'leak.confirmed.li1': 'Protagonists: indeed Lucia and Jason.',
      'leak.confirmed.li2': 'Setting: Vice City + Leonida, officially revealed.',
      'leak.confirmed.li3': 'Visual direction: evolved but consistent with leak footage.',
      'leak.changed.li1': 'The HUD shown in the leak doesn’t match the polished version in trailers — clearly placeholder.',
      'leak.changed.li2': 'NPC animations looked stiff in the leak; trailers show much higher quality.',
      'leak.changed.li3': 'Many weapons/vehicles/textures in the leak were placeholders from GTA V.',
      'leak.uncertain.li1': 'Escalating police system: rumored since the leaks, but not yet shown officially.',
      'leak.uncertain.li2': 'Exact map size: leaks showed multiple areas, but Rockstar hasn’t confirmed boundaries.',
      'leak.uncertain.li3': 'Online component: no full official reveal yet for the multiplayer mode or business model.'
    },
    spanish: {
      'info.header': 'Información sobre GTA VI',
      // Section bodies
      'status.paragraph': '<strong>Fecha de lanzamiento:</strong> <time datetime="2026-11-19">19 de noviembre de 2026</time> (confirmado por Rockstar) <br>\
        <strong>Plataformas:</strong> PlayStation 5 y Xbox Series X|S en el lanzamiento. <br>\
        <em>PC no anunciado; por el historial de Rockstar, se espera más adelante.</em>',
      'trailers.point1': '<strong>Primer tráiler:</strong> Diciembre de 2023 – revelación inicial.',
      'trailers.point2': '<strong>Segundo tráiler:</strong> 6 de mayo de 2025 – más jugabilidad e historia.',
      'trailers.point3': 'Ambos tráilers grabados “in-engine en PS5”.',
      'trailers.point4': 'Los tráilers batieron récords en YouTube y redes sociales.',
      'story.paragraph': '<strong>Protagonistas:</strong> Lucía Caminos y Jason Duval.<br>\
        <strong>Tema:</strong> Estilo Bonnie & Clyde – pareja criminal que navega una conspiración.<br>\
        <strong>Lo destacado del tráiler:</strong> Lucía sale de prisión, Jason la recoge, robos, persecuciones y caos en Vice City.',
      'setting.point1': '<strong>Ubicación principal:</strong> Vice City (ciudad moderna inspirada en Miami).',
      'setting.point2': '<strong>Estado de Leonida:</strong> pantanos, zonas rurales, autopistas, áreas tipo Everglades y otros pueblos.',
      'setting.point3': 'Se espera que sea el mapa más grande de Rockstar hasta la fecha.',
      'gameplay.point1': 'Gráficos extremadamente detallados (multitudes, iluminación, reflejos, NPCs densos).',
      'gameplay.point2': 'Mejoras en la IA policial, persecuciones, sigilo y combate.',
      'gameplay.point3': 'Actividades: pequeños robos y atracos a gran escala.',
      'gameplay.point4': 'Mundo abierto “vivo” con más interactividad que GTA V.',
      'leaks.point1': '<strong>Filtración de 2022:</strong> Más de 90 videos de jugabilidad temprana. Rockstar confirmó y condenó la brecha.',
      'leaks.point2': 'Circularon muchos “map leaks” y “capturas tempranas”; Rockstar emprendió acciones legales.',
      'online.point1': 'Ofertas de trabajo e informes a inversionistas sugieren un fuerte componente online.',
      'online.point2': '<strong>Confirmado:</strong> Nada concreto aún sobre GTA Online 2, microtransacciones o suscripciones.',
      'online.point3': '<strong>Esperado:</strong> Enorme sucesor multijugador de GTA Online.',
      'editions.point1': 'Sin precios o ediciones especiales confirmadas (por ahora).',
      'editions.point2': 'Analistas especulan que GTA VI podría tener un precio mayor que GTA V.',
      'delays.point1': '<strong>Objetivo inicial:</strong> Otoño de 2025 (mencionado públicamente).',
      'delays.point2': '<strong>Primera fecha oficial:</strong> 26 de mayo de 2026 (anunciado el 2 de mayo de 2025).',
      'delays.point3': '<strong>Fecha actual:</strong> 19 de noviembre de 2026 (anunciado el 6 de noviembre de 2025).',
      'music.point1': 'Las canciones licenciadas en los tráilers ("Love Is a Long Road" de Tom Petty, The Pointer Sisters, etc.) subieron en reproducciones.',
      'music.point2': 'El marketing de Rockstar a menudo revive clásicos mediante las bandas sonoras de GTA.',
      'unconfirmed.point1': 'Sin fecha oficial para PC.',
      'unconfirmed.point2': 'Sin detalles completos sobre GTA Online 2 / multijugador.',
      'unconfirmed.point3': 'Sin ediciones especiales/de coleccionista confirmadas oficialmente.',
      'unconfirmed.point4': 'Tamaño exacto del mapa y nombres de todas las zonas aún desconocidos.',
      'unconfirmed.point5': 'Aún no hay DLCs completos ni hoja de ruta a largo plazo.',
      'timeline.short.2022': '2022: Gran filtración de desarrollo.',
      'timeline.short.2023': 'Dic 2023: Revelación oficial y primer tráiler.',
      'timeline.short.2025_05_06': '6 de mayo de 2025: Se publica el segundo tráiler.',
      'timeline.short.2025_05_02': '2 de mayo de 2025: Rockstar anuncia retraso al 26 de mayo de 2026.',
      'timeline.short.2025_11_06': '6 de nov de 2025: Nuevo retraso al 19 de noviembre de 2026.',
      'press.point1': 'Entusiasmo general por los gráficos, la escala y los protagonistas.',
      'press.point2': 'Debates sobre el tono de la historia (más íntimo y centrado en personajes que GTA V).',
      'press.point3': 'Preocupaciones por la monetización en la era online.',
      'press.point4': 'Especulación sobre si podrá superar el impacto cultural de GTA V.',
      'big.point1': '<strong>Garantizado:</strong> El mundo de Rockstar más grande y detallado hasta la fecha. Campaña con dos protagonistas. Lanzamiento récord en noviembre de 2026 (si no hay más retrasos).',
      'big.point2': '<strong>Pendiente:</strong> Confirmación en PC, detalles del multijugador/online y del soporte postlanzamiento.',
      'toc.status': 'Estado y fecha de lanzamiento',
      'toc.trailers': 'Tráilers',
      'toc.story': 'Historia y protagonistas',
      'toc.setting': 'Ambientación y mundo',
      'toc.gameplay': 'Jugabilidad',
      'toc.leaks': 'Filtraciones y controversias',
      'toc.online': 'Online y monetización',
      'toc.editions': 'Ediciones y precio',
      'toc.delays': 'Retrasos y rumores',
      'toc.music': 'Música e impacto',
      'toc.unconfirmed': 'Aún sin confirmar',
      'toc.timeline': 'Cronología',
      'toc.press': 'Prensa y comunidad',
      'toc.bigPicture': 'Panorama general',
      'toc.leakAnalysis': 'Análisis de la filtración',
      'section.status': 'Estado oficial y fecha de lanzamiento',
      'section.trailers': 'Tráilers, marketing y recepción',
      'section.story': 'Historia, protagonistas y tono',
      'section.setting': 'Ambientación y mundo (Mapa)',
      'section.gameplay': 'Mecánicas y mejoras de jugabilidad',
      'section.leaks': 'Filtraciones, hackeos y controversias',
      'section.online': 'Online y monetización (Especulación vs hechos)',
      'section.editions': 'Ediciones, precio y expectativas de ventas',
      'section.delays': 'Retrasos y rumores',
      'section.music': 'Música e impacto cultural',
      'section.unconfirmed': 'Aún sin confirmar',
      'section.timeline': 'Cronología de eventos clave',
      'section.press': 'Prensa y reacciones de la comunidad',
      'section.bigPicture': 'Panorama general',
      'section.leakAnalysis': 'Análisis de la filtración',
      'timeline.2018_2021': '🔹 2018–2021 (Rumores y preproducción)',
      'timeline.2022': '🔹 2022 — La gran filtración',
      'timeline.2023': '🔹 2023 — Anuncio oficial',
      'timeline.2024': '🔹 2024',
      'timeline.2025': '🔹 2025 — Segundo tráiler y actualización de fecha',
      'timeline.2026': '🔹 2026 — Fecha de lanzamiento actual',
      'leak.seen.title': '📂 La filtración de 2022 (Lo visto)',
      'leak.confirmed.title': '✅ Qué se confirmó',
      'leak.changed.title': '❌ Qué se cambió o descartó',
      'leak.uncertain.title': '🤔 Aún incierto',
      'timeline.2018_2021.li1': 'Se difundieron rumores de que Rockstar trabajaba en el próximo Grand Theft Auto.',
      'timeline.2018_2021.li2': 'Ofertas de trabajo de Rockstar insinuaban un proyecto de gran escala.',
      'timeline.2022.li1': 'Septiembre de 2022: un hackeo masivo golpea a Rockstar.',
      'timeline.2022.li2': 'Se filtran más de 90 clips de jugabilidad muy temprana (pre-alfa).',
      'timeline.2022.li3': 'Revela dos protagonistas: una mujer latina y un hombre rubio (luego confirmados como Lucía y Jason).',
      'timeline.2022.li4': 'Ubicaciones y referencias apuntan a escenarios inspirados en Miami/Florida.',
      'timeline.2022.li5': 'Rockstar confirma que la filtración es real pero de una etapa temprana.',
      'timeline.2023.li1': '4 de diciembre de 2023: Rockstar lanza el primer tráiler oficial en YouTube.',
      'timeline.2023.li2': 'Confirma el regreso a Vice City y el nuevo estado de Leonida.',
      'timeline.2023.li3': 'Presenta a Lucía (vista en prisión).',
      'timeline.2023.li4': 'Anuncia 2025 como ventana inicial de lanzamiento.',
      'timeline.2023.li5': 'El tráiler rompe récords de YouTube en vistas y “me gusta”.',
      'timeline.2024.li1': 'Ritmo de marketing continuo y especulación de la comunidad.',
      'timeline.2025.li1': '6 de mayo de 2025: Rockstar publica el segundo tráiler. ',
      'timeline.2025.li2': 'Se confirma que el metraje fue capturado en PS5.',
      'timeline.2025.li3': 'Se añaden nuevas capturas al sitio oficial.',
      'timeline.2025.li4': 'Genera debate sobre una posible versión para PC más tarde.',
      'timeline.2026.li1': '19 de noviembre de 2026: fecha de salida mundial en consolas confirmada.',
      'leak.seen.li1': 'Más de 90 clips filtrados de una build pre-alfa.',
      'leak.seen.env': 'Entorno: calles, tiendas, diners, vehículos, policías, vida nocturna → fuerte vibra Miami/Florida.',
      'leak.seen.mechanics.title': 'Mecánicas tempranas en prueba:',
      'leak.seen.mechanics.cover': 'Nuevo sistema de cobertura.',
      'leak.seen.mechanics.npc': 'Movimiento de NPCs mejorado.',
      'leak.seen.mechanics.robberies': 'Pequeños robos (atracos a tiendas).',
      'leak.seen.mechanics.code': 'Algunos fragmentos de código que referencian "Vice City" y "Leonida".',
      'leak.confirmed.li1': 'Protagonistas: efectivamente Lucía y Jason.',
      'leak.confirmed.li2': 'Ambientación: Vice City + Leonida, revelado oficialmente.',
      'leak.confirmed.li3': 'Dirección visual: evolucionada pero consistente con lo filtrado.',
      'leak.changed.li1': 'El HUD visto en la filtración no coincide con la versión pulida de los tráilers — claramente provisional.',
      'leak.changed.li2': 'Las animaciones de NPC se veían rígidas en la filtración; en tráilers son de mucha mayor calidad.',
      'leak.changed.li3': 'Muchas armas/vehículos/texturas eran provisionales de GTA V.',
      'leak.uncertain.li1': 'Sistema de escalada policial: rumoreado desde las filtraciones, pero aún no mostrado oficialmente.',
      'leak.uncertain.li2': 'Tamaño exacto del mapa: las filtraciones mostraron varias áreas, pero Rockstar no ha confirmado límites.',
      'leak.uncertain.li3': 'Componente online: aún sin revelación oficial completa del modo multijugador o su modelo de negocio.'
    }
  };

  // Shared FORUM dictionary used by Foro page and Trailers page
  const FORUM_DICT = {
    english: {
      'forum.title': 'GTA VI Forum',
      'forum.loading': 'Loading...',
      'forum.messagesHeading': 'Messages',
      'forum.refresh': 'Refresh',
      'forum.placeholder': 'Your Message Here',
      'forum.send': 'Send'
    },
    spanish: {
      'forum.title': 'Foro de GTA VI',
      'forum.loading': 'Cargando...',
      'forum.messagesHeading': 'Mensajes',
      'forum.refresh': 'Actualizar',
      'forum.placeholder': 'Escribe tu mensaje aquí',
      'forum.send': 'Enviar'
    }
  };

  const PAGE = (function(){
    const path = location.pathname.toLowerCase();
    if (path.endsWith('/index.html') || path === '/' || path.endsWith('/')) {
      return {
        english: {
          'home.title': 'GTA VI Fan App',
          'home.release': `Grand Theft Auto VI Release Date:<br>${RELEASE_DATE}`,
          'lang.prompt': 'Select Language',
          'lang.es': 'Spanish',
          'lang.en': 'English',
          'RockstarCredits': 'DISCLAIMER: Grand Theft Auto VI is a game developed and published by Rockstar Games. This is an unofficial Website/App.'
        },
        spanish: {
          'home.title': 'App Fan de GTA VI',
          'home.release': `Fecha de lanzamiento de Grand Theft Auto VI:<br>${RELEASE_DATE}`,
          'lang.prompt': 'Seleccione el idioma',
          'lang.es': 'Español',
          'lang.en': 'Inglés',
          'RockstarCredits': 'AVISO: Grand Theft Auto VI es un juego desarrollado y publicado por Rockstar Games. Esta es una página/aplicación no oficial.'
        }
      };
    }
    if (path.endsWith('/templates/conteo.html')) {
      // Conteo page embeds both countdown and info sections, so include both
      const countdown = {
        english: {
          'countdown.title': 'Countdown',
          'countdown.hours': '00 Hours',
          'countdown.days': '000 Days',
          'countdown.months': '00 Months'
        },
        spanish: {
          'countdown.title': 'Cuenta regresiva',
          'countdown.hours': '00 Horas',
          'countdown.days': '000 Días',
          'countdown.months': '00 Meses'
        }
      };
      return {
        english: { ...countdown.english, ...INFO_DICT.english },
        spanish: { ...countdown.spanish, ...INFO_DICT.spanish }
      };
    }
    if (path.endsWith('/templates/trailers.html')) {
      const TRAILERS_BASE = {
        english: {
          'trailers.title': 'GTA VI Trailers',
          'trailers.caption1': 'Trailer 1 <br>Published: 12/4/2023',
          'trailers.caption2': 'Trailer 2 <br>Published: 6/6/2025'
        },
        spanish: {
          'trailers.title': 'Tráilers de GTA VI',
          'trailers.caption1': 'Tráiler 1 <br>Publicado: 4/12/2023',
          'trailers.caption2': 'Tráiler 2 <br>Publicado: 6/6/2025'
        }
      };
      const TRAILERS_ANALYSIS_DICT = {
        english: {
          'trailers.analysis.header': 'Trailer Analysis',
          'trailers.analysis.button': 'Trailer Analysis',
          'trailers.analysis.toc': 'On this page',
          'trailers.t1.header': 'Trailer 1 — December 2023',
          'trailers.t1.summary': 'Initial reveal confirming Vice City (Leonida), dual protagonists (Lucia & Jason), and tone.',
          'trailers.t1.points.title': 'Highlights',
          'trailers.t1.points.p1': 'Lucia is shown in prison; later reunited with Jason.',
          'trailers.t1.points.p2': 'Strong Vice City vibe: beaches, neon nightlife, social media snippets.',
          'trailers.t1.points.p3': 'Open-world slice: stores, highways, swamps; hints of scale and diversity.',
          'trailers.t1.tech.title': 'Tech & Visuals',
          'trailers.t1.tech.p1': 'Dense crowds, improved lighting/reflections, fluid animations.',
          'trailers.t1.tech.p2': 'Footage presented as in-engine on PS5.',
          'trailers.t1.music.title': 'Music',
          'trailers.t1.music.p1': 'Tom Petty — “Love Is a Long Road” drives the tone; nostalgia meets modern flair.',
          'trailers.t1.reception.title': 'Reception',
          'trailers.t1.reception.p1': 'Record-breaking views and likes; wide press coverage.',
          'trailers.t1.status.title': 'Confirmed vs Speculation',
          'trailers.t1.status.confirmed1': 'Setting: Vice City + state of Leonida.',
          'trailers.t1.status.confirmed2': 'Protagonists: Lucia and Jason.',
          'trailers.t1.status.spec1': 'Exact map boundaries, police escalation system, and PC timing remain unconfirmed.',
          'trailers.t2.header': 'Trailer 2 — May 6, 2025',
          'trailers.t2.summary': 'Expanded look at world interactions, chases, robberies, and tone; more character focus.',
          'trailers.t2.points.title': 'Highlights',
          'trailers.t2.points.p1': 'Robberies (small to larger setups), vehicle variety, nightlife and rural contrasts.',
          'trailers.t2.points.p2': 'Improved police AI and pursuit dynamics teased through edited sequences.',
          'trailers.t2.points.p3': 'Character moments deepen Lucia/Jason dynamic without full plot reveal.',
          'trailers.t2.tech.title': 'Tech & Visuals',
          'trailers.t2.tech.p1': 'Refined animations, crowd density, reflections and materials; stable performance presentation.',
          'trailers.t2.tech.p2': 'Footage again presented as captured on PS5.',
          'trailers.t2.music.title': 'Music',
          'trailers.t2.music.p1': 'Energetic mix consistent with Rockstar’s trailer curation; classics resurging in streams.',
          'trailers.t2.reception.title': 'Reception',
          'trailers.t2.reception.p1': 'Strong community hype; ongoing debates around online model and PC release timing.',
          'trailers.t2.status.title': 'Confirmed vs Speculation',
          'trailers.t2.status.confirmed1': 'World scale and detail continue to be showcased.',
          'trailers.t2.status.spec1': 'Multiplayer mode details, monetization, and post-launch roadmap remain unknown.'
        },
        spanish: {
          'trailers.analysis.header': 'Análisis de los tráilers',
          'trailers.analysis.button': 'Análisis de tráilers',
          'trailers.analysis.toc': 'En esta página',
          'trailers.t1.header': 'Tráiler 1 — Diciembre de 2023',
          'trailers.t1.summary': 'Revelación inicial que confirma Vice City (Leonida), dos protagonistas (Lucía y Jason) y el tono.',
          'trailers.t1.points.title': 'Lo destacado',
          'trailers.t1.points.p1': 'Se muestra a Lucía en prisión; luego se reúne con Jason.',
          'trailers.t1.points.p2': 'Fuerte vibra Vice City: playas, neón nocturno, fragmentos de redes sociales.',
          'trailers.t1.points.p3': 'Parte del mundo abierto: tiendas, autopistas y pantanos; pistas de escala y diversidad.',
          'trailers.t1.tech.title': 'Tecnología y gráficos',
          'trailers.t1.tech.p1': 'Multitudes densas, iluminación/reflejos mejorados, animaciones fluidas.',
          'trailers.t1.tech.p2': 'Metraje presentado como in-engine en PS5.',
          'trailers.t1.music.title': 'Música',
          'trailers.t1.music.p1': 'Tom Petty — “Love Is a Long Road” marca el tono; nostalgia con toque moderno.',
          'trailers.t1.reception.title': 'Recepción',
          'trailers.t1.reception.p1': 'Récords de vistas y “me gusta”; amplia cobertura en prensa.',
          'trailers.t1.status.title': 'Confirmado vs especulación',
          'trailers.t1.status.confirmed1': 'Ambientación: Vice City + estado de Leonida.',
          'trailers.t1.status.confirmed2': 'Protagonistas: Lucía y Jason.',
          'trailers.t1.status.spec1': 'Límites exactos del mapa, sistema de escalada policial y tiempos en PC siguen sin confirmarse.',
          'trailers.t2.header': 'Tráiler 2 — 6 de mayo de 2025',
          'trailers.t2.summary': 'Mirada ampliada a interacciones del mundo, persecuciones, robos y tono; más foco en personajes.',
          'trailers.t2.points.title': 'Lo destacado',
          'trailers.t2.points.p1': 'Robos (pequeños a montajes mayores), variedad de vehículos, contraste entre vida nocturna y zonas rurales.',
          'trailers.t2.points.p2': 'Mejoras en IA policial y dinámica de persecuciones insinuadas mediante el montaje.',
          'trailers.t2.points.p3': 'Momentos de personaje profundizan la dinámica Lucía/Jason sin revelar toda la trama.',
          'trailers.t2.tech.title': 'Tecnología y gráficos',
          'trailers.t2.tech.p1': 'Animaciones refinadas, densidad de multitudes, reflejos y materiales; presentación de desempeño estable.',
          'trailers.t2.tech.p2': 'Metraje nuevamente presentado como capturado en PS5.',
          'trailers.t2.music.title': 'Música',
          'trailers.t2.music.p1': 'Selección energética coherente con los tráilers de Rockstar; clásicos con aumento de reproducciones.',
          'trailers.t2.reception.title': 'Recepción',
          'trailers.t2.reception.p1': 'Gran expectación; debates sobre el modelo online y la salida en PC.',
          'trailers.t2.status.title': 'Confirmado vs especulación',
          'trailers.t2.status.confirmed1': 'La escala y el detalle del mundo continúan mostrándose.',
          'trailers.t2.status.spec1': 'Detalles del modo multijugador, monetización y hoja de ruta postlanzamiento siguen desconocidos.'
        }
      };
      return {
        english: { ...TRAILERS_BASE.english, ...FORUM_DICT.english, ...TRAILERS_ANALYSIS_DICT.english },
        spanish: { ...TRAILERS_BASE.spanish, ...FORUM_DICT.spanish, ...TRAILERS_ANALYSIS_DICT.spanish }
      };
    }
    if (path.endsWith('/templates/foro.html')) {
      return FORUM_DICT;
    }
    if (path.endsWith('/templates/info.html')) {
      return INFO_DICT;
    }
    return { english: {}, spanish: {} };
  })();

  // Merge COMMON and PAGE dicts
  function merge(a, b){
    return { english: { ...a.english, ...b.english }, spanish: { ...a.spanish, ...b.spanish } };
  }
  const DICT = merge(COMMON, PAGE);

  // THEME handling
  function applyTheme(theme){
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light');
    const mode = (theme === 'light') ? 'theme-light' : 'theme-dark';
    root.classList.add(mode);
    localStorage.setItem('theme', theme === 'light' ? 'light' : 'dark');
    // Update toggle label if present
    const btn = document.getElementById('themeToggle');
    if (btn) {
      const lang = localStorage.getItem('language') === 'spanish' ? 'spanish' : 'english';
      const dict = (lang === 'spanish') ? DICT.spanish : DICT.english;
      const nextKey = (theme === 'light') ? 'theme.toDark' : 'theme.toLight';
      btn.dataset.i18n = nextKey;
      const val = dict[nextKey];
      if (val) btn.innerHTML = val;
      btn.setAttribute('aria-pressed', theme !== 'light');
    }
  }

  function renderlang(lang){
    const dict = (lang === 'spanish') ? DICT.spanish : DICT.english;
    document.documentElement.lang = (lang === 'spanish') ? 'es' : 'en';
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(el => {
      const key = el.dataset.i18n;
      const val = dict[key];
      const applied = el.getAttribute('data-i18n-applied');
      if (val && (applied !== lang || el.innerHTML !== val)) {
        el.innerHTML = val;
        el.setAttribute('data-i18n-applied', lang);
      }
    });
    // Handle placeholder translations
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = dict[key];
      const applied = el.getAttribute('data-i18n-applied-placeholder');
      if (val && (applied !== lang || el.placeholder !== val)) {
        el.placeholder = val;
        el.setAttribute('data-i18n-applied-placeholder', lang);
      }
    });
    // After language strings update, ensure theme toggle label matches current theme
    const theme = localStorage.getItem('theme') || 'dark';
    applyTheme(theme);
    // Bind toggle listener once
    const btn = document.getElementById('themeToggle');
    if (btn && !btn.dataset.bound) {
      btn.addEventListener('click', () => {
        const current = localStorage.getItem('theme') || 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
      });
      btn.dataset.bound = '1';
    }
  }

  // Initial render
  renderlang(LANG);
  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  // Expose minimal API for page language switchers
  window.setLanguage = function(lang){
    const norm = (lang === 'spanish') ? 'spanish' : 'english';
    localStorage.setItem('language', norm);
    renderlang(norm);
    try { window.dispatchEvent(new Event('languagechange')); } catch {}
  }
})();
