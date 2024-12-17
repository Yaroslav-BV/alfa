### base ###
# TODO заменить на корп образ
FROM node:20.18.0-alpine AS base 

RUN \
  # TODO если не alpine образ то не надо
  apk add --no-cache libc6-compat && \ 
  npm install -g npm@10.8.2 turbo && \
  turbo telemetry disable

### prune ###
FROM base AS prune

WORKDIR /app

COPY . .
RUN turbo prune api --docker

### builder ###
FROM base AS builder

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/package-lock.json ./package-lock.json

RUN \
  npm pkg delete scripts.prepare && \
  npm ci && \
  npm cache clean --force

COPY --from=prune /app/out/full/ .

RUN \
  npm run build -- --filter=api... && \
  npm prune --omit=dev

### runner ###
# TODO заменить на корп образ
FROM node:20.18.0-alpine AS runner

RUN apk add --no-cache tini

WORKDIR /home/nestjs/alfa-app

COPY --from=builder --chown=node:node  /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=node:node  /app/node_modules ./node_modules

# TODO стоит перенести в другое место
ENV NODE_ENV=production

USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "apps/api/dist/main"]