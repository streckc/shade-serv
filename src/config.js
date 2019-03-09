const config = {};

config.port = process.env.PORT || 8080;

config.elastic = {
  host: process.env.ELASTIC_HOST || 'localhost:9200'
}
module.exports = config;