# Use official Node.js LTS image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy app source code
COPY ./src ./src
COPY .env ./

# Expose the port your app runs on
EXPOSE 5000

# Start the server
CMD ["node", "src/server.js"]
