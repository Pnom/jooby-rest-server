import analog from './analog.js';
import mtx from './mtx.js';
import obisObserver from './obisObserver.js';


const encoders = {
    analog,
    mtx,
    obisObserver
};


/**
 * @this fastify.FastifyInstance
 */
export default function encode ( request, reply ) {
    const {body: {protocol}} = request;

    encoders[protocol](request, reply);
}
