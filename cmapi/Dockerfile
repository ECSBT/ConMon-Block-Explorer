FROM node:12-alpine
WORKDIR /app/

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 9001

CMD npm start