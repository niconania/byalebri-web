// Contenido del prototipo de byalebri.com, sacado del Behance (behance.net/alebri_)
// y del Instagram de Alejandra. Los textos de cada proyecto describen solo lo que
// se ve en sus láminas; lo que falta (podcast, colaboraciones) va marcado como
// pendiente. Cambios del feedback del 23 nov 2026 en referencia/feedback-2026-11-23/.
window.ALEBRI = {
  // La portada es su animación: tres franjas que se cruzan (azul diseño,
  // amarillo animación, rosado cine) y donde se juntan las tres sale el negro.
  // Cada franja es un enlace a su área. Mientras no esté su video, la web dibuja
  // las franjas y las mezcla (multiplicar), con sus personajes de entrada.
  // Con el video: poner las rutas y medir en su último cuadro dónde cae cada
  // franja, en % del cuadro: [izquierda, arriba, ancho, alto]. "texto" es dónde
  // va la palabra: [izquierda, arriba] en %.
  portada: {
    video: { horizontal: '', vertical: '' }, // p. ej. 'video/portada-horizontal.mp4'
    poster: { horizontal: '', vertical: '' }, // su último cuadro, en .webp
    horizontal: {
      diseno: { franja: [0, 24, 100, 31], texto: [5, 27.5] },
      animacion: { franja: [0, 39, 100, 28], texto: [79, 56.5] },
      cine: { franja: [37, 39, 21, 61], texto: [38.5, 68.5] },
      contenido: { franja: [37, 39, 21, 16], texto: [38.5, 51.6] },
    },
    vertical: {
      diseno: { franja: [0, 25, 100, 22], texto: [4, 27] },
      animacion: { franja: [0, 35, 100, 22], texto: [62, 48.5] },
      cine: { franja: [8, 35, 48, 65], texto: [10.5, 59] },
      contenido: { franja: [8, 35, 48, 12], texto: [10.5, 44] },
    },
  },

  areas: {
    diseno: { nombre: 'Diseño', texto: 'Identidad visual, ilustración y redes sociales para marcas.' },
    animacion: { nombre: 'Animación', texto: 'Demo reel, intros animadas y lyric videos.' },
    cine: { nombre: 'Cine', texto: 'Cortometrajes animados, del guion al último cuadro.' },
    contenido: { nombre: 'Contenido', texto: 'El podcast, colaboraciones con marcas y lo que hago en redes.' },
  },
  subareas: { identidad: 'Identidad', ilustracion: 'Ilustración', redes: 'Redes sociales' },

  // Cifras de ejemplo: salen de su Behance (marcas del tablero de redes,
  // proyectos publicados, cortos y años desde 2021). Se confirman con ella.
  numeros: [
    { valor: 15, texto: 'marcas en redes sociales' },
    { valor: 14, texto: 'proyectos publicados' },
    { valor: 2, texto: 'cortos animados' },
    { valor: 5, texto: 'años creando', prefijo: '+' },
  ],

  // Cada proyecto: "area" es su área principal y "tambien" las otras donde sale
  // (con su etiqueta al lado). "imagenes" son sus láminas en orden: en la ficha
  // van pegadas una debajo de otra, como en Behance. "linkedin" es la URL del
  // post donde habla de él, si lo hay: agrega el botón "Ver en LinkedIn".
  proyectos: [
    {
      id: 'raices', area: 'cine', titulo: 'Raíces', tipo: 'Cortometraje animado', anio: '2023',
      portada: 'portadas/raices.webp', destacado: true,
      premio: 'Mención Especial · Cortoscopio 2023',
      texto: 'Un corto animado sobre la tala de árboles en Caracas y sus consecuencias para la fauna de la ciudad. Fue selección oficial de Cortoscopio 2023, el concurso de la Unión Europea en Venezuela y Oportunidad AC, y recibió una Mención Especial del jurado en la categoría Juventud y Medio Ambiente.',
      proceso: ['Historia y guion', 'Diseño de personajes', 'Storyboard', 'Rigging y animación en After Effects'],
      video: { tipo: 'youtube', id: 'TQ5DnfnzFUA' },
      extras: [{ tipo: 'behance', id: 'QvHjIcdDuSy' }, { tipo: 'behance', id: 'HfQyxmgNyVg' }],
      imagenes: ['raices/01.webp', 'raices/02.webp', 'raices/03.webp', 'raices/04.webp', 'raices/05.webp', 'raices/06.webp', 'raices/07.webp'],
      herramientas: ['After Effects', 'Illustrator', 'Photoshop'],
      enlaces: [{ texto: 'Ver en YouTube', url: 'https://www.youtube.com/watch?v=TQ5DnfnzFUA' }, { texto: 'Making of en Behance', url: 'https://www.behance.net/gallery/188360267/Raices-Cortometraje-Animado' }],
    },
    {
      id: 'mocachin', area: 'diseno', sub: 'identidad', titulo: 'Mocachín', tipo: 'Identidad visual', anio: '2026',
      portada: 'portadas/mocachin.webp', destacado: true,
      texto: 'Manual de identidad para una marca de café: del brief y el moodboard al logo, sus mascotas Mike y Jessy, la paleta, las tipografías y las aplicaciones en vasos, empaques y bolsas.',
      proceso: ['Brief y moodboard', 'Concepto y mascotas', 'Logo, colores y tipografías', 'Aplicaciones'],
      imagenes: ['mocachin/01.webp', 'mocachin/02.webp', 'mocachin/03.webp', 'mocachin/04.webp', 'mocachin/05.webp', 'mocachin/06.webp'],
      herramientas: ['Illustrator', 'Photoshop'],
      enlaces: [{ texto: 'Ver en Behance', url: 'https://www.behance.net/gallery/248088163/mocachin' }],
    },
    {
      id: 'lcp', area: 'diseno', sub: 'identidad', titulo: 'LCP · Liga Venezolana de Clubes de Pickleball', tituloCorto: 'LCP Pickleball', tipo: 'Identidad visual', anio: '2024',
      portada: 'portadas/lcp.webp',
      texto: 'Identidad para la Liga Venezolana de Clubes de Pickleball: concepto, paleta, tipografías, versiones del logo y sus aplicaciones en redes sociales, credenciales y merch.',
      proceso: ['Concepto', 'Paleta y tipografías', 'Aplicaciones en redes', 'Mockups y usos indebidos'],
      imagenes: ['lcp/01.webp', 'lcp/02.webp', 'lcp/03.webp', 'lcp/04.webp', 'lcp/05.webp', 'lcp/06.webp'],
      herramientas: ['Illustrator', 'Photoshop'],
      enlaces: [{ texto: 'Ver en Behance', url: 'https://www.behance.net/gallery/207706993/Diseno-de-Identidad-Visual-LCP' }],
    },
    {
      id: 'redes-sociales', area: 'diseno', sub: 'redes', titulo: 'Redes sociales para 15 marcas', tituloCorto: 'Redes sociales', tipo: 'Social media', anio: '2024',
      portada: 'portadas/redes-sociales.webp', destacado: true,
      texto: 'Contenido para redes de 15 marcas: con la agencia Debar Inc. (Churromania, Aropharma, Dingo, Cetaphil, Point 4 Padel, Laboratorios Vincenti y Maalu), como diseñadora in-house de La Cocina Pickleball y por mi cuenta (Cones Group, Ginecosmética y profesionales de la salud y los seguros).',
      proceso: ['Parrillas', 'Carruseles', 'Historias', 'Campañas'],
      video: { tipo: 'behance', id: 'AWpDrmDMsum' },
      imagenes: ['redes-sociales/01.webp', 'redes-sociales/02.webp', 'redes-sociales/03.webp', 'redes-sociales/04.webp', 'redes-sociales/05.webp', 'redes-sociales/06.webp', 'redes-sociales/07.webp', 'redes-sociales/08.webp'],
      herramientas: ['Photoshop', 'Illustrator', 'Lightroom'],
      enlaces: [
        { texto: 'Ver en Behance', url: 'https://www.behance.net/gallery/189150245/Social-Media-Design' },
        { texto: 'La Cocina Pickleball', url: 'https://www.instagram.com/lacocina.pickleball/' },
      ],
    },
    {
      id: 'barril', area: 'cine', titulo: 'El Barril de Amontillado', tipo: 'Cortometraje animado', anio: '2023',
      portada: 'portadas/barril.webp',
      texto: 'Corto animado en equipo basado en el cuento de Edgar Allan Poe: adaptación a guion, guion técnico, storyboard, fondos, diseño de personajes, rigging y animación.',
      proceso: ['Guion y guion técnico', 'Storyboard', 'Fondos y personajes', 'Rigging, animación y edición'],
      video: { tipo: 'youtube', id: 'RP6w4X-jmvk' },
      extras: [{ tipo: 'behance', id: 'C3S53KBJSGP' }, { tipo: 'behance', id: '7iVcgnHGSzE' }],
      imagenes: ['barril/01.webp', 'barril/02.webp', 'barril/03.webp', 'barril/04.webp', 'barril/05.webp'],
      herramientas: ['After Effects', 'Illustrator', 'Photoshop'],
      enlaces: [{ texto: 'Ver en YouTube', url: 'https://www.youtube.com/watch?v=RP6w4X-jmvk' }, { texto: 'Making of en Behance', url: 'https://www.behance.net/gallery/175283777/El-Barril-de-Amontillado-Cortometraje-Animado' }],
    },
    {
      id: 'demo-reel', area: 'animacion', titulo: 'Demo reel', tipo: 'Animación 2D y 3D', anio: '2023',
      portada: 'portadas/demo-reel.webp', destacado: true,
      texto: 'Una selección de mi animación en 2D y 3D.',
      video: { tipo: 'behance', id: '8UMvPCorUIE' },
      herramientas: ['Autodesk Maya', 'After Effects', 'Illustrator', 'Photoshop'],
      enlaces: [{ texto: 'Ver en Behance', url: 'https://www.behance.net/gallery/177248039/Demo-Reel-Animacion' }],
    },
    {
      id: 'intros', area: 'animacion', titulo: 'Intros animadas', tipo: 'Motion graphics', anio: '2021',
      portada: 'portadas/intro-negocio-de-la-vida.webp',
      texto: 'Intros animadas para el podcast El Negocio de la Vida y para Energía que Cura.',
      video: { tipo: 'behance', id: 'R5VxTqSF6_B' },
      extras: [{ tipo: 'behance', id: 'Ts9NPTPPXYy' }],
      herramientas: ['After Effects', 'Illustrator'],
      enlaces: [
        { texto: 'El Negocio de la Vida en Behance', url: 'https://www.behance.net/gallery/126431985/Intro-Animada-El-Negocio-de-la-Vida-Podcast' },
        { texto: 'Energía que Cura en Behance', url: 'https://www.behance.net/gallery/126432731/Intro-Animada-Energia-que-Cura' },
      ],
    },
    {
      id: 'lyric-videos', area: 'animacion', titulo: 'Lyric videos', tipo: 'Ilustración y animación', anio: '2021',
      portada: 'portadas/lyric-videos.webp',
      texto: 'Cuatro lyric videos ilustrados y animados.',
      video: { tipo: 'behance', id: '-BIgjXMJYeg' },
      extras: [{ tipo: 'behance', id: 'BzEPq6wwii4' }, { tipo: 'behance', id: 'VgcNBCMX6ZM' }, { tipo: 'behance', id: 'P2B6Qeevnai' }],
      herramientas: ['After Effects', 'Illustrator', 'Photoshop'],
      enlaces: [{ texto: 'Ver en Behance', url: 'https://www.behance.net/gallery/126506403/Lyric-Videos' }],
    },
    {
      id: 'outline', area: 'diseno', sub: 'identidad', titulo: 'OUTLINE', tipo: 'Identidad visual', anio: '2022',
      portada: 'portadas/outline.webp',
      texto: 'Identidad para una marca de franelas estampadas: concepto, logo, paleta, elementos gráficos, stickers, tarjetas de agradecimiento y etiquetas de tela.',
      proceso: ['Concepto y logo', 'Paleta y elementos gráficos', 'Redes sociales', 'Papelería y etiquetas'],
      imagenes: ['outline/01.webp', 'outline/02.webp', 'outline/03.webp', 'outline/04.webp', 'outline/05.webp', 'outline/06.webp'],
      herramientas: ['Illustrator'],
      enlaces: [{ texto: 'Ver en Behance', url: 'https://www.behance.net/gallery/136877679/OUTLINE' }],
    },
    {
      id: 'uma', area: 'diseno', sub: 'ilustracion', titulo: 'Mascota UMA · Búho', tituloCorto: 'Mascota UMA', tipo: 'Ilustración · mascota', anio: '2021',
      portada: 'portadas/uma.webp',
      texto: 'Un búho como mascota de la UMA: paleta, poses y aplicaciones en calcomanías, chapas, hoodies, gorras y termos.',
      proceso: ['Personaje y paleta', 'Poses', 'Aplicaciones'],
      imagenes: ['uma/01.webp', 'uma/02.webp', 'uma/03.webp', 'uma/04.webp', 'uma/05.webp', 'uma/06.webp'],
      herramientas: ['Illustrator', 'Photoshop'],
      enlaces: [{ texto: 'Ver en Behance', url: 'https://www.behance.net/gallery/126435623/Mascota-UMA-Buho' }],
    },
    {
      id: 'cones', area: 'diseno', sub: 'identidad', titulo: 'Cones Group', tipo: 'Rebranding', anio: '2021',
      portada: 'portadas/cones.webp',
      texto: 'Rebranding para Cones Group, una empresa de formación en ventas: logo, tipografías, paleta y aplicaciones en redes, papelería y stickers.',
      proceso: ['Concepto', 'Tipografías y paleta', 'Aplicaciones'],
      imagenes: ['cones/01.webp', 'cones/02.webp', 'cones/03.webp', 'cones/04.webp', 'cones/05.webp'],
      herramientas: ['Illustrator', 'Photoshop'],
      enlaces: [{ texto: 'Ver en Behance', url: 'https://www.behance.net/gallery/126431363/Cones-Group-Rebranding' }],
    },
    {
      id: 'bake-the-cake', area: 'diseno', sub: 'ilustracion', titulo: 'Bake The Cake', tipo: 'Rebranding y menú ilustrado', anio: '2021',
      portada: 'portadas/bake-the-cake.webp',
      texto: 'Rebranding de una pastelería —isotipo, paleta, tipografías y empaques— y su menú ilustrado, con cada torta dibujada.',
      proceso: ['Rebranding', 'Paleta y tipografías', 'Empaques', 'Menú ilustrado'],
      imagenes: ['bake-the-cake/01.webp', 'bake-the-cake/02.webp', 'bake-the-cake/03.webp', 'bake-the-cake/04.webp', 'bake-the-cake/05.webp', 'bake-the-cake/06.webp', 'bake-the-cake/07.webp'],
      herramientas: ['Illustrator', 'Photoshop'],
      enlaces: [
        { texto: 'Rebranding en Behance', url: 'https://www.behance.net/gallery/126313065/Bake-The-Cake-Rebranding' },
        { texto: 'Menú en Behance', url: 'https://www.behance.net/gallery/126432389/Menu-Ilustrado-Bake-The-Cake' },
      ],
    },
    {
      // Por contrato no puede mostrarlo en público: tarjeta con clave.
      // En el prototipo la clave se revisa en el navegador; al lanzar, la ficha
      // y sus imágenes van protegidas en el servidor (PHP en Hostinger).
      id: 'natuchips', area: 'diseno', titulo: 'Natuchips', tipo: 'Proyecto privado', anio: '',
      // Clave de prueba: "natuchips" (va su SHA-256, no la clave).
      privado: 'e8886b9ff6535aa39b8cccc9bb1f81ccedf9b74dcf71341392c91fd23d75dced', pendiente: 'Material por agregar',
      texto: 'Por contrato, este trabajo no se muestra en público. Si quieres verlo, escríbeme y te paso la clave.',
    },
    {
      id: 'otros-cortos', area: 'cine', titulo: 'Más cortometrajes', tipo: 'Cortometrajes en YouTube', anio: '',
      pendiente: 'Enlaces por agregar',
      texto: 'Otros cortos míos que están en YouTube. Se agregan cuando me pases los enlaces.',
    },
    {
      id: 'lyric-conciertos', area: 'animacion', tambien: ['contenido'], titulo: 'Lyric videos de conciertos', tipo: 'Lyric videos', anio: '',
      pendiente: 'Videos por agregar',
      texto: 'Los dos lyric videos que hice para conciertos. Se agregan cuando me los pases.',
    },
    {
      id: 'podcast', area: 'contenido', tambien: ['cine'], titulo: 'El podcast', tipo: 'Podcast en video', anio: '',
      portada: 'redes/podcast.webp', vertical: true, pendiente: 'Nombre del podcast por confirmar',
      texto: 'Episodios en video sobre cine. El más reciente: las similitudes entre 1984, The Secret Agent e I’m Still Here.',
      enlaces: [{ texto: 'Ver en Instagram', url: 'https://www.instagram.com/byalebri/' }],
    },
    {
      id: 'golden', area: 'contenido', titulo: 'Golden', tipo: 'Colaboración con marca', anio: '',
      pendiente: 'Video por agregar',
      texto: 'Contenido que hicimos con Golden. El video se agrega cuando me lo pases.',
    },
    {
      id: 'los-costillas', area: 'contenido', titulo: 'Los Costillas', tipo: 'Colaboración con marca', anio: '',
      pendiente: 'Video por agregar',
      texto: 'Contenido que hicimos con Los Costillas. El video se agrega cuando me lo pases.',
    },
  ],

  premios: [
    { titulo: 'Mención Especial', detalle: 'Cortoscopio 2023 · Raíces', texto: 'Juventud y Medio Ambiente', area: 'cine' },
    { titulo: 'Selección oficial', detalle: 'Cortoscopio 2023', texto: 'Unión Europea en Venezuela y Oportunidad AC', area: 'cine' },
    { titulo: 'Shortlist', detalle: 'Young Lions', texto: 'Mi primera vez participando', area: 'animacion' },
    { titulo: 'Cum laude', detalle: 'Universidad Monte Ávila', texto: 'Carrera y año por confirmar', area: 'diseno' },
  ],

  // Experiencia laboral: sale de lo que se ve en su Behance. Cargos y fechas
  // se completan con su CV.
  experiencia: [
    { lugar: 'Debar Inc.', rol: 'Diseño de redes sociales · agencia', fechas: '', detalle: 'Churromania, Aropharma, Dingo, Cetaphil, Point 4 Padel, Laboratorios Vincenti y Maalu.' },
    { lugar: 'La Cocina Pickleball', rol: 'Diseñadora in-house', fechas: '', detalle: 'Redes sociales.' },
    { lugar: 'Por mi cuenta', rol: 'Diseñadora independiente', fechas: '', detalle: 'Cones Group, Ginecosmética y profesionales de la salud y los seguros.' },
  ],

  // Programas con su nivel: 3 avanzado, 2 intermedio, 1 básico, null por
  // confirmar (sale de su CV). El orden de la lista es el orden en la web.
  habilidades: [
    { nombre: 'Illustrator', nivel: null },
    { nombre: 'Photoshop', nivel: null },
    { nombre: 'After Effects', nivel: null },
    { nombre: 'Lightroom', nivel: null },
    { nombre: 'Autodesk Maya', nivel: 1 },
  ],
  idiomas: ['Español', 'English'],

  redes: [
    { nombre: 'Instagram', usuario: '@byalebri', url: 'https://www.instagram.com/byalebri/' },
    { nombre: 'Instagram personal', usuario: '@alebriceno_', url: 'https://www.instagram.com/alebriceno_/' },
    { nombre: 'Behance', usuario: 'alebri_', url: 'https://www.behance.net/alebri_' },
    { nombre: 'LinkedIn', usuario: 'alebri', url: 'https://ve.linkedin.com/in/alebri' },
  ],
};
