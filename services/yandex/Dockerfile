FROM node:17 AS builder
WORKDIR /builder
COPY ./package.json ./yarn.lock ./
RUN ["yarn", "install"]
COPY . .
RUN ["yarn", "build"]

FROM node:17
WORKDIR /usr/src/app
COPY --from=builder /builder/build .
ENV NODE_ENV production
USER node
HEALTHCHECK --interval=10s --timeout=5s CMD curl --max-time 1 --fail http://localhost:3002/ping || kill 1
CMD ["node", "main.js"]
