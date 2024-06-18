import * as baseRequest from './common.js';
import errors from '../../../errors.js';
import * as directions from '../../../constants/directions.js';

const checkDecoder = ( request, reply ) => {
    const {direction} = request.body;

    if ( !baseRequest.validateDecoder(request, reply) ) {
        return;
    }

    if ( direction !== directions.DOWNLINK && direction !== directions.UPLINK ) {
        reply.sendError(errors.BAD_REQUEST, 'Invalid direction value');
    }
};


export const validateDecoder = ( request, reply, done ) => {
    checkDecoder(request, reply);

    done();
};

const checkEncoder = ( request, reply ) => {
    const {direction, commands} = request.body;

    if ( !baseRequest.validateEncoder(request, reply) ) {
        return;
    }

    if ( !commands ) {
        reply.sendError(errors.BAD_REQUEST, 'Commands not found');

        return;
    }

    if ( direction !== directions.DOWNLINK && direction !== directions.UPLINK ) {
        reply.sendError(errors.BAD_REQUEST, 'Invalid direction value');
    }
};


export const validateEncoder = ( request, reply, done ) => {
    checkEncoder(request, reply);

    done();
};
