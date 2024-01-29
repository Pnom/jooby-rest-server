import {analog, mtx, joobyCodecConstants, utils} from '../../../externals/joobyCodec.js';


const {accessLevels, frameTypes} = mtx.constants;
const {directions, bytesConversionFormats} = joobyCodecConstants;
const {hardwareTypes} = analog.constants;


const modifyRequestBody = body => {
    const {
        accessLevel,
        aesKey,
        data,
        deviceEUI,
        frameHeader,
        direction,
        hardwareType,
        framingFormat,
        encodingFormat,
        messageId
    } = body;
    const accessLevelId = accessLevel ? accessLevels[accessLevel.toUpperCase()] : accessLevels.UNENCRYPTED;
    const directionId = direction ? directions[direction.toUpperCase()] : undefined;
    const hardwareTypeId = hardwareType ? hardwareTypes[hardwareType.toUpperCase()] : undefined;
    const encodingFormatId = encodingFormat ? bytesConversionFormats[encodingFormat.toUpperCase()] : bytesConversionFormats.BASE64;
    const protocolOptions = {
        accessLevel: accessLevelId,
        direction: directionId,
        hardwareType: hardwareTypeId,
        encodingFormat: encodingFormatId,
        messageId: messageId || 0,
        framingFormat,
        frameHeader: {
            type: frameHeader?.type ? frameTypes[frameHeader.type.toUpperCase()] : frameTypes.DATA_REQUEST,
            destination: frameHeader?.destination || 0xffff,
            source: frameHeader?.source || 0xffff
        }
    };

    if ( aesKey ) {
        protocolOptions.aesKey = utils.getBytesFromString(aesKey, encodingFormat);
    }

    const response = {
        accessLevel,
        deviceEUI,
        direction,
        hardwareType,
        encodingFormat,
        framingFormat,
        frameHeader,
        messageId,
        data
    };

    return {
        ...body,
        response,
        protocolOptions
    };
};

const modifyDecoderRequestBody = body => {
    const modifiedBody = modifyRequestBody(body);
    const {data, protocolOptions} = modifiedBody;

    modifiedBody.bytes = utils.getBytesFromString(data, protocolOptions.encodingFormat);

    return modifiedBody;
};


export const modifyDecoderRequest = ( request, reply, done ) => {
    request.body = modifyDecoderRequestBody(request.body);

    done();
};

export const modifyEncoderRequest = ( request, reply, done ) => {
    request.body = modifyRequestBody(request.body);

    done();
};
