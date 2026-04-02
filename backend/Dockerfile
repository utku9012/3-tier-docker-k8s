FROM node:18-alpine

#app directory
WORKDIR /app

#dependencies
COPY package*.json ./

RUN npm install --production

# Copy app source
COPY . .

EXPOSE 3000

# Start the app
CMD ["node", "server.js"]  
