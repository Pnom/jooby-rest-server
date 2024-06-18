import {validateDecoder, validateEncoder} from './validators/obisObserver.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';
import decode from '../../controllers/decoders/obisObserver.js';
import encode from '../../controllers/encoders/obisObserver.js';
import {OBIS_OBSERVER} from '../../constants/protocols.js';


export default fastify => {
    fastify.post(
        `/decoder/${OBIS_OBSERVER}`,
        {
            preValidation: [validateDecoder],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );

    fastify.post(
        `/encoder/${OBIS_OBSERVER}`,
        {
            preValidation: [validateEncoder],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
