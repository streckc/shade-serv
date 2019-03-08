const elasticRepo = require('../repositories/elasticRepo');

const writeNetworkData = (data) => {
  return elasticRepo.writeNetworkData('home', data);
}

const getNetworkCount = async () => {
  return elasticRepo.getNetworkCount();
}

module.exports = {
  writeNetworkData,
  getNetworkCount
}