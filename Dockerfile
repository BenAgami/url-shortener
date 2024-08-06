FROM node:14-alpine

WORKDIR /app

COPY server/package*.json ./
RUN npm install

COPY server ./

EXPOSE 8080

CMD [ "npm", "run", "dev"]
