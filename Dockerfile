FROM node:24-bookworm-slim
WORKDIR /app
# Pin the public backend to the tested source paired with this dashboard.
ADD https://github.com/Fai1th/Manta/archive/c0d50306276b1df1d12f969294b6ab88ada9b090.tar.gz /tmp/manta.tar.gz
RUN tar -xzf /tmp/manta.tar.gz --strip-components=1 -C /app && rm /tmp/manta.tar.gz
RUN npm ci --omit=dev --ignore-scripts
COPY public /app/public
RUN mkdir -p /data && chown node:node /data && chmod +x /app/docker-entrypoint.sh
USER node
ENV NODE_ENV=production PORT=3000 DATA_DIR=/data
EXPOSE 3000
CMD ["/app/docker-entrypoint.sh"]
