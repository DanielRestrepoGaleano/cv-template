# 📄 Developer CV Template (Free & Open Source)

Welcome to the ultimate Resume/CV template for developers!

This template was born out of a common frustration: **being tired of using resume-building platforms and websites that waste your time filling out forms, force you to sign up, and ultimately hit you with a paywall just to download your own document.**

Here, you have total control. Your data is yours, the code is yours, and exports are unlimited and free.

## ✨ Features

- 🆓 **100% Free & Open Source:** No registrations, no watermarks, no paywalls.
- 🎨 **Modern & Clean Design:** Two-column structure, readable typography, and a minimalist style.
- 🖨️ **Native PDF Export:** Uses the browser's built-in print function, automatically hiding the download buttons using CSS (`@media print`).
- 📝 **Word Export (.docx):** Direct integration with `docx.js` to generate a structured, editable Word file with a single click.
- 🛠️ **No heavy dependencies:** A single `index.html` file (uses a CDN for the Word library). No Node.js, npm, or complex setups required to get started.

---

## 🚀 Getting Started (Quick Guide)

1. **Download the file:** Clone this repository or simply download the `index.html` file.
2. **Open the file in your browser:** Double-click the `index.html` file to see how the CV looks.
3. **Edit the code:** Open it in your favorite code editor (VS Code, Sublime Text, Notepad++, etc.) and replace the placeholder data with your own.

---

## ✏️ How to Edit Your Information

**⚠️ IMPORTANT:** This template generates the web/PDF design and the Word file separately. Therefore, **you must update your information in TWO different places** within the `index.html` file.

### Step 1: Edit the HTML (For the Web view and PDF)

Look in the first half of the file (inside the `<body>` tag). The code is heavily commented so you can easily find each section:

```html
<!-- MAIN HEADER -->
<h1 style="...">Your Full Name</h1>
<p style="...">Your Profession</p>

<!-- COLUMNS START -->
<!-- LEFT COLUMN (30%) -->
<!-- Your contact info, links, and skills go here -->

<!-- RIGHT COLUMN (70%) -->
<!-- Your profile, work experience, education, and courses go here -->
```

Just change the placeholder text to your actual data. You can add or remove experience blocks by copying and pasting the corresponding `<div>` elements.

### Step 2: Edit the JavaScript (For Word export)

For the "Download Word" button to work correctly with your data, you need to scroll down to the bottom of the file, inside the `<script>` tag. 

There you will find variables and arrays that build the Word document. You must replace the hardcoded data with your own:

1. **Update the Left Column:** Find the `const leftCol = [...]` variable and modify the text strings:
   ```javascript
   const leftCol = [
     secHeading("Details"),
     lbl("Address"),
     body("Your City, Your Country"), // <- Change this
     lbl("Phone"),
     body("Your Phone"), // <- Change this
     // ...
   ];
   ```

2. **Update the Right Column:** Find the `const rightCol = [...]` variable and modify your profile, experience, and education:
   ```javascript
   const rightCol = [
     secHeading("Profile"),
     // Modify your professional profile text
     new Paragraph({ ... text: "Your professional summary here..." }), 
     
     secHeading("Work Experience"),
     jobTitle("Your Role | Company", "City"),
     dateP("Month Year — Month Year"),
     body("Short description..."),
     bullet("Achievement 1..."),
     bullet("Achievement 2..."),
     // ...
   ];
   ```

3. **Update the Word Document Header:** At the end of the script, find where `doc = new Document({...})` is configured and change the main title:
   ```javascript
   new TextRun({ text: "YOUR FULL NAME", bold: true, ... }),
   new TextRun({ text: "YOUR PROFESSION", size: 26, ... }),
   ```

4. **Change the download file name:** Find the final line where the download is created and put your name:
   ```javascript
   a.download = "Your_Name_CV.docx";
   ```

---

## 🖨️ Tips for PDF Export

When you click the **"Download PDF"** button, your browser's print window will open. For best results:

1. **Destination:** Select "Save as PDF".
2. **Margins:** Select "None" or "Default" (adjust based on the print preview).
3. **Options:** Make sure to **uncheck** "Headers and footers" to prevent the browser from adding the date, URL, and page numbers.

*(The download buttons are automatically hidden in the PDF thanks to the `.no-print` class configured in the CSS).*

---

## 🛠️ Technologies Used

- **HTML5:** For the document structure.
- **Inline CSS:** Embedded styles to keep it as a single file and ensure portability.
- **Vanilla JavaScript:** Basic functions to handle printing and downloading.
- **[docx.js](https://docx.js.org/):** A powerful JavaScript library used via CDN (`unpkg.com`) to dynamically generate and download the `.docx` file directly on the client side.

---

## 🤝 Contributing & License

This project is in the **public domain / MIT License**. Feel free to clone it, modify it, adapt it to your needs, and share it with other developers or professionals who are tired of paying just to build a simple CV.

If you think you can improve the code (for example, by automating the JavaScript to read directly from the HTML DOM so users don't have to write their data twice), Pull Requests are more than welcome!

We also welcome ideas to make CV creation easier for people who don't know how to code.

---
*Built by developers, for developers. Best of luck with your job search!* 🚀