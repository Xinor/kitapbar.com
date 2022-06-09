FROM node:18.3.0-buster-slim AS builder
WORKDIR /builder
COPY ./package.json ./yarn.lock ./
RUN ["yarn", "install"]
COPY . .
RUN ["yarn", "build"]

FROM node:18.3.0-buster-slim
WORKDIR /usr/src/app
COPY --from=builder /builder/build .
ENV NODE_ENV production
USER node
HEALTHCHECK --interval=10s --timeout=5s CMD curl --max-time 1 --fail http://localhost:3002/ping || kill 1
CMD ["node", "main.js"]
