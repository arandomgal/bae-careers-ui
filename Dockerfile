FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm set strict-ssl false
RUN npm install
COPY ./ ./
CMD [ "/bin/sh", "-c", "export REACT_APP_CAREERS_REST_API_URL='http://10.104.155.141:30003/jobs';echo $REACT_APP_CAREERS_REST_API_URL;npm start" ]