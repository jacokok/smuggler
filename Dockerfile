FROM zenika/alpine-chrome:with-playwright
USER root
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST="0.0.0.0"
EXPOSE ${PORT}
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN chown -R chrome /usr/src/app
USER chrome
CMD ["npm", "start"]
