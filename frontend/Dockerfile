FROM node:alpine

WORKDIR /usr/app/client

EXPOSE 3000

COPY ./ /usr/app/client

RUN npm ci

RUN npm run build

ENTRYPOINT ["npm", "start"]