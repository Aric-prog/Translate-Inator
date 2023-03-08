FROM node:alpine as build
WORKDIR /usr/app

COPY package.json . 
RUN npm install 
COPY . .
RUN npm run build
 
FROM nginx:latest
COPY --from=build /usr/app/dist/frontend /usr/share/nginx/html
EXPOSE 80