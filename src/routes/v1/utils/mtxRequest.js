import * as baseRequest from './request.js';
import * as mtxAesParameters from './mtxAesParameters.js';
import {mtx} from '@jooby-dev/jooby-codec/index.js';
import errors from '../../../errors.js';
import {HDLC} from '../../../constants/framingFormats.js';
import * as directions from '../../../constants/directions.js';


const {frameTypes} = mtx.constants;
const mtxFrameTypesSet = new Set(Object.values(frameTypes));


export const validateDecoder = ( request, reply ) => {
    const {body} = request;
    const {direction} = body;

    if ( baseRequest.validateDecoder(request, reply) || !mtxAesParameters.validateDecoder(request, reply) ) {
        return false;
    }

    if ( direction !== directions.DOWNLINK && direction !== directions.UPLINK ) {
        reply.sendError(errors.BAD_REQUEST, 'Invalid direction value');

        return false;
    }

    return true;
};


export const validateEncoder = ( request, reply ) => {
    const {body} = request;
    const {direction, framingFormat, frameHeader, segmentationSessionId, messageId} = body;

    if ( !baseRequest.validateEncoder(request, reply) || !mtxAesParameters.validateEncoder(request, reply) ) {
        return false;
    }

    if ( direction !== directions.DOWNLINK && direction !== directions.UPLINK ) {
        reply.sendError(errors.BAD_REQUEST, 'Invalid direction value');
    }

    if ( !messageId ) {
        reply.sendError(errors.BAD_REQUEST, 'Message id not found');

        return false;
    }

    if ( framingFormat === HDLC ) {
        if ( frameHeader?.type && !mtxFrameTypesSet.has(frameHeader.type) ) {
            reply.sendError(errors.BAD_REQUEST, `Wrong frame header. Type: ${frameHeader.type}`);

            return false;
        }
    } else if ( !segmentationSessionId ) {
        reply.sendError(errors.BAD_REQUEST, 'Segmentation session id not found');

        return false;
    }

    return true;
};
