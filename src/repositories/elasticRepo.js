const elasticsearch = require('elasticsearch');
const config = require('../config');
const mapping = require('./shadeMapping');

let client;

const connect = async () => {
  client = new elasticsearch.Client({
    host: config.elastic.host,
    log: 'trace'
  });

  // await createIndex();
}

const writeData = (body) => {
  client.index(
    {
      index: 'shade-'+body.name,
      type: body.name,
      body
    }
  );
}

const createIndex = async () => {

  if(!await client.indices.exists({index: config.elastic.index})) {
    await client.indices.create({
      index: config.elastic.index,
      body: mapping
    });
  }
}

const healthCheck = () => {
  return new Promise((resolve, reject) => {
    client.ping({
      requestTimeout: 30000,
    }, (error) => {
      if (error) {
        reject('elasticsearch cluster is down!');
      } else {
        resolve('All is well');
      }
    });
  });
}

module.exports = {
  connect,
  writeData,
  healthCheck
}