import analog from './analog.js';
import mtx from './mtx.js';
import mtxLora from './mtxLora.js';
import obisObserver from './obisObserver.js';


const encoders = {
    analog,
    mtx,
    mtxLora,
    obisObserver
};


/**
 * @this fastify.FastifyInstance
 */
export default function encode ( request, reply ) {
    const {body: {codec}} = request;

    encoders[codec](request, reply);
}
