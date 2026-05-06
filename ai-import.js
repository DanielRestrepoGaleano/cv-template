'use strict';

/* ── AI Import Module ────────────────────────────────────────────────────── *
 *
 * SECURITY DESIGN
 * ───────────────
 * • The user's API key is stored ONLY in the _tempKey variable below.
 * • It is set at the start of runAIImport() and cleared (zeroed then nulled)
 *   immediately after the fetch completes (success or failure).
 * • It is also cleared whenever the modal is closed.
 * • The key is NEVER written to localStorage, sessionStorage, cookies,
 *   or any other persistent storage.
 * • On page unload the key reference is cleared automatically.
 * • Network requests go directly from the browser to the AI provider's API.
 *   No data passes through any intermediate server.
 *
 * ─────────────────────────────────────────────────────────────────────────── */

/* Single-use transient key — cleared immediately after each API call */
let _tempKey = '';

window.addEventListener('beforeunload', function () { _tempKey = ''; });

/* ── Provider definitions ────────────────────────────────────────────────── */

const AI_PROVIDERS = {
  openai: {
    label:        'OpenAI (ChatGPT)',
    defaultModel: 'gpt-4o-mini',
    placeholder:  'gpt-4o-mini, gpt-4o, gpt-3.5-turbo…'
  },
  claude: {
    label:        'Claude (Anthropic)',
    defaultModel: 'claude-3-5-haiku-20241022',
    placeholder:  'claude-3-5-haiku-20241022, claude-3-5-sonnet-20241022…'
  },
  gemini: {
    label:        'Gemini (Google)',
    defaultModel: 'gemini-1.5-flash',
    placeholder:  'gemini-1.5-flash, gemini-1.5-pro, gemini-2.0-flash…'
  },
  groq: {
    label:        'Groq',
    defaultModel: 'llama-3.1-8b-instant',
    placeholder:  'llama-3.1-8b-instant, mixtral-8x7b-32768, llama3-70b-8192…'
  }
};

/* ── CV file constants ───────────────────────────────────────────────────── */

const CV_MAX_BYTES = 10 * 1024 * 1024; // 10 MB

/* ── Modal lifecycle ─────────────────────────────────────────────────────── */

function openAiImportModal() {
  document.getElementById('ai-import-modal').style.display = 'flex';
  onProviderChange(); // set default model/placeholder
}

function closeAiImportModal() {
  _clearKey();
  const keyInput = document.getElementById('ai-api-key');
  if (keyInput) keyInput.value = '';
  document.getElementById('ai-import-modal').style.display = 'none';
  _setStatus('', '');
}

function _clearKey() {
  // Overwrite the string variable with empty string before nulling it
  // (JS strings are immutable primitives, so there's no way to zero-fill
  //  the underlying memory, but we do our best to remove the reference)
  _tempKey = '';
}

/* ── UI helpers ──────────────────────────────────────────────────────────── */

function onProviderChange() {
  const key  = document.getElementById('ai-provider').value;
  const info = AI_PROVIDERS[key];
  if (!info) return;
  const modelEl = document.getElementById('ai-model');
  if (!modelEl.dataset.userEdited) {        // only auto-fill if untouched
    modelEl.value       = info.defaultModel;
  }
  modelEl.placeholder = info.placeholder;
}

// Let user lock in their model choice so provider switch doesn't reset it
document.addEventListener('DOMContentLoaded', function () {
  const modelEl = document.getElementById('ai-model');
  if (modelEl) {
    modelEl.addEventListener('input', function () {
      modelEl.dataset.userEdited = '1';
    });
  }
});

function toggleApiKeyVisibility() {
  const input = document.getElementById('ai-api-key');
  const btn   = document.getElementById('btn-eye');
  if (!input) return;
  if (input.type === 'password') {
    input.type      = 'text';
    if (btn) btn.textContent = '🙈';
  } else {
    input.type      = 'password';
    if (btn) btn.textContent = '👁';
  }
}

