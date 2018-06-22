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
ADD nginx/scripts/prepare.sh /
# Test, build and prepare
RUN npm test && npm run build && chmod +x /prepare.sh && /prepare.sh

FROM nginx:alpine
COPY nginx/etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD /bin/sh -c "sed -i 's/listen 80/listen ${PORT}/g' /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'