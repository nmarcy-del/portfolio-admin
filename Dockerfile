# Dockerfile
FROM node:18.15-alpine3.16 as builder
WORKDIR /app
COPY .env ./
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 5000

CMD ["npm", "start", "--host", "0.0.0.0"]