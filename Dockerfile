# Använd en officiell Node runtime som parent image
FROM node:18-alpine

# Sätt arbetskatalogen i containern
WORKDIR /app

# Kopiera package.json och package-lock.json
COPY package*.json ./

# Installera projektets dependencies
RUN npm install

# Kopiera resten av applikationens källkod
COPY . .

# Exponera port 3000
EXPOSE 3000

# Starta applikationen
CMD ["npm", "start"] 