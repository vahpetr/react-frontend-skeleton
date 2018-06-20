FROM node:9.11.1-alpine AS builder

WORKDIR /app

RUN apk add --update git python2 make g++

# Add sources
ADD package.json package-lock.json ./

# https://docs.npmjs.com/cli/install 
ENV CI=true \
    NPM_CONFIG_LOGLEVEL=error \
    NODE_ENV=production \
    BABEL_ENV=production \ 
    GENERATE_SOURCEMAP=true \
    GENERATE_ANALYSISMAP=true

RUN npm install --production

COPY . .

# Test and build 
RUN npm test && npm run build

FROM nginx:alpine
RUN apk --no-cache add dnsmasq supervisor
CMD ["supervisord", "-n"]
COPY supervisord.conf /etc/supervisord.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/coverage /usr/share/nginx/html/coverage
EXPOSE 80