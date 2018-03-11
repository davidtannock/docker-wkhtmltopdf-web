FROM dtannock/node-wkhtmltopdf:8.10.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --only=production

# Bundle app source
COPY . .

ENV HTTP_PORT 8080
EXPOSE 8080

CMD ["npm", "start"]
