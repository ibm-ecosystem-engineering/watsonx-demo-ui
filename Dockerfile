FROM registry.access.redhat.com/ubi9/nodejs-18:1-62.1692771036

WORKDIR /opt/app-root/src

COPY --chown=default:root . .

RUN mkdir -p /opt/app-root/src/node_modules && \
    ls -lA && \
    npm ci

EXPOSE 5173

CMD ["npm", "run", "dev"]
