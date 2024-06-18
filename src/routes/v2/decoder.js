import decode from '../../controllers/decoders/general.js';
import {validateDecoder} from './utils/generalRequest.js';
import {modifyDecoderRequest} from './utils/modifyRequest.js';


const validateRequest = ( request, reply, done ) => {
    validateDecoder(request, reply);

    done();
};


export default fastify => {
    fastify.post(
        `/decoder`,
        {
            preValidation: [validateRequest],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );
};
