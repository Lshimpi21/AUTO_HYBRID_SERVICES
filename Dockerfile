# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Install root dependencies
RUN npm install

# Copy client
COPY client ./client

# Install client dependencies
RUN cd client && npm install

# Build client
RUN cd client && npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy server
COPY server ./server

# Copy built client from builder stage
COPY --from=builder /app/client/build ./client/build

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server/index.js"]
