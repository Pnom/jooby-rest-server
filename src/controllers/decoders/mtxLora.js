import {decodeAnalogMessage} from './utils/decodeAnalogMessage.js';
import {analog, mtx, mtxLora, utils} from '../../externals/joobyCodec.js';
import UnknownCommand from '../../../../../jooby-codecs/jooby-codec/dist/mtxLora/UnknownCommand.js';
import {prepareCommands} from '../utils/prepareCommands.js';
import errors from '../../errors.js';


const prepareMtxMessage = ( codecName, {messageId, accessLevel, commands} ) => ({
    messageId,
    accessLevel,
    codec: codecName,
    commands: prepareCommands(commands)
});

const readMtxLoraMessage = ( data, options ) => {
    const message = mtxLora.message.fromBytes(data, {...options, skipLrcCheck: true});

    return message.commands.some(({command}) => command instanceof UnknownCommand)
        ? null
        : prepareMtxMessage('mtxLora', message);
};

const readMtxMessage = ( data, options ) => {
    const message = mtx.message.fromBytes(data, {...options, skipLrcCheck: true});

    return prepareMtxMessage('mtx', message);
};

const processMtxBuffer = ( data, options ) => {
    const {commands} = readMtxLoraMessage(data, options) || readMtxMessage(data, options);

    return {
        codec: 'mtxLora',
        data: utils.getStringFromBytes(data, options.encodingFormat),
        commands
    };
};

/**
 * @this fastify.FastifyInstance
 */
export default function decode ( request, reply ) {
    const {
        bytes,
        deviceEUI,
        framingFormat,
        protocolOptions,
        response
    } = request.body;
    const mtxMessages = [];

    if ( framingFormat === 'hdlc' ) {
        reply.sendError(errors.BAD_REQUEST, 'The HDLC framing format is not supported for the mtxLora');

        return;
    }

    try {
        const {
            isValid,
            commands,
            assembledData
        } = decodeAnalogMessage(bytes, {...protocolOptions, hardwareType: analog.constants.hardwareTypes.MTXLORA, deviceEUI});

        for ( let index = 0; index < assembledData.length; index++ ) {
            const mtxBuffer = assembledData[index];

            if ( mtxBuffer.length !== 0 ) {
                const mtxMessage = processMtxBuffer(mtxBuffer.data, protocolOptions);

                if ( mtxMessage ) {
                    mtxMessages.push({
                        ...response,
                        segmentationSessionId: mtxBuffer.segmentationSessionId,
                        data: utils.getStringFromBytes(mtxBuffer, protocolOptions.encodingFormat),
                        ...mtxMessage
                    });
                }
            }
        }

        const result = [{
            ...response,
            codec: 'mtxLora',
            isValid,
            commands: prepareCommands(commands)
        }];

        reply.send(mtxMessages.length === 0 ? result : result.concat(mtxMessages));

        reply.send({
            codec: 'mtxLora',
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
