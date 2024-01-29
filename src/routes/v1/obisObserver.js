import decode from '../../controllers/decoders/obisObserver.js';
import encode from '../../controllers/encoders/obisObserver.js';
import {validateEncoderRequest, validateDecoderRequest} from './utils/validateRequest.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';


const resource = 'obisObserver';


export default fastify => {
    fastify.post(
        `/decoder/${resource}`,
        {
            preValidation: [
                validateDecoderRequest
            ],
            preHandler: [
                modifyDecoderRequest
            ]
        },
        decode
    );

    fastify.post(
        `/encoder/${resource}`,
        {
            preValidation: [
                validateEncoderRequest
            ],
            preHandler: [
                modifyEncoderRequest
            ]
        },
        encode
    );
};
