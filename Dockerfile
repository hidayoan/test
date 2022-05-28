FROM node:14.16

# create destination directory
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY tsconfig.json /app

RUN yarn install

EXPOSE 4300

CMD [ "yarn", "dev" ]