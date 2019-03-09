const elasticRepo = require('../repositories/elasticRepo');

const writeData = (data) => {
  const dataFixed = fixTimes(data);

  elasticRepo.writeData(dataFixed);
}

const fixTimes = (data) => {
  const dataCopy = data;
  dataCopy.end_ts = new Date(data.end_ts * 1000);
  dataCopy.start_ts = new Date(data.start_ts * 1000);
  
  return dataCopy;
}

module.exports = {
  writeData
}