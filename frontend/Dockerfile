FROM node:lts-alpine as build
WORKDIR /frontend

COPY package.json . 
RUN npm install --production
COPY . .
RUN npm run build