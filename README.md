# Stardust Neverland

A full-stack web game built as a school project (ADES, AY22/23 Sem 2). Players climb through floors, talk to NPCs, play mini-games to earn currency, spend it in the store, equip items, and fight bosses — while admins manage the whole game world from a dashboard with live analytics.

---

## Features

### Player side
- **Accounts** – register, log in (JWT auth), view profile and standings
- **Floors & bosses** – progress through floors, each with its own boss
- **NPC dialogue** – talk to NPCs with tracked dialogue progress (not started / ongoing / completed)
- **Mini-games** – Hangman, Tic-Tac-Toe, Guess the Number, Clicker, Ball Game
- **Spin the wheel** – daily-style reward wheel
- **Store & inventory** – buy items with in-game currency, view, equip or delete them
- **Postboard** – create, edit and manage posts
- **Friends system** – browse players, send/accept friend requests, block users

### Admin side
- Full CRUD for **floors, bosses, NPCs, dialogues, items, images, currency, spin-wheel rewards, posts and users**
- **Analytics dashboard** (D3 charts): game play attempts, game duration per player, player status, inventory and equipped-item tracking

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | HTML, CSS, vanilla JS, React 18 (via CDN pages), D3.js |
| Backend | Node.js, Express |
| Database | PostgreSQL (`pg`, `pg-format`) |
| Auth | JSON Web Tokens, bcrypt |
| Uploads | Multer (+ Cloudinary config) |
| Deployment | Azure Web App via GitHub Actions |
| Linting | ESLint (Airbnb + Prettier) |

---

## Project Structure

```
stardustneverland/
├── backend/
│   ├── app.js              # Express entry point (serves API + frontend)
│   ├── db.js               # PostgreSQL connection pool
│   ├── dbsetup.js          # Creates all tables
│   ├── dbreset.js          # Drops/clears tables
│   ├── auth/               # JWT verification middleware
│   ├── routes/             # API routes (mounted under /api)
│   ├── controller/         # Request handlers
│   ├── model/              # Database queries
│   ├── seedData/           # CSV seed data + seed scripts
│   └── images/             # Static game images
├── frontend/
│   └── public/
│       ├── index.html      # Login / landing page
│       ├── user/           # Player pages
│       ├── admin/          # Admin pages
│       ├── react/          # React components
│       ├── js/  css/       # Page scripts & styles
└── .github/workflows/      # Azure deployment pipeline
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A PostgreSQL database

### 1. Clone & install
```bash
git clone https://github.com/Jer-ryy/stardustneverland.git
cd stardustneverland
npm install          # also installs backend dependencies
```

### 2. Environment variables
Create a `.env` file inside `backend/`:

```env
DB_URL=postgres://user:password@host:5432/dbname
DB_CONNECTION_LIMIT=5
JWTKey=your_jwt_secret
PORT=4000

# Optional – image uploads
CLOUDINARY_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 3. Set up the database
```bash
cd backend
npm run setupdb      # create tables
npm run seedImages
npm run seedFloors
npm run seedItems
npm run seedUsers
npm run seedNPC
npm run seedInventory
npm run seedGame
npm run seedDialogue
npm run seedCurrency
npm run seedPost
npm run seedBoss
npm run seedGameDuration
npm run seedSpin
```
Use `npm run cleardb` to reset.

### 4. Run
```bash
npm start            # from the project root
```
Open **http://localhost:4000** — the backend serves the frontend and the API (`/api/...`).

---

## Deployment

Every push to `main` triggers the GitHub Actions workflow in `.github/workflows/main_stardustneverland.yml`, which builds the app and deploys it to the **`stardustneverland`** Azure Web App. Set the environment variables above in the Azure App Service configuration.

---

## Team

| Student ID | Name |
|---|---|
| 2006392 | Darren Choo Jun Heng |
| 2007463 | Windy Heng Hui Yi |
| 2134473 | Arul Kumaran Tamizh Iniyan |
| 2136433 | Loh Wee Siong |
| 2006743 | Ng Shao Wei Jerry |

---

> Built for the Application Development in Enterprise Systems (ADES) module. For educational purposes only.
