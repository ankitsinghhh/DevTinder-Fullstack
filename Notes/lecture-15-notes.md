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


In **latest versions**, you **should** enable DaisyUI using:

```css
@plugin "daisyui";
```

in your `index.css` (or `tailwind.css`).

---

### ✅ Clean Explanation:

🛠 **For Tailwind CSS v4.1+ + DaisyUI v5+:**

1️⃣ **Install DaisyUI:**

```bash
npm install -D daisyui@latest
```

2️⃣ **In your `index.css`:**

```css
@import "tailwindcss";
@plugin "daisyui";
```

✅ This **automatically activates DaisyUI** without modifying `tailwind.config.js`.

---

### Why did this change?

* DaisyUI v5+ uses the **new Tailwind plugin pipeline** to simplify activation.
* It reduces clutter in `tailwind.config.js`, allowing **plugin activation directly in CSS**.

---

### To confirm DaisyUI is working:

Add in `App.jsx`:

```jsx
function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button className="btn btn-primary">DaisyUI Button</button>
    </div>
  );
}
```

Run:

```bash
npm run dev
```

✅ You should see a **styled button**, confirming DaisyUI is active.

---

## 🚀 Summary:

✅ For **Tailwind v4.1+ + DaisyUI v5+**:
✅ Install with `npm i -D daisyui`.
✅ Add `@plugin "daisyui";` in your `index.css`.
✅ Use DaisyUI components directly.

---
