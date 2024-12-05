FROM node:20 AS build

LABEL version="1.0"
LABEL description="Paper Thesis Web App"

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start", "-H 0.0.0.0"]