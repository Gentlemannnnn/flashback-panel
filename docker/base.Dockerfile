FROM node:18-slim as base
ENV APP_PATH=/home/node/app
RUN yarn global add turbo@1.6.3
RUN mkdir -p $APP_PATH 
WORKDIR $APP_PATH
RUN chown -R node:node $APP_PATH


ENV APP_PATH=/home/node/app
USER root
RUN yarn global add turbo@1.6.3 && mkdir -p $APP_PATH && \
  chown -R node:node $APP_PATH
WORKDIR $APP_PATH
