'use strict';

const Hapi=require('hapi');
const routes = require('./routes/index');
const config = require('./config');
const elasticRepo = require('./repositories/elasticRepo');

console.clear() //clear console on start

const server = new Hapi.server({
    port: config.port,
    routes: {'cors': true}
});

const registerRoutes = () => {

    server.route(routes);

    server.route({
        method: 'GET',
        path: '/health',
        options: {
            auth: false
        },
        handler: async (request, h) => {
            try {
                await elasticRepo.healthCheck();
                return { status: 'GOOD' };
            } catch(err) {
                return { status: 'BAD', reason: err };
            }
        }
    });
}
  
const init = async () => {  
    registerRoutes();
    
    await server.start();

    await elasticRepo.connect();
    
    return server;
  
  };
  
  init().then(server => {
    console.log('Server running at:', server.info.uri);
  }).catch(err => {
    console.log(err);
  });