function _setStatus(type, msg) {
  const el = document.getElementById('ai-status');
  if (!el) return;
  el.className      = 'ai-status' + (type ? ' ai-status-' + type : '');
  el.textContent    = msg || '';
  el.style.display  = msg ? 'block' : 'none';
}

function onCVFileSelected(input) {
  const infoEl = document.getElementById('ai-file-info');
  if (!infoEl) return;
  const file = input.files && input.files[0];
  if (!file) { infoEl.textContent = ''; return; }
  const mb = (file.size / (1024 * 1024)).toFixed(2);
  infoEl.textContent = `${file.name} (${mb} MB)`;
}

/* ── CV file validation ──────────────────────────────────────────────────── */

async function _validateCVFile(file) {
  if (!file) throw new Error('No seleccionaste ningún archivo.');

  const ext = file.name.split('.').pop().toLowerCase();
  if (ext !== 'pdf' && ext !== 'docx') {
    throw new Error('Formato no válido. Solo se aceptan archivos .pdf o .docx');
  }

  if (file.size === 0) throw new Error('El archivo está vacío.');
  if (file.size > CV_MAX_BYTES) {
    throw new Error('El archivo supera el límite de 10 MB.');
  }

  // Magic-byte check
  const header = await file.slice(0, 8).arrayBuffer();
  const b = new Uint8Array(header);

  if (ext === 'pdf') {
    // %PDF → 25 50 44 46
    if (!(b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46)) {
      throw new Error('El archivo no es un PDF válido (firma de bytes incorrecta).');
    }
  } else if (ext === 'docx') {
    // ZIP/DOCX → PK 50 4B
    if (!(b[0] === 0x50 && b[1] === 0x4B)) {
      throw new Error('El archivo no es un DOCX válido (firma de bytes incorrecta).');
    }
  }
}

/* ── Text extraction ─────────────────────────────────────────────────────── */

async function _extractText(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  if (ext === 'pdf')  return _extractPDF(file);
  if (ext === 'docx') return _extractDOCX(file);
  throw new Error('Formato no soportado.');
}

async function _extractPDF(file) {
  if (typeof pdfjsLib === 'undefined') {
    throw new Error('La librería PDF.js no está disponible. Recarga la página e intenta de nuevo.');
  }

  const buffer    = await file.arrayBuffer();
  const loadTask  = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
  const pdf       = await loadTask.promise;

  let text = '';
  for (let p = 1; p <= pdf.numPages; p++) {
    const page    = await pdf.getPage(p);
    const content = await page.getTextContent();
    // Join items; add space between them, newline between pages
    text += content.items.map(i => i.str).join(' ') + '\n';
  }
  return text;
}

async function _extractDOCX(file) {
  if (typeof JSZip === 'undefined') {
    throw new Error('La librería JSZip no está disponible. Recarga la página e intenta de nuevo.');
  }

  const buffer = await file.arrayBuffer();
  const zip    = await JSZip.loadAsync(buffer);
  const entry  = zip.file('word/document.xml');
  if (!entry) throw new Error('Archivo DOCX inválido: no contiene word/document.xml.');

  const xml    = await entry.async('text');
  const parser = new DOMParser();
  const doc    = parser.parseFromString(xml, 'application/xml');

  // Build paragraph-structured text from <w:p> elements
  const paragraphs = doc.getElementsByTagName('w:p');
  let text = '';
  for (let i = 0; i < paragraphs.length; i++) {
    const tNodes = paragraphs[i].getElementsByTagName('w:t');
    let line = '';
    for (let j = 0; j < tNodes.length; j++) line += tNodes[j].textContent;
    if (line.trim()) text += line.trim() + '\n';
  }
  return text;
}

/* ── AI calls ────────────────────────────────────────────────────────────── */

