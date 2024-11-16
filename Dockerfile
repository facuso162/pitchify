FROM node:22-alpine
RUN adduser -D -s /bin/sh -u 1001 app
USER app

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]