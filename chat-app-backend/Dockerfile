FROM node:22.18.0-alpine
WORKDIR /chat/backend
COPY . .
RUN npm install
CMD ["node", "--env-file=.env", "index.js"]
EXPOSE 8000