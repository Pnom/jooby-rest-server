import * as baseRequest from './common.js';
import errors from '../../../errors.js';


export const validateDecoder = ( request, reply, done ) => {
    baseRequest.validateDecoder(request, reply);

    done();
};

export const validateEncoder = ( request, reply, done ) => {
    const {commands} = request.body;

    if ( baseRequest.validateEncoder(request, reply) && !commands ) {
        reply.sendError(errors.BAD_REQUEST, 'Commands not found');
    }

    done();
};
