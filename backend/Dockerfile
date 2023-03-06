FROM node:lts-alpine as build
WORKDIR /backend
COPY package.json . 
RUN npm install 
COPY . .
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /backend/dist ./dist
COPY package.json ./
RUN npm install --production
CMD ["node", "./dist/index.js"]