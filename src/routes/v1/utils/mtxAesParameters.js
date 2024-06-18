import {mtx} from '@jooby-dev/jooby-codec/index.js';
import getBytesFromString from '../../../utils/getBytesFromString.js';
import errors from '../../../errors.js';


const {accessLevels} = mtx.constants;
const accessLevelsSet = new Set(Object.values(accessLevels));


const validateParameters = ( request, reply ) => {
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


export const validateDecoder = validateParameters;


export const validateEncoder = ( request, reply ) => {
    const {body} = request;
    const {
        accessLevel,
        aesKey
    } = body;

    if ( !validateParameters(request, reply) ) {
        return false;
    }

    if ( accessLevel ) {
        if ( !accessLevelsSet.has(accessLevel) ) {
            reply.sendError(errors.BAD_REQUEST, `Wrong access level value. ${accessLevel}`);

            return false;
        }

        if ( accessLevel !== mtx.constants.accessLevels.UNENCRYPTED && !aesKey ) {
            reply.sendError(errors.BAD_REQUEST, `AES key not found`);

            return false;
        }
    }

    return true;
};
