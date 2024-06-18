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
        frame,
        framingFormat,
        hardwareType,
        maxSegmentSize,
        messageId,
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
        accessLevel,
        framingFormat,
        messageId,
        segmentationSessionId,
        maxSegmentSize,
        data
    };

    if ( frame ) {
        const {type, destination, source} = frame;

        response.frame = {type, destination, source};

        if ( frame.messageId ) {
            response.frame.messageId = frame.messageId;
        }
    }

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
