import decode from '../../controllers/decoders/mtx.js';
import encode from '../../controllers/encoders/mtx.js';
import * as mtxRequest from './utils/mtxRequest.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';


const validateDecoderRequest = ( request, reply, done ) => {
    mtxRequest.validateDecoder(request, reply);

    done();
};

const validateEncoderRequest = ( request, reply, done ) => {
    mtxRequest.validateEncoder(request, reply, done);

    done();
};

const registerRoute = ( fastify, protocol ) => {
    const addProtocolToBody = ( request, reply, done ) => {
        request.body.protocol = protocol;

        done();
    };

    fastify.post(
        `/decoder/${protocol}`,
        {
            preValidation: [validateDecoderRequest],
            preHandler: [
                modifyDecoderRequest,
                addProtocolToBody
            ]
        },
        decode
    );

    fastify.post(
        `/encoder/${protocol}`,
        {
            preValidation: [validateEncoderRequest],
            preHandler: [
                modifyEncoderRequest,
                addProtocolToBody
            ]
        },
        encode
    );
};


export default fastify => {
    registerRoute(fastify, 'mtx');

    registerRoute(fastify, 'mtx3');
};
