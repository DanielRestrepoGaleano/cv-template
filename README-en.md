# 📄 CV Builder & AI Coach

A modern, fast, 100% client-side web application to create, edit, and export your Resume/CV. Now powered by Artificial Intelligence to import data from your old resumes and provide real-time feedback to level up your professional profile.

## ✨ Key Features

- 🤖 **Integrated AI CV Coach:** A smart chat that reads your active CV and gives you tailored advice (e.g., *"You should group your skills by category"*, *"Add clear metrics to this job experience"*).
- 🪄 **Magic AI Import:** Have an old PDF or Word document? Upload it, provide your API Key, and the AI will extract all the data and populate the form for you automatically.
- 📷 **Profile Photo Support:** Upload, crop, and adjust the size of your photo directly from the visual editor.
- 🆓 **100% Free & Open Source:** No sign-ups, no watermarks, no paywalls.
- 💾 **Auto-Save & Absolute Privacy:** Your data is saved in your browser's `localStorage`. **Your API Key is NEVER saved** (it only lives in RAM) and there are no middleman servers.
- 🌐 **Bilingual (ES / EN):** One click switches the entire UI language. Keep an English and a Spanish version of your CV simultaneously.
- 🖨️ **Native Export:** Download your CV in a print-perfect **PDF** format or as a **Word (.docx)** document with a single click.
- 🛠️ **No Heavy Dependencies:** HTML, CSS, and Vanilla JS. No Node.js, no npm, no servers required. Ready for GitHub Pages.

---

## 🚀 Quick Start

1. **Download the project:** Clone the repository or download the files into a folder.
2. **Open `index.html` in your browser:** Double-click to see the app loaded with dummy data.
3. **Use AI or type manually:** Click **🤖 Import CV with AI** to load data from an old PDF, or simply fill out the left sidebar form.
4. **Ask the AI for advice:** Open the **💬 AI Chat**, set up your favorite model (OpenAI, Claude, Gemini, or Groq) and ask how to tailor your profile for a specific job offer.
5. **Export:** Switch languages (🌐 EN → ES) and use the top bar buttons to download your PDF or Word document.

---

## ✏️ How to Edit Your Info

No coding required. Everything is managed from the **left sidebar panel**:

| Section             | What to enter                                                            |
|---------------------|--------------------------------------------------------------------------|
| **Profile Photo**   | Upload your image and visually adjust the frame size.                    |
| **Name / Role**     | Your full name and your job title/specialty.                             |
| **Contact**         | Address, phone number, and email.                                        |
| **Links**           | Labels and URLs for your profiles (GitHub, LinkedIn, Portfolio, etc.).   |
| **Profile**         | Professional summary in 3-5 lines.                                       |
| **Experience**      | Role, company, dates, description, and achievements (one per line).      |
| **Education**       | Degree, institution, and dates.                                          |
| **Skills**          | Category and technologies (e.g., "Frontend: React, Vue, CSS").           |
| **Certifications**  | Course name, issuer, and date.                                           |
| **⚙️ Sections**     | Hide entire sections or rename their titles to your liking.              |

---

## 🔒 Privacy and Security (AI)

The AI integration was built with strict security in mind:
- Calls to OpenAI, Anthropic, Google, or Groq APIs are made **directly from your browser**.
- **The API Key is not saved to your hard drive**, cookies, or `localStorage`. It only exists in the active tab's memory and is wiped upon reloading.
- Your personal data does not pass through any intermediate servers.

---

## 🏗️ Project Structure

```text
├── index.html         ← Main entry point
├── style.css          ← Styles (toolbar, editor, preview, AI chat, print)
├── data.js            ← Data model: cvData (ES/EN) and bilingual UI labels
├── app.js             ← Core logic: rendering, localStorage, exports
├── ai-import.js       ← AI Chat & PDF/Word import logic
└── photo-upload.js    ← Logic for photo handling, preview, and sizing
```

---

## 🛠️ Technologies Used

- **HTML5 / CSS3 / Vanilla JS (ES6+):** Zero frameworks. Direct DOM manipulation.
- **[docx.js](https://docx.js.org/):** Client-side `.docx` generation.
- **[PDF.js](https://mozilla.github.io/pdf.js/) & [JSZip](https://stuk.github.io/jszip/):** In-browser document text extraction.
- **LLM APIs:** Native support for OpenAI, Anthropic, Google Gemini, and Groq.

---

## 🤝 Contributing & License

This project is **Public Domain / MIT License**. Feel free to clone, modify, host it on GitHub Pages, and share it.

*Pull Requests* are highly welcome!

---
*Built by developers, for developers. Best of luck in your job search!* 🚀