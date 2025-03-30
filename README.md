# Care Management System – Vue + Express + SQLite

This is a simplified care management system for aged care facilities.  
The frontend is built with Vue (Vite), and the backend uses Express and SQLite.  

---

## 📁 Project Structure

```
projectA/
├── frontend/        # Vue 3 (Vite)
├── backend/         # Express + SQLite
├── package.json     # Dev scripts (with concurrently)
```

---

## ✨ Step 1: Install dependencies (only once)

Install dependencies separately for root, frontend, and backend:

```bash
# Root (for concurrently, Prettier, etc.)
npm install

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

---

## 🚀 Step 2: Start the development servers

From the project root, run the following command:

```bash
npm run dev
```

This will start both:

- Vite (Frontend): http://localhost:5173  
- Express (Backend API): http://localhost:3000

---

## 🗄️ SQLite Database

- Database file: `backend/database.sqlite` (auto-generated on server start)
- DB schema/init: `backend/db.js`
- No `.env` file or external DB setup required

---

## 🔧 Technologies Used

| Layer       | Tech Stack                                      |
|-------------|--------------------------------------------------|
| Frontend    | Vue 3, Vite, Vue Router, Axios, Bootstrap 5, Font Awesome |
| Backend     | Node.js, Express, SQLite3, CORS                  |
| Dev Tools   | concurrently, nodemon (for auto-restart), Prettier |

---

## 📊 Quality Goals (ISO/IEC 25010 aligned)

| Attribute              | Implementation Example                                 |
|------------------------|--------------------------------------------------------|
| Usability              | Based on Figma + Bootstrap styling                     |
| Accessibility          | Lighthouse score target: **80+**                       |
| Functionality Suitability | 100% coverage of functional requirements              |
| Security               | Login protection on frontend & API input validation    |
| Maintainability        | Prettier formatting + reusable Vue components          |

---

## 📄 API Endpoints (examples)

- `GET /api/users` – Fetch all users  
- `POST /api/users` – Add new user  
- (More endpoints to be added for patients, appointments, billing, etc.)

---

## ❗ Notes

- `node_modules/`, `dist/`, and `database.sqlite` are excluded via `.gitignore`
- No production deployment included (local development only)
- Manual testing only in Sprint 1 & 2 (no unit/e2e tests)

---

## 👤 Developer Info

- Routing: `frontend/src/router/index.js`
- Entry: `frontend/src/views/Login.vue`, `Dashboard.vue`
- Styling guide: Refer to shared Figma design
- Code format: Prettier, auto-format on save via VSCode
- To format all project files manually:

```bash
npx prettier . --write
```

Use this before submission or push to keep the codebase consistent.

---

## 🛋️ Scripts Summary

From root:

```bash
npm run dev           # Run frontend + backend together
npm run dev:frontend  # Run frontend only
npm run dev:backend   # Run backend only
```

From backend:

```bash
npm run dev           # Start API (via nodemon or node)
```

From frontend:

```bash
npm run dev           # Start Vite server
