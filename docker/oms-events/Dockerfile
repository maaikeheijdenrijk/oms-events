FROM node:12

RUN mkdir -p /usr/app/src \
	&& mkdir -p /usr/app/media/headimages \
	&& mkdir -p /usr/app/scripts

COPY ./docker/oms-events/bootstrap.sh /usr/app/scripts/bootstrap.sh
COPY . /usr/app/src

RUN chown -R node:node /usr/app

WORKDIR /usr/app/src

USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH="/home/node/.npm-global/bin:${PATH}"

RUN npm install -g --loglevel warn nodemon && npm cache clean --force
RUN npm install --loglevel warn

CMD sh /usr/app/scripts/bootstrap.sh && nodemon -e "js,json" lib/run.js

EXPOSE 8084
