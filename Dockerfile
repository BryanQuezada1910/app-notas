FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Bundle app source
COPY . .

RUN npm install

CMD [ "tail", "-f", "/dev/null"]