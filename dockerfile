FROM node:20

EXPOSE 3000

ARG MONGO_HOST
ARG MONGO_PORT
ARG REDIS_HOST
ARG REDIS_PORT
ARG MYSQL_HOST
ARG MYSQL_PORT

WORKDIR /var/app

COPY .env.build .env
COPY package-lock.json package-lock.json
COPY package.json package.json
COPY dist dist

RUN echo \ >> .env
RUN echo MONGO_HOST=${MONGO_HOST} >> .env
RUN echo MONGO_PORT=${MONGO_PORT} >> .env
RUN echo REDIS_HOST=${REDIS_HOST} >> .env
RUN echo REDIS_PORT=${REDIS_PORT} >> .env
RUN echo MYSQL_WRITER_HOST=${MYSQL_HOST} >> .env
RUN echo MYSQL_WRITER_PORT=${MYSQL_PORT} >> .env
RUN echo MYSQL_READER_HOST=${MYSQL_HOST} >> .env
RUN echo MYSQL_READER_PORT=${MYSQL_PORT} >> .env

RUN npm ci --omit=dev

CMD ["node", "dist/main.js"]
