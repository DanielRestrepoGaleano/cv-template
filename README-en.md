# 📄 Developer CV Template (Free & Open Source)

Welcome to the ultimate Resume/CV template for developers!

This template was born from a common frustration: **being tired of using resume builder platforms and websites that make you waste hours filling out forms, force you to sign up, and ultimately hit you with a paywall just to download your own document.**

Here, you have total control. Your data is yours, the code is yours, and exports are unlimited and free.

## ✨ Features

- 🆓 **100% Free and Open Source:** No sign-ups, no watermarks, no paywalls.
- 🎨 **Clean & Modern Design:** Two-column layout, highly readable typography, and a minimalist style.
- 🖨️ **Native PDF Export:** Uses your browser's print functionality, automatically hiding download buttons thanks to CSS (`@media print`).
- 📝 **Word (.docx) Export:** Direct integration with `docx.js` to generate a structured, fully editable Word file with a single click.
- 🛠️ **No Heavy Dependencies:** A single `index.html` file (using a CDN for the Word library). No Node.js, npm, or complex setup required to get started.

---

## 🚀 Getting Started (Quick Guide)

1. **Download the file:** Clone this repository or simply download the `index.html` file.
2. **Open it in your browser:** Double-click the `index.html` file to see what the CV looks like.
3. **Ask the template for help:** Click the orange `❓ Ayuda / Help` button in the top right corner to read the quick instructions.
4. **Edit the code:** Open the file in your favorite code editor (VS Code, Sublime Text, Notepad++, etc.) and replace the generic placeholder data with your own.

---

## ✏️ How to Edit Your Information

**⚠️ IMPORTANT:** This template generates the Web/PDF layout and the Word file separately. Therefore, **you must update your information in TWO different places** within the `index.html` file.

### Step 1: Edit the HTML (For Web View and PDF)

Look in the first half of the file (inside the `<body>` tag). The code is heavily commented so you can easily find each section:

```html
<!-- MAIN HEADER -->
<h1 style="...">Your Full Name</h1>
<p style="...">Your Profession</p>

<!-- START OF COLUMNS -->
<!-- LEFT COLUMN (30%) -->
<!-- Your contact info, links, and skills go here -->

<!-- RIGHT COLUMN (70%) -->
<!-- Your profile, work experience, education, and courses go here -->
```

Just change the placeholder text to your real data. You can add or remove experience blocks by copying, pasting, or deleting the corresponding `<div>` tags.

### Step 2: Edit the JavaScript (For Word Export)

For the "Download Word" button to work correctly with your real data, scroll down to the bottom of the file, inside the `<script>` tag.

There you will find variables and arrays that build the Word document. You need to replace the hardcoded generic data with yours:

1. **Update the Left Column:** Find the `const leftCol = [...]` variable and modify the text strings:
   ```javascript
   const leftCol = [
     secHeading("Details"),
     lbl("Address"),
     body("Your City, Your Country"), // <- Change this
     lbl("Phone"),
     body("Your Phone Number"), // <- Change this
     // ...
   ];
   ```

2. **Update the Right Column:** Find the `const rightCol = [...]` variable and modify your profile, experience, and education:
   ```javascript
   const rightCol = [
     secHeading("Professional Profile"),
     // Modify your professional summary text
     new Paragraph({ ... text: "Your professional summary here..." }), 
     
     secHeading("Work Experience / Projects"),
     jobTitle("Your Role | Company", "City"),
     dateP("Month Year — Month Year"),
     body("Short description..."),
     bullet("Achievement 1..."),
     bullet("Achievement 2..."),
     // ...
   ];
   ```

3. **Update the Word Document Header:** Near the end of the script, find where `doc = new Document({...})` is configured and change the main title:
   ```javascript
   new TextRun({ text: "YOUR FULL NAME", bold: true, ... }),
   new TextRun({ text: "YOUR PROFESSION", size: 26, ... }),
   ```

4. **Change the download file name:** Find the final line where the download is triggered and put your name:
   ```javascript
   a.download = "Your_Name_CV.docx";
   ```

---

## 🖨️ Tips for PDF Export

When you click the **"Download PDF"** button, your browser's print dialog will open. For the best results:

1. **Destination:** Select "Save as PDF".
2. **Margins:** Select "None" or "Default" (adjust depending on how the preview looks).
3. **Options:** Be sure to **uncheck** "Headers and footers" to prevent the date, URL, and page number injected by the browser from showing up on your CV.

*(The download buttons are automatically hidden in the PDF thanks to the `.no-print` class set in the CSS).*

---

## 🛠️ Built With

- **HTML5:** For document structure.
- **Inline CSS:** Embedded styles to keep it a single file and guarantee portability.
- **Vanilla JavaScript:** Basic functions to handle printing and downloading.
- **[docx.js](https://docx.js.org/):** A powerful JavaScript library used via CDN (`unpkg.com`) to dynamically generate and download the `.docx` file entirely on the client side.

---

## 🤝 Contributing and License

This project is **Public Domain / MIT License**. Feel free to clone it, modify it, adapt it to your needs, and share it with other developers or professionals who are tired of paying just to build a simple CV.

If you think you can improve the code (for example, by automating the JavaScript to read directly from the HTML DOM so users don't have to write their data twice), Pull Requests are completely welcome!

We also accept ideas on how to make creating this CV easier for people who don't know how to code.

---
*Built by developers, for developers. Best of luck in your job search!* 🚀