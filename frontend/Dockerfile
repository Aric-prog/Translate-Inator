FROM node:lts-alpine as build
WORKDIR /frontend
COPY package.json . 
RUN npm install
COPY . .
RUN npm run build
CMD ["npx","http-server", "./dist/frontend"]
