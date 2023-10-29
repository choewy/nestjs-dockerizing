FROM node:20

EXPOSE 3000

WORKDIR /var/app

COPY ./package-lock.json .
COPY ./package.json .
COPY ./.env .
COPY ./dist ./dist

RUN npm ci --omit=dev

CMD ["node", "dist/main.js"]
