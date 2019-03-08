FROM node:10-alpine

EXPOSE 8010

ENV NODE_ENV production
ENV PORT 8010
# Run npm start to start up the app

CMD [ "npm", "run", "serve" ]

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --loglevel=warn

COPY . .