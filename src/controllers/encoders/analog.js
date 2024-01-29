import errors from '../../errors.js';
import {analog, Frame, utils} from '../../externals/joobyCodec.js';
import {requestById, responseById} from '../../../../../jooby-codecs/jooby-codec/dist/analog/constants/commandRelations.js';


const constructCommand = command => {
    const constructor = requestById.get(command.id) || responseById.get(command.id);

    return new constructor(command);
};


/**
 * @this fastify.FastifyInstance
 */
export default function encode ( request, reply ) {
    try {
        const {
            commands,
            framingFormat,
            protocolOptions,
            response
        } = request.body;

        let bytes = analog.message.toBytes(commands.map(constructCommand));

        if ( framingFormat === 'hdlc' ) {
            bytes = Frame.toFrame(bytes, 7).bytes;
        }

        reply.send({
            ...response,
            data: utils.getStringFromBytes(bytes, protocolOptions.encodingFormat)
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
