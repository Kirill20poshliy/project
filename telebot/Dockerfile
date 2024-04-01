FROM node:alpine

WORKDIR /usr/app/telebot

EXPOSE 88

COPY ./ /usr/app/telebot

RUN npm ci

ENTRYPOINT ["npm", "start"]