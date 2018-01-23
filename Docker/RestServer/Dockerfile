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

# Env variables
ENV MONGO_URL mongodb://database:27017/
ENV PORT 3000

EXPOSE 3000
CMD [ "npm", "start" ]

