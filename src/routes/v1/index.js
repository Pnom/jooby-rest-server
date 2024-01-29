import decoder from './decoder.js';
import analog from './analog.js';
import mtx from './mtx.js';
import mtxLora from './mtxLora.js';
import obisObserver from './obisObserver.js';


export default async fastify => {
    // this route required to inform nginx about service status
    fastify.get('/health', ( request, reply ) => {
        reply.type('text/plain').send('I\'m alive!');
    });

    decoder(fastify);
    analog(fastify);
    mtx(fastify);
    mtxLora(fastify);
    obisObserver(fastify);
};
