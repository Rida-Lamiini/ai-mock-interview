# AI Mock Interview Platform - Deployment Guide

This guide provides step-by-step instructions for setting up the local development environment and deploying the application to a production environment on AWS EC2 using GitLab CI/CD.

**Note:** The frontend and backend are maintained as separate repositories. This parent repository contains orchestration files (Docker Compose, CI/CD) for running the full application.

## Repositories

- **Backend:** [ai-mock-interview-backend](https://gitlab.com/rida999/ai-mock-interview-backend.git) - Spring Boot API
- **Frontend:** [ai-mock-interview-frontend](https://gitlab.com/rida999/ai-mock-interview-frontend.git) - React application

## 1. Local Development Setup

This setup uses Docker Compose to run the entire application stack (frontend, backend, database) on your local machine.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Steps

1.  **Clone the Repositories**

    ```bash
    # Clone the parent repository (for orchestration)
    git clone https://gitlab.com/rida999/ai-mock-interview.git
    cd ai-mock-interview

    # Clone backend and frontend as submodules or separately
    git clone https://gitlab.com/rida999/ai-mock-interview-backend.git ai-mock-interview-backend
    git clone https://gitlab.com/rida999/ai-mock-interview-frontend.git ai-mock-interview-frontend
    ```

2.  **Create Environment File**
    Copy the example environment file to create your own local configuration.

    ```bash
    cp .env.example .env
    ```

    _For local development, the default values in `.env.example` are sufficient. You do not need to change them._

3.  **Build and Run the Application**
    This command will build the Docker images for the frontend and backend and start all services in detached mode.

    ```bash
    docker compose up --build -d
    ```

4.  **Access the Application**

    - **Frontend:** Open your browser and go to [http://localhost:80](http://localhost:80)
    - **Backend API:** The API is available at `http://localhost:8080`. The frontend is already configured to proxy API requests.
    - **Database:** You can connect to the PostgreSQL database on `localhost:5432` using the credentials from the `.env` file.

5.  **Stopping the Application**
    To stop all running containers, use:
    ```bash
    docker compose down
    ```

---

## 2. Production Deployment (AWS EC2 + GitLab CI/CD)

This section details how to deploy the application to a single AWS EC2 instance. The GitLab CI/CD pipeline will automatically build and push Docker images, and the final deployment step will run `docker compose` on the EC2 server via SSH.

### Step 1: AWS EC2 Instance Setup

1.  **Launch an EC2 Instance:**

    - Go to the AWS EC2 console and launch a new instance.
    - **AMI:** Choose **Ubuntu** (e.g., Ubuntu Server 22.04 LTS).
    - **Instance Type:** `t2.micro` is sufficient for this small application.
    - **Key Pair:** Create and download a new key pair (`.pem` file). You will need this to SSH into your instance.
    - **Network Settings / Security Group:**
      Create a new security group and add the following inbound rules:
      - **SSH (Port 22):** Source `My IP` (for initial setup).
      - **HTTP (Port 80):** Source `Anywhere` (0.0.0.0/0).
      - **HTTPS (Port 443):** Source `Anywhere` (0.0.0.0/0). _(Note: This guide doesn't include setting up SSL, but the port should be open for future use)._

2.  **Install Docker and Docker Compose on EC2:**
    - Connect to your EC2 instance using the downloaded `.pem` file:
      ```bash
      # Replace with the path to your key and your instance's IP
      ssh -i /path/to/your-key.pem ubuntu@12.34.56.78
      ```
    - Run the following commands on the EC2 instance to install Docker and Docker Compose:
      ```bash
      # Update package list
      sudo apt-get update
      # Install packages to allow apt to use a repository over HTTPS
      sudo apt-get install -y ca-certificates curl gnupg
      # Add Docker’s official GPG key
      sudo install -m 0755 -d /etc/apt/keyrings
      curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
      sudo chmod a+r /etc/apt/keyrings/docker.gpg
      # Set up the repository
      echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
        $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
        sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
      # Install Docker Engine
      sudo apt-get update
      sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
      # Add 'ubuntu' user to the 'docker' group to run docker commands without sudo
      sudo usermod -aG docker $USER
      # Log out and log back in to apply the group changes.
      exit
      ```

### Step 2: GitLab Project Setup

1.  **Push Code to GitLab:**

    - Create separate projects in GitLab for backend and frontend repositories.
    - Push the backend code to the backend project.
    - Push the frontend code to the frontend project.
    - Push the parent repository (this one) to a separate project for orchestration.

2.  **Set CI/CD Variables:**
    In the **parent repository's GitLab project** (this one), go to **Settings > CI/CD > Variables** and add the following:

    - `EC2_IP`: The public IP address of your EC2 instance.
      - _Example Value:_ `12.34.56.78`
    - `SSH_USER`: The user for SSH access.
      - _Example Value:_ `ubuntu`
    - `EC2_SSH_PRIVATE_KEY`: The content of your `.pem` file.
      - **Type:** `File`
      - **Value:** Open your `.pem` file and copy-paste the entire content.
    - `CI_REGISTRY_USER`: Your GitLab username.
      - _This is a built-in variable, but ensure it's available. You can also use a Deploy Token username._
    - `CI_REGISTRY_PASSWORD`: A password or token with registry access.
      - **Type:** `Masked`
      - _Value:_ Create a **Personal Access Token** (with `read_registry` and `write_registry` scopes) or a **Deploy Token** for the project.

    **Note:** Ensure that the backend and frontend projects have their own CI/CD pipelines that build and push Docker images to the GitLab registry. The parent pipeline triggers these child pipelines.

### Step 3: Prepare the Server for Deployment

1.  **SSH into your EC2 instance.**

2.  **Create a directory for your application:**

    ```bash
    mkdir ~/app && cd ~/app
    ```

3.  **Place `docker-compose.yml` and `.env` on the server:**
    - You need the `docker-compose.yml` file on the server to run the application.
    - You also need an `.env` file with the production secrets.
    - **Option A (Git Clone):** Clone your repository on the server. This is simple but may expose code unnecessarily.
      ```bash
      git clone <your-repo-url> ~/app
      ```
    - **Option B (Manual Copy):** Manually create the two files on the server.
      - `nano docker-compose.yml` (copy-paste the content)
      - `nano .env` (copy-paste the content from your local `.env` file, ensuring production values are used)

### Step 4: Run the CI/CD Pipeline

1.  **Commit and Push:**
    Commit any change to the `main` branch of the **parent repository** and push it to GitLab.

    ```bash
    git push origin main
    ```

2.  **Check the Pipeline:**

    - In the parent repository's GitLab project, go to **CI/CD > Pipelines**. You will see a new pipeline running.
    - The pipeline will trigger the backend and frontend pipelines, which will build and push Docker images to the GitLab registry.
    - Once the child pipelines complete, the parent pipeline's `deploy-to-ec2` job will be available.

3.  **Deploy to Production:**
    - The `deploy-to-ec2` job is set to `manual`. Once the child pipelines are complete, click the "play" button on the `deploy-to-ec2` job in the parent pipeline view.
    - This job will securely SSH into your EC2 instance, log in to the GitLab registry, pull the new images, and restart the services using `docker compose up -d`.

Your application is now live! You can access it at `http://<your-ec2-ip>`.