function _buildPrompt(cvText) {
  return `You are an expert CV/resume parser. Extract every piece of information from the CV text below and return it as a single valid JSON object — no markdown, no code fences, no extra text.

Use EXACTLY this JSON schema:
{
  "nombre": "Full name as written",
  "profesion": "Job title / profession as written",
  "contacto": {
    "direccion": "City and/or country — use \\n between city and country if both present",
    "telefono": "Phone number as written",
    "email": "Email address"
  },
  "links": [
    { "label": "Platform or link label (e.g. LinkedIn, GitHub, Portfolio)", "url": "https://..." }
  ],
  "perfil": "Professional summary / profile paragraph — copy exactly as written",
  "experiencia": [
    {
      "cargo": "Job title | Company name",
      "ubicacion": "City, Country",
      "fecha": "Month Year — Month Year (or Present)",
      "descripcion": "Short role description",
      "logros": ["Bullet / achievement 1", "Bullet 2"]
    }
  ],
  "educacion": [
    {
      "titulo": "Degree or certification name",
      "institucion": "Institution name, City",
      "fecha": "Year or year range"
    }
  ],
  "habilidades": [
    { "categoria": "Category (e.g. Languages, Frameworks, Tools)", "tecnologias": "Skill A, Skill B, Skill C" }
  ],
  "certificaciones": [
    "Certification name, Issuer (Month Year)"
  ]
}

Rules:
- Return ONLY valid JSON — nothing else.
- Preserve the original language of the text; do NOT translate.
- Copy information exactly as it appears; do not paraphrase.
- If a field has no data use "" or [].
- Split bullet points / achievements into separate array items for "logros".
- If skills are not grouped, create one item per logical category.

CV TEXT:
---
${cvText.slice(0, 14000)}
---`;
}

async function _callOpenAI(key, model, prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + key
    },
    body: JSON.stringify({
      model,
      messages:        [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature:     0.1
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'OpenAI error ' + res.status);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

async function _callClaude(key, model, prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':                    'application/json',
      'x-api-key':                       key,
      'anthropic-version':               '2023-06-01',
      'anthropic-dangerous-allow-browser': 'true'
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      messages:   [{ role: 'user', content: prompt }]
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Anthropic error ' + res.status);
  }
  const data = await res.json();
  return data.content[0].text;
}

async function _callGemini(key, model, prompt) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' +
              encodeURIComponent(model) + ':generateContent?key=' + key;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents:       [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1 }
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Gemini error ' + res.status);
  }
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

