# 🏥 Care Management System – Vue + Express + SQLite

A simplified care management system designed for aged care facilities.  
Frontend built with Vue 3 (Vite), backend with Express.js and SQLite.

---

## 📁 Project Structure

```
projectA/
├── frontend/        # Vue 3 (Vite, Vue Router, Bootstrap, Font Awesome)
├── backend/         # Express.js + SQLite3
├── package.json     # Root-level scripts and tools (concurrently, husky, etc.)
└── .gitignore       # node_modules, dist, database.sqlite excluded
```

---

## ✨ Step 1: Install Dependencies (only once)

Install dependencies for root, frontend, and backend:

```bash
# Root (for concurrently, Prettier, Husky)
npm install

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

---

## 🚀 Step 2: Start the Development Servers

From the root directory:

```bash
npm run dev
```

This will concurrently run:

- **Frontend (Vite):** http://localhost:5173  
- **Backend (Express API):** http://localhost:3000

---

## 🏦 Scripts Summary

From **root**:

```bash
npm run dev            # Run frontend + backend concurrently
npm run dev:frontend   # Run frontend only
npm run dev:backend    # Run backend only
```

From **frontend/**:

```bash
npm run dev            # Start Vite dev server
```

From **backend/**:

```bash
npm run dev            # Start Express server (via nodemon or node)
```

---

## 🧼 Git Cleanup Guide (if commit is blocked)

If you accidentally try to commit `node_modules/` and get a Husky error like:

> 🚫 node_modules should not be committed!

Run the following commands to remove them from Git tracking:

```bash
git rm -r --cached node_modules
git rm -r --cached frontend/node_modules
git rm -r --cached backend/node_modules
git commit -m "Remove node_modules from Git"
git push
```

---

## 🛡 Git Safety – Husky Pre-Commit Hook

This project uses [Husky](https://typicode.github.io/husky/) to block committing `node_modules`.

After cloning this repo, make sure to run:

```bash
npm install
npm run prepare
```

This will activate Husky locally on your machine.

---

## 📄 API Endpoints (Examples)

- `GET /api/users` – Fetch all users
- `POST /api/users` – Add new user  
*(More endpoints for patients, appointments, billing, etc. will be added in Sprint 2)*

---

## 🗄️ SQLite Database

- Database file: `backend/database.sqlite` *(auto-generated on server start)*
- Schema/init logic: `backend/db.js`
- No `.env` file or external DB required

To browse the DB, use VSCode + [SQLite Viewer](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)

---

## 🔧 Technologies Used

| Layer     | Stack                                                   |
|-----------|---------------------------------------------------------|
| Frontend  | Vue 3, Vite, Vue Router, Axios, Bootstrap 5, Font Awesome |
| Backend   | Node.js, Express.js, SQLite3, CORS                      |
| Dev Tools | concurrently, nodemon, Prettier, ESLint, Husky         |

---

## 📊 Quality Goals (ISO/IEC 25010-aligned)

| Attribute                 | Implementation Example                              |
|--------------------------|-----------------------------------------------------|
| Usability                | Figma-based layout, consistent Bootstrap components |
| Accessibility            | Lighthouse score target: **80+**                    |
| Functionality Suitability| All UI components mapped to functional requirements |
| Security                 | Protected routes, login validation                  |
| Maintainability          | Modular Vue components + Prettier formatting        |

---

## 👤 Developer Info & Notes

- Vue Routing: `frontend/src/router/index.js`
- Vue Pages: `frontend/src/views/Login.vue`, `Dashboard.vue`, etc.
- Style Guide: Based on shared Figma file
- Formatting: Auto-format via Prettier + ESLint

To manually format all code:

```bash
npx prettier . --write
```

Run this before submission or final push to keep code consistent.

---

## ❗ Notes

- `node_modules/`, `dist/`, `.sqlite`, and `.env` are excluded via `.gitignore`
- This project is **local-only** (no production deployment included)
- Testing is manual only (Sprint 1–2)
