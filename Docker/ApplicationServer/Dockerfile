FROM node:latest
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# Pulling code from repository
RUN mkdir /projects
WORKDIR /projects
RUN git clone https://github.com/Kidel/MEAN-Blog.git

# Moving to app directory
WORKDIR /projects/MEAN-Blog/ApplicationServer

# Install app dependencies
RUN npm install --unsafe-perm

# Building Angular app
RUN $(npm bin)/ng build --prod --build-optimizer

# Env variables
ENV PORT 8080
ENV REST_URL localhost

EXPOSE 8080
CMD [ "npm", "start" ]

