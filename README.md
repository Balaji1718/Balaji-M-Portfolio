# Balaji M — Software Developer Portfolio

A modern, responsive personal developer portfolio showcasing software engineering projects, technical skills, practical experience, and certifications. Built with an editorial "Engineering Notebook" visual aesthetic, smooth animations, and a unified single-server architecture.

## Tech Stack

### Frontend
- **Framework**: React 19
- **Language**: JavaScript (ES Modules, JSX)
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS v4, custom CSS variables, responsive design
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Architecture**: Component-based structure with centralized data modules

### Backend
- **Server**: Node.js & Express
- **API**: Clean modular architecture (`routes`, `controllers`, `middleware`, `config`)
- **Single-Server Integration**: Express serves API routes, static production assets, and Vite middleware during development on a single port (5000)

---

## Project Structure

```
D:\Portfolio\
├── frontend\
│   ├── public\
│   │   ├── favicon.svg
│   │   ├── favicon.ico
│   │   └── robots.txt
│   ├── src\
│   │   ├── assets\
│   │   ├── components\
│   │   │   ├── ui\
│   │   │   │   └── button.jsx
│   │   │   └── portfolio.jsx
│   │   ├── data\
│   │   │   ├── personal.js
│   │   │   ├── projects.js
│   │   │   ├── skills.js
│   │   │   ├── experience.js
│   │   │   └── certifications.js
│   │   ├── lib\
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend\
│   ├── src\
│   │   ├── config\
│   │   │   └── index.js
│   │   ├── controllers\
│   │   │   └── healthController.js
│   │   ├── middleware\
│   │   │   └── errorHandler.js
│   │   ├── routes\
│   │   │   └── api.js
│   │   └── server.js
│   └── package.json
│
├── package.json
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 1. Installation

From the project root:

```bash
cd D:\Portfolio
npm install
```

This installs dependencies for both frontend and backend using npm workspaces.

---

## Development

Start the development server with a single command:

```bash
npm run dev
```

Then open your browser at:
[http://localhost:5000](http://localhost:5000)

During development:
- Express handles API requests at `/api/*`
- Vite middleware serves and hot-reloads (HMR) the React frontend at `/*`
- All traffic runs through **port 5000** with no need for multiple terminals

---

## Production Build & Start

To build the optimized frontend and start the production Express server:

```bash
# 1. Build the frontend
npm run build

# 2. Start the Express server
npm start
```

Then open:
[http://localhost:5000](http://localhost:5000)

---

## API Endpoints

- **GET `/api/health`**
  - Health check endpoint returning JSON status.
  - Response:
    ```json
    {
      "status": "ok"
    }
    ```

---

## Updating Portfolio Content

All personal content, project details, skills, and experience are centralized in `frontend/src/data/`:
- `personal.js` — Name, role, contact links, about summary
- `projects.js` — Project entries, problem statements, solutions, features, technologies, links
- `skills.js` — Technical skills organized by category
- `experience.js` — Roles, companies, contributions, tools
- `certifications.js` — Certifications and achievements
