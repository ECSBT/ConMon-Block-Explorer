FROM node:12-alpine
WORKDIR /usr/src/app/
RUN apk update && apk upgrade
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 9000
CMD [ "npm", "start" ]