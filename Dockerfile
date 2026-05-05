# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install bun
RUN npm install -g bun

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js app
RUN bun run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install bun in production image too
RUN npm install -g bun

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Expose port (Next.js default is 3000)
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the app via entrypoint which loads env file if present
ENTRYPOINT ["sh", "/app/docker-entrypoint.sh"]