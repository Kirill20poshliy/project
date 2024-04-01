FROM node:18.5.0

WORKDIR /usr/app/telebot

EXPOSE 88

COPY ./ /usr/app/telebot

RUN npm install

ENTRYPOINT ["npm", "start"]