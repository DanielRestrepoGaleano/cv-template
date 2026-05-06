# 📄 CV Builder & AI Coach

>[!IMPORTANT]
> 🇺🇸 English version (`README_EN.md`)


Una aplicación web moderna, rápida y 100% del lado del cliente para crear, editar y exportar tu Currículum Vitae. Ahora impulsada por Inteligencia Artificial para importar datos de tus CVs antiguos y darte feedback en tiempo real para mejorar tu perfil profesional.

## ✨ Características Principales

- 🤖 **Coach de CV con IA Integrado:** Un chat inteligente que lee tu CV en tiempo real y te da consejos personalizados (ej. *"Deberías agrupar tus habilidades en categorías"*, *"Añade métricas a esta experiencia laboral"*).
- 🪄 **Importación Mágica con IA:** ¿Tienes un PDF o Word viejo? Súbelo, pon tu API Key, y la IA extraerá todos los datos rellenando el formulario por ti automáticamente.
- 📷 **Soporte para Foto de Perfil:** Sube, recorta y ajusta tu foto directamente desde el editor visual.
- 🆓 **100% Gratuito y de Código Abierto:** Sin registros, sin marcas de agua, sin muros de pago.
- 💾 **Autoguardado y Privacidad Absoluta:** Tus datos se guardan en el `localStorage` de tu navegador. **Tu API Key nunca se guarda** (solo vive en memoria RAM) y no hay servidores intermediarios.
- 🌐 **Bilingüe (ES / EN):** Un botón cambia el idioma de toda la interfaz. Mantén una versión de tu CV en español y otra en inglés simultáneamente.
- 🖨️ **Exportación Nativa:** Descarga tu CV en formato **PDF** perfecto para imprimir, o en **Word (.docx)** con un solo clic.
- 🛠️ **Sin dependencias pesadas:** HTML, CSS y Vanilla JS. No requiere Node.js, npm ni servidor. Listo para GitHub Pages.

---

## 🚀 Cómo Empezar (Guía Rápida)

1. **Descarga el proyecto:** Clona el repositorio o descarga los archivos en una carpeta.
2. **Abre `index.html` en tu navegador:** Haz doble clic para ver la aplicación con datos de ejemplo precargados.
3. **Usa la IA o rellena a mano:** Puedes usar el botón **🤖 Importar CV con IA** para cargar tus datos desde un PDF viejo, o simplemente rellenar el formulario lateral izquierdo.
4. **Pide consejos a la IA:** Abre el **💬 Chat IA**, configura tu modelo favorito (OpenAI, Claude, Gemini o Groq) y pregúntale cómo mejorar tu perfil para una oferta específica.
5. **Exporta:** Cambia entre idiomas (🌐 ES → EN) y usa los botones de la barra superior para descargar tu PDF o Word.

---

## ✏️ Cómo Editar tu Información

No necesitas tocar el código. Todo se gestiona desde el panel lateral izquierdo:

| Sección             | Qué ingresar                                                             |
|---------------------|--------------------------------------------------------------------------|
| **Foto de Perfil**  | Sube tu imagen y ajusta el tamaño del marco visualmente.                 |
| **Nombre / Cargo**  | Tu nombre completo y tu especialidad.                                    |
| **Contacto**        | Dirección, teléfono y correo electrónico.                                |
| **Enlaces**         | Texto y URL de tus perfiles (GitHub, LinkedIn, portafolio, etc.).        |
| **Perfil**          | Resumen profesional en 3-5 líneas.                                       |
| **Experiencia**     | Cargo, empresa, período, descripción y logros (uno por línea).           |
| **Educación**       | Título, institución y período de cada estudio.                           |
| **Habilidades**     | Categoría y tecnologías/herramientas (ej. "Frontend: React, Vue, CSS").  |
| **Certificaciones** | Nombre del curso, entidad y fecha.                                       |
| **⚙️ Secciones**   | Oculta secciones enteras o cámbiales el título a tu gusto.               |

---

## 🔒 Privacidad y Seguridad (IA)

La integración con IA está diseñada pensando en la seguridad:
- Las llamadas a las APIs de OpenAI, Anthropic, Google o Groq se hacen **directamente desde tu navegador**.
- **La API Key no se guarda en el disco duro**, ni en cookies, ni en `localStorage`. Solo existe en la memoria de la pestaña activa y desaparece al recargar la página.
- Tus datos personales no pasan por ningún servidor nuestro.

---

## 🏗️ Estructura del Proyecto

```text
├── index.html         ← Entrada principal
├── style.css          ← Estilos (barra, panel editor, vista previa, chat IA, print)
├── data.js            ← Modelo de datos: cvData (ES/EN) y etiquetas de UI
├── app.js             ← Lógica core: renderizado, localStorage, exportaciones
├── ai-import.js       ← Lógica del Chat IA y de importación de PDFs/Words
└── photo-upload.js    ← Lógica para el manejo, vista previa y tamaño de la foto
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 / CSS3 / Vanilla JS (ES6+):** Cero frameworks. Manipulación directa del DOM.
- **[docx.js](https://docx.js.org/):** Generación de `.docx` 100% en el cliente.
- **[PDF.js](https://mozilla.github.io/pdf.js/) & [JSZip](https://stuk.github.io/jszip/):** Extracción de texto de documentos en el navegador.
- **APIs LLM:** Soporte nativo para OpenAI, Anthropic, Google Gemini y Groq.

---

## 🤝 Contribuir y Licencia

Este proyecto es de **dominio público / Licencia MIT**. Siéntete libre de clonarlo, modificarlo, alojarlo en GitHub Pages y compartirlo.

¡Los *Pull Requests* son bienvenidos!

---
*Hecho por desarrolladores, para desarrolladores. ¡Mucho éxito en tu búsqueda laboral!* 🚀

---
