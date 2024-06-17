import {validateEncoder} from './validators/general.js';
import {modifyEncoderRequest} from './utils/modifyRequest.js';
import encode from '../../controllers/encoders/general.js';


export default fastify => {
    fastify.post(
        `/encoder`,
        {
            preValidation: [validateEncoder],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
