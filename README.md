# Recipe App

This is a full-stack recipe application with a **Next.js** for frontend and a **Node.js + Express** for backend (written in TypeScript).  
The app lets users search recipes by ingredient, country, and category, and view recipe details.

---

## Project Structure

- `backend/` - Express API server with TypeScript
- `frontend/` - Next.js React app with TailwindCSS

---

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

---

## Setup

### Backend

1. Install dependencies in the backend folder:
   ```bash
   npm install

2. Create a .env file in backend/ and add:
   ```bash
   PORT=8000
   MEAL_API_BASE=https://www.themealdb.com/api/json/v1/1

3. Start the backend server:
   ```bash
   npm run dev
   
The backend server will run on http://localhost:8000 by default.

### Frontend

1. Install dependencies in the frontend folder:
   ```bash
   npm install

2. Create a .env.local file in frontend/ with:
   ```bash
   NEXT_PUBLIC_API_BASE=http://localhost:8000/api

3. Start the frontend development server:
   ```bash
   npm run dev

The frontend will run on http://localhost:3000 by default.

## Additional Notes

- The backend uses TypeScript with ts-node and nodemon for easy development.
- The frontend is built with Next.js 15.x and React 19.x, using TailwindCSS for styling.
- API routes are proxied to the backend using the NEXT_PUBLIC_API_BASE environment variable.
- Clear instructions and modular components support searching recipes by ingredients, country, and category.

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)




