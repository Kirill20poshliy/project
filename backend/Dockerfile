FROM node:alpine

WORKDIR /usr/app/backend

EXPOSE 8080

COPY ./ /usr/app/backend

RUN npm ci

ENTRYPOINT ["node", "index.js"]