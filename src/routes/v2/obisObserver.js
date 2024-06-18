import decode from '../../controllers/decoders/obisObserver.js';
import encode from '../../controllers/encoders/obisObserver.js';
import {validateDecoder, validateEncoder} from './utils/request.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';


const resource = 'obisObserver';

const validateObisObserverDecoderRequest = ( request, reply, done ) => {
    validateDecoder(request, reply);

    done();
};

const validateObisObserverEncoderRequest = ( request, reply, done ) => {
    validateEncoder(request, reply);

    done();
};


export default fastify => {
    fastify.post(
        `/decoder/${resource}`,
        {
            preValidation: [validateObisObserverDecoderRequest],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );

    fastify.post(
        `/encoder/${resource}`,
        {
            preValidation: [validateObisObserverEncoderRequest],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
