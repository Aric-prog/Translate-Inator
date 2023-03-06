FROM node:lts-alpine as build
WORKDIR /frontend
COPY package.json . 
RUN npm install --omit=dev
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npx","http-server", "./dist/frontend", "-p", "4200"]