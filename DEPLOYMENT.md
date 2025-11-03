# AWS Deployment Guide for AI Mock Interview Application

This guide provides step-by-step instructions to deploy the AI Mock Interview application on AWS EC2 using Docker Compose. This is designed for beginners, so we'll go through each step one by one.

## Prerequisites

- AWS account with billing enabled
- Basic knowledge of Linux commands
- Domain name (optional, but recommended for SSL)

## Step 1: Launch an EC2 Instance

1. **Log in to AWS Console**

   - Go to https://console.aws.amazon.com/ec2/
   - Click "Launch Instance"

2. **Choose AMI**

   - Select "Ubuntu Server 22.04 LTS (HVM), SSD Volume Type" (free tier eligible)

3. **Choose Instance Type**

   - Select "t2.micro" (free tier) or "t3.small" for better performance

4. **Configure Instance**

   - Number of instances: 1
   - Network: Default VPC
   - Auto-assign public IP: Enable

5. **Add Storage**

   - 20 GB (default is fine, but increase if needed for database)

6. **Add Tags**

   - Key: Name
   - Value: ai-mock-interview

7. **Configure Security Group**

   - Create a new security group
   - Add rules:
     - SSH (port 22) - My IP
     - HTTP (port 80) - 0.0.0.0/0
     - HTTPS (port 443) - 0.0.0.0/0
     - Custom TCP (port 8080) - 0.0.0.0/0 (for backend, optional if using reverse proxy)

8. **Launch**
   - Click "Launch"
   - Create or select an existing key pair
   - Download the .pem file

## Step 2: Connect to Your EC2 Instance

1. **Change permissions on your key file**

   ```bash
   chmod 400 your-key-pair.pem
   ```

2. **Connect via SSH**
   ```bash
   ssh -i your-key-pair.pem ubuntu@your-instance-public-ip
   ```

## Step 3: Update System and Install Docker

1. **Update the system**

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Docker**

   ```bash
   # Install required packages
   sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release -y

   # Add Docker's official GPG key
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

   # Set up the stable repository
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

   # Install Docker Engine
   sudo apt update
   sudo apt install docker-ce docker-ce-cli containerd.io -y
   ```

3. **Install Docker Compose**

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

4. **Add user to docker group**
   ```bash
   sudo usermod -aG docker $USER
   # Logout and login again for group changes to take effect
   exit
   # Then reconnect via SSH
   ```

## Step 4: Clone Your Repository

1. **Install Git**

   ```bash
   sudo apt install git -y
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-mock-interview.git
   cd ai-mock-interview
   ```

## Step 5: Set Up Environment Variables

1. **Create environment files**

   For frontend:

   ```bash
   cd frontend
   touch .env
   nano .env
   ```

   Add to .env:

   ```
   VITE_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   VITE_API_BASE_URL=https://your-domain.com/api
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

   For backend (in docker-compose.prod.yml):

   ```bash
   cd ..
   nano docker-compose.prod.yml
   ```

   Update the environment variables:

   ```yaml
   backend:
     environment:
       SPRING_APPLICATION_NAME: backend
       SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/your_db_name
       SPRING_DATASOURCE_USERNAME: your_db_username
       SPRING_DATASOURCE_PASSWORD: your_db_password
       SPRING_JPA_HIBERNATE_DDL_AUTO: update
       SPRING_JPA_SHOW_SQL: "true"

   db:
     environment:
       POSTGRES_DB: your_db_name
       POSTGRES_USER: your_db_username
       POSTGRES_PASSWORD: your_db_password
   ```

## Step 6: Configure CORS for Production

1. **Update WebConfig.java**

   ```bash
   nano backend/src/main/java/com/lamiini/backend/config/WebConfig.java
   ```

   Change the allowedOrigins to your domain:

   ```java
   .allowedOrigins("https://your-domain.com")
   ```

## Step 7: Build and Run the Application

1. **Build the images**

   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. **Start the services**

   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Check if services are running**
   ```bash
   docker-compose -f docker-compose.prod.yml ps
   ```

## Step 8: Set Up SSL with Let's Encrypt (Optional but Recommended)

1. **Install Certbot**

   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Obtain SSL certificate**

   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Update nginx configuration for SSL**
   - Certbot will automatically update your nginx config
   - Make sure to redirect HTTP to HTTPS

## Step 9: Set Up Automated Deployments (Optional)

1. **Install Node.js for webhook**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Set up webhook**

   ```bash
   cd webhook
   npm install
   nano .env
   ```

   Add to .env:

   ```
   PORT=9000
   SECRET_TOKEN=your_webhook_secret
   ```

3. **Run webhook server**

   ```bash
   node server.js &
   ```

4. **Configure GitHub webhook** (if using GitHub)
   - Go to your repository settings
   - Add webhook URL: https://your-domain.com:9000/webhook
   - Content type: application/json
   - Secret: your_webhook_secret

## Step 10: Database Migration and Backup

1. **Backup database** (if migrating from existing)

   ```bash
   # If you have an existing database, create a backup
   pg_dump -h your-old-db-host -U your-username -d your-db-name > backup.sql
   ```

2. **Restore backup** (if needed)
   ```bash
   # Copy backup.sql to your EC2 instance
   docker-compose -f docker-compose.prod.yml exec db psql -U your-username -d your-db-name < backup.sql
   ```

## Step 11: Monitoring and Logging

1. **View logs**

   ```bash
   docker-compose -f docker-compose.prod.yml logs -f
   ```

2. **Set up basic monitoring** (optional)
   ```bash
   # Install htop for system monitoring
   sudo apt install htop -y
   htop
   ```

## Step 12: Access Your Application

- Frontend: https://your-domain.com
- Backend API: https://your-domain.com/api
- Database: Accessible only within Docker network

## Troubleshooting

1. **Check service status**

   ```bash
   docker-compose -f docker-compose.prod.yml ps
   ```

2. **View specific service logs**

   ```bash
   docker-compose -f docker-compose.prod.yml logs backend
   ```

3. **Restart services**

   ```bash
   docker-compose -f docker-compose.prod.yml restart
   ```

4. **Common issues**
   - Port conflicts: Make sure ports 80, 443, 8080 are not used by other services
   - Environment variables: Double-check all required variables are set
   - CORS issues: Verify the allowed origins in WebConfig.java

## Next Steps

- Set up CloudWatch for monitoring
- Configure auto-scaling if needed
- Set up backup scripts for the database
- Consider using AWS RDS for managed PostgreSQL

Remember to regularly update your instance and monitor resource usage!
