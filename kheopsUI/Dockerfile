FROM node:10-alpine as build-stage
RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.prod .env
RUN npm run build

FROM nginx:1.19.9-alpine as production-stage

ENV KHEOPS_UI_ROOT_URI=
ENV KHEOPS_UI_ADDITIONAL_OIDC_OPTIONS={}

RUN mkdir /etc/nginx/templates

COPY --from=build-stage /app/script/ui.conf /etc/nginx/templates/default.conf.template
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/src/assets /usr/share/nginx/html/assets
COPY --from=build-stage /app/script/docker-entrypoint-nginx.sh /docker-entrypoint.d/kheopsui-docker-entrypoint.sh

EXPOSE 3000

RUN rm /var/log/nginx/access.log /var/log/nginx/error.log

CMD ["nginx", "-g", "daemon off;"]
