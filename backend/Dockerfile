FROM node:lts-alpine as build
WORKDIR /backend
COPY *.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine
WORKDIR /backend
COPY --from=build /backend/package.* ./
COPY --from=build /backend/dist ./dist
COPY --from=build /backend/node_modules ./node_modules
CMD ["node", "./dist/index.js"]