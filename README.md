# Frontend skeleton

Frontend skeleton web app. Deployed on Heroku [react-frontend-skeleton.herokuapp.com](https://react-frontend-skeleton.herokuapp.com/). First open can be slow, the node can sleep.

## Installation

```bash
npm install
echo "PORT=80" >> .env
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
# all tests
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

## Deploy on Heroku

```sh
heroku update
heroku create
heroku container:login
heroku container:push web
heroku container:release web
heroku open
```

### TODO

1. Add more component tests
1. Add saga tests
