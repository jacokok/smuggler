FROM zenika/alpine-chrome:with-playwright as base
USER root
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST="0.0.0.0"
EXPOSE ${PORT}

FROM node:17-alpine as build
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm i
COPY . .
RUN npm run build

FROM base
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY --from=build /usr/src/app/dist .
RUN chown -R chrome /usr/src/app
USER chrome
CMD ["node", "./dist/index.js"]