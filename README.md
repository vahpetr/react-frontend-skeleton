# Frontend skeleton

Frintend skeleton web app

## Installation

```bash
npm install
```

## Running the app

```bash
# development watch
npm run start

# production
npm run build
```

## Running the tests

```bash
# unit tests
npm run test
```

## Running the app in docker

```sh
    docker build -t frontend-skeleton .
    docker run -it --rm -p 10080:80 frontend-skeleton
```

## Documentation

1. [Jest](https://basarat.gitbooks.io/typescript/docs/testing/jest.html) test framework .
1. [Favicon](https://favicon.io/?text=F&shape=square&fontFamily=Leckerli+One&fontSize=125&fontColor=%23ffffff&backgroundColor=%232b9eeb) generator.

### TODO

1. Add support enzyme
1. Add saga spec test
