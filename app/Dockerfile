FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start", "-H 0.0.0.0"]