# Meenakshi Studio — Photography Booking Platform

A full-stack photography portfolio & booking platform built with a **React (Vite)** frontend and an **Express + MongoDB** backend.

## Tech Stack

- **Frontend:** React 18, React Router, Axios, Vite
- **Backend:** Node.js, Express, Mongoose (MongoDB)
- **Auth:** JWT + bcrypt
- **Uploads:** Multer

## Project Structure

```
meenakshistudio/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI + admin components
│   │   ├── pages/        # Home, auth, dashboards, admin pages
│   │   ├── context/      # Auth context
│   │   ├── css/          # Global styles — styles.css (base), admin.css (admin panel), responsive.css (mobile/tablet)
│   │   └── images/       # Local images (banners, about, logo)
│   └── vite.config.js
├── server/          # Express REST API
│   ├── config/      # DB connection
│   ├── controllers/ # Route handlers
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API routes
│   ├── middleware/  # Auth, upload, error handling
│   ├── uploads/     # Uploaded files
│   └── seed.js      # Database seeder
└── README.md
```

## Prerequisites

- **Node.js** (v18+)
- **MongoDB** — either a local instance or a MongoDB Atlas connection string

## Getting Started

### 1. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `server` folder:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/meenakshi
JWT_SECRET=your_secret_key
```

> Replace `MONGO_URI` with your own MongoDB connection string (local or Atlas). The `JWT_SECRET` can be any random string.

### 3. Seed the database (optional)

This creates the admin user, categories, photographers, portfolio items, packages, and testimonials.

```bash
cd server
npm run seed
```

**Default admin login after seeding:**

- Email: `admin@lumiere.com`
- Password: `admin123`

### 4. Run the servers

Open **two** terminals.

**Terminal 1 — Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**

```bash
cd client
npm run dev
```

- Frontend runs at: **http://localhost:5173**
- Backend runs at: **http://localhost:5000**

> If you want to run both from a single command, use the convenience script at the repo root:

```bash
npm run dev
```

### 5. Build for production

```bash
cd client
npm run build
npm run preview
```

## Admin Access

After logging in as admin, you can manage:

- **Dashboard** — overview stats
- **Portfolio** — add/edit/delete gallery items
- **Photographers** — manage photographer profiles
- **Categories** — manage categories
- **Packages** — manage pricing & features
- **Testimonials** — manage reviews
- **Bookings** — view & update bookings
- **Users** — manage registered users

## API Overview

| Method | Endpoint                | Description       |
| ------ | ----------------------- | ----------------- |
| POST   | `/api/auth/admin/login` | Admin login       |
| POST   | `/api/auth/register`    | User registration |
| POST   | `/api/auth/login`       | User login        |
| GET    | `/api/packages`         | List packages     |
| GET    | `/api/portfolio`        | List portfolio    |
| POST   | `/api/bookings`         | Create a booking  |
| ...    | ...                     | ...               |

## License

© Meenakshi Studio. All rights reserved.
</content>
