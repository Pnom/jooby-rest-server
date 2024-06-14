import {utils} from '@jooby-dev/jooby-codec/index.js';
import getBytesFromString from '../../../utils/getBytesFromString.js';


const modifyRequestBody = body => {
    const {
        accessLevel,
        aesKey,
        bytesConversionFormat,
        data,
        deviceEUI,
        direction,
        dlms,
        frameHeader,
        framingFormat,
        hardwareType,
        maxSegmentSize,
        messageId,
        segmentationSessionId
    } = body;

    let aesKeyBytes;

    if ( aesKey ) {
        aesKeyBytes = utils.getBytesFromHex(aesKey, bytesConversionFormat);
    }

    const response = {
        deviceEUI,
        direction,
        dlms,
        hardwareType,
        bytesConversionFormat,
        accessLevel,
        frameHeader,
        framingFormat,
        messageId,
        segmentationSessionId,
        maxSegmentSize,
        data
    };

    return {
        ...body,
        aesKeyBytes,
        response
    };
};


export const modifyDecoderRequest = ( request, reply, done ) => {
    const body = modifyRequestBody(request.body);
    const {data, bytesConversionFormat} = request.body;

    body.bytes = getBytesFromString(data, bytesConversionFormat);
    request.body = body;

    done();
};

export const modifyEncoderRequest = ( request, reply, done ) => {
    request.body = modifyRequestBody(request.body);

    done();
};
