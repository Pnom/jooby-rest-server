import {validateDecoder} from './validators/general.js';
import {modifyDecoderRequest} from './utils/modifyRequest.js';
import decode from '../../controllers/decoders/general.js';


export default fastify => {
    fastify.post(
        `/decoder`,
        {
            preValidation: [validateDecoder],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );
};
