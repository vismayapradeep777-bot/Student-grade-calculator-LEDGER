# LEDGER — Student Academic Portal

A modular full-stack student academic portal prepared for the 2nd and 3rd Web Project evaluations. The interface uses the burgundy theme `#9E0142`.

## Start here

1. Install **Node.js LTS**.
2. Open this project folder in VS Code.
3. Open Terminal in the project folder and run `npm install` (already installed on your machine; repeat only if needed).
4. Copy `.env.example` to `.env` only if you are configuring MongoDB. Never share or commit real database credentials.
5. Run `npm start`.
6. Open `http://localhost:5000/login.html`.

**Local JSON mode works without MongoDB.** MongoDB endpoints require a valid `MONGO_URI` and a successful Atlas connection.

## Student-facing navigation

The student workspace intentionally contains only three academic sections:

- **My Subjects** — subject records, marks, grades, attendance and SGPA.
- **Study Planner** — target SGPA and priority recommendations.
- **Analysis** — performance chart, automatic insights and detailed analysis table.

The repeated Student ID column has been removed from the subject table because the Student ID is already displayed in the student's profile. The subject table keeps Subject, Credits, Internal, External, Total, Attendance, Grade, Status and Delete.

## Folder map — where to open what

```text
ledger_evaluation_ready/
├── public/                         # FRONTEND (browser files)
│   ├── login.html                  # Login + registration forms
│   ├── index.html                  # Student dashboard + subject form/table
│   ├── planner.html                # Study planner page
│   ├── analysis.html               # Charts + analysis table
│   ├── external-feed.html          # Retained external API demo (not in student sidebar)
│   ├── debug-demo.html             # Retained API health/debug demo (not in student sidebar)
│   ├── css/style.css               # Visual styling and responsive layout
│   └── js/
│       ├── api.js                  # Shared fetch helpers, session, grade functions
│       ├── auth.js                 # Login and signup form submission
│       ├── subjects.js             # Subject CRUD UI, marks and SGPA
│       ├── planner.js              # Target SGPA and priority recommendations
│       ├── analysis.js             # Performance chart and insights
│       ├── externalApi.js          # External API fetch and display
│       └── debug.js                # API health-check button
├── config/db.js                    # MongoDB connection
├── models/Student.js               # Mongoose Student schema
├── models/Subject.js               # Mongoose Subject schema
├── controllers/
│   ├── jsonController.js           # File-based JSON persistence + local login
│   ├── studentController.js        # MongoDB Student CRUD logic
│   └── subjectController.js        # MongoDB Subject CRUD logic
├── routes/
│   ├── authRoutes.js               # POST /api/auth/login
│   ├── jsonRoutes.js               # /api/json/* routes
│   ├── studentRoutes.js            # /api/students CRUD routes
│   └── subjectRoutes.js            # /api/subjects CRUD routes
├── data/students.json              # Local JSON student records
├── data/subjects.json              # Local JSON subject records
├── docs/LEDGER_Evaluation.postman_collection.json
├── server.js                       # Express app entry point and middleware
├── package.json                    # Dependencies and scripts
└── .env.example                    # Safe environment-variable template
```

## Evaluation parameter map

### 2nd evaluation

| Parameter | Demonstration | Open these files |
|---|---|---|
| Additional pages linked | Login → My Subjects → Study Planner → Analysis using the student sidebar | `public/login.html`, `public/index.html`, `public/planner.html`, `public/analysis.html` |
| JavaScript interactions | Validation, submit handlers, input bounds, inline edits, delete confirmation, planner updates | `public/js/auth.js`, `public/js/subjects.js`, `public/js/planner.js`, `public/js/analysis.js` |
| Form submissions | Signup, login, add subject; requests handled by Express | `public/js/auth.js`, `public/js/subjects.js`, `routes/`, `controllers/jsonController.js` |
| Save form data to local JSON | Node `fs.promises.readFile/writeFile` | `controllers/jsonController.js`, `data/students.json`, `data/subjects.json` |

### 3rd evaluation / additional progress

| Parameter | Demonstration | Open these files |
|---|---|---|
| External API | Open `http://localhost:5000/external-feed.html` directly and click Fetch New Advice | `public/external-feed.html`, `public/js/externalApi.js`, `server.js` (`/api/external/quote`) |
| Node + Express setup | Start with `npm start`; inspect middleware and server | `package.json`, `server.js` |
| Express APIs + local JSON | GET/POST/PUT/DELETE local JSON subject routes | `routes/jsonRoutes.js`, `controllers/jsonController.js`, `data/*.json` |
| MongoDB CRUD | Configure Atlas then use `/api/students` and `/api/subjects` | `config/db.js`, `models/Student.js`, `models/Subject.js`, `routes/studentRoutes.js`, `routes/subjectRoutes.js`, `controllers/studentController.js`, `controllers/subjectController.js` |
| API health/debug | Open `http://localhost:5000/debug-demo.html` directly and click Call GET /api | `public/debug-demo.html`, `public/js/debug.js`, `server.js` |

The external feed and Debug Lab are intentionally **not linked in the student sidebar**. Their files and code are retained for the instructor's technical demonstration.

## API endpoints

- `GET /api` — health and endpoint manifest.
- `POST /api/json/students` — register student; saves to `data/students.json`.
- `POST /api/auth/login` — verify local JSON account.
- `GET /api/json/students` — list students (password hashes excluded).
- `GET /api/json/subjects?studentId=...` — read local subject records.
- `POST /api/json/subjects` — create local subject.
- `PUT /api/json/subjects/:id` — update local subject.
- `DELETE /api/json/subjects/:id` — delete local subject.
- `GET/POST/GET-by-id/PUT/DELETE /api/students` — MongoDB Student CRUD (MongoDB required).
- `GET/POST/GET-by-id/PUT/DELETE /api/subjects` — MongoDB Subject CRUD (MongoDB required).
- `GET /api/external/quote` — server-side external API fetch.

Import `docs/LEDGER_Evaluation.postman_collection.json` into Postman to test endpoints. For update/delete, use the `_id` returned by the create response.

## Demo flow for the 2nd evaluation

1. Start the server and open the login page.
2. Create a student account; show validation and form submission.
3. Open My Subjects and add a subject.
4. Show the subject row, automatic total, grade, status and SGPA.
5. Edit marks/attendance and delete a subject.
6. Open `data/students.json` and `data/subjects.json` to verify persistence after submission.
7. Navigate to Study Planner and Analysis using the sidebar.

## Demo flow for additional 3rd-evaluation progress

1. Show `server.js`, `package.json` and the running Express server.
2. Import the Postman collection and demonstrate local JSON GET/POST/PUT/DELETE.
3. Open `http://localhost:5000/external-feed.html` directly to demonstrate external API fetching.
4. Open `http://localhost:5000/debug-demo.html` directly to demonstrate the API health check.
5. Demonstrate MongoDB CRUD only after configuring and verifying the Atlas connection.

## Important honest limitations

- Local JSON file storage is suitable for a classroom demo, not concurrent production use.
- The UI login is a teaching prototype. Passwords are hashed for the local JSON record, but this is not a complete production authentication system (no sessions/tokens, rate limiting, password reset, or CSRF controls).
- MongoDB endpoints require a valid `MONGO_URI`, Atlas network access and a successful database connection. Verify with `GET /api` before claiming database connectivity.
- SGPA mapping and attendance threshold are illustrative; align them with the institution's official regulations.
- External quote service availability depends on internet access; the app displays an error if the upstream API is unreachable.
