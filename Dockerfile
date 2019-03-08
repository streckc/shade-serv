FROM node:10-alpine

EXPOSE 8088

ENV NODE_ENV production
ENV PORT 8088
# Run npm start to start up the app

CMD [ "npm", "run", "serve" ]

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --loglevel=warn

COPY . .