import analog from './analog.js';
//import chirpstack from './chirpstack.js';
import decoder from './decoder.js';
import encoder from './encoder.js';
import mtx from './mtx.js';
import obisObserver from './obisObserver.js';


export default async fastify => {
    // this route required to inform nginx about service status
    fastify.get('/health', ( request, reply ) => {
        reply.type('text/plain').send('I\'m alive!');
    });

    analog(fastify);
    //chirpstack(fastify);
    decoder(fastify);
    encoder(fastify);
    mtx(fastify);
    obisObserver(fastify);
};
