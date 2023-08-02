FROM node:20-alpine

WORKDIR /app

COPY . .

COPY ./.env ./.env

RUN npm install -g npm@9.8.1

RUN npm run build

EXPOSE 3003:3003

CMD ["npm", "run", "start:prod"]