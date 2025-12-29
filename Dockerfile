# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including production dependencies)
RUN npm install

# Copy source code
# We specifically copy the server directory and relevant configs
COPY server ./server
COPY tsconfig.json ./

# Make sure we have tsx available or build the server
# Option A: Run directly with tsx (Simpler for mixed repos without dedicated build step for server)
# Ensure dotenv is picked up if copied, but usually env vars are passed at runtime

# Expose port
EXPOSE 3000

# Start command
CMD ["npx", "tsx", "server/index.ts"]
