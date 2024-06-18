import * as constants from '@jooby-dev/jooby-codec/constants/index.js';
import {analog} from '@jooby-dev/jooby-codec/index.js';
import * as framingFormats from '../../../constants/framingFormats.js';
import errors from '../../../errors.js';
import {HDLC} from '../../../constants/framingFormats.js';


const directionsSet = new Set(Object.values(constants.directions));
const hardwareTypesSet = new Set(Object.values(analog.constants.hardwareTypes));
const bytesConversionFormatsSet = new Set(Object.values(constants.bytesConversionFormats));
const framingTypesSet = new Set(Object.values(framingFormats));


const validateRequest = ( {body}, reply ) => {
    const {
        deviceEUI,
        direction,
        bytesConversionFormat,
        hardwareType,
        framingFormat
    } = body;

    if ( typeof deviceEUI !== 'string' ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong deviceEUI value. ${deviceEUI}`);

        return false;
    }

    if ( direction && !directionsSet.has(direction) ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong direction value. ${direction}`);

        return false;
    }

    if ( bytesConversionFormat && !bytesConversionFormatsSet.has(bytesConversionFormat) ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong encoding format value. ${bytesConversionFormat}`);

        return false;
    }

    if ( hardwareType && !hardwareTypesSet.has(hardwareType) ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong hardware type value. ${hardwareType}`);

        return false;
    }

    if ( framingFormat && !framingTypesSet.has(framingFormat) ) {
        reply.sendError(errors.BAD_REQUEST, `Wrong framing format value. ${framingFormat}`);

        return false;
    }

    return true;
};


export const validateDecoder = ( request, reply ) => {
    const {body: {data}} = request;

    if ( !validateRequest(request) ) {
        return false;
    }

    if ( typeof data !== 'string' ) {
        reply.sendError(errors.BAD_REQUEST, 'The data field should be string');

        return false;
    }

    return true;
};

export const validateEncoder = ( request, reply ) => {
    const {body} = request;
    const {frame, framingFormat} = body;

    if ( !validateRequest(request) ) {
        return false;
    }

    const isHDLC = framingFormat === HDLC;

    if ( isHDLC ) {
        if ( !frame ) {
            reply.sendError(errors.BAD_REQUEST, 'Frame not found');

            return false;
        }
    }

    const {commands} = isHDLC ? frame : body;

    if ( !commands ) {
        reply.sendError(errors.BAD_REQUEST, 'Commands not found');

        return false;
    }

    return true;
};