async function _callGroq(key, model, prompt) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + key
    },
    body: JSON.stringify({
      model,
      messages:    [{ role: 'user', content: prompt }],
      temperature: 0.1
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Groq error ' + res.status);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

async function _callProvider(provider, key, model, prompt) {
  switch (provider) {
    case 'openai': return _callOpenAI(key, model, prompt);
    case 'claude': return _callClaude(key, model, prompt);
    case 'gemini': return _callGemini(key, model, prompt);
    case 'groq':   return _callGroq(key, model, prompt);
    default: throw new Error('Proveedor desconocido: ' + provider);
  }
}

/* ── Response parsing ────────────────────────────────────────────────────── */

function _parseResponse(raw) {
  // Strip markdown code fences if the model wrapped the JSON
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }

  const p = JSON.parse(cleaned); // throws SyntaxError on bad JSON

  // Minimal structural validation
  const required = ['nombre', 'profesion', 'contacto', 'links',
                    'perfil', 'experiencia', 'educacion', 'habilidades', 'certificaciones'];
  for (const k of required) {
    if (!(k in p)) throw new Error('Campo faltante en la respuesta de la IA: ' + k);
  }

  const str  = (v) => String(v || '').trim();
  const arr  = (v) => Array.isArray(v) ? v : [];

  return {
    nombre:    str(p.nombre),
    profesion: str(p.profesion),
    contacto: {
      direccion: str(p.contacto && p.contacto.direccion),
      telefono:  str(p.contacto && p.contacto.telefono),
      email:     str(p.contacto && p.contacto.email)
    },
    links: arr(p.links).map(lk => ({
      label: str(lk.label),
      url:   str(lk.url)
    })).filter(lk => lk.label || lk.url),
    perfil: str(p.perfil),
    experiencia: arr(p.experiencia).map(exp => ({
      cargo:       str(exp.cargo),
      ubicacion:   str(exp.ubicacion),
      fecha:       str(exp.fecha),
      descripcion: str(exp.descripcion),
      logros:      arr(exp.logros).map(l => str(l)).filter(Boolean)
    })).filter(exp => exp.cargo),
    educacion: arr(p.educacion).map(edu => ({
      titulo:      str(edu.titulo),
      institucion: str(edu.institucion),
      fecha:       str(edu.fecha)
    })).filter(edu => edu.titulo),
    habilidades: arr(p.habilidades).map(sk => ({
      categoria:   str(sk.categoria),
      tecnologias: str(sk.tecnologias)
    })).filter(sk => sk.categoria || sk.tecnologias),
    certificaciones: arr(p.certificaciones).map(c => str(c)).filter(Boolean),
    // Preserve existing sectionConfig — AI import does not reset visibility/titles
    sectionConfig: cvData[currentLang].sectionConfig
  };
}

/* ── Main entry point ────────────────────────────────────────────────────── */

async function runAIImport() {
  const fileInput  = document.getElementById('ai-cv-file');
  const providerEl = document.getElementById('ai-provider');
  const modelEl    = document.getElementById('ai-model');
  const keyInput   = document.getElementById('ai-api-key');
  const importBtn  = document.getElementById('btn-ai-import');

  const file     = fileInput.files && fileInput.files[0];
  const provider = providerEl.value;
  const model    = modelEl.value.trim();

  // Capture key into the transient variable — immediately clear the input
  _tempKey = keyInput.value;
  keyInput.value = '';

  // Input validation (before any async work)
  if (!file)      { _clearKey(); _setStatus('error', 'Selecciona un archivo PDF o DOCX.'); return; }
  if (!model)     { _clearKey(); _setStatus('error', 'Ingresa el nombre del modelo.'); return; }
  if (!_tempKey)  { _clearKey(); _setStatus('error', 'Ingresa tu API Key.'); return; }

  importBtn.disabled = true;
  _setStatus('info', '⏳ Validando archivo…');

  try {
    // 1 — Validate file
    await _validateCVFile(file);

    // 2 — Extract text
    _setStatus('info', '📄 Extrayendo texto del archivo…');
    const text = await _extractText(file);
    if (!text || text.trim().length < 30) {
      throw new Error(
        'No se pudo extraer texto del archivo. El documento podría estar protegido ' +
        'o ser únicamente imágenes (escaneado sin OCR).'
      );
    }

    // 3 — Call AI
    _setStatus('info', '🤖 Enviando al modelo de IA… (puede tardar unos segundos)');
    const prompt  = _buildPrompt(text);
    const rawResp = await _callProvider(provider, _tempKey, model, prompt);

    // 4 — Clear key immediately after the request completes
    _clearKey();

    // 5 — Parse & apply
    _setStatus('info', '🔄 Procesando respuesta…');
    const parsed = _parseResponse(rawResp);

    // Apply to current language; mirror to the other so both have valid data
    const otherLang = currentLang === 'es' ? 'en' : 'es';
    const otherSectionCfg = cvData[otherLang].sectionConfig; // preserve other lang's config
    cvData[currentLang] = parsed;
    const otherData = JSON.parse(JSON.stringify(parsed));
    otherData.sectionConfig = otherSectionCfg;
    cvData[otherLang] = otherData;

    saveToStorage();
    renderForm();
    renderCV();

    _setStatus('success', '✅ ¡CV importado correctamente! Revisa y ajusta los campos según sea necesario.');
    fileInput.value = '';
    const infoEl = document.getElementById('ai-file-info');
    if (infoEl) infoEl.textContent = '';

  } catch (err) {
    _clearKey(); // always clear on error too
    let msg = err.message || 'Ocurrió un error inesperado.';
    // Friendly CORS hint
    if (msg.toLowerCase().includes('failed to fetch') || msg.toLowerCase().includes('networkerror')) {
      msg += ' — Verifica tu conexión a internet. Si el proveedor bloquea solicitudes desde el navegador, prueba con otro proveedor.';
    }
    _setStatus('error', '❌ ' + msg);
  } finally {
    importBtn.disabled = false;
  }
}
