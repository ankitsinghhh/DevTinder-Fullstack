# 📘 Lecture 15 Notes – DevTinder Frontend


---

## ⚡ Installing Vite with React

### 1️⃣ Create the project:

```bash
npm create vite@latest devtinder-ui -- --template react
```

* `npm create vite@latest` → creates a new project using Vite.
* `devtinder-ui` → your project folder name.
* `--template react` → uses React template.

---

### 2️⃣ Install dependencies:

```bash
cd devtinder-ui
npm install
```

---

### 3️⃣ Run the dev server:

```bash
npm run dev
```

* Runs the project locally.
* Default URL: `http://localhost:5173`.

---

## 📂 Vite + React Folder Structure

When you open the project, you will see:

```
devtinder-ui/
│
├── public/           # Static files (favicon, images, etc.)
│
├── src/              # All your React source code
│   ├── App.css       # App styling (we will delete for fresh design)
│   ├── App.jsx       # Main App component (all UI will be built here)
│   ├── index.css     # Global CSS
│   └── main.jsx      # 🚀 Entry point of the app
│
├── index.html        # HTML template for React to inject into
│
├── package.json      # Project dependencies & scripts
│
└── vite.config.js    # Vite configuration
```

---

## 🚀 Understanding `main.jsx` (entry point)

* This file **starts your React app**.
* It **wraps the `<App />` component inside `<React.StrictMode>`** and mounts it to the DOM.
* It imports `index.css` for global styles.

Example:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🏗️ What we will do next:

✅ Delete `App.css` to remove default styles since we will build a **clean, fresh UI** for DevTinder.

✅ Build **clean component structure inside `App.jsx`** step-by-step.

---

## 💡 Why Vite over CRA?

* ⚡ **Faster builds & dev server refresh.**
* 🛠️ Simpler and modern configuration.
* 🚀 Better DX for React projects.

---

