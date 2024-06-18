import * as baseRequest from './request.js';
import * as mtxAesParameters from './mtxAesParameters.js';
import {mtx} from '@jooby-dev/jooby-codec/index.js';
import errors from '../../../errors.js';
import {HDLC} from '../../../constants/framingFormats.js';


const {frameTypes} = mtx.constants;
const mtxFrameTypesSet = new Set(Object.values(frameTypes));


export const validateDecoder = ( request, reply ) => (
    baseRequest.validateDecoder(request, reply) || !mtxAesParameters.validateDecoder(request, reply)
);


export const validateEncoder = ( request, reply ) => {
    const {body} = request;
    const {framingFormat, frame} = body;

    if ( !baseRequest.validateEncoder(request, reply) || !mtxAesParameters.validateEncoder(request, reply) ) {
        return false;
    }

    if ( framingFormat === HDLC ) {
        if ( frame?.type && !mtxFrameTypesSet.has(frame.type) ) {
            reply.sendError(errors.BAD_REQUEST, `Wrong frame header. Type: ${frame.type}`);

            return false;
        }
    }

    const {messageId} = framingFormat === HDLC ? frame : body;

    if ( !messageId ) {
        reply.sendError(errors.BAD_REQUEST, 'Message id not found');

        return false;
    }

    return true;
};
