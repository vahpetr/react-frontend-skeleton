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
COPY --from=builder /app/coverage/lcov-report /usr/share/nginx/html/coverage
COPY --from=builder /app/documentation /usr/share/nginx/html/documentation
# typedoc and jest coverage generated abs href path, html generation is not supported change site base path =(
RUN cp -R /usr/share/nginx/html/documentation/assets /usr/share/nginx/html/assets/ \
    && cp /usr/share/nginx/html/coverage/base.css /usr/share/nginx/html/base.css \
    && cp /usr/share/nginx/html/coverage/block-navigation.js /usr/share/nginx/html/block-navigation.js \
    && cp /usr/share/nginx/html/coverage/prettify.css /usr/share/nginx/html/prettify.css \
    && cp /usr/share/nginx/html/coverage/prettify.js /usr/share/nginx/html/prettify.js \
    && cp /usr/share/nginx/html/coverage/sort-arrow-sprite.png /usr/share/nginx/html/sort-arrow-sprite.png \
    && cp /usr/share/nginx/html/coverage/sorter.js /usr/share/nginx/html/sorter.js
RUN find /usr/share/nginx/html/coverage -type f -name "*.html" -exec sed -i -e 's/href=\"src/href=\"\/coverage\/src/g' {} \; \
    && find /usr/share/nginx/html/documentation -type f -name "*.html" -exec sed -i -e 's/href=\"modules/href=\"\/documentation\/modules/g' {} \;
EXPOSE 80