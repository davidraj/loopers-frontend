FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 3001 (different from Rails backend)
EXPOSE 3001

# Set environment variables for hot reload
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
ENV PORT=3001

# Start the application
CMD ["npm", "start"]