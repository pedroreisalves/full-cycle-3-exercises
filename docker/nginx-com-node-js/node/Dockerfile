FROM node:25

ENV DOCKERIZE_VERSION=v0.9.6

WORKDIR /usr/src/app/

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]