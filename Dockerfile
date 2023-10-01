ARG NODE=node:lts-alpine

# ====================
FROM ${NODE} AS deps
WORKDIR /app
COPY package*.json .
RUN npm install --production

# ====================
FROM ${NODE} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# ====================
FROM ${NODE} AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# TODO: serve public files via CDN is a better practice
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
ENV NODE_ENV production
ENV PORT 80
EXPOSE 80
CMD ["node", "server.js"]