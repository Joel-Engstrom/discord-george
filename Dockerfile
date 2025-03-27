# Använd en officiell Node runtime som parent image
FROM oven/bun:latest

# Sätt arbetskatalogen i containern
WORKDIR /app

# Kopiera package.json och package-lock.json
COPY package*.json ./

# Installera projektets dependencies
RUN bun install

# Kopiera resten av applikationens källkod
COPY . .

# Starta applikationen
CMD ["bun", "src/main.ts"] 