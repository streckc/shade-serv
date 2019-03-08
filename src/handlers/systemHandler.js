const elasticRepo = require('../repositories/elasticRepo');

const writeSystemData = (data) => {
  return elasticRepo.writeSystemData('home', data);
}

const getSystemCount = async () => {
  return elasticRepo.getSystemCount();
}

module.exports = {
  writeSystemData,
  getSystemCount
}