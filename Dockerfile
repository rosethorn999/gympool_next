# ====================
FROM node:lts-alpine AS deps
WORKDIR /app
COPY package*.json .
ENV NODE_ENV production
RUN npm install

# ====================
FROM node:lts-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# ====================
FROM node:lts-alpine AS runner
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "run", "start"]