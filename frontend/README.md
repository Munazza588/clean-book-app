# Clean Reads 📚

A cozy, warm platform for romance readers who love their reads clean. Discover, share, and fall in love with reading — no surprises, just good books and good vibes.

## What is Clean Reads?

Clean Reads is a full stack web application where readers can discover verified clean romance books, connect with friends, and build a mindful reading life together.

Every book on the platform is verified clean — no explicit content, ever.

## Features

- 📖 **Browse & Search** — discover clean romance books by title or author
- 🔐 **Authentication** — secure signup and login with JWT
- ❤️ **Favorites** — save books you love to your personal reading list
- ⭐ **Reviews** — write and read honest reviews from the community
- 👥 **Follow Friends** — follow other readers and see what they're reading
- 📰 **Friends Feed** — see your friends' favorite books in real time
- ✍️ **Author Submissions** — authors can submit their clean romance books for review
- 👤 **User Profiles** — view follower/following counts and favorite books

## Tech Stack

**Frontend**
- React + TypeScript
- Tailwind CSS
- Axios
- React Router DOM
- Vite

**Backend**
- Node.js + Express
- TypeScript
- JWT Authentication
- bcryptjs

**Database**
- PostgreSQL
- Complex SQL queries and JOINs

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/Munazza588/clean-book-app.git
cd clean-book-app
```

2. Set up the backend
```bash
cd backend
npm install
npm run dev
```

3. Set up the frontend
```bash
cd frontend
npm install
npm run dev
```

4. Set up the database
```bash
psql postgres
CREATE DATABASE cleanbookapp;
\c cleanbookapp
```
Then run the SQL in `database/schema.sql`

## Roadmap

- [ ] Admin panel for approving book submissions
- [ ] Docker containerization
- [ ] CI/CD with GitHub Actions
- [ ] Deployment
- [ ] 200+ curated clean romance books

## Author

Built by Munazza Habib