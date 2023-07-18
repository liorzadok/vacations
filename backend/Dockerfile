#Inherit current image from an alpine image containing node:
FROM node:18-alpine

#Install nodemon globally for hot-reloading useing host volume on project directory:
RUN npm i -g nodemon

#Install ts-node for running type script:
RUN npm i -g ts-node

#create an emprt directory for project files and set it as the current directory
WORKDIR /backend 

#copy local package.json && package-lock.json into /app:
COPY package*.json /backend

#Install npm dependencies
RUN npm i

# copy project local files (first dot) into /app:
COPY . /backend/

#Execute our "npm start" inside /backend (workdir) when container starts:
ENTRYPOINT npm start