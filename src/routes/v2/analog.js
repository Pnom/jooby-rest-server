import decode from '../../controllers/decoders/analog.js';
import encode from '../../controllers/encoders/analog.js';
import {validateDecoder, validateEncoder} from './utils/request.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';


const resource = 'analog';

const validateAnalogDecoderRequest = ( request, reply, done ) => {
    validateDecoder(request, reply);

    done();
};

const validateAnalogEncoderRequest = ( request, reply, done ) => {
    validateEncoder(request, reply);

    done();
};


export default fastify => {
    fastify.post(
        `/decoder/${resource}`,
        {
            preValidation: [validateAnalogDecoderRequest],
            preHandler: [modifyDecoderRequest]
        },
        decode
    );

    fastify.post(
        `/encoder/${resource}`,
        {
            preValidation: [validateAnalogEncoderRequest],
            preHandler: [modifyEncoderRequest]
        },
        encode
    );
};
