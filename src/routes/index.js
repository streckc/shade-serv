const handler = require('../handlers/handler');
const handleError = require('../utils/handleError');

const dataEndpoint = {
  method:'POST',
  path: '/',
  handler: (request, h) => {
    try {
      handler.writeData(request.payload)
  
      return h.response().code(201);
    } catch(err) {
      return handleError(err);
    }
  }
};
module.exports = [dataEndpoint];