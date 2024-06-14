import {decodeAnalogMessage} from './utils/decodeAnalogMessage.js';
import {fromBytes as frameFromBytes} from '@jooby-dev/jooby-codec/utils/frame.js';
import decodeFrames from './utils/decodeFrames.js';
import {HDLC} from '../../constants/framingFormats.js';
import {prepareCommands} from '../utils/preparations.js';
import getStringFromBytes from '../../utils/getStringFromBytes.js';
import errors from '../../errors.js';


const decodeMessage = ( bytes, options ) => {
    const {message} = decodeAnalogMessage(bytes, options);

    return message;
};

const prepareFrame = ( {bytes, payload}, options ) => ({
    bytes: getStringFromBytes(bytes, options),
    payload: getStringFromBytes(payload, options)
});


const decodeFrame = ( bytes, options ) => {
    const frame = frameFromBytes(bytes);

    if ( 'payload' in frame ) {
        return {
            ...prepareFrame(frame, options),
            ...decodeAnalogMessage(frame.payload, options)
        };
    }

    return {
        ...prepareFrame(frame, options)
    };
};


/**
 * @this fastify.FastifyInstance
 */
export default function decode ( request, reply ) {
    const {body} = request;
    const {
        bytes,
        framingFormat,
        response
    } = body;

    try {
        const result = framingFormat === HDLC
            ? {frames: decodeFrames(body).map(frame => decodeFrame(frame, body))}
            : decodeAnalogMessage(bytes, body);

        reply.send({
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
