FROM node:lts-alpine as build
WORKDIR /backend
COPY package.json . 
RUN npm install --production
COPY . .
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /backend/dist ./dist
COPY --from=build /backend/node_modules
CMD ["node", "./dist/index.js"]