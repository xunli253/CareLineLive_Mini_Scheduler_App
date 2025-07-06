# CareLineLive Mini Scheduler App

This is a full-stack mini scheduling application developed as part of the CareLineLive coding test. It allows users to create carers, clients, and shifts (with conflict detection), and view all scheduled shifts in a paginated table.

---

## 🚀 Tech Stack

| Layer     | Technology               |
|-----------|--------------------------|
| Frontend  | React + TypeScript + Ant Design |
| Backend   | Node.js + Express        |
| Styling   | Ant Design + CSS-in-JS (styled-components optional) |
| Testing   | Vitest + React Testing Library |
| Date/Time | dayjs                    |

## 📦 Project Structure

├── careline-frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # UI components (forms, tables)
│ │ ├── services/ # axios API client
│ │ ├── test/ # test setup files
│ │ └── App.tsx # main layout
│ └── vite.config.ts
├── careline-backend/ # Node.js Express backend
│ ├── src/
│ │ ├── routes/ # carers, clients, shifts APIs
│ │ └── app.ts # entry point
└── README.md

## ⚙️ Assumptions

### ✅ Frontend Assumptions

- Ant Design used for fast, consistent UI components
- All forms are accessible and use AntD's built-in validation
- `useEffect` and `useState` used for fetching and managing data
- Shift creation form uses `RangePicker` with:
  - 10-minute time step
  - only future times selectable
  - shift times must be between 00:00 and 23:50
- All create forms are embedded within Ant Design Tabs
- Conflict and error messages are displayed inline and via `message.error`

### ✅ Backend Assumptions

- In-memory arrays used to simulate data persistence (carers, clients, shifts)
- Each entity (Carer/Client) has a unique UUID and name
- Carers and Clients cannot have duplicate names (case-insensitive check)
- Shift conflict detection checks overlapping intervals per carer
- Shifts API supports pagination: `GET /shifts?page=1&limit=10`
- No external DB is used for simplicity

---

## 🧪 Running Tests

### 📍 Frontend (Vitest)

```bash
cd careline-frontend
npm install
npm run test  
```


## Getting Started

✅ 1. Clone this repo
```bash
git clone https://github.com/xunli253/CareLineLive_Mini_Scheduler_App.git
cd CareLineLive_Mini_Scheduler_App
```

✅ 2. Install backend dependencies
```bash
cd careline-backend
npm install
npm start
# API runs at http://localhost:3000
```

✅ 3. Install frontend dependencies
```bash
cd ../careline-frontend
npm install
npm run dev
# App runs at http://localhost:5173
```

## API Endpoints (dev)
| Method | Endpoint   | Description                            |
| ------ | ---------- | -------------------------------------- |
| GET    | `/carers`  | List all carers                        |
| POST   | `/carers`  | Create a new carer                     |
| GET    | `/clients` | List all clients                       |
| POST   | `/clients` | Create a new client                    |
| GET    | `/shifts`  | List shifts with pagination            |
| POST   | `/shifts`  | Create a new shift with conflict check |

## 🧑‍💻 Author Notes
This project was built for the CareLineLive coding test with a focus on:

User-friendly interface

Strict time validation rules

Clear API logic with readable structure

Fully testable frontend components
