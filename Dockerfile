# ---- Development ----
FROM node:24.15.0-alpine AS development
WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
