FROM node:10-alpine

LABEL maintainer="yusufkan142@gmail.com"

WORKDIR /usr/app


COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 30002

CMD [ "node", "app.js" ]