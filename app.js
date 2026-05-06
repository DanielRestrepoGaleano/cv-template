'use strict';

/* ── Global State ─────────────────────────────────────────────────────────── */
let currentLang = 'en';
let cvData;

/* ── Helpers ──────────────────────────────────────────────────────────────── */

/** Escape a value for safe insertion into HTML attribute or text content. */
function escHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── localStorage ─────────────────────────────────────────────────────────── */

function saveToStorage() {
  localStorage.setItem('cvData', JSON.stringify(cvData));
  localStorage.setItem('cvLang', currentLang);
}

function loadFromStorage() {
  const savedLang = localStorage.getItem('cvLang');
  if (savedLang === 'es' || savedLang === 'en') currentLang = savedLang;

  const saved = localStorage.getItem('cvData');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Validate that parsed data has the expected top-level keys
      if (parsed && parsed.es && parsed.en) {
        cvData = parsed;
        return;
      }
    } catch (_) { /* fall through */ }
  }
  // Use default data (deep copy)
  cvData = JSON.parse(JSON.stringify(defaultCVData));
}

/* ── Language Toggle ──────────────────────────────────────────────────────── */

function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  document.getElementById('html-root').lang = currentLang;
  saveToStorage();
  updateToolbar();
  renderForm();
  renderCV();
}

/* ── Toolbar ──────────────────────────────────────────────────────────────── */

function updateToolbar() {
  const ui = uiLabels[currentLang];
  const editorVisible = !document.getElementById('editor-panel').classList.contains('collapsed');
  document.getElementById('btn-toggle-editor').textContent =
    editorVisible ? ui.botones.mostrarEditor : ui.botones.ocultarEditor;
  document.getElementById('btn-lang').textContent  = ui.botones.lang;
  document.getElementById('btn-ai').textContent    = ui.ai.import.button;
  document.getElementById('btn-chat').textContent  = ui.ai.chat.button;
  document.getElementById('btn-pdf').textContent   = ui.botones.pdf;
  document.getElementById('btn-word').textContent  = ui.botones.word;
  document.getElementById('btn-reset').title       = ui.botones.reset;
  document.getElementById('btn-reset').textContent = ui.botones.reset;

  if (typeof syncAiLanguageUI === 'function') syncAiLanguageUI();
  if (typeof syncChatLanguageUI === 'function') syncChatLanguageUI();
}

function toggleEditor() {
  const panel = document.getElementById('editor-panel');
  panel.classList.toggle('collapsed');
  updateToolbar();
}

/* ── Section helpers ──────────────────────────────────────────────────────── */

const SECTION_KEYS = ['detalles', 'enlaces', 'habilidades', 'perfil', 'experiencia', 'educacion', 'certificaciones'];

function getSectionTitle(key) {
  const cfg = cvData[currentLang].sectionConfig;
  const custom = cfg && cfg[key] && cfg[key].titulo;
  return custom || uiLabels[currentLang].secciones[key] || key;
}

function isSectionVisible(key) {
  const cfg = cvData[currentLang].sectionConfig;
  if (!cfg || !cfg[key]) return true;
  return cfg[key].visible !== false;
}

function toggleSectionVisibility(key, visible) {
  const cfg = cvData[currentLang].sectionConfig;
  if (cfg && cfg[key]) cfg[key].visible = !!visible;
  saveToStorage();
  renderCV();
}

function renameSectionTitle(key, value) {
  const cfg = cvData[currentLang].sectionConfig;
  if (cfg && cfg[key]) cfg[key].titulo = value;
  saveToStorage();
  renderCV();
}

/* ── Form Rendering ───────────────────────────────────────────────────────── */

