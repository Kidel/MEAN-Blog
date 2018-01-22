FROM node:latest
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# Pulling code from repository
RUN mkdir /projects
WORKDIR /projects
RUN git clone https://github.com/Kidel/MEAN-Blog.git

# Moving to app directory
WORKDIR /projects/MEAN-Blog/RestServer

# Install app dependencies
RUN npm install --unsafe-perm

# Setting up mongo url from env
ENV MONGO_URL mongodb://database:27017/

EXPOSE 3000
CMD [ "npm", "start" ]

