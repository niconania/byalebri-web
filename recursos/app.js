// Prototipo de byalebri.com: cabecera y pie comunes, la portada con su
// animación de franjas, el color por área, los números que cuentan al aparecer,
// la grilla de proyectos con filtros, las fichas de proyecto con sus videos y
// láminas, y el formulario de contacto (que no envía).
(function () {
  const D = window.ALEBRI;
  const pagina = document.body.dataset.pagina;
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (x) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[x]));
  const img = (ruta) => 'img/' + ruta;
  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
  const ICONOS = {
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    atras: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    externo: '<path d="M7 17 17 7M8 7h9v9"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    cerrar: '<path d="M6 6l12 12M18 6 6 18"/>',
    play: '<path d="M8 5.5v13l10.5-6.5z"/>',
    premio: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 3.5-2 3.5 2-1.5-7"/>',
    candado: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>',
    repetir: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/>',
  };
  const icono = (nombre) => `<svg class="icono" viewBox="0 0 24 24" aria-hidden="true">${ICONOS[nombre]}</svg>`;

  // Un proyecto sale en su área principal y en las que tenga en "tambien".
  const areasDe = (p) => [p.area, ...(p.tambien || [])];
  const esDe = (p, area) => areasDe(p).includes(area);

  /* ── Estructura común ── */
  function montarEstructura() {
    const enInicio = pagina === 'inicio';
    const ancla = (id) => (enInicio ? '' : 'index.html') + '#' + id;
    document.body.insertAdjacentHTML('afterbegin',
      '<div class="aviso"><strong>Prototipo para Alejandra</strong> · Textos y cifras de ejemplo, sacados de tu Behance e Instagram. El contacto no envía nada.</div>'
      + '<header class="cabecera"><div class="caja">'
      +   `<a class="logo" href="${enInicio ? '#' : 'index.html'}" aria-label="alebri, inicio"><img src="img/marca/firma-negra.png" alt="alebri — Alejandra Briceño Ch, visual communication" width="78" height="46" /></a>`
      +   '<nav class="menu" id="menu">'
      +     `<a href="${ancla('sobre-mi')}">Sobre mí</a><a href="${ancla('areas')}">Áreas</a><a href="${ancla('proyectos')}">Proyectos</a><a href="${ancla('experiencia')}">Experiencia</a><a href="${ancla('contacto')}">Contacto</a>`
      +   '</nav>'
      +   `<a class="boton boton--acento boton--chico" href="${ancla('contacto')}">Hablemos</a>`
      +   `<button class="menu-movil" type="button" aria-controls="menu" aria-expanded="false" aria-label="Abrir menú">${icono('menu')}</button>`
      + '</div></header>');
    document.body.insertAdjacentHTML('beforeend',
      '<footer class="pie"><div class="caja">'
      + '<img src="img/marca/firma-blanca.png" alt="alebri" width="108" height="64" />'
      + '<nav class="pie-enlaces">' + D.redes.map((r) => `<a href="${r.url}" target="_blank" rel="noopener">${esc(r.nombre)}</a>`).join('') + '<span>hola@byalebri.com</span></nav>'
      + '<div><div class="pie-colores"><span style="background:var(--azul)"></span><span style="background:var(--amarillo)"></span><span style="background:var(--rosado)"></span></div><p>© 2026 Alejandra Briceño Ch</p></div>'
      + '</div></footer>');

    const boton = $('.menu-movil');
    const menu = $('#menu');
    boton.addEventListener('click', () => boton.setAttribute('aria-expanded', String(menu.classList.toggle('abierto'))));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) { menu.classList.remove('abierto'); boton.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-cerrar]')) e.target.closest('dialog').close();
      if (e.target.tagName === 'DIALOG') e.target.close(); // toque en el fondo
    });
  }

  // Cada área tiene su color: elegirla pinta la web entera.
  function ponerArea(id) {
    document.body.dataset.area = id;
    $$('.franja').forEach((a) => a.classList.toggle('activa', a.dataset.area === id));
  }

  function revelar() {
    const io = new IntersectionObserver((entradas) => entradas.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    $$('[data-revelar]:not(.visible)').forEach((el) => io.observe(el));
  }

  // Los "numeritos": cuentan desde cero cuando aparecen en pantalla.
  function contadores() {
    const animar = (el) => {
      const fin = Number(el.dataset.contar);
      const prefijo = el.dataset.prefijo || '';
      if (reducido) { el.textContent = prefijo + fin; return; }
      const inicio = performance.now();
      const duracion = 1500 + fin * 25;
      const paso = (t) => {
        const k = Math.min(1, (t - inicio) / duracion);
        el.textContent = prefijo + Math.round(fin * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    };
    const io = new IntersectionObserver((entradas) => entradas.forEach((en) => {
      if (en.isIntersecting) { animar(en.target); io.unobserve(en.target); }
    }), { threshold: 0.5 });
    $$('[data-contar]').forEach((el) => io.observe(el));
  }

  /* ── Inicio ── */
  function iniciarInicio() {
    const hashArea = D.areas[location.hash.slice(1)] ? location.hash.slice(1) : null;
    let filtro = hashArea || 'todo';
    let sub = null;

    $('#numeros').innerHTML = D.numeros.map((n, i) => `<div class="numero" data-revelar style="--i:${i}"><strong data-contar="${n.valor}" data-prefijo="${n.prefijo || ''}">0</strong><span>${esc(n.texto)}</span></div>`).join('');

    // Sobre mí: programas con su nivel e idiomas.
    const NIVELES = ['', 'Básico', 'Intermedio', 'Avanzado'];
    $('#lista-habilidades').innerHTML = D.habilidades.map((h) => `<li class="${h.nivel ? '' : 'sin-nivel'}"><span>${esc(h.nombre)}</span>`
      + `<span class="nivel" aria-hidden="true">${[1, 2, 3].map((k) => `<i class="${h.nivel >= k ? 'lleno' : ''}"></i>`).join('')}</span>`
      + `<small>${h.nivel ? NIVELES[h.nivel] : 'nivel por confirmar'}</small></li>`).join('');
    $('#lista-idiomas').innerHTML = D.idiomas.map((x) => `<li>${esc(x)}</li>`).join('');
    $('#sello-idiomas').innerHTML = 'hablo español <span>·</span> I speak English';

    $('#lista-areas').innerHTML = Object.entries(D.areas).map(([id, a], i) => {
      const suyos = D.proyectos.filter((p) => esDe(p, id));
      const fotos = suyos.filter((p) => p.portada).slice(0, 3);
      return `<button class="area c-${id}" type="button" data-ir-area="${id}" data-revelar style="--i:${i}">`
        + `<h3>${a.nombre}</h3><p>${esc(a.texto)}</p>`
        + `<span class="area-fotos">${fotos.map((p) => `<img src="${img(p.portada)}" alt="" loading="lazy" />`).join('')}</span>`
        + `<span class="area-cuenta">${plural(suyos.length, 'proyecto', 'proyectos')} ${icono('flecha')}</span></button>`;
    }).join('');

    const etiquetas = [['todo', 'Todo'], ...Object.entries(D.areas).map(([id, a]) => [id, a.nombre])];
    function pintarFiltros() {
      $('#filtros').innerHTML = etiquetas.map(([id, nombre]) => `<button class="filtro c-${id}" type="button" data-filtro="${id}" aria-pressed="${filtro === id}">${nombre}</button>`).join('');
      const sf = $('#subfiltros');
      sf.hidden = filtro !== 'diseno';
      sf.innerHTML = [['', 'Todo diseño'], ...Object.entries(D.subareas)]
        .map(([id, nombre]) => `<button class="filtro c-diseno" type="button" data-sub="${id}" aria-pressed="${(sub || '') === id}">${nombre}</button>`).join('');
    }
    function tarjeta(p, i, conDestacados) {
      const clases = ['proyecto', 'c-' + p.area];
      if (conDestacados && p.destacado) clases.push('proyecto--destacado');
      if (p.vertical) clases.push('proyecto--vertical');
      if (p.privado) clases.push('proyecto--privado');
      else if (!p.portada) clases.push('proyecto--pendiente');
      let media;
      if (p.privado) media = `<span class="candado">${icono('candado')}</span><span class="marca-colab">${esc(p.titulo)}</span><span class="pendiente">Proyecto privado · con clave</span>`;
      else if (p.portada) media = `<img src="${img(p.portada)}" alt="" loading="lazy" />`;
      else media = `<span class="marca-colab">${esc(p.titulo)}</span><span class="pendiente">${esc(p.pendiente)}</span>`;
      const chips = areasDe(p).map((a) => `<span class="proyecto-etiqueta c-${a}">${D.areas[a].nombre}</span>`).join('');
      return `<a class="${clases.join(' ')}" href="proyecto.html?p=${p.id}" style="animation-delay:${Math.min(i, 8) * 50}ms">`
        + `<div class="proyecto-img"><span class="proyecto-etiquetas">${chips}</span>`
        + (p.premio ? `<span class="proyecto-premio">★ ${esc(p.premio.split(' · ')[0])}</span>` : '') + media + '</div>'
        + `<div><h3>${esc(p.tituloCorto || p.titulo)}</h3><span class="proyecto-meta">${esc(p.tipo)}${p.anio ? ' · ' + p.anio : ''}${p.pendiente && p.portada ? ' · ' + esc(p.pendiente) : ''}</span></div></a>`;
    }
    function pintarProyectos() {
      const lista = D.proyectos.filter((p) => (filtro === 'todo' || esDe(p, filtro)) && (!sub || p.sub === sub));
      $('#lista-proyectos').innerHTML = lista.map((p, i) => tarjeta(p, i, filtro === 'todo')).join('');
      $('#titulo-proyectos').innerHTML = filtro === 'todo'
        ? 'Todo lo que he hecho, <em>por áreas.</em>'
        : `${D.areas[filtro].nombre}: <em>${plural(lista.length, 'proyecto', 'proyectos')}.</em>`;
    }
    function elegir(id, irAProyectos) {
      filtro = id;
      sub = null;
      ponerArea(id);
      pintarFiltros();
      pintarProyectos();
      history.replaceState(null, '', id === 'todo' ? location.pathname + location.search : '#' + id);
      if (irAProyectos) $('#proyectos').scrollIntoView({ behavior: reducido ? 'auto' : 'smooth' });
    }

    document.addEventListener('click', (e) => {
      const f = e.target.closest('[data-filtro]');
      if (f) elegir(f.dataset.filtro, false);
      const s = e.target.closest('[data-sub]');
      if (s) { sub = s.dataset.sub || null; pintarFiltros(); pintarProyectos(); }
      const a = e.target.closest('[data-ir-area]');
      if (a) { e.preventDefault(); elegir(a.dataset.irArea, true); }
    });

    $('#lista-experiencia').innerHTML = D.experiencia.map((x, i) => `<li data-revelar style="--i:${i}">`
      + `<div><strong>${esc(x.lugar)}</strong><span>${esc(x.rol)}</span></div>`
      + `<p>${esc(x.detalle)}</p>`
      + (x.fechas ? `<span class="fechas">${esc(x.fechas)}</span>` : '<span class="fechas fechas--pendiente">Fechas por confirmar</span>')
      + '</li>').join('');
    $('#lista-premios').innerHTML = D.premios.map((p, i) => `<li class="premio c-${p.area}" data-revelar style="--i:${i}"><span class="premio-icono">${icono('premio')}</span><div><strong>${esc(p.titulo)} · ${esc(p.detalle)}</strong><span>${esc(p.texto)}</span></div></li>`).join('');
    $('#lista-redes').innerHTML = D.redes.map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener"><strong>${esc(r.nombre)}</strong><span>${esc(r.usuario)} ↗</span></a></li>`).join('');

    iniciarPortada(() => filtro);
    iniciarContacto();
    ponerArea(filtro);
    pintarFiltros();
    pintarProyectos();
    contadores();
    revelar();
    // Al volver de una ficha (index.html#cine) se llega directo a sus proyectos.
    if (hashArea) requestAnimationFrame(() => $('#proyectos').scrollIntoView({ behavior: 'auto' }));
    addEventListener('hashchange', () => { const h = location.hash.slice(1); if (D.areas[h]) elegir(h, true); });
  }

  /* ── Portada: su animación de franjas ── */
  // Cada palabra llega como un rodillo de tragamonedas.
  const LETRAS = 'abcdefhiklmnorstuvwxzñ'; // sin letras con descendente, que asomarían en la ventana
  function rodillo(el, demora, vueltas, duracion) {
    const palabra = el.dataset.palabra || el.textContent.trim();
    el.dataset.palabra = palabra;
    el.innerHTML = [...palabra].map((letra, i) => {
      const tira = Array.from({ length: vueltas }, () => LETRAS[(Math.random() * LETRAS.length) | 0]).concat(letra);
      return `<span class="letra"><span class="letra-final">${letra}</span>`
        + `<span class="tira" style="--n:${vueltas};--d:${demora + i * 45}ms;--dur:${duracion}ms">${tira.map((x) => `<span>${x}</span>`).join('')}</span></span>`;
    }).join('');
  }

  function iniciarPortada(filtroActual) {
    const P = D.portada;
    const escenario = $('#escenario');
    const lienzo = $('#lienzo');
    const AREAS = ['diseno', 'animacion', 'cine', 'contenido'];
    const NOMBRES = { diseno: 'diseño', animacion: 'animación', cine: 'cine', contenido: 'contenido' };
    // Misma media query que en estilos.css: pantallas angostas usan la versión vertical.
    const angosta = matchMedia('(max-aspect-ratio: 3/4)');

    // Variables de posición para las dos versiones; el CSS elige cuál usar.
    const caja = (o, r, texto) => {
      const [x, y, w, h] = r;
      const k = o[0];
      return `--${k}x:${x}%;--${k}y:${y}%;--${k}w:${w}%;--${k}h:${h}%`
        + (texto ? `;--${k}tx:${((texto[0] - x) / w) * 100}%;--${k}ty:${((texto[1] - y) / h) * 100}%` : '');
    };
    const vars = (area) => ['horizontal', 'vertical'].map((o) => caja(o, P[o][area].franja, P[o][area].texto)).join(';');
    // Donde se cruzan dos franjas sale la mezcla, con los colores de su animación.
    const cruce = (o, a, b) => {
      const [ax, ay, aw, ah] = P[o][a].franja;
      const [bx, by, bw, bh] = P[o][b].franja;
      const x = Math.max(ax, bx);
      const y = Math.max(ay, by);
      return [x, y, Math.max(0, Math.min(ax + aw, bx + bw) - x), Math.max(0, Math.min(ay + ah, by + bh) - y)];
    };
    const CRUCES = [['diseno', 'animacion', 'verde'], ['animacion', 'cine', 'rojo'], ['diseno', 'cine', 'morado']];

    lienzo.insertAdjacentHTML('afterbegin', '<div class="mezcla" aria-hidden="true">'
      + AREAS.slice(0, 3).map((a) => `<span class="mezcla-franja mezcla--${a}" style="${vars(a)}"></span>`).join('')
      + CRUCES.map(([a, b, color]) => `<span class="mezcla-franja mezcla-cruce mezcla--${color}" style="${['horizontal', 'vertical'].map((o) => caja(o, cruce(o, a, b))).join(';')}"></span>`).join('')
      + `<span class="mezcla-franja mezcla--contenido" style="${vars('contenido')}"><img src="img/marca/firma-blanca.png" alt="" /></span>`
      + '</div>');
    $('#franjas').innerHTML = AREAS.map((a) => `<a class="franja franja--${a}" href="#proyectos" data-ir-area="${a}" data-area="${a}" aria-label="${D.areas[a].nombre}" style="${vars(a)}">`
      + `<span class="franja-texto"><span class="franja-palabra" aria-hidden="true">${NOMBRES[a]}</span></span></a>`).join('');
    const palabras = $$('.franja-palabra');

    // Pasar por una franja adelanta su color en toda la web.
    $$('.franja').forEach((f) => {
      f.addEventListener('mouseenter', () => { escenario.dataset.encima = f.dataset.area; ponerArea(f.dataset.area); });
      f.addEventListener('mouseleave', () => { delete escenario.dataset.encima; ponerArea(filtroActual()); });
    });

    // Con su video: se reproduce una vez y se queda en el último cuadro, que
    // es donde están las franjas. Las palabras aparecen cuando termina.
    let video = null;
    const fuente = () => P.video[angosta.matches ? 'vertical' : 'horizontal'];
    if (P.video.horizontal || P.video.vertical) {
      video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.setAttribute('aria-hidden', 'true');
      lienzo.prepend(video);
      escenario.classList.add('con-video');
      video.addEventListener('ended', () => escenario.classList.add('lista'));
    }
    const alFinal = () => { video.currentTime = Math.max(0, (video.duration || 0) - 0.05); escenario.classList.add('lista'); };
    const cargarVideo = () => {
      const o = angosta.matches ? 'vertical' : 'horizontal';
      video.src = fuente() || P.video.horizontal || P.video.vertical;
      video.poster = P.poster[o] || '';
    };

    const tiempos = [];
    function entrar() {
      tiempos.forEach(clearTimeout);
      tiempos.length = 0;
      escenario.classList.remove('anima', 'lista');
      if (video) {
        if (reducido) {
          if (video.readyState >= 1) alFinal(); else video.addEventListener('loadedmetadata', alFinal, { once: true });
          return;
        }
        video.currentTime = 0;
        video.play().catch(() => { if (video.readyState >= 1) alFinal(); else video.addEventListener('loadedmetadata', alFinal, { once: true }); });
        return;
      }
      // Sin video: sus personajes, luego entran las franjas y se mezclan.
      if (reducido) { escenario.classList.add('lista'); return; }
      void escenario.offsetWidth;
      escenario.classList.add('anima');
      palabras.forEach((p, i) => rodillo(p, 0, 8, 800 + i * 120));
      tiempos.push(setTimeout(() => escenario.classList.add('lista'), 3500));
      tiempos.push(setTimeout(() => escenario.classList.remove('anima'), 4800));
    }

    if (video) {
      cargarVideo();
      angosta.addEventListener('change', () => { cargarVideo(); entrar(); });
    }
    $('#repetir').innerHTML = icono('repetir');
    $('#repetir').addEventListener('click', entrar);

    // Un clic en el fondo suelta letras de "alebri" en sus colores.
    escenario.addEventListener('pointerdown', (e) => {
      if (reducido || e.target.closest('a, button')) return;
      const b = escenario.getBoundingClientRect();
      const colores = ['var(--azul)', 'var(--amarillo)', 'var(--rosado)', '#111'];
      for (let i = 0; i < 12; i++) {
        const angulo = (i / 12) * Math.PI * 2 + Math.random() * 0.5;
        const distancia = 60 + Math.random() * 90;
        const chispa = document.createElement('span');
        chispa.className = 'chispa';
        chispa.textContent = 'alebri'[i % 6];
        chispa.style.cssText = `left:${e.clientX - b.left}px;top:${e.clientY - b.top}px;color:${colores[i % 4]};`
          + `--dx:${(Math.cos(angulo) * distancia).toFixed(0)}px;--dy:${(Math.sin(angulo) * distancia - 30).toFixed(0)}px;--rot:${((Math.random() - 0.5) * 260).toFixed(0)}deg`;
        escenario.appendChild(chispa);
        setTimeout(() => chispa.remove(), 1000);
      }
    });
    entrar();
  }

  /* ── Contacto (no envía nada: muestra el correo que llegaría) ── */
  function iniciarContacto() {
    const form = $('#form-contacto');
    const opciones = [['identidad', 'Identidad visual', 'diseno'], ['redes', 'Redes sociales', 'diseno'], ['ilustracion', 'Ilustración', 'diseno'], ['animacion', 'Animación', 'animacion'], ['cine', 'Cine', 'cine'], ['contenido', 'Colaboración de contenido', 'contenido']];
    const elegidas = new Set();
    const pintar = () => {
      $('#chips-contacto').innerHTML = opciones.map(([id, nombre, area]) => `<button class="chip c-${area}" type="button" data-tipo="${id}" aria-pressed="${elegidas.has(id)}">${nombre}</button>`).join('');
    };
    const error = (nombre, visible) => {
      $(`[data-error="${nombre}"]`, form).hidden = !visible;
      form.elements[nombre]?.closest('.campo')?.classList.toggle('con-error', visible);
    };
    form.addEventListener('click', (e) => {
      const b = e.target.closest('[data-tipo]');
      if (!b) return;
      elegidas.has(b.dataset.tipo) ? elegidas.delete(b.dataset.tipo) : elegidas.add(b.dataset.tipo);
      error('tipos', false);
      pintar();
    });
    form.addEventListener('input', (e) => { if (e.target.name) error(e.target.name, false); });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = (n) => form.elements[n].value.trim();
      const fallos = [
        ['tipos', elegidas.size === 0],
        ['nombre', !v('nombre')],
        ['correo', !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('correo'))],
        ['mensaje', !v('mensaje')],
      ];
      fallos.forEach(([n, mal]) => error(n, mal));
      if (fallos.some(([, mal]) => mal)) return;
      const tipos = opciones.filter(([id]) => elegidas.has(id)).map(([, nombre]) => nombre).join(', ');
      let modal = $('#modal-correo');
      if (!modal) { document.body.insertAdjacentHTML('beforeend', '<dialog class="modal" id="modal-correo"></dialog>'); modal = $('#modal-correo'); }
      modal.innerHTML = `<button class="cerrar" type="button" data-cerrar aria-label="Cerrar">${icono('cerrar')}</button>`
        + '<div class="modal-cuerpo"><h3>Así te llegaría el mensaje</h3><p>En la web real, esto entra a tu correo con tu dominio:</p>'
        + '<div class="correo"><dl>'
        + '<dt>Para</dt><dd>hola@byalebri.com</dd>'
        + `<dt>De</dt><dd>${esc(v('nombre'))} · ${esc(v('correo'))}</dd>`
        + `<dt>Asunto</dt><dd>Nuevo proyecto: ${esc(tipos)}</dd>`
        + `</dl><pre>${esc(v('mensaje'))}</pre></div>`
        + '<p class="nota">Prototipo: no se envió nada.</p>'
        + '<button class="boton boton--acento" type="button" data-cerrar>Entendido</button></div>';
      modal.showModal();
    });
    pintar();
  }

  /* ── Ficha de proyecto ── */
  function iniciarProyecto() {
    const id = new URLSearchParams(location.search).get('p');
    const p = D.proyectos.find((x) => x.id === id) || D.proyectos[0];
    const indice = D.proyectos.indexOf(p);
    const siguiente = D.proyectos[(indice + 1) % D.proyectos.length];
    const videos = p.video ? [p.video, ...(p.extras || [])] : [];
    const medidas = window.ALEBRI_MEDIDAS || {};
    let actual = 0;
    ponerArea(p.area);
    document.title = `${p.titulo} — alebri`;

    const urlVideo = (v) => (v.tipo === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`
      : `https://www-ccv.adobe.io/v1/player/ccv/${v.id}/embed?api_key=behance1&bgcolor=%23191919&autoplay=true`);
    const portadaVideo = () => `<button class="reproductor-portada" type="button" data-reproducir aria-label="Reproducir el video"><img src="${img(p.portada)}" alt="" /><span class="boton-play">${icono('play')}</span></button>`;
    const reproducir = () => {
      $('#reproductor').innerHTML = `<iframe src="${urlVideo(videos[actual])}" title="${esc(p.titulo)}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>`;
    };

    // Sus láminas están hechas para verse una debajo de otra, pegadas, como en
    // Behance: van a todo el ancho, sin espacios ni cortes.
    let media = '';
    if (p.imagenes) {
      media = '<div class="laminas">' + p.imagenes.map((ruta, i) => {
        const [w, h] = medidas[ruta] || [1400, 788];
        return `<img src="${img('proyectos/' + ruta)}" width="${w}" height="${h}" alt="${esc(p.titulo)}, lámina ${i + 1}" ${i ? 'loading="lazy"' : ''} />`;
      }).join('') + '</div>';
    } else if (p.vertical && p.portada) {
      media = `<div class="caja"><div class="vertical-img"><img src="${img(p.portada)}" alt="${esc(p.titulo)}" /></div></div>`;
    } else if (!p.portada) {
      media = `<div class="caja"><div class="ficha-pendiente"><strong>Aquí va ${p.privado ? 'el material' : 'el video'} de ${esc(p.titulo)}</strong><span>Me lo pasas por Drive y queda en esta página.</span></div></div>`;
    }

    const enlaces = [...(p.enlaces || [])];
    if (p.linkedin) enlaces.push({ texto: 'Ver en LinkedIn', url: p.linkedin });
    const cabeza = '<section class="ficha-cabeza">'
      + `<a class="volver" href="index.html#${p.area}">${icono('atras')} ${D.areas[p.area].nombre}</a>`
      + `<div class="ficha-etiquetas">${areasDe(p).map((a) => `<span class="area-chip c-${a}">${D.areas[a].nombre}</span>`).join('')}${p.premio ? `<span class="premio-chip">★ ${esc(p.premio)}</span>` : ''}</div>`
      + `<h1>${esc(p.titulo)}</h1>`
      + `<p class="ficha-meta">${esc(p.tipo)}${p.anio ? ' · ' + p.anio : ''}</p>`
      + '</section>';
    const sigue = `<div class="caja"><a class="siguiente c-${siguiente.area}" href="proyecto.html?p=${siguiente.id}"><div><small>Siguiente · ${D.areas[siguiente.area].nombre}</small><strong>${esc(siguiente.tituloCorto || siguiente.titulo)}</strong></div>${icono('flecha')}</a></div>`;
    const contenido = '<div class="caja">'
      + (videos.length ? `<div class="reproductor" id="reproductor">${portadaVideo()}</div>`
        + `<div class="mas-videos" role="group" aria-label="Videos del proyecto">${videos.length > 1 ? videos.map((v, k) => `<button type="button" data-video="${k}" aria-pressed="${k === 0}">${k === 0 ? 'Video principal' : 'Video ' + (k + 1)}</button>`).join('') : ''}</div>` : '')
      + '<div class="ficha-grilla">'
      +   `<div><p class="ficha-texto">${esc(p.texto)}</p>${p.proceso ? `<ol class="proceso">${p.proceso.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}</div>`
      +   '<aside class="ficha-lado">'
      +     (p.herramientas ? `<div><h3>Herramientas</h3><div class="chips-herramientas">${p.herramientas.map((h) => `<span>${esc(h)}</span>`).join('')}</div></div>` : '')
      +     (enlaces.length ? `<div><h3>Enlaces</h3><ul>${enlaces.map((e) => (e.url ? `<li><a href="${e.url}" target="_blank" rel="noopener">${esc(e.texto)} ${icono('externo')}</a></li>` : `<li class="sin-enlace">${esc(e.texto)}</li>`)).join('')}</ul></div>` : '')
      +     (p.pendiente ? `<div><h3>Pendiente</h3><p>${esc(p.pendiente)}</p></div>` : '')
      +   '</aside>'
      + '</div></div>'
      + media;

    // Proyecto privado (Natuchips): pide la clave antes de mostrarse.
    const llave = 'alebri-abierto-' + p.id;
    const abrir = () => { $('#ficha').innerHTML = `<div class="caja">${cabeza}</div>${contenido}${sigue}`; };
    if (p.privado && sessionStorage.getItem(llave) !== p.privado) {
      $('#ficha').innerHTML = `<div class="caja">${cabeza}`
        + `<form class="clave" id="form-clave"><span class="candado">${icono('candado')}</span>`
        + `<p>${esc(p.texto)}</p>`
        + '<label class="campo"><span class="etiqueta">Clave</span><input name="clave" type="password" autocomplete="off" required /></label>'
        + '<p class="error" id="error-clave" hidden>Esa no es la clave.</p>'
        + '<button class="boton boton--acento" type="submit">Ver proyecto</button>'
        + '<a class="enlace-suave" href="index.html#contacto">Pedir la clave</a></form></div>'
        + sigue;
      $('#form-clave').addEventListener('submit', async (e) => {
        e.preventDefault();
        const datos = new TextEncoder().encode(e.target.elements.clave.value);
        const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', datos))].map((b) => b.toString(16).padStart(2, '0')).join('');
        if (hash !== p.privado) { $('#error-clave').hidden = false; return; }
        sessionStorage.setItem(llave, hash);
        abrir();
      });
    } else {
      abrir();
    }

    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-reproducir]')) reproducir();
      const v = e.target.closest('[data-video]');
      if (v) {
        actual = Number(v.dataset.video);
        $$('[data-video]').forEach((b) => b.setAttribute('aria-pressed', String(b === v)));
        reproducir();
      }
    });
  }

  montarEstructura();
  if (pagina === 'inicio') iniciarInicio();
  if (pagina === 'proyecto') iniciarProyecto();
})();
