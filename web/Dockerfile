FROM --platform=linux/amd64 node:16-alpine
RUN npm i -g serve
WORKDIR /usr/app
COPY package.json pnpm-lock.yaml ./
RUN npm install
COPY . .
RUN npm run build
COPY .env ./dist
WORKDIR ./dist
EXPOSE 3001
CMD ["npm", "run", "serve"]