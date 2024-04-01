FROM node:alpine

WORKDIR /usr/app/frontend

EXPOSE 3000

COPY ./ /usr/app/frontend

RUN npm install

RUN npm run build

ENTRYPOINT ["npm", "start"]