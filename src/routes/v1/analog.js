import {validateDecoder, validateEncoder} from './validators/analog.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';
import decode from '../../controllers/decoders/analog.js';
import encode from '../../controllers/encoders/analog.js';
import {ANALOG} from '../../constants/protocols.js';


export default fastify => {
    fastify.post(
        `/decoder/${ANALOG}`,
        {
            preValidation: [validateDecoder],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );

    fastify.post(
        `/encoder/${ANALOG}`,
        {
            preValidation: [validateEncoder],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
