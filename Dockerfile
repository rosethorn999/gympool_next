ARG NODE=node:lts-alpine
ARG NEXT_PUBLIC_API_HOST=https://gympool-stg-fastapi.nodm.app/

# ====================
FROM ${NODE} AS deps
WORKDIR /app
COPY package*.json .
RUN npm install --omit=dev

# ====================
FROM ${NODE} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
ARG NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_API_HOST $NEXT_PUBLIC_API_HOST
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
ARG NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_API_HOST $NEXT_PUBLIC_API_HOST
ENV PORT 3000
EXPOSE 3000
CMD ["node", "server.js"]