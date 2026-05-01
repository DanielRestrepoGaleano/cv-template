# 📄 Developer CV Template (Free & Open Source)

Welcome to the ultimate Resume/CV template for developers!

This template was born from a common frustration: **being tired of resume builder platforms that waste your time, force you to sign up, and hit you with a paywall just to download your own document.**

Here, you have total control. Your data is yours, the code is yours, and exports are unlimited and free.

## ✨ Features

- 🆓 **100% Free and Open Source:** No sign-ups, no watermarks, no paywalls.
- 🎨 **Clean & Modern Design:** Two-column layout, readable typography, and a minimalist style.
- ✍️ **Graphical Editing Interface:** A side panel with a form where you fill in your data — no code editing required.
- 👁️ **Real-Time Preview:** Every keystroke in the form instantly updates the CV preview.
- 💾 **Auto-Save in the Browser:** Your data is automatically saved to `localStorage`. Close the tab and come back — everything is still there.
- 🌐 **Bilingual (ES / EN):** A single button switches the entire interface language. You can maintain an independent Spanish and English version of your CV.
- 🖨️ **Native PDF Export:** Uses the browser's print function; the editing panel is automatically hidden.
- 📝 **One-Click Word (.docx) Export:** Generates the `.docx` file by reading directly from the form. The filename is created automatically from your name.
- 🛠️ **No Heavy Dependencies:** Four static files (`index.html`, `style.css`, `data.js`, `app.js`). No Node.js, npm, or server required.

---

## 🚀 Getting Started (Quick Guide)

1. **Download the project:** Clone the repository or download `index.html`, `style.css`, `data.js`, and `app.js` into the same folder.
2. **Open `index.html` in your browser:** Double-click it to see the app with pre-loaded example data.
3. **Fill in the form:** The left panel contains fields for your name, profession, contact info, experience, education, and skills. The preview updates instantly.
4. **Switch languages** with the **🌐 EN → ES** button to edit the Spanish version of your CV.
5. **Export** using the buttons in the top toolbar when you're ready.

---

## ✏️ How to Edit Your Information

No code editing needed. All your information is managed from the **left side panel**:

| Section              | What to enter                                                                  |
|----------------------|--------------------------------------------------------------------------------|
| **Name / Profession**| Your full name and your job title or specialty.                                |
| **Contact**          | Address, phone number, and email.                                              |
| **Links**            | Label and URL for your profiles (GitHub, LinkedIn, portfolio, etc.).           |
| **Profile**          | Professional summary in 3–5 lines.                                             |
| **Experience**       | Role, company, period, description, and achievements (one per line).           |
| **Education**        | Degree, institution, and period for each entry.                                |
| **Skills**           | Category and technologies/tools (e.g. "Frontend: React, Vue, CSS").            |
| **Certifications**   | Course name, issuing entity, and date.                                         |

You can **add or remove entries** in each section using the `+` and `×` buttons.

---

## 🌐 Language Switching

Click the **🌐 EN → ES** button in the top toolbar to toggle between English and Spanish.

- Each language has its own **independent dataset**.
- The form and CV preview switch to the selected language.
- Both versions are saved simultaneously in `localStorage`.

---

## 💾 Auto-Save

There is no "Save" button. Every time you type in the form or add/remove an entry, the data is automatically saved to your browser's `localStorage`.

To restore the **example data**, use the **↺ Reset** button in the toolbar.

---

## 🖨️ PDF Export Tips

1. Click **📄 Download PDF** in the top toolbar.
2. Your browser's print dialog will open.
3. Select **"Save as PDF"** as the destination.
4. In the advanced options, **uncheck "Headers and footers"** for a clean output.
5. Adjust margins if necessary (recommended: "None" or "Default").

The editing panel and toolbar are automatically hidden in the PDF.

---

## 📝 Word Export

Click **📝 Download Word**. The file is generated instantly on the client side (no data is sent to any server) and downloaded as `YOUR_NAME_CV.docx`, built automatically from the form data.

---

## 🏗️ Project Structure

```
├── index.html   ← Main entry point (empty HTML shell + script references)
├── style.css    ← All styles (toolbar, editor panel, CV preview, print)
├── data.js      ← Data model: cvData (ES/EN) and bilingual UI labels
├── app.js       ← Logic: renderCV(), renderForm(), localStorage, exports
└── cv.html      ← Original single-file template (kept for reference)
```

**Single Source of Truth:** all CV information lives in the `cvData` object defined in `data.js` and edited through the form. Both the HTML preview and the Word document are generated by reading exactly the same object.

---

## 🛠️ Built With

- **HTML5 / CSS3:** Structure and styles in separate files.
- **Vanilla JavaScript (ES6+):** No frameworks. DOM manipulation, `localStorage`, and dynamic generation.
- **[docx.js](https://docx.js.org/):** `.docx` generation library loaded via CDN (`unpkg.com`), executed 100% on the client.

---

## 🤝 Contributing and License

This project is **Public Domain / MIT License**. Feel free to clone it, modify it, and share it.

Pull Requests are welcome. Some ideas for contributions:
- New color palettes or design themes.
- Support for additional languages.
- Import/export of the JSON data object.

---
*Built by developers, for developers. Best of luck in your job search!* 🚀