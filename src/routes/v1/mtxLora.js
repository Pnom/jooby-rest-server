import decode from '../../controllers/decoders/mtxLora.js';
import encode from '../../controllers/encoders/mtxLora.js';
import {validateMtxEncoderRequest, validateMtxDecoderRequest} from './utils/validateRequest.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';


const resource = 'mtxLora';


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
