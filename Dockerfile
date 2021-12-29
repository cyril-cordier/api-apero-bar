FROM node:14.17.4-alpine3.14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 8080
CMD [ "npm", "run", "start" ]