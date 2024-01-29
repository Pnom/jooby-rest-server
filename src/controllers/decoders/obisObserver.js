import {obisObserver} from '../../externals/joobyCodec.js';
import decodeFrames from './utils/decodeFrames.js';
import {prepareCommands} from '../utils/prepareCommands.js';
import errors from '../../errors.js';


const decodeMessage = ( bytes, protocolOptions ) => {
    const {commands} = obisObserver.message.fromBytes(bytes, protocolOptions);

    return {isValid: true, commands: prepareCommands(commands)};
};


/**
 * @this fastify.FastifyInstance
 */
export default function decode ( request, reply ) {
    const {
        bytes,
        framingFormat,
        protocolOptions,
        response
    } = request.body;

    try {
        const result = framingFormat === 'hdlc'
            ? {frames: decodeFrames(request.body, 7).map(frame => ({...frame, message: decodeMessage(frame.message, protocolOptions)}))}
            : {message: decodeMessage(bytes, protocolOptions)};

        reply.send({
            codec: 'obisObserver',
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
