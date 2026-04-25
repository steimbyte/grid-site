# Full Stack: Node.js Backend + Static Frontend
FROM node:20-alpine

WORKDIR /app

# Copy server files
COPY server/package*.json ./
RUN npm install

COPY server/ ./

# Create sites directory
RUN mkdir -p /sites

# Volume for persistent uploads
VOLUME [ "/sites" ]

EXPOSE 3000

CMD ["node", "server.js"]
