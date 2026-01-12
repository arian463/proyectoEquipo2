FROM node:22-bookworm

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y

EXPOSE 3000

CMD [ "npm", "run", 'dev' ]
