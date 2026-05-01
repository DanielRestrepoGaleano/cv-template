## ✨ Características

- 🆓 **100% Gratuito y de Código Abierto:** Sin registros, sin marcas de agua, sin muros de pago.
- 🎨 **Diseño Moderno y Limpio:** Estructura a dos columnas, tipografías legibles y un estilo minimalista.
- 🖨️ **Exportación a PDF Nativa:** Utiliza la función de impresión del navegador, ocultando automáticamente los botones gracias a CSS (`@media print`).
- 📝 **Exportación a Word (.docx):** Integración directa con `docx.js` para generar un archivo Word estructurado y editable con un solo clic.
- 🛠️ **Sin dependencias pesadas:** Un solo archivo `index.html` (usa un CDN para la librería de Word). No requiere Node.js, npm, ni configuraciones complejas para empezar.

---

## 🚀 Cómo Empezar (Guía Rápida)

1. **Descarga el archivo:** Clona este repositorio o simplemente descarga el archivo `index.html`.
2. **Abre el archivo en tu navegador:** Haz doble clic en el archivo `index.html` para ver cómo luce el CV.
3. **Pide Ayuda a la Plantilla:** Haz clic en el botón naranja `❓ Ayuda` de la esquina superior derecha para leer las instrucciones rápidas.
4. **Edita el código:** Ábrelo en tu editor de código favorito (VS Code, Sublime Text, Notepad++, etc.) y reemplaza los datos genéricos de ejemplo por los tuyos.

---

## ✏️ Cómo Editar tu Información

**⚠️ IMPORTANTE:** Esta plantilla genera el diseño web/PDF y el archivo Word de forma separada. Por lo tanto, **debes actualizar tu información en DOS lugares diferentes** dentro del archivo `index.html`.

### Paso 1: Editar el HTML (Para la vista Web y el PDF)

Busca en la primera mitad del archivo (dentro de la etiqueta `<body>`). El código está fuertemente comentado para que encuentres cada sección fácilmente:

```html
<!-- ENCABEZADO PRINCIPAL -->
<h1 style="...">Tu Nombre Completo</h1>
<p style="...">Tu Profesión</p>

<!-- INICIO DE COLUMNAS -->
<!-- COLUMNA IZQUIERDA (30%) -->
<!-- Aquí va tu información de contacto, enlaces y habilidades -->

<!-- COLUMNA DERECHA (70%) -->
<!-- Aquí va tu perfil, experiencia laboral, educación y cursos -->
```

Solo debes cambiar el texto genérico por tus datos reales. Puedes añadir o eliminar bloques de experiencia copiando, pegando o borrando los `<div>` correspondientes.

### Paso 2: Editar el JavaScript (Para la exportación a Word)

Para que el botón de "Descargar Word" funcione correctamente con tus datos reales, debes bajar hasta el final del archivo, dentro de la etiqueta `<script>`. 

Allí encontrarás variables y arrays que construyen el documento de Word. Debes reemplazar los datos genéricos (hardcoded) por los tuyos:

1. **Actualiza la Columna Izquierda:** Busca la variable `const leftCol = [...]` y modifica las cadenas de texto:
   ```javascript
   const leftCol = [
     secHeading("Detalles"),
     lbl("Dirección"),
     body("Tu Ciudad, Tu País"), // <- Cambia esto
     lbl("Teléfono"),
     body("Tu Teléfono"), // <- Cambia esto
     // ...
   ];
   ```

2. **Actualiza la Columna Derecha:** Busca la variable `const rightCol = [...]` y modifica tu perfil, experiencia y estudios:
   ```javascript
   const rightCol = [
     secHeading("Perfil Profesional"),
     // Modifica el texto de tu perfil profesional
     new Paragraph({ ... text: "Tu resumen profesional aquí..." }), 
     
     secHeading("Experiencia Laboral / Proyectos"),
     jobTitle("Tu Cargo | Empresa", "Ciudad"),
     dateP("Mes Año — Mes Año"),
     body("Descripción corta..."),
     bullet("Logro 1..."),
     bullet("Logro 2..."),
     // ...
   ];
   ```

3. **Actualiza el Encabezado del Documento Word:** Cerca del final del script, busca donde se configura el `doc = new Document({...})` y cambia el título principal:
   ```javascript
   new TextRun({ text: "TU NOMBRE COMPLETO", bold: true, ... }),
   new TextRun({ text: "TU PROFESIÓN", size: 26, ... }),
   ```

4. **Cambia el nombre del archivo de descarga:** Busca la línea final donde se crea la descarga y pon tu nombre:
   ```javascript
   a.download = "Tu_Nombre_CV.docx";
   ```

---

## 🖨️ Consejos para la Exportación a PDF

Al hacer clic en el botón **"Descargar PDF"**, se abrirá la ventana de impresión de tu navegador. Para obtener los mejores resultados:

1. **Destino:** Selecciona "Guardar como PDF".
2. **Márgenes:** Selecciona "Ninguno" o "Predeterminado" (ajusta según lo veas en la vista previa).
3. **Opciones:** Asegúrate de **desmarcar** "Encabezados y pies de página" para evitar que salga la fecha, la URL y el número de página que suele poner el navegador.

*(El botón de descarga se oculta automáticamente en el PDF gracias a la clase `.no-print` configurada en el CSS).*

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Para la estructura del documento.
- **CSS Inline:** Estilos incrustados para facilitar que sea un archivo único y garantizar su portabilidad.
- **JavaScript Vanilla:** Funciones básicas para manejar la impresión y la descarga.
- **[docx.js](https://docx.js.org/):** Una poderosa librería de JavaScript utilizada vía CDN (`unpkg.com`) para generar y descargar dinámicamente el archivo `.docx` directamente del lado del cliente.

---

## 🤝 Contribuir y Licencia

Este proyecto es de **dominio público / Licencia MIT**. Siéntete libre de clonarlo, modificarlo, adaptarlo a tus necesidades y compartirlo con otros desarrolladores o profesionales que estén cansados de pagar por hacer un simple CV.

Si crees que puedes mejorar el código (por ejemplo, automatizando que el JavaScript lea directamente del DOM del HTML para no tener que escribir los datos dos veces), ¡los *Pull Requests* son totalmente bienvenidos!

También aceptamos ideas para facilitar la creación del CV para personas que no sepan de código.

---
*Hecho por desarrolladores, para desarrolladores. ¡Mucho éxito en tu búsqueda laboral!* 🚀
