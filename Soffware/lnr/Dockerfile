# https://dev.to/rodrigokamada/creating-and-running-an-angular-application-in-a-docker-container-40mk
# docker build -t lnr .
# docker run -p 4201:4200 lnr

FROM node:22-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli
RUN npm install -g three
RUN npm install

RUN ng build threeobject
RUN ng build lnr

CMD ["ng", "serve", "--host", "0.0.0.0"]