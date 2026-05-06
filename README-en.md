### 🇺🇸 `README_EN.md` (Inglés)


# 📄 CV Builder & AI Coach

A modern, fast, 100% client-side web application to create, edit, and export your Resume. Powered by AI to import data from old resumes, get real-time professional feedback, and export ATS-optimized files.

## ✨ Key Features

- 🤖 **Integrated AI CV Coach:** An intelligent chat that reads your CV in real-time and provides personalized advice to level up your professional profile.
- 🪄 **Magic AI Import:** Upload an old PDF or Word doc, provide your API Key, and let the AI populate the form for you automatically.
- 📄 **ATS-Friendly Export:** Includes a dedicated download mode (no tables, no complex graphics) designed to ensure that Applicant Tracking Systems (ATS) read your experience perfectly.
- 📷 **Profile Photo Support:** Upload, crop, and adjust your photo directly from the visual editor.
- 🆓 **100% Free & Open Source:** No sign-ups, no watermarks, no paywalls.
- 💾 **Auto-Save & Absolute Privacy:** Data is saved in your browser's `localStorage`. **Your API Key is NEVER stored** (RAM only) and there are no middleman servers.
- 🌐 **Bilingual (ES / EN):** Switch the entire UI language with one click.
- 🛠️ **Lightweight:** HTML, CSS, and Vanilla JS. Ready for GitHub Pages.

---

## 🚀 Quick Start

1. **Open `index.html`:** Run it directly in your browser.
2. **Edit your CV:** Use the left sidebar. You can hide or rename sections as needed.
3. **Optimize with AI:** Use the **💬 AI Chat** for professional advice and the **🤖 Import CV** button to parse old documents.
4. **Export:**
   - **📄 PDF:** Perfect for email or printing.
   - **📝 Word:** Standard visual format.
   - **📋 ATS:** Optimized plain-text structure. *We recommend checking your result at [Resume Worded](https://resumeworded.com/) to maximize your score.*

---

## 🔒 Privacy and Security

Your data stays on your machine:
- **Zero-Server:** All processing happens locally in your browser.
- **RAM-Only:** API Keys are never written to disk. They disappear as soon as you close the tab.

---

## 🏗️ Project Structure

```text
├── index.html         ← Main entry point
├── style.css          ← Styles (toolbar, preview, AI chat, print)
├── data.js            ← Data model and UI labels
├── app.js             ← Core logic and export functions (PDF, Word, ATS)
├── ai-import.js       ← AI Chat and PDF/Word import logic
└── photo-upload.js    ← Profile photo management
```

---

## 🤝 Contributing & License

This project is **Public Domain / MIT License**. Feel free to clone, modify, host it on GitHub Pages, and share it.

*Built by developers, for developers. Best of luck in your job search!* 🚀