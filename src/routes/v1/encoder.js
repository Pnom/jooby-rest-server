import encode from '../../controllers/encoders/general.js';
import {validateGeneralEncoderRequest} from './utils/validateRequest.js';
import {modifyEncoderRequest} from './utils/modifyRequest.js';


export default fastify => {
    fastify.post(
        `/encoder`,
        {
            preValidation: [
                validateGeneralEncoderRequest
            ],
            preHandler: [
                modifyEncoderRequest
            ]

        },
        encode
    );
};
