'use strict';

const Hapi=require('hapi');
const routes = require('./routes/index');
const config = require('./config');

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
        handler: (request, h) => {
            return {status: 'GOOD'}
        }
    });
}
  
const init = async () => {  
    registerRoutes();
    
    await server.start();
    
    return server;
  
  };
  
  init().then(server => {
    console.log('Server running at:', server.info.uri);
  }).catch(err => {
    console.log(err);
  });
