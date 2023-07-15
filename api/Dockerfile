FROM --platform=linux/amd64 node:16-alpine

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm run build
COPY .env ./dist
WORKDIR ./dist

EXPOSE 3000

CMD ["npm", "start"]