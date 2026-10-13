# docker build -t lnr .
# docker run -p 4201:4200 lnr
# docker container list
# docker stop <container id>
# docker system prune -f

FROM node:24-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli
RUN npm install -g three
RUN npm install

RUN ng version 
RUN ng build threeobject
RUN ng build lnr

CMD ["ng", "serve", "--host", "0.0.0.0"]
