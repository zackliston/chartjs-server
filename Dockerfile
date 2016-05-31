FROM node:6.2.0

# Install required native dependencies
RUN apt-get update
RUN apt-get -y install libcairo2-dev libjpeg62-turbo-dev libpango1.0-dev libgif-dev build-essential g++

# Add non-admin user
RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/chartjs/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/chartjs
RUN npm install && npm rebuild canvas

USER root
COPY . $HOME/chartjs
RUN chown -R app:app $HOME/*
USER app

CMD ["node", "index.js"]
