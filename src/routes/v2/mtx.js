import decode from '../../controllers/decoders/mtx.js';
import encode from '../../controllers/encoders/mtx.js';
import * as mtxRequest from './utils/mtxRequest.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';


const resource = 'mtx';


const validateDecoderRequest = ( request, reply, done ) => {
    mtxRequest.validateDecoder(request, reply);

    done();
};

const validateEncoderRequest = ( request, reply, done ) => {
    mtxRequest.validateEncoder(request, reply, done);

    done();
};


export default fastify => {
    fastify.post(
        `/decoder/${resource}`,
        {
            preValidation: [validateDecoderRequest],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );

    fastify.post(
        `/encoder/${resource}`,
        {
            preValidation: [validateEncoderRequest],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
