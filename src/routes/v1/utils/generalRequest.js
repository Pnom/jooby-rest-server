import * as baseRequest from './request.js';
import * as mtxRequest from './mtxRequest.js';
import * as protocols from '../../../constants/protocols.js';
import errors from '../../../errors.js';


const protocolSet = new Set(Object.values(protocols));

const validateGeneralRequest = ( protocol, reply ) => {
    if ( !protocolSet.has(protocol) ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong protocol value. ${protocol}`);

        return false;
    }

    return true;
};


export const validateDecoder = ( request, reply ) => {
    const {body: {protocol}} = request;

    if ( !validateGeneralRequest(protocol, reply) || !baseRequest.validateDecoder(request, reply) ) {
        return false;
    }

    if ( protocol === protocols.MTX ) {
        return mtxRequest.validateDecoder(request, reply);
    }

    return true;
};

export const validateEncoder = ( request, reply ) => {
    const {body: {protocol}} = request;

    if ( !validateGeneralRequest(protocol, reply) || !baseRequest.validateEncoder(request, reply) ) {
        return false;
    }

    if ( protocol === protocols.MTX ) {
        return mtxRequest.validateEncoder(request, reply);
    }

    if ( protocol === protocols.MTX_LORA ) {
        return mtxLoraRequest.validateEncoder(request, reply);
    }

    return true;
};