function renderForm() {
  const d  = cvData[currentLang];
  const ui = uiLabels[currentLang].form;
  const container = document.getElementById('form-container');
  if (!container) return;

  const linksHtml = d.links.map((lk, i) => `
    <div class="array-item">
      <div class="link-row">
        <input type="text" data-array="links" data-index="${i}" data-key="label"
               placeholder="${ui.etiqueta}" value="${escHtml(lk.label)}" />
        <input type="url"  data-array="links" data-index="${i}" data-key="url"
               placeholder="${ui.url}" value="${escHtml(lk.url)}" />
        <button class="btn-remove" onclick="removeItem('links',${i})">${ui.eliminar}</button>
      </div>
    </div>`).join('');

  const expHtml = d.experiencia.map((exp, i) => `
    <div class="array-item">
      <div class="array-item-header">
        <span class="array-item-label">${escHtml(exp.cargo) || 'Entrada ' + (i + 1)}</span>
        <button class="btn-remove" onclick="removeItem('experiencia',${i})">${ui.eliminar}</button>
      </div>
      <label>${ui.cargo}</label>
      <input type="text" data-array="experiencia" data-index="${i}" data-key="cargo"
             value="${escHtml(exp.cargo)}" />
      <label>${ui.ubicacion}</label>
      <input type="text" data-array="experiencia" data-index="${i}" data-key="ubicacion"
             value="${escHtml(exp.ubicacion)}" />
      <label>${ui.periodo}</label>
      <input type="text" data-array="experiencia" data-index="${i}" data-key="fecha"
             value="${escHtml(exp.fecha)}" />
      <label>${ui.descripcion}</label>
      <textarea data-array="experiencia" data-index="${i}" data-key="descripcion"
                rows="2">${escHtml(exp.descripcion)}</textarea>
      <label>${ui.logros}</label>
      <textarea data-array="experiencia" data-index="${i}" data-key="logros"
                rows="3">${escHtml(exp.logros.join('\n'))}</textarea>
    </div>`).join('');

  const eduHtml = d.educacion.map((edu, i) => `
    <div class="array-item">
      <div class="array-item-header">
        <span class="array-item-label">${escHtml(edu.titulo) || 'Entrada ' + (i + 1)}</span>
        <button class="btn-remove" onclick="removeItem('educacion',${i})">${ui.eliminar}</button>
      </div>
      <label>${ui.titulo_edu}</label>
      <input type="text" data-array="educacion" data-index="${i}" data-key="titulo"
             value="${escHtml(edu.titulo)}" />
      <label>${ui.institucion}</label>
      <input type="text" data-array="educacion" data-index="${i}" data-key="institucion"
             value="${escHtml(edu.institucion)}" />
      <label>${ui.periodo}</label>
      <input type="text" data-array="educacion" data-index="${i}" data-key="fecha"
             value="${escHtml(edu.fecha)}" />
    </div>`).join('');

  const skillsHtml = d.habilidades.map((sk, i) => `
    <div class="array-item">
      <div class="skill-row">
        <input type="text" data-array="habilidades" data-index="${i}" data-key="categoria"
               placeholder="${ui.categoria}" value="${escHtml(sk.categoria)}" />
        <input type="text" data-array="habilidades" data-index="${i}" data-key="tecnologias"
               placeholder="${ui.tecnologias}" value="${escHtml(sk.tecnologias)}" />
        <button class="btn-remove" onclick="removeItem('habilidades',${i})">${ui.eliminar}</button>
      </div>
    </div>`).join('');

  const certsHtml = d.certificaciones.map((cert, i) => `
    <div class="array-item">
      <div class="link-row">
        <input type="text" data-array="certificaciones" data-index="${i}" data-key=""
               value="${escHtml(cert)}" />
        <button class="btn-remove" onclick="removeItem('certificaciones',${i})">${ui.eliminar}</button>
      </div>
    </div>`).join('');

  const isEs = currentLang === 'es';

  // ── Photo upload section ──────────────────────────────────────────────────
  const photoLabel      = isEs ? '📷 Foto de Perfil'   : '📷 Profile Photo';
  const photoUploadLbl  = isEs ? '📷 Subir foto'        : '📷 Upload photo';
  const photoRemoveLbl  = isEs ? '× Eliminar'           : '× Remove';
  const photoSizeLbl    = isEs ? 'Tamaño del marco:'    : 'Frame size:';
  const photoSizeVal    = getPhotoSize();
  const photoThumbStyle = getPhotoData() ? '' : 'display:none';
  const photoRemStyle   = getPhotoData() ? '' : 'display:none';
  const photoRowStyle   = getPhotoData() ? 'display:flex' : 'display:none';

  const photoSectionHtml = `
    <div class="form-section" id="photo-form-section">
      <p class="form-section-title">${photoLabel}</p>
      <div class="photo-upload-area">
        <img id="photo-preview-thumb" class="photo-thumb" style="${photoThumbStyle}" alt="Vista previa">
        <label class="btn-add photo-upload-label" for="photo-file-input">${photoUploadLbl}</label>
        <input type="file" id="photo-file-input" accept=".jpg,.jpeg,.png,.webp,.gif,.avif"
               style="display:none" onchange="handlePhotoUpload(this)">
        <button id="btn-photo-remove" class="btn-photo-remove" onclick="removePhoto()"
                style="${photoRemStyle}">${photoRemoveLbl}</button>
      </div>
      <div class="photo-size-row" id="photo-size-row" style="${photoRowStyle}">
        <label>${photoSizeLbl}</label>
        <input type="range" id="photo-size-slider" min="60" max="200" step="10"
               value="${photoSizeVal}" oninput="setPhotoSize(this.value)">
        <span id="photo-size-val">${photoSizeVal} px</span>
      </div>
    </div>`;

  // ── Section config section ────────────────────────────────────────────────
  const secConfigTitle   = isEs ? '⚙️ Secciones'       : '⚙️ Sections';
  const secRenamePh      = isEs ? 'Renombrar título…'   : 'Rename title…';
  const sectionConfigHtml = SECTION_KEYS.map(key => {
    const cfg          = (d.sectionConfig && d.sectionConfig[key]) || { visible: true, titulo: '' };
    const defaultTitle = uiLabels[currentLang].secciones[key] || key;
    return `
      <div class="section-config-item">
        <div class="section-config-check-row">
          <input type="checkbox" id="sec-vis-${key}" ${cfg.visible ? 'checked' : ''}
                 onchange="toggleSectionVisibility('${key}', this.checked)">
          <label for="sec-vis-${key}" class="section-config-label">${escHtml(defaultTitle)}</label>
        </div>
        <input type="text" class="section-title-rename"
               placeholder="${escHtml(secRenamePh)}"
               value="${escHtml(cfg.titulo)}"
               oninput="renameSectionTitle('${key}', this.value)">
      </div>`;
  }).join('');

  container.innerHTML = `
    ${photoSectionHtml}

    <p class="form-title">${ui.titulo}</p>

    <div class="form-section">
      <label>${ui.nombre}</label>
      <input type="text" data-field="nombre" value="${escHtml(d.nombre)}" />
      <label>${ui.profesion}</label>
      <input type="text" data-field="profesion" value="${escHtml(d.profesion)}" />
    </div>

    <div class="form-section">
      <p class="form-section-title">${ui.secContacto}</p>
      <label>${ui.direccion}</label>
      <textarea data-field="contacto.direccion" rows="2">${escHtml(d.contacto.direccion)}</textarea>
      <label>${ui.telefono}</label>
      <input type="text" data-field="contacto.telefono" value="${escHtml(d.contacto.telefono)}" />
      <label>${ui.emailLbl}</label>
      <input type="email" data-field="contacto.email" value="${escHtml(d.contacto.email)}" />
    </div>

    <div class="form-section">
      <p class="form-section-title">${ui.secEnlaces}</p>
      <div id="links-container">${linksHtml}</div>
      <button class="btn-add" onclick="addLink()">${ui.agregarEnlace}</button>
    </div>

    <div class="form-section">
      <p class="form-section-title">${ui.secPerfil}</p>
      <textarea data-field="perfil" rows="5">${escHtml(d.perfil)}</textarea>
    </div>

    <div class="form-section">
      <p class="form-section-title">${ui.secExp}</p>
      <div id="exp-container">${expHtml}</div>
      <button class="btn-add" onclick="addExp()">${ui.agregarExp}</button>
    </div>

    <div class="form-section">
      <p class="form-section-title">${ui.secEdu}</p>
      <div id="edu-container">${eduHtml}</div>
      <button class="btn-add" onclick="addEdu()">${ui.agregarEdu}</button>
    </div>

    <div class="form-section">
      <p class="form-section-title">${ui.secSkills}</p>
      <div id="skills-container">${skillsHtml}</div>
      <button class="btn-add" onclick="addSkill()">${ui.agregarSkill}</button>
    </div>

    <div class="form-section">
      <p class="form-section-title">${ui.secCerts}</p>
      <div id="certs-container">${certsHtml}</div>
      <button class="btn-add" onclick="addCert()">${ui.agregarCert}</button>
    </div>

    <div class="form-section">
      <p class="form-section-title">${secConfigTitle}</p>
      <div class="section-config-list">
        ${sectionConfigHtml}
      </div>
    </div>`;

  bindFormEvents();
}

