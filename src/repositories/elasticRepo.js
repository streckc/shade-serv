const elasticsearch = require('elasticsearch');

let client;

const connect = () => {
  client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });
}

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

const writeSystemData = (location, body) => {
  const id = create_UUID();
  client.create(
    {
      index: 'shade-system',
      type: location,
      id,
      body
    }
  );

  return id;
}

const writeNetworkData = (location, body) => {
  const id = create_UUID();
  client.create(
    {
      index: 'shade-network',
      type: location,
      id,
      body
    }
  );

  return id;
}

const getSystemCount = async () => {
  const { count } = await client.count({
    index: 'shade-system'
  });

  return count;
}

const getNetworkCount = async () => {
  const { count } = await client.count({
    index: 'shade-network'
  });

  return count;
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
  writeSystemData,
  writeNetworkData,
  getSystemCount,
  getNetworkCount,
  healthCheck
}