'use strict';

/* ── Photo Upload Module ─────────────────────────────────────────────────── */

const PHOTO_MAX_BYTES   = 5 * 1024 * 1024; // 5 MB
const PHOTO_MIME_OK     = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);
const PHOTO_EXT_OK      = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
const PHOTO_SIZE_MIN    = 60;
const PHOTO_SIZE_MAX    = 200;
const PHOTO_SIZE_DEF    = 100;

/* ── Module state (shared across languages) ──────────────────────────────── */
let cvPhotoData = null;  // base64 data-URL or null
let cvPhotoSize = PHOTO_SIZE_DEF;  // frame width in px

/* ── Persistence ─────────────────────────────────────────────────────────── */

function initPhoto() {
  try {
    const saved = localStorage.getItem('cvPhoto');
    if (saved && saved.startsWith('data:image/')) {
      cvPhotoData = saved;
    }
  } catch (_) { /* storage unavailable */ }

  try {
    const raw = parseInt(localStorage.getItem('cvPhotoSize'), 10);
    if (raw >= PHOTO_SIZE_MIN && raw <= PHOTO_SIZE_MAX) cvPhotoSize = raw;
  } catch (_) { /* ignore */ }
}

function _savePhoto() {
  try {
    if (cvPhotoData) {
      localStorage.setItem('cvPhoto', cvPhotoData);
    } else {
      localStorage.removeItem('cvPhoto');
    }
    localStorage.setItem('cvPhotoSize', String(cvPhotoSize));
  } catch (e) {
    // Storage may be full (large images); inform user once
    console.warn('No se pudo guardar la foto en localStorage:', e.message);
  }
}

/* ── Magic-byte validation ───────────────────────────────────────────────── */

/**
 * Reads the first 12 bytes of `file` and returns true if they match a known
 * image signature (JPEG, PNG, GIF, WEBP, AVIF/HEIF).
 */
function _validateMagicBytes(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const b = new Uint8Array(e.target.result);
      // JPEG  — FF D8 FF
      if (b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return resolve(true);
      // PNG   — 89 50 4E 47
      if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47) return resolve(true);
      // GIF   — 47 49 46 38
      if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38) return resolve(true);
      // WEBP  — RIFF (52 49 46 46) at offset 0, WEBP (57 45 42 50) at offset 8
      if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
          b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return resolve(true);
      // AVIF/HEIF — 'ftyp' box at offset 4
      if (b[4] === 0x66 && b[5] === 0x74 && b[6] === 0x79 && b[7] === 0x70) return resolve(true);
      resolve(false);
    };
    reader.onerror = () => resolve(false);
    reader.readAsArrayBuffer(file.slice(0, 12));
  });
}

/* ── Public API ──────────────────────────────────────────────────────────── */

async function handlePhotoUpload(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  // 1. Extension check
  const lastDot = file.name.lastIndexOf('.');
  if (lastDot === -1) {
    alert('El archivo no tiene extensión. Use una imagen con extensión .jpg, .jpeg, .png, .webp, .gif o .avif');
    input.value = '';
    return;
  }
  const ext = ('.' + file.name.slice(lastDot + 1)).toLowerCase();
  if (!PHOTO_EXT_OK.has(ext)) {
    alert('Extensión no válida. Use: .jpg, .jpeg, .png, .webp, .gif o .avif');
    input.value = '';
    return;
  }

  // 2. MIME-type check (some browsers don't set it; allow empty)
  if (file.type && !PHOTO_MIME_OK.has(file.type)) {
    alert('Tipo de archivo no válido. Suba una imagen PNG, JPG, WEBP, GIF o AVIF.');
    input.value = '';
    return;
  }

  // 3. Size check
  if (file.size === 0) {
    alert('El archivo está vacío.');
    input.value = '';
    return;
  }
  if (file.size > PHOTO_MAX_BYTES) {
    alert('La imagen supera el límite de 5 MB. Reduzca el tamaño y vuelva a intentarlo.');
    input.value = '';
    return;
  }

  // 4. Magic-byte check
  const validBytes = await _validateMagicBytes(file);
  if (!validBytes) {
    alert('El archivo no parece ser una imagen válida (firma de bytes no reconocida). Intente con otro archivo.');
    input.value = '';
    return;
  }

  // 5. Read as data-URL
  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target.result;
    if (!dataUrl || !dataUrl.startsWith('data:image/')) {
      alert('No se pudo leer la imagen. Intente de nuevo.');
      input.value = '';
      return;
    }
    cvPhotoData = dataUrl;
    input.value = '';
    _savePhoto();
    refreshPhotoUI();
    renderCV();
  };
  reader.onerror = function () {
    alert('Error al leer el archivo. Intente de nuevo.');
    input.value = '';
  };
  reader.readAsDataURL(file);
}

function removePhoto() {
  cvPhotoData = null;
  _savePhoto();
  refreshPhotoUI();
  renderCV();
}

function setPhotoSize(value) {
  const size = parseInt(value, 10);
  if (isNaN(size) || size < PHOTO_SIZE_MIN || size > PHOTO_SIZE_MAX) return;
  cvPhotoSize = size;
  const lbl = document.getElementById('photo-size-val');
  if (lbl) lbl.textContent = cvPhotoSize + ' px';
  _savePhoto();
  renderCV();
}

function refreshPhotoUI() {
  const thumb     = document.getElementById('photo-preview-thumb');
  const removeBtn = document.getElementById('btn-photo-remove');
  const sizeRow   = document.getElementById('photo-size-row');
  const slider    = document.getElementById('photo-size-slider');
  const sizeVal   = document.getElementById('photo-size-val');

  if (!thumb) return;

  if (cvPhotoData) {
    thumb.src          = cvPhotoData;
    thumb.style.display = 'block';
    if (removeBtn) removeBtn.style.display = 'inline-block';
    if (sizeRow)   sizeRow.style.display   = 'flex';
    if (slider)    slider.value            = cvPhotoSize;
    if (sizeVal)   sizeVal.textContent     = cvPhotoSize + ' px';
  } else {
    thumb.src           = '';
    thumb.style.display = 'none';
    if (removeBtn) removeBtn.style.display = 'none';
    if (sizeRow)   sizeRow.style.display   = 'none';
  }
}

/* ── Getters used by app.js ──────────────────────────────────────────────── */
function getPhotoData() { return cvPhotoData; }
function getPhotoSize() { return cvPhotoSize; }

function resetPhoto() {
  cvPhotoData = null;
  cvPhotoSize = PHOTO_SIZE_DEF;
  _savePhoto();
  refreshPhotoUI();
}
