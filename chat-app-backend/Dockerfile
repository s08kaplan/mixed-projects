FROM node:22.18.0-alpine
WORKDIR /chat/backend
COPY package*.json ./
RUN npm install
COPY . .
#CMD ["node", "--env-file=.env", "index.js"]
EXPOSE 8000
CMD ["node", "index.js"]