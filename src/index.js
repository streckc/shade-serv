'use strict';

const Hapi=require('hapi');
const hapiAuthJWT = require('hapi-auth-jwt2');
const jwksRsa = require('jwks-rsa');
// const routes = require('./routes/index');
const config = require('./config');

console.clear() //clear console on start

const server = new Hapi.server({
    port: config.port,
    routes: {'cors': true}
});

const registerRoutes = () => {

    // server.route(routes);

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

const validateUser = async (decoded, request) => {
    // This is a simple check that the `sub` claim
    // exists in the access token. Modify it to suit
    // the needs of your application
    // console.log("Decoded", decoded);
    if (decoded && decoded.sub) {
        return decoded.scope
            ? {
                isValid: true,
                credentials: {
                    scope: decoded.scope.split(' ')
                }
            }
            : { isValid: true };
    }

    return { isValid: false };
}
  
const init = async () => {
    await server.register(hapiAuthJWT);
    
    // see: http://Hapi.com/api#serverauthschemename-scheme
    server.auth.strategy('jwt', 'jwt', {
        complete: true,
        key: jwksRsa.hapiJwt2KeyAsync({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `https://${config.auth0.domain}/.well-known/jwks.json`
      }),
      verifyOptions: { 
        audience: config.auth0.audience,
        issuer: `https://${config.auth0.domain}/`,
        algorithms: ['RS256']
      },
      validate: validateUser
    });
  
    server.auth.default('jwt');
  
    registerRoutes();
    
    await server.start();
    
    return server;
  
  };
  
  init().then(server => {
    console.log('Server running at:', server.info.uri);
  }).catch(err => {
    console.log(err);
  });
