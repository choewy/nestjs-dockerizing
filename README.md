# NestJS Dockerizing

## step 1. install dependencies

```zsh
npm ci
```

## step 2. run docker(mongodb, ...etc)

```zsh
npm run start:docker
```

## step 3. start nestjs

```zsh
npm run start:dev
```

## step 4. build nestjs

```zsh
npm run build
```

## step 5. build docker image and run docker container(nestjs)

```zsh
docker-compose up --build -d
```
