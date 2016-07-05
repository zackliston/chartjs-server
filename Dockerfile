FROM node:6.2.0

# Install required native dependencies
RUN apt-get update
RUN apt-get -y install libcairo2-dev libjpeg62-turbo-dev libpango1.0-dev libgif-dev build-essential g++

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/chartjs/

WORKDIR $HOME/chartjs
RUN npm install && npm rebuild canvas

COPY . $HOME/chartjs

CMD ["node", "index.js"]
