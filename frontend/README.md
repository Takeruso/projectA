# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## 📁 Frontend Structure Overview (Vue + Vite)

The frontend is organized by role-based directories to keep things clean and scalable.

```bash
frontend/
├── src/
│   ├── views/         # ✅ Page-level components (routed pages)
│   │   ├── Login.vue
│   │   ├── Dashboard.vue
│   │   └── [YourNewPage].vue   ← Add your own routed pages here
│   │
│   ├── components/    # ✅ Reusable UI parts (buttons, cards, etc.)
│   │   └── [YourComponent].vue
│   │
│   ├── router/        # 🛠️ Vue Router settings
│   │   └── index.js   ← Register your pages/routes here
│   │
│   ├── api.js         # (Optional) Axios functions for API
│   └── main.js        # Vue app entry point
```

---

## 🤩 Adding a New Page

1. Create a `.vue` file under `src/views/`  
2. Register it in `src/router/index.js` like so:

```js
import MyPage from '../views/MyPage.vue'

const routes = [
  { path: '/mypage', component: MyPage },
  // ...
]
```

3. Run the server and visit `http://localhost:5173/mypage`

---

## 🧠 Quick Tips

- **Views** = Routed pages (e.g., Login, Dashboard)
- **Components** = Reusable UI (e.g., buttons, cards)
- **Blank page?** ✉️ Check import path, casing, route

> Example: `views/HelloPage.vue` ✔️  
> `import HelloPage from '../views/HelloPage.vue'` ✔️  
> Not: `helloPage.vue`, `./Hello.vue`, or missing from router ❌

---
