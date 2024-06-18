import * as common from './common.js';
import {mtx} from '@jooby-dev/jooby-codec/index.js';
import errors from '../../../errors.js';
import {HDLC} from '../../../constants/framingFormats.js';
import * as directions from '../../../constants/directions.js';
import getBytesFromString from '../../../utils/getBytesFromString.js';

const {accessLevels, frameTypes} = mtx.constants;
const accessLevelsSet = new Set(Object.values(accessLevels));
const mtxFrameTypesSet = new Set(Object.values(frameTypes));


const validateAesParameters = ( request, reply ) => {
    const {body} = request;
    const {
        aesKey,
        bytesConversionFormat
    } = body;

    if ( aesKey ) {
        const bytesAesKey = getBytesFromString(aesKey, bytesConversionFormat);

        if ( bytesAesKey.length !== 16 ) {
            reply.sendError(errors.BAD_REQUEST, 'Wrong access key value');

            return false;
        }
    }

    return true;
};

const checkDecoder = ( request, reply ) => {
    const {body} = request;
    const {direction} = body;

    if ( !common.validateDecoder(request, reply) || !validateAesParameters(request, reply)) {
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
    const {body} = request;
    const {
        aesKey,
        direction,
        framingFormat,
        header,
        segmentationSessionId,
        message
    } = body;

    if ( !message || !message.id || !message.commands) {
        reply.sendError(errors.BAD_REQUEST, 'Message is invalid. Message, message id or commands not found');

        return;
    }

    if ( !common.validateEncoder(request, reply) || !validateAesParameters(request, reply) ) {
        return;
    }

    if ( direction !== directions.DOWNLINK && direction !== directions.UPLINK ) {
        reply.sendError(errors.BAD_REQUEST, 'Invalid direction value');

        return;
    }

    const {accessLevel} = message;

    if ( accessLevel ) {
        if ( !accessLevelsSet.has(accessLevel) ) {
            reply.sendError(errors.BAD_REQUEST, `Wrong access level value. ${accessLevel}`);

            return;
        }

        if ( accessLevel !== mtx.constants.accessLevels.UNENCRYPTED && !aesKey ) {
            reply.sendError(errors.BAD_REQUEST, `AES key not found`);

            return;
        }
    }

    if ( framingFormat === HDLC ) {
        if ( header?.type && !mtxFrameTypesSet.has(header.type) ) {
            reply.sendError(errors.BAD_REQUEST, `Wrong frame header. Type: ${header.type}`);
        }
    } else if ( !segmentationSessionId && segmentationSessionId !== 0 ) {
        reply.sendError(errors.BAD_REQUEST, 'Segmentation session id not found');
    }
};


export const validateEncoder = ( request, reply, done ) => {
    checkEncoder(request, reply);

    done();
};
