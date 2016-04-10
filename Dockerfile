FROM node:4.4.1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install required native dependencies
RUN apt-get update
RUN apt-get -y install libcairo2-dev libjpeg62-turbo-dev libpango1.0-dev libgif-dev build-essential g++

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
RUN cd /usr/src/app
RUN npm rebuild canvas

EXPOSE 9076

CMD [ "npm", "start" ]
