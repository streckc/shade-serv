const handler = require('../handlers/systemHandler');

const system = {
  method:'POST',
  path: '/system',
  handler: (request, h) => {
    const id = handler.writeSystemData(request.payload);

    return h.response(id).code(201);
  }
};

const systemCount = {
  method:'GET',
  path: '/system',
  handler: async (request, h) => {
    const count = await handler.getSystemCount();

    return h.response(count);
  }
}

module.exports = [system, systemCount];