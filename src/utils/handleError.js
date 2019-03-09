const Boom = require('boom');

module.exports = (error) => {
  if(Boom.isBoom(error)) {
    return error;
  } else {
    return Boom.badImplementation('Something went wrong', error);
  }
}