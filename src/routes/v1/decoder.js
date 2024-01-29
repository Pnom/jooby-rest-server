import decode from '../../controllers/decoders/general.js';
import {validateGeneralDecoderRequest} from './utils/validateRequest.js';
import {modifyDecoderRequest} from './utils/modifyRequest.js';


export default fastify => {
    fastify.post(
        `/decoder`,
        {
            preValidation: [
                validateGeneralDecoderRequest
            ],
            preHandler: [
                modifyDecoderRequest
            ]

        },
        decode
    );
};
