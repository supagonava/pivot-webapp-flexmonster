# Common build stage
FROM node:16-alpine as common-build-stage

COPY . ./app
COPY ./.env.example ./app/.env.local

WORKDIR /app

RUN npm install

EXPOSE 3000

# Production build stage
FROM common-build-stage as production-build-stage

RUN ["npm", "run", "build"]

CMD ["npm", "run", "start"]
