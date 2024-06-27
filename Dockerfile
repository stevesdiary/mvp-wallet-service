FROM node:20-alpine 

WORKDIR /src/index

COPY . /app

RUN npm install

COPY . .

EXPOSE 3000

ENV NAME mvp-wallet-service

CMD ["npm", "start"]