/* ── Form Event Binding ───────────────────────────────────────────────────── */

function bindFormEvents() {
  document.getElementById('form-container').addEventListener('input', handleInput);
}

function handleInput(e) {
  const el  = e.target;
  const d   = cvData[currentLang];

  if (el.dataset.field) {
    // Dot-notation path (e.g. "contacto.direccion")
    const parts = el.dataset.field.split('.');
    let obj = d;
    for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
    obj[parts[parts.length - 1]] = el.value;

  } else if (el.dataset.array) {
    const arr = el.dataset.array;
    const idx = parseInt(el.dataset.index, 10);
    const key = el.dataset.key;

    if (arr === 'certificaciones') {
      d.certificaciones[idx] = el.value;
    } else if (key === 'logros') {
      // Store as array; keep blank lines while typing so they persist in textarea
      d[arr][idx][key] = el.value.split('\n');
    } else {
      d[arr][idx][key] = el.value;
    }
  }

  saveToStorage();
  renderCV();
}

/* ── Array Mutation Helpers ───────────────────────────────────────────────── */

function removeItem(arr, idx) {
  cvData[currentLang][arr].splice(idx, 1);
  saveToStorage();
  renderForm();
  renderCV();
}

function addLink() {
  cvData[currentLang].links.push({ label: '', url: '' });
  saveToStorage();
  renderForm();
  renderCV();
}

