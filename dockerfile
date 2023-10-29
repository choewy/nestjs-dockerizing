FROM node:20

EXPOSE 3000

ARG MONGO_HOST
ARG MONGO_PORT

WORKDIR /var/app

COPY .env .env
COPY package-lock.json package-lock.json
COPY package.json package.json
COPY dist dist

RUN echo \ >> .env
RUN echo MONGO_HOST=${MONGO_HOST} >> .env
RUN echo MONGO_PORT=${MONGO_PORT} >> .env

RUN npm ci --omit=dev

CMD ["node", "dist/main.js"]
