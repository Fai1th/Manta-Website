FROM node:24-bookworm-slim AS website
WORKDIR /site
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY public ./public
COPY src ./src
COPY scripts ./scripts
RUN node scripts/build-static.mjs --full-app

FROM node:24-bookworm-slim
LABEL org.opencontainers.image.source="https://github.com/Fai1th/Manta-Website" \
      org.opencontainers.image.description="Manta Discord bot, management dashboard and public website" \
      org.opencontainers.image.licenses="MIT"
WORKDIR /app
# Pin the public backend to the tested source paired with this dashboard.
ADD https://github.com/Fai1th/Manta/archive/36eb0bbd9400f06b1ea1d9d792958dd2f0a25f00.tar.gz /tmp/manta.tar.gz
RUN tar -xzf /tmp/manta.tar.gz --strip-components=1 -C /app && rm /tmp/manta.tar.gz
RUN npm ci --omit=dev --ignore-scripts
COPY --from=website /site/dist /app/public
RUN mkdir -p /data && chown node:node /data && chmod +x /app/docker-entrypoint.sh
USER node
ENV NODE_ENV=production PORT=3000 DATA_DIR=/data
EXPOSE 3000
CMD ["/app/docker-entrypoint.sh"]