function addExp() {
  cvData[currentLang].experiencia.push({ cargo: '', ubicacion: '', fecha: '', descripcion: '', logros: [] });
  saveToStorage();
  renderForm();
  renderCV();
  // Scroll newly added item into view
  const items = document.querySelectorAll('#exp-container .array-item');
  if (items.length) items[items.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function addEdu() {
  cvData[currentLang].educacion.push({ titulo: '', institucion: '', fecha: '' });
  saveToStorage();
  renderForm();
  renderCV();
}

function addSkill() {
  cvData[currentLang].habilidades.push({ categoria: '', tecnologias: '' });
  saveToStorage();
  renderForm();
  renderCV();
}

function addCert() {
  cvData[currentLang].certificaciones.push('');
  saveToStorage();
  renderForm();
  renderCV();
}

/* ── CV Preview Rendering ─────────────────────────────────────────────────── */

function renderCV() {
  const d   = cvData[currentLang];
  const ui  = uiLabels[currentLang];
  const sec = ui.secciones;

  // Update page title dynamically
  document.title = d.nombre ? `${d.nombre} – CV` : 'CV Builder';

  const container = document.getElementById('cv-preview');
  if (!container) return;

  /* Left column ─────────────────────────────────────────────────────────── */

  const addressLines = (d.contacto.direccion || '').split('\n')
    .filter(l => l.trim())
    .map(l => escHtml(l))
    .join('<br>');

  const linksHtml = d.links.filter(lk => lk.label || lk.url).map(lk => `
    <p class="cv-link-wrap">
      <a href="${escHtml(lk.url)}" class="cv-link" target="_blank" rel="noopener">${escHtml(lk.label)}</a>
    </p>`).join('');

  const skillsHtml = d.habilidades.filter(sk => sk.categoria || sk.tecnologias).map(sk => `
    <div class="cv-skill">
      <p>${escHtml(sk.categoria)}:<br><strong>${escHtml(sk.tecnologias)}</strong></p>
      <div class="cv-skill-bar"></div>
    </div>`).join('');

  /* Right column ────────────────────────────────────────────────────────── */

  const expHtml = d.experiencia.filter(e => e.cargo).map(exp => {
    const bulletsHtml = (exp.logros || [])
      .filter(l => l.trim())
      .map(l => `<li>${escHtml(l)}</li>`)
      .join('');
    return `
    <div class="cv-exp">
      <div class="cv-job-header">
        <span class="cv-job-title-text">${escHtml(exp.cargo)}</span>
        ${exp.ubicacion ? `<span class="cv-job-loc">${escHtml(exp.ubicacion)}</span>` : ''}
      </div>
      ${exp.fecha ? `<p class="cv-job-date">${escHtml(exp.fecha)}</p>` : ''}
      ${exp.descripcion ? `<p class="cv-job-desc">${escHtml(exp.descripcion)}</p>` : ''}
      ${bulletsHtml ? `<ul class="cv-bullets">${bulletsHtml}</ul>` : ''}
    </div>`;
  }).join('');

  const eduHtml = d.educacion.filter(e => e.titulo).map(edu => `
    <div class="cv-edu">
      <p class="cv-edu-title">${escHtml(edu.titulo)}</p>
      <p class="cv-edu-inst">${escHtml(edu.institucion)}${edu.fecha ? ' &nbsp;|&nbsp; <em>' + escHtml(edu.fecha) + '</em>' : ''}</p>
    </div>`).join('');

  const certsHtml = d.certificaciones.filter(c => c.trim()).map(c => `<li>${escHtml(c)}</li>`).join('');

  /* Photo header ─────────────────────────────────────────────────────────── */
  const photoData = getPhotoData();
  const photoSize = getPhotoSize();
  const photoHtml = photoData
    ? `<div class="cv-photo-frame" style="width:${photoSize}px;height:${photoSize}px">` +
      `<img src="${photoData}" class="cv-photo-img" alt="Foto de perfil"></div>`
    : '';

  /* Build section blocks with visibility ─────────────────────────────────── */
  const detailsBlock = isSectionVisible('detalles') ? `
    <h3 class="cv-sec-title">${escHtml(getSectionTitle('detalles'))}<div class="cv-underline"></div></h3>
    <p class="cv-detail"><strong>${escHtml(ui.addressCvLbl)}</strong><br>
      <span class="cv-detail-val">${addressLines}</span></p>
    <p class="cv-detail"><strong>${escHtml(ui.form.telefono).toUpperCase()}</strong><br>
      <span class="cv-detail-val">${escHtml(d.contacto.telefono)}</span></p>
    <p class="cv-detail" style="margin-bottom:28px"><strong>${escHtml(ui.emailCvLbl)}</strong><br>
      <span class="cv-detail-val">${escHtml(d.contacto.email)}</span></p>
  ` : '';

  const enlacesBlock = (linksHtml && isSectionVisible('enlaces')) ? `
    <h3 class="cv-sec-title">${escHtml(getSectionTitle('enlaces'))}<div class="cv-underline"></div></h3>
    ${linksHtml}
  ` : '';

  const habilidadesBlock = (skillsHtml && isSectionVisible('habilidades')) ? `
    <h3 class="cv-sec-title" style="margin-top:24px">${escHtml(getSectionTitle('habilidades'))}<div class="cv-underline"></div></h3>
    ${skillsHtml}
  ` : '';

  const perfilBlock = isSectionVisible('perfil') ? `
    <h3 class="cv-sec-title">${escHtml(getSectionTitle('perfil'))}<div class="cv-underline"></div></h3>
    <p class="cv-profile">${escHtml(d.perfil)}</p>
  ` : '';

  const expBlock = (expHtml && isSectionVisible('experiencia')) ? `
    <h3 class="cv-sec-title">${escHtml(getSectionTitle('experiencia'))}<div class="cv-underline"></div></h3>
    ${expHtml}
  ` : '';

  const eduBlock = (eduHtml && isSectionVisible('educacion')) ? `
    <h3 class="cv-sec-title">${escHtml(getSectionTitle('educacion'))}<div class="cv-underline"></div></h3>
    ${eduHtml}
  ` : '';

  const certsBlock = (certsHtml && isSectionVisible('certificaciones')) ? `
    <h3 class="cv-sec-title">${escHtml(getSectionTitle('certificaciones'))}<div class="cv-underline"></div></h3>
    <ul class="cv-certs">${certsHtml}</ul>
  ` : '';

  container.innerHTML = `
    <div class="cv-header-wrap">
      ${photoHtml}
      <div class="cv-header-text">
        <h1 class="cv-name">${escHtml(d.nombre)}</h1>
        <p class="cv-profession">${escHtml(d.profesion)}</p>
      </div>
    </div>
    <hr class="cv-divider">

    <table class="cv-table">
      <tr>
        <!-- LEFT COLUMN -->
        <td class="cv-left">
          ${detailsBlock}
          ${enlacesBlock}
          ${habilidadesBlock}
        </td>

        <!-- RIGHT COLUMN -->
        <td class="cv-right">
          ${perfilBlock}
          ${expBlock}
          ${eduBlock}
          ${certsBlock}
        </td>
      </tr>
    </table>`;
}

function buildCvSnapshot(lang = currentLang) {
  const d = cvData[lang];
  const ui = uiLabels[lang];
  const sec = ui.secciones;

  const lines = [];
  lines.push(`Language: ${lang === 'es' ? 'Spanish' : 'English'}`);
  lines.push(`Name: ${d.nombre}`);
  lines.push(`Role: ${d.profesion}`);
  lines.push('');

  if (d.contacto && (d.contacto.direccion || d.contacto.telefono || d.contacto.email)) {
    lines.push(sec.detalles.toUpperCase());
    if (d.contacto.direccion) {
      lines.push(`Address: ${String(d.contacto.direccion).replace(/\n/g, ' | ')}`);
    }
    if (d.contacto.telefono) lines.push(`Phone: ${d.contacto.telefono}`);
    if (d.contacto.email) lines.push(`Email: ${d.contacto.email}`);
    lines.push('');
  }

  const activeLinks = (d.links || []).filter(lk => lk.label || lk.url);
  if (activeLinks.length) {
    lines.push(sec.enlaces.toUpperCase());
    activeLinks.forEach(function (lk) {
      lines.push(`- ${lk.label}: ${lk.url}`.trim());
    });
    lines.push('');
  }

    if (typeof loadChatState === 'function') loadChatState();
  if (d.perfil) {
    lines.push(sec.perfil.toUpperCase());
    lines.push(d.perfil);
    lines.push('');
  }

  const activeSkills = (d.habilidades || []).filter(sk => sk.categoria || sk.tecnologias);
  if (activeSkills.length) {
    lines.push(sec.habilidades.toUpperCase());
    activeSkills.forEach(function (sk) {
      lines.push(`- ${sk.categoria}: ${sk.tecnologias}`.trim());
    });
    lines.push('');
  }

  const activeExp = (d.experiencia || []).filter(e => e.cargo);
  if (activeExp.length) {
    lines.push(sec.experiencia.toUpperCase());
    activeExp.forEach(function (exp) {
      lines.push(`- ${[exp.cargo, exp.ubicacion, exp.fecha].filter(Boolean).join(' | ')}`);
      if (exp.descripcion) lines.push(`  Summary: ${exp.descripcion}`);
      (exp.logros || []).filter(Boolean).forEach(function (item) {
        lines.push(`  * ${item}`);
      });
    });
    lines.push('');
  }

  const activeEdu = (d.educacion || []).filter(e => e.titulo);
  if (activeEdu.length) {
    lines.push(sec.educacion.toUpperCase());
    activeEdu.forEach(function (edu) {
      lines.push(`- ${[edu.titulo, edu.institucion, edu.fecha].filter(Boolean).join(' | ')}`);
    });
    lines.push('');
  }

  const activeCerts = (d.certificaciones || []).filter(Boolean);
  if (activeCerts.length) {
    lines.push(sec.certificaciones.toUpperCase());
    activeCerts.forEach(function (cert) {
      lines.push(`- ${cert}`);
    });
  }

  return lines.join('\n').trim();
}

window.getCurrentCvSnapshot = buildCvSnapshot;

/* ── PDF Export ───────────────────────────────────────────────────────────── */

function descargarPDF() {
  window.print();
}

/* ── Word Export ──────────────────────────────────────────────────────────── */

async function descargarWord() {
  const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    AlignmentType, WidthType, BorderStyle, LevelFormat, ExternalHyperlink, UnderlineType
  } = docx;

  const d   = cvData[currentLang];
  const ui  = uiLabels[currentLang];
  const sec = ui.secciones;

  const FONT    = 'Arial';
  const C_DARK  = '222222';
  const C_GRAY  = '555555';
  const C_LIGHT = '666666';
  const C_BODY  = '444444';
  const NO_BORDER  = { style: BorderStyle.NONE,   size: 0, color: 'FFFFFF' };
  const DIV_BORDER = { style: BorderStyle.SINGLE, size: 4, color: 'EAEAEA' };

  const secHeading = (text) => new Paragraph({
    spacing: { before: 280, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C_DARK, space: 4 } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, font: FONT, color: C_DARK, characterSpacing: 40 })]
  });

  const lbl = (text) => new Paragraph({
    spacing: { before: 140, after: 20 },
    children: [new TextRun({ text, bold: true, size: 18, font: FONT, color: C_DARK, allCaps: true })]
  });

  const body = (text) => new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text, size: 19, font: FONT, color: C_GRAY })]
  });

  const jobTitle = (title, loc) => new Paragraph({
    spacing: { before: 160, after: 20 },
    children: [
      new TextRun({ text: title, bold: true, size: 21, font: FONT, color: C_DARK }),
      new TextRun({ text: loc ? '   ' + loc : '', size: 19, font: FONT, color: C_LIGHT })
    ]
  });

  const dateP = (text) => new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text, italics: true, size: 18, font: FONT, color: C_LIGHT })]
  });

  const bullet = (text) => new Paragraph({
    numbering: { reference: 'cv-bullets', level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 19, font: FONT, color: C_BODY })]
  });

  const link = (label, url) => new Paragraph({
    spacing: { before: 40, after: 40 },
    children: [new ExternalHyperlink({
      link: url,
      children: [new TextRun({
        text: label, size: 19, font: FONT, color: '2b579a',
        underline: { type: UnderlineType.SINGLE }
      })]
    })]
  });

  const skill = (cat, val) => [
    new Paragraph({
      spacing: { before: 80, after: 20 },
      children: [
        new TextRun({ text: cat + ': ', size: 18, font: FONT, color: C_BODY }),
        new TextRun({ text: val, bold: true, size: 18, font: FONT, color: C_DARK })
      ]
    }),
    new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C_DARK, space: 2 } },
      spacing: { before: 0, after: 60 },
      children: [new TextRun('')]
    })
  ];

  const gap = () => new Paragraph({ spacing: { before: 160, after: 0 }, children: [new TextRun('')] });

  /* ── Build left column ─────────────────────────────────────────────────── */
  const leftCol = [
    secHeading(sec.detalles),
    lbl(ui.addressCvLbl),
    // Address lines become separate paragraphs
    ...d.contacto.direccion.split('\n').filter(l => l.trim()).map(l => body(l.trim())),
    lbl(ui.form.telefono.toUpperCase()),
    body(d.contacto.telefono),
    lbl(ui.emailCvLbl),
    body(d.contacto.email),
    gap()
  ];

  const activeLinks = d.links.filter(lk => lk.label || lk.url);
  if (activeLinks.length) {
    leftCol.push(secHeading(sec.enlaces));
    activeLinks.forEach(lk => leftCol.push(link(lk.label, lk.url)));
    leftCol.push(gap());
  }

  const activeSkills = d.habilidades.filter(sk => sk.categoria || sk.tecnologias);
  if (activeSkills.length) {
    leftCol.push(secHeading(sec.habilidades));
    activeSkills.forEach(sk => leftCol.push(...skill(sk.categoria, sk.tecnologias)));
  }

  /* ── Build right column ────────────────────────────────────────────────── */
  const rightCol = [
    secHeading(sec.perfil),
    new Paragraph({
      spacing: { before: 0, after: 240 },
      alignment: AlignmentType.JUSTIFIED,
      children: [new TextRun({ text: d.perfil, size: 19, font: FONT, color: C_BODY })]
    })
  ];

  const activeExp = d.experiencia.filter(e => e.cargo);
  if (activeExp.length) {
    rightCol.push(secHeading(sec.experiencia));
    activeExp.forEach((exp, i) => {
      rightCol.push(jobTitle(exp.cargo, exp.ubicacion));
      if (exp.fecha)       rightCol.push(dateP(exp.fecha));
      if (exp.descripcion) rightCol.push(body(exp.descripcion));
      (exp.logros || []).filter(l => l.trim()).forEach(l => rightCol.push(bullet(l)));
      if (i < activeExp.length - 1) rightCol.push(gap());
    });
    rightCol.push(gap());
  }

  const activeEdu = d.educacion.filter(e => e.titulo);
  if (activeEdu.length) {
    rightCol.push(secHeading(sec.educacion));
    activeEdu.forEach(edu => {
      rightCol.push(new Paragraph({
        spacing: { before: 80, after: 20 },
        children: [new TextRun({ text: edu.titulo, bold: true, size: 21, font: FONT, color: C_DARK })]
      }));
      rightCol.push(body(edu.institucion + (edu.fecha ? '  |  ' + edu.fecha : '')));
    });
    rightCol.push(gap());
  }

  const activeCerts = d.certificaciones.filter(c => c.trim());
  if (activeCerts.length) {
    rightCol.push(secHeading(sec.certificaciones));
    activeCerts.forEach(c => rightCol.push(bullet(c)));
  }

  /* ── Two-column layout table ───────────────────────────────────────────── */
  const layoutTable = new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2700, 6660],
    borders: {
      top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER,
      right: NO_BORDER, insideH: NO_BORDER, insideV: NO_BORDER
    },
    rows: [new TableRow({
      children: [
        new TableCell({
          width: { size: 2700, type: WidthType.DXA },
          borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: DIV_BORDER },
          margins: { top: 0, bottom: 0, left: 0, right: 280 },
          children: leftCol
        }),
        new TableCell({
          width: { size: 6660, type: WidthType.DXA },
          borders: { top: NO_BORDER, bottom: NO_BORDER, right: NO_BORDER, left: DIV_BORDER },
          margins: { top: 0, bottom: 0, left: 360, right: 0 },
          children: rightCol
        })
      ]
    })]
  });

  /* ── Build document ────────────────────────────────────────────────────── */
  const doc = new Document({
    numbering: {
      config: [{
        reference: 'cv-bullets',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 200 } } }
        }]
      }]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 800, right: 800, bottom: 800, left: 800 }
        }
      },
      children: [
        new Paragraph({
          spacing: { before: 0, after: 60 },
          children: [new TextRun({
            text: d.nombre.toUpperCase(), bold: true, size: 56,
            font: FONT, color: C_DARK, characterSpacing: 40
          })]
        }),
        new Paragraph({
          spacing: { before: 0, after: 160 },
          children: [new TextRun({
            text: d.profesion.toUpperCase(), size: 26,
            font: FONT, color: C_GRAY, characterSpacing: 20
          })]
        }),
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'EAEAEA', space: 6 } },
          spacing: { before: 0, after: 180 },
          children: [new TextRun('')]
        }),
        layoutTable
      ]
    }]
  });

  /* ── Trigger download ──────────────────────────────────────────────────── */
  const blob = await Packer.toBlob(doc);
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = d.nombre.replace(/\s+/g, '_') + '_CV.docx';
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Reset ────────────────────────────────────────────────────────────────── */

function resetData() {
  if (!window.confirm(uiLabels[currentLang].confirmarReset)) return;
  cvData = JSON.parse(JSON.stringify(defaultCVData));
  resetPhoto();
  saveToStorage();
  renderForm();
  renderCV();
}

/* ── Init ─────────────────────────────────────────────────────────────────── */

function init() {
  loadFromStorage();

  // Ensure sectionConfig exists in all language data (backward compatibility)
  const defaultSecCfg = defaultCVData.es.sectionConfig;
  ['es', 'en'].forEach(function (lang) {
    if (!cvData[lang].sectionConfig) {
      cvData[lang].sectionConfig = JSON.parse(JSON.stringify(defaultSecCfg));
    } else {
      Object.keys(defaultSecCfg).forEach(function (key) {
        if (!cvData[lang].sectionConfig[key]) {
          cvData[lang].sectionConfig[key] = Object.assign({}, defaultSecCfg[key]);
        }
      });
    }
  });

  initPhoto();
  document.getElementById('html-root').lang = currentLang;
  updateToolbar();
  renderForm();
  renderCV();
}

window.addEventListener('DOMContentLoaded', init);
