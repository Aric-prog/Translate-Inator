FROM node:lts-alpine as build
WORKDIR /frontend
COPY package.json . 
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npx","http-server", "./dist/frontend", "-p", "4200"]