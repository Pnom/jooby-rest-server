import {decodeAnalogMessage} from './utils/decodeAnalogMessage.js';
import decodeFrames from './utils/decodeFrames.js';
import {prepareCommands} from '../utils/prepareCommands.js';
import errors from '../../errors.js';


const decodeMessage = ( bytes, {deviceEUI, protocolOptions} ) => {
    const {isValid, commands} = decodeAnalogMessage(bytes, {...protocolOptions, deviceEUI});

    return {isValid, commands: prepareCommands(commands)};
};

/**
 * @this fastify.FastifyInstance
 */
export default function decode ( request, reply ) {
    const {
        bytes,
        framingFormat,
        response
    } = request.body;

    try {
        const result = framingFormat === 'hdlc'
            ? {frames: decodeFrames(request.body).map(frame => ({...frame, message: decodeMessage(frame.message, request.body)}))}
            : {message: decodeMessage(bytes, request.body)};

        reply.send({
            codec: 'analog',
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
