import {validateDecoder, validateEncoder} from './validators/mtx.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';
import decode from '../../controllers/decoders/mtx.js';
import encode from '../../controllers/encoders/mtx.js';
import {MTX} from '../../constants/protocols.js';


export default fastify => {
    fastify.post(
        `/decoder/${MTX}`,
        {
            preValidation: [validateDecoder],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );

    fastify.post(
        `/encoder/${MTX}`,
        {
            preValidation: [validateEncoder],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
