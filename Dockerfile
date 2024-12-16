FROM node:lts as build

WORKDIR /app

COPY app/package.json app/package-lock.json /app/

RUN npm install

COPY app/ /app/

# This search and replace is needed to set the baseUrl to '/' only
RUN sed -i 's|/documentation/|/|g' docusaurus.config.ts

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx-conf /etc/nginx/conf.d
