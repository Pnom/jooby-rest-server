import * as common from './common.js';
import validatorByProtocol from './validatorByProtocol.js';
import errors from '../../../errors.js';


export const validateDecoder = ( request, reply, done ) => {
    const {body: {protocol}} = request;

    if ( !common.validateDecoder(request, reply) ) {
        done();

        return;
    }

    const validator = validatorByProtocol[protocol];

    if ( validator ) {
        validator.validateDecoder(request, reply, done);
    } else {
        reply.sendError(errors.BAD_REQUEST, `Wrong protocol value. ${protocol}`);
        done();
    }
};

export const validateEncoder = ( request, reply, done ) => {
    const {body: {protocol}} = request;

    if ( !common.validateEncoder(request, reply) ) {
        done();

        return;
    }

    const validator = validatorByProtocol[protocol];

    if ( validator ) {
        validator.validateEncoder(request, reply, done);
    } else {
        reply.sendError(errors.BAD_REQUEST, `Wrong protocol value. ${protocol}`);
        done();
    }
};
