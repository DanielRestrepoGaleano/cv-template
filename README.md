### 🇪🇸 `README.md` (Español)


# 📄 CV Builder & AI Coach

Una aplicación web moderna, rápida y 100% del lado del cliente para crear, editar y exportar tu Currículum Vitae. Impulsada por IA para importar datos desde archivos antiguos, chatear sobre mejoras para tu perfil y exportar versiones optimizadas para sistemas ATS.

## ✨ Características Principales

- 🤖 **Coach de CV con IA Integrado:** Un chat inteligente que lee tu CV en tiempo real y te da consejos personalizados para mejorar tu perfil profesional.
- 🪄 **Importación Mágica con IA:** ¿Tienes un PDF o Word viejo? Súbelo, pon tu API Key y la IA extraerá los datos rellenando el formulario por ti automáticamente.
- 📄 **Exportación ATS-Friendly:** Incluye un modo de descarga especial (sin tablas ni elementos gráficos complejos) diseñado para que los sistemas de filtrado automático (ATS) lean tu experiencia sin errores.
- 📷 **Soporte para Foto de Perfil:** Sube, recorta y ajusta tu foto directamente desde el editor visual.
- 🆓 **100% Gratuito y de Código Abierto:** Sin registros, sin marcas de agua, sin muros de pago.
- 💾 **Autoguardado y Privacidad Absoluta:** Tus datos se guardan en el `localStorage` de tu navegador. **Tu API Key nunca se guarda** (solo vive en memoria RAM) y no hay servidores intermediarios.
- 🌐 **Bilingüe (ES / EN):** Un botón cambia el idioma de toda la interfaz.
- 🛠️ **Sin dependencias pesadas:** HTML, CSS y Vanilla JS. Listo para GitHub Pages.

---

## 🚀 Cómo Empezar

1. **Abre `index.html`:** Funciona directamente en tu navegador.
2. **Edita tu CV:** Usa el panel lateral para ingresar tus datos. Puedes ocultar/renombrar secciones a tu gusto.
3. **Optimiza con IA:** Usa el **💬 Chat IA** para pedir mejoras y el botón **🤖 Importar CV** para volcar datos de documentos antiguos.
4. **Exporta:**
   - **📄 PDF:** Ideal para enviar por correo o presentar impreso.
   - **📝 Word:** Formato visual clásico.
   - **📋 ATS:** Versión optimizada para portales de empleo. *Te recomendamos probarla en [Resume Worded](https://resumeworded.com/) para maximizar tu puntaje.*

---

## 🔒 Privacidad y Seguridad

Tu información es solo tuya:
- **Zero-Server:** Todo el procesamiento ocurre en tu máquina.
- **Memoria Temporal:** Las API Keys utilizadas para la IA nunca se escriben en disco; desaparecen al cerrar la pestaña.

---

## 🏗️ Estructura del Proyecto

```text
├── index.html         ← Entrada principal
├── style.css          ← Estilos (responsive, chat, print)
├── data.js            ← Modelo de datos y etiquetas UI
├── app.js             ← Lógica principal y exportaciones (PDF, Word, ATS)
├── ai-import.js       ← Lógica de Chat IA e importación de archivos
└── photo-upload.js    ← Gestión de fotos de perfil
```

---

## 🤝 Contribuir y Licencia

Este proyecto es de **dominio público / Licencia MIT**. Siéntete libre de clonarlo, modificarlo, alojarlo en GitHub Pages y compartirlo.

*Hecho por desarrolladores, para desarrolladores. ¡Mucho éxito en tu búsqueda laboral!* 🚀