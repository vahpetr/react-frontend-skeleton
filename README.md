# Frontend skeleton

Frintend skeleton web app

## Installation

```bash
npm install
```

## Run app

```bash
# development watch
npm run start

# production
npm run build
```

## Running tests

```bash
# unit tests
npm run test
```

## Run app in docker

```sh
docker build -t frontend-skeleton .
docker run -it --rm -p 80:80 --name frontend-skeleton frontend-skeleton
```

Or

```sh
docker-compose up
```

### TODO

1. Add more comonent tests
1. Add saga tests
