const handler = require('../handlers/networkHandler');

const network = {
  method:'POST',
  path: '/network',
  handler: (request, h) => {
    const id = handler.writeNetworkData(request.payload);

    return h.response(id).code(201);
  }
};

const networkCount = {
  method:'GET',
  path: '/network',
  handler: async (request, h) => {
    const count = await handler.getNetworkCount();

    return h.response(count);
  }
}

module.exports = [network, networkCount];