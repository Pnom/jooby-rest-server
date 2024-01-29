import {analog, mtx, joobyCodecConstants, utils} from '../../../externals/joobyCodec.js';
import {codecByName} from '../../../utils/codecsNames.js';
import * as framingFormats from '../../../constants/framingFormats.js';
import errors from '../../../errors.js';


const {accessLevels, frameTypes} = mtx.constants;
const accessLevelsSet = new Set(Object.keys(accessLevels));
const mtxFrameTypesSet = new Set(Object.keys(frameTypes));
const directionsSet = new Set(Object.keys(joobyCodecConstants.directions));
const hardwareTypesSet = new Set(Object.keys(analog.constants.hardwareTypes));
const encodingTypesSet = new Set(Object.keys(joobyCodecConstants.bytesConversionFormats));
const framingTypesSet = new Set(Object.keys(framingFormats));


const isRequestValid = ( {
    direction,
    encodingFormat,
    hardwareType,
    framingFormat
} ) => (!direction || directionsSet.has(direction.toUpperCase()))
    && (!encodingFormat || encodingTypesSet.has(encodingFormat.toUpperCase()))
    && (!hardwareType || hardwareTypesSet.has(hardwareType.toUpperCase()))
    && (!framingFormat || framingTypesSet.has(framingFormat.toUpperCase()));

const isDecoderRequestValid = body => (typeof body.data === 'string') && isRequestValid(body);

const isEncoderRequestValid = body => !!body.commands && isRequestValid(body);

const isCodecValid = codecName => (!!codecByName[codecName]);

const isMtxRequestValid = body => {
    const {
        accessLevel,
        aesKey,
        framingFormat,
        frameHeader,
        encodingFormat
    } = body;

    if ( framingFormat === 'hdlc' ) {
        if ( frameHeader?.type && !mtxFrameTypesSet.has(frameHeader.type) ) {
            return false;
        }
    }

    if ( !accessLevel ) {
        return true;
    }

    if ( !accessLevelsSet.has(accessLevel.toUpperCase()) ) {
        return false;
    }

    const accessLevelId = accessLevels[accessLevel.toUpperCase()];

    if ( accessLevelId === mtx.constants.accessLevels.UNENCRYPTED ) {
        return true;
    }

    const bytesAesKey = utils.getBytesFromString(aesKey, encodingFormat);

    return bytesAesKey.length === 16;
};


export const validateDecoderRequest = ( {body}, reply, done ) => {
    if ( !isDecoderRequestValid(body) ) {
        reply.sendError(errors.BAD_REQUEST);
    }

    done();
};

export const validateMtxDecoderRequest = ( {body}, reply, done ) => {
    if ( !isDecoderRequestValid(body) || !isMtxRequestValid(body) ) {
        reply.sendError(errors.BAD_REQUEST);
    }

    done();
};

export const validateGeneralDecoderRequest = ( {body}, reply, done ) => {
    if ( !isDecoderRequestValid(body)
        || !isCodecValid(body.codec)
        || ( body.codec === 'mtx' && !isMtxRequestValid(body) )
    ) {
        reply.sendError(errors.BAD_REQUEST);
    }

    done();
};

export const validateEncoderRequest = ( {body}, reply, done ) => {
    if ( !isEncoderRequestValid(body) ) {
        reply.sendError(errors.BAD_REQUEST);
    }

    done();
};

export const validateMtxEncoderRequest = ( {body}, reply, done ) => {
    if ( !isEncoderRequestValid(body) || !isMtxRequestValid(body) ) {
        reply.sendError(errors.BAD_REQUEST);
    }

    done();
};

export const validateGeneralEncoderRequest = ( {body}, reply, done ) => {
    if ( !isEncoderRequestValid(body)
        || !isCodecValid(body.codec)
        || ( body.codec === 'mtx' && !isMtxRequestValid(body) )
    ) {
        reply.sendError(errors.BAD_REQUEST);
    }

    done();
};
