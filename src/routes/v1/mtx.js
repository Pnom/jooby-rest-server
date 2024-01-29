import decode from '../../controllers/decoders/mtx.js';
import encode from '../../controllers/encoders/mtx.js';
import {validateMtxEncoderRequest, validateMtxDecoderRequest} from './utils/validateRequest.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';


const resource = 'mtx';


export default fastify => {
    fastify.post(
        `/decoder/${resource}`,
        {
            preValidation: [
                validateMtxDecoderRequest
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
                validateMtxEncoderRequest
            ],
            preHandler: [
                modifyEncoderRequest
            ]
        },
        encode
    );
};
