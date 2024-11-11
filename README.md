# PowdrToDoList

A full-stack To-Do List application built with a Java Spring Boot backend and a Next.js frontend, containerized using Docker Compose.
The application allows users to register, authenticate, and manage their to-do items with a PostgreSQL database.
Features

    User registration and authentication with JWT.
    Create, read, update, and delete to-do items.
    Responsive user interface built with Next.js.
    Secure backend with Spring Security.
    Health checks for Docker containers.
    Persistent data storage with PostgreSQL.

# Technologies Used

    Backend: Java, Spring Boot, Spring Security, JWT, Maven
    Frontend: Next.js, React, Node.js
    Database: PostgreSQL
    Containerization: Docker, Docker Compose

# Prerequisites

    Docker and Docker Compose installed on your machine.
    Git for cloning the repository.

# Installation and Setup

# 1. Clone the Repository

git clone https://github.com/yourusername/PowdrToDoList.git
cd PowdrToDoList

# 2. Build and Run with Docker Compose

docker-compose up --build

    This command builds the Docker images for the backend and frontend and starts all the services defined in docker-compose.yml.
    The --build flag ensures that Docker rebuilds the images with any changes you've made.

# 3. Access the Application

Frontend: Open your browser and navigate to http://localhost:3000.
Backend API: Accessible at http://localhost:8080/api.

# API Authentication

The backend uses JWT for authentication.
Obtain a token by logging in or registering via the /api/auth endpoints.
Include the token in the Authorization header for protected routes.

# API Endpoints

# Authentication:

    POST /api/auth/register: Register a new user.
    POST /api/auth/login: Authenticate and receive a JWT.

# To-Do Items

    GET /api/todos: Get all to-do items for the authenticated user.
    POST /api/todos: Create a new to-do item.
    PUT /api/todos/{id}: Update a to-do item.
    DELETE /api/todos/{id}: Delete a to-do item.

# Health Check

    GET /api/health: Health check endpoint for Docker health checks.

# Troubleshooting

        Backend Container Unhealthy

    Issue: The backend container is marked as unhealthy.
    Solution:
        Ensure the /api/health endpoint is accessible without authentication.
        Check that curl is installed in the backend Docker image.
        Verify the health check configuration in docker-compose.yml.
