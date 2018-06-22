#!/bin/sh

set -e

# Typedoc and jest coverage generated abs href path, html generation is not supported change site base path =(
cp -R /app/documentation/assets /app/build/assets/ \
&& cp /app/coverage/lcov-report/base.css /app/build/base.css \
&& cp /app/coverage/lcov-report/block-navigation.js /app/build/block-navigation.js \
&& cp /app/coverage/lcov-report/prettify.css /app/build/prettify.css \
&& cp /app/coverage/lcov-report/prettify.js /app/build/prettify.js \
&& cp /app/coverage/lcov-report/sort-arrow-sprite.png /app/build/sort-arrow-sprite.png \
&& cp /app/coverage/lcov-report/sorter.js /app/build/sorter.js \
&& mv /app/coverage/lcov-report /app/build/coverage \
&& mv /app/documentation /app/build/documentation \
&& find /app/build/coverage -type f -name "*.html" -exec sed -i -e 's/href=\"src/href=\"\/coverage\/src/g' {} \; \
&& find /app/build/documentation -type f -name "*.html" -exec sed -i -e 's/href=\"modules/href=\"\/documentation\/modules/g' {} \;