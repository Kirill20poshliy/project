FROM node:18.5.0

WORKDIR /usr/app/backend

EXPOSE 8080

COPY ./ /usr/app/backend

RUN npm install

ENTRYPOINT ["node", "index.js"]