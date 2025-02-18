FROM node:16-alpine

WORKDIR /app

COPY package* ./

RUN npm install

# RUN npm install -g serve
RUN npm install serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist"]
