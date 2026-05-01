## ✨ Características

- 🆓 **100% Gratuito y de Código Abierto:** Sin registros, sin marcas de agua, sin muros de pago.
- 🎨 **Diseño Moderno y Limpio:** Estructura a dos columnas, tipografías legibles y estilo minimalista.
- ✍️ **Interfaz Gráfica de Edición:** Panel lateral con formulario donde rellenas tus datos sin tocar el código.
- 👁️ **Vista Previa en Tiempo Real:** Cada vez que escribes en el formulario, el CV se actualiza instantáneamente.
- 💾 **Autoguardado en el Navegador:** Tus datos se guardan automáticamente en el `localStorage`. Cierra la pestaña y vuelve: todo sigue ahí.
- 🌐 **Bilingüe (ES / EN):** Un botón cambia el idioma de toda la interfaz. Puedes mantener una versión del CV en español y otra en inglés de forma independiente.
- 🖨️ **Exportación a PDF Nativa:** Usa la función de impresión del navegador; el panel de edición se oculta automáticamente.
- 📝 **Exportación a Word (.docx) con un clic:** Genera el archivo `.docx` leyendo directamente del formulario. El nombre del archivo se crea automáticamente con tu nombre.
- 🛠️ **Sin dependencias pesadas:** Cuatro archivos estáticos (`index.html`, `style.css`, `data.js`, `app.js`). No requiere Node.js, npm ni servidor.

---

## 🚀 Cómo Empezar (Guía Rápida)

1. **Descarga el proyecto:** Clona el repositorio o descarga los archivos `index.html`, `style.css`, `data.js` y `app.js` en la misma carpeta.
2. **Abre `index.html` en tu navegador:** Haz doble clic para ver la aplicación con datos de ejemplo precargados.
3. **Rellena el formulario:** En el panel izquierdo encontrarás los campos para tu nombre, profesión, contacto, experiencia, educación y habilidades. La vista previa se actualiza al instante.
4. **Cambia el idioma** con el botón **🌐 ES → EN** para editar la versión en inglés de tu CV.
5. **Exporta** con los botones de la barra superior cuando estés listo.

---

## ✏️ Cómo Editar tu Información

No es necesario editar ningún archivo de código. Toda la información se gestiona desde el **panel lateral izquierdo**:

| Sección             | Qué ingresar                                                             |
|---------------------|--------------------------------------------------------------------------|
| **Nombre / Profesión** | Tu nombre completo y tu cargo o especialidad.                         |
| **Contacto**        | Dirección, teléfono y correo electrónico.                                |
| **Enlaces**         | Texto y URL de tus perfiles (GitHub, LinkedIn, portafolio, etc.).        |
| **Perfil**          | Resumen profesional en 3-5 líneas.                                       |
| **Experiencia**     | Cargo, empresa, período, descripción y logros (uno por línea).           |
| **Educación**       | Título, institución y período de cada estudio.                           |
| **Habilidades**     | Categoría y tecnologías/herramientas (ej. "Frontend: React, Vue, CSS").  |
| **Certificaciones** | Nombre del curso, entidad y fecha.                                       |

Puedes **agregar o eliminar entradas** en cada sección con los botones `+` y `×`.

---

## 🌐 Cambio de Idioma

Haz clic en el botón **🌐 ES → EN** en la barra superior para alternar entre español e inglés.

- Cada idioma tiene su **propio conjunto de datos** independiente.
- El formulario y la vista previa del CV cambian al idioma seleccionado.
- Ambas versiones se guardan simultáneamente en el `localStorage`.

---

## 💾 Autoguardado

No existe un botón "Guardar". Cada vez que escribes en el formulario o agregas/eliminas una entrada, los datos se guardan automáticamente en el `localStorage` de tu navegador.

Si quieres volver a los **datos de ejemplo**, usa el botón **↺ Restablecer** en la barra superior.

---

## 🖨️ Exportación a PDF

1. Haz clic en **📄 Descargar PDF** en la barra superior.
2. Se abrirá el diálogo de impresión de tu navegador.
3. Selecciona **"Guardar como PDF"** como destino.
4. En las opciones avanzadas, **desmarca "Encabezados y pies de página"** para una presentación limpia.
5. Ajusta los márgenes si es necesario (recomendado: "Ninguno" o "Predeterminado").

El panel de edición y la barra de botones se ocultan automáticamente en el PDF.

---

## 📝 Exportación a Word

Haz clic en **📝 Descargar Word**. El archivo se genera al instante en el cliente (sin enviar datos a ningún servidor) y se descarga con el nombre `TU_NOMBRE_CV.docx` formado automáticamente a partir de los datos del formulario.

---

## 🏗️ Estructura del Proyecto

```
├── index.html   ← Entrada principal (HTML vacío + referencias a los scripts)
├── style.css    ← Todos los estilos (barra, panel editor, vista previa, print)
├── data.js      ← Modelo de datos: cvData (ES/EN) y etiquetas de UI bilingües
├── app.js       ← Lógica: renderCV(), renderForm(), localStorage, exportaciones
└── cv.html      ← Archivo original (conservado como referencia)
```

**Fuente única de verdad:** toda la información del CV vive en el objeto `cvData` definido en `data.js` y editado a través del formulario. La vista previa HTML y el documento Word se generan leyendo exactamente el mismo objeto.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 / CSS3:** Estructura y estilos en archivos separados.
- **JavaScript Vanilla (ES6+):** Sin frameworks. Manipulación del DOM, `localStorage` y generación dinámica.
- **[docx.js](https://docx.js.org/):** Librería de generación de `.docx` cargada vía CDN (`unpkg.com`), ejecutada 100% en el cliente.

---

## 🤝 Contribuir y Licencia

Este proyecto es de **dominio público / Licencia MIT**. Siéntete libre de clonarlo, modificarlo y compartirlo.

Los *Pull Requests* son bienvenidos. Algunas ideas para contribuir:
- Nuevas paletas de color o temas de diseño.
- Soporte para más idiomas.
- Opción de importar/exportar el JSON de datos.

---
*Hecho por desarrolladores, para desarrolladores. ¡Mucho éxito en tu búsqueda laboral!* 🚀
