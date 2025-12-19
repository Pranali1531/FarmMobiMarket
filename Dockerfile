# Use the specific Node.js version v20.11.1 as the base image
FROM node:20.11.1

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install

RUN npm install notistack

# Copy the .env file
COPY .env .env

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app will run on
EXPOSE 3001

# Command to run the React app
CMD ["npm", "run", "dev"]
