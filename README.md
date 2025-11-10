# AI Mock Interview

Welcome to the AI Mock Interview project! This application helps users prepare for interviews by simulating an interview environment powered by AI.

## Repository Structure

This project has been split into multiple repositories for better separation of concerns and independent CI/CD pipelines:

- **[ai-mock-interview-backend](https://gitlab.com/rida999/ai-mock-interview-backend)**: Spring Boot backend service
- **[ai-mock-interview-frontend](https://gitlab.com/rida999/ai-mock-interview-frontend)**: React frontend application
- **[ai-mock-interview-infra](https://gitlab.com/rida999/ai-mock-interview-infra)**: Infrastructure, deployment configs, and shared scripts

## Features

- AI-driven mock interviews with customizable questions.
- User-friendly interface for interview practice.
- Review and feedback on performance.
- Progress tracking and analytics.

## Technologies Used

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Spring Boot, PostgreSQL, JPA/Hibernate
- **DevOps:** Docker & Docker Compose, Nginx, AWS EC2, GitLab CI/CD

## Quick Start

### Prerequisites

- Node.js (v18+)
- Java Development Kit (JDK 21+)
- Docker & Docker Compose

### Local Development Setup

1. **Clone all repositories:**

   ```bash
   # Clone infrastructure repo (contains Docker setup)
   git clone https://gitlab.com/rida999/ai-mock-interview-infra.git infra
   cd infra
   # Clone backend
   git clone https://gitlab.com/rida999/ai-mock-interview-backend.git ../backend

   # Clone frontend
   git clone https://gitlab.com/rida999/ai-mock-interview-frontend.git ../frontend
   ```

2. **Start services from infra repo:**

   ```bash
   cd infra
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. **Set up backend:**

   ```bash
   cd ../backend
   ./mvnw spring-boot:run
   ```

4. **Set up frontend:**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

## Deployment

For production deployment on AWS, follow the comprehensive guide in the [infra repository](https://gitlab.com/rida999/ai-mock-interview-infra).
