import errors from '../../errors.js';
import {mtx, utils} from '../../externals/joobyCodec.js';
import {requestById, responseById} from '../../../../../jooby-codecs/jooby-codec/dist/mtx/constants/commandRelations.js';


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
        const {frameHeader} = protocolOptions;

        let bytes = mtx.message.toBytes(commands.map(constructCommand), protocolOptions);

        if ( framingFormat === 'hdlc' ) {
            bytes = mtx.message.toFrame(bytes, frameHeader);
        }

        reply.send({
            ...response,
            data: utils.getUtilsFromBytes(bytes, protocolOptions.encodingFormat)
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
