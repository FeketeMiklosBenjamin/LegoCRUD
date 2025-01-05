FROM node
WORKDIR /home/node/app
COPY ./lego.json .
RUN npm i -g json-server
ENTRYPOINT [ "json-server", "lego.json", "-h", "0.0.0.0"]