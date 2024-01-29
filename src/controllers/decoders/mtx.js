import {mtx} from '../../externals/joobyCodec.js';
import decodeFrames from './utils/decodeFrames.js';
import {prepareCommands} from '../utils/prepareCommands.js';
import CommandBinaryBuffer from '../../../../../jooby-codecs/jooby-codec/dist/mtx/CommandBinaryBuffer.js';
import errors from '../../errors.js';


const decodeMessage = ( bytes, protocolOptions ) => {
    const {
        messageId,
        accessLevel,
        commands
    } = mtx.message.fromBytes(bytes, protocolOptions);

    return {isValid: true, messageId, accessLevel, commands: prepareCommands(commands)};
};

const decodeFrame = ( frame, protocolOptions ) => {
    const buffer = new CommandBinaryBuffer(frame.message);

    return {
        ...frame,
        ...buffer.getFrameHeader(),
        message: decodeMessage(buffer.getBytesLeft(), protocolOptions)
    };
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
            ? {frames: decodeFrames(request.body, 8).map(frame => decodeFrame(frame, protocolOptions))}
            : {message: decodeMessage(bytes, protocolOptions)};

        reply.send({
            codec: 'mtx',
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
