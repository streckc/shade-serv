const system = require('./systemRoutes');
const network = require('./networkRoutes');

module.exports = [].concat(system, network);