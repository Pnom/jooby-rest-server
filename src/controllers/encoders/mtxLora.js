import errors from '../../errors.js';
import {analog, utils, mtxLora, joobyCodecConstants} from '../../externals/joobyCodec.js';
import {splitBytesToDataSegments} from '../../../../../jooby-codecs/jooby-codec/dist/analog/splitBytesToDataSegments.js';
import {requestById as mtxRequestById, responseById as mtxResponseById} from '../../../../../jooby-codecs/jooby-codec/dist/mtx/constants/commandRelations.js';
import {requestById as mtxLoraRequestById, responseById as mtxLoraResponseById} from '../../../../../jooby-codecs/jooby-codec/dist/mtxLora/constants/commandRelations.js';
import {accessLevels} from '../../../../../jooby-codecs/jooby-codec/dist/mtx/constants/index.js';


const constructDownlinkMtxLoraCommands = commands => commands.map(command => {
    const constructor = mtxLoraRequestById.get(command.id);

    return constructor ? new constructor(command) : null;
});

const constructUplinkMtxLoraCommands = commands => commands.map(command => {
    const constructor = mtxLoraResponseById.get(command.id);

    return constructor ? new constructor(command) : null;
});

const constructDownlinkMtxCommands = commands => commands.map(command => {
    const constructor = mtxRequestById.get(command.id);

    return constructor ? new constructor(command) : null;
});

const constructUplinkMtxCommands = commands => commands.map(command => {
    const constructor = mtxResponseById.get(command.id);

    return constructor ? new constructor(command) : null;
});


/**
 * @this fastify.FastifyInstance
 */
export default function encode ( request, reply ) {
    try {
        const {
            commands,
            protocolOptions,
            response
        } = request.body;

        let mtxCommands = ( protocolOptions.direction === joobyCodecConstants.directions.UPLINK )
            ? constructUplinkMtxLoraCommands(commands)
            : constructDownlinkMtxLoraCommands(commands);

        let accessLevel = accessLevels.UNENCRYPTED;

        if ( mtxCommands.some(command => command === null) ) {
            mtxCommands = ( protocolOptions.direction === joobyCodecConstants.directions.UPLINK )
                ? constructUplinkMtxCommands(commands)
                : constructDownlinkMtxCommands(commands);
            accessLevel = protocolOptions.accessLevel;
        }

        const mtxBytes = mtxLora.message.toBytes(protocolOptions.messageId, mtxCommands, {accessLevel, ...protocolOptions});
        const dataSegmentCommands = splitBytesToDataSegments(mtxBytes, {maxSegmentSize: 50, ...protocolOptions});

        const segmentBytes = dataSegmentCommands.map(
            dataSegmentCommand => (utils.getStringFromBytes(analog.message.toBytes([dataSegmentCommand]), protocolOptions.encodingFormat))
        );

        reply.send({
            ...response,
            segments: segmentBytes
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
