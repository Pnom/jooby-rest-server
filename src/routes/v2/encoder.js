import encode from '../../controllers/encoders/general.js';
import {validateEncoder} from './utils/generalRequest.js';
import {modifyEncoderRequest} from './utils/modifyRequest.js';


const validateRequest = ( request, reply, done ) => {
    validateEncoder(request, reply);

    done();
};


export default fastify => {
    fastify.post(
        `/encoder`,
        {
            preValidation: [validateRequest],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
