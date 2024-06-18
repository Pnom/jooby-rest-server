import getBytesFromString from '../../../utils/getBytesFromString.js';


const modifyRequestBody = body => {
    const {
        aesKey,
        bytesConversionFormat,
        data,
        deviceEUI,
        direction,
        dlms,
        framingFormat,
        hardwareType,
        maxSegmentSize,
        segmentationSessionId
    } = body;

    let aesKeyBytes;

    if ( aesKey ) {
        aesKeyBytes = getBytesFromString(aesKey, bytesConversionFormat);
    }

    const response = {
        deviceEUI,
        direction,
        dlms,
        hardwareType,
        bytesConversionFormat,
        framingFormat,
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
