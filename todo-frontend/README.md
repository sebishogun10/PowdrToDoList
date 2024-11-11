# Todo App Frontend

This is the frontend application for the Todo App, built with Next.js and TypeScript.

## Features

- User authentication (Register/Login)
- Protected routes with middleware
- Todo list management (Create, Read, Update, Delete)
- Modern UI with Tailwind CSS

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Docker

To run the entire application (frontend, backend, and database) using Docker:

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Database: localhost:5432

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```
