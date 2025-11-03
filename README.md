# AI Mock Interview

Welcome to the AI Mock Interview project! This application helps users prepare for interviews by simulating an interview environment powered by AI.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features

- AI-driven mock interviews with customizable questions.
- User-friendly interface for interview practice.
- Review and feedback on performance.
- Progress tracking and analytics.

## Technologies Used

- **Frontend:**

  - React
  - Tailwind CSS
  - Vite

- **Backend:**

  - Spring Boot
  - PostgreSQL
  - JPA/Hibernate

- **DevOps:**
  - Docker & Docker Compose
  - Nginx
  - AWS EC2

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v18+)
- Java Development Kit (JDK 21+)
- Docker & Docker Compose
- PostgreSQL (for local development)

### Clone the Repository

```bash
git clone https://github.com/your-username/ai-mock-interview.git
cd ai-mock-interview
```

### Local Development Setup

1. **Start the services:**

   ```bash
   docker-compose up -d
   ```

2. **Set up frontend environment:**

   ```bash
   cd frontend
   cp .env.example .env  # Create from example if available
   # Edit .env with your API keys
   npm install
   npm run dev
   ```

3. **Set up backend environment:**

   ```bash
   cd backend
   # The backend will use the database from docker-compose.yml
   ./mvnw spring-boot:run
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

## Deployment

For production deployment on AWS, follow the comprehensive guide in [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Production Setup

1. **On your EC2 instance:**

   ```bash
   # Update system and install Docker
   sudo apt update && sudo apt install docker.io docker-compose -y

   # Clone repository
   git clone https://github.com/your-username/ai-mock-interview.git
   cd ai-mock-interview

   # Set up environment variables
   cp .env.prod.example .env.prod
   nano .env.prod  # Edit with your production values

   # Deploy
   ./scripts/deploy.sh
   ```

2. **Access your application:**
   - Frontend: https://your-domain.com
   - Backend API: https://your-domain.com/api
