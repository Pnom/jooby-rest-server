import decode from '../../controllers/decoders/analog.js';
import encode from '../../controllers/encoders/analog.js';
import {validateDecoder, validateEncoder} from './utils/request.js';
import {modifyDecoderRequest, modifyEncoderRequest} from './utils/modifyRequest.js';
import errors from '../../errors.js';
import * as directions from '../../constants/directions.js';


const resource = 'analog';

const validateAnalogDecoderRequest = ( request, reply, done ) => {
    const {direction} = request.body;

    validateDecoder(request, reply);

    if ( direction !== directions.DOWNLINK && direction !== directions.UPLINK ) {
        reply.sendError(errors.BAD_REQUEST, 'Invalid direction value');
    }

    done();
};

const validateAnalogEncoderRequest = ( request, reply, done ) => {
    const {direction} = request.body;

    validateEncoder(request, reply);

    if ( direction !== directions.DOWNLINK && direction !== directions.UPLINK ) {
        reply.sendError(errors.BAD_REQUEST, 'Invalid direction value');
    }

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
