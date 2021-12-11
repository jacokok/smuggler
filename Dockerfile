FROM zenika/alpine-chrome:with-playwright
USER root
ENV NODE_ENV=production
EXPOSE 3000
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
RUN chown -R chrome /usr/src/app
USER chrome
CMD ["npm", "start"]
