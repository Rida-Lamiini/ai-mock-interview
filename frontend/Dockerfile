# Frontend Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

# Accept build arguments for environment variables
ARG VITE_PUBLIC_GEMINI_API_KEY
ARG VITE_API_BASE_URL
ARG VITE_CLERK_PUBLISHABLE_KEY

# Create .env file with build arguments
RUN echo "VITE_PUBLIC_GEMINI_API_KEY=${VITE_PUBLIC_GEMINI_API_KEY}" > .env && \
    echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" >> .env && \
    echo "VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}" >> .env

# Debug: Print the .env file contents to verify
RUN cat .env

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build
  
# Production stage with nginx
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
