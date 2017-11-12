FROM node:8.9.0

WORKDIR /probot-app-pr-title

COPY package.json yarn.lock /probot-app-pr-title/

RUN yarn
