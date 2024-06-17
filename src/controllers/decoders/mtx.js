import * as mtx from '@jooby-dev/jooby-codec/mtx/message/index.js';
import * as mtx3 from '@jooby-dev/jooby-codec/mtx3/message/index.js';
import {downlinkById, uplinkById} from '@jooby-dev/jooby-codec/mtx/commands/index.js';
import {accessLevels} from '@jooby-dev/jooby-codec/mtx/constants/index.js';
import {fromBytes as frameFromBytes} from '@jooby-dev/jooby-codec/mtx/utils/frame.js';
import {MTXLORA} from '@jooby-dev/jooby-codec/analog/constants/hardwareTypes.js';
import {decodeAnalogMessage} from './utils/decodeAnalogMessage.js';
import decodeFrames from './utils/decodeFrames.js';
import {HDLC} from '../../constants/framingFormats.js';
import {prepareCommands} from '../utils/preparations.js';
import * as protocols from '../../constants/protocols.js';
import getStringFromBytes from '../../utils/getStringFromBytes.js';
import errors from '../../errors.js';
import * as directions from '../../constants/directions.js';


const fromBytes = ( bytes, options ) => {
    const message = options.protocol === protocols.MTX ? mtx : mtx3;

    return options.direction === directions.DOWNLINK ? message.downlink.fromBytes(bytes, options) : message.uplink.fromBytes(bytes, options);
};

const prepareMtxCommands = ( commands, options ) => (
    prepareCommands(
        options.direction === directions.DOWNLINK ? downlinkById : uplinkById,
        commands,
        options
    ));

const decodeMessage = ( bytes, options ) => {
    const {aesKeyBytes} = options;
    const {
        messageId,
        accessLevel = accessLevels.UNENCRYPTED,
        commands
    } = fromBytes(bytes, {...options, aesKey: aesKeyBytes});

    return {
        id: messageId,
        accessLevel,
        commands: prepareMtxCommands(commands, options)
    };
};

const prepareFrame = ( {header, bytes, payload}, options ) => ({
    header,
    data: getStringFromBytes(bytes, options),
    payload: getStringFromBytes(payload, options)
});


const decodeFrame = ( bytes, options ) => {
    const frame = frameFromBytes(bytes);

    if ( 'payload' in frame ) {
        return {
            ...prepareFrame(frame, options),
            message: decodeMessage(frame.payload, options)
        };
    }

    return {
        ...prepareFrame(frame, options)
    };
};

const decodeLoraMessage = body => {
    const {bytes} = body;
    const assembledMessages = [];

    const {
        commands,
        payload
    } = decodeAnalogMessage(bytes, {...body, hardwareType: MTXLORA});

    for ( let index = 0; index < payload?.length; index++ ) {
        const mtxBuffer = payload[index];

        if ( mtxBuffer.length !== 0 ) {
            const mtxMessage = decodeMessage(mtxBuffer.data, body);

            if ( mtxMessage ) {
                assembledMessages.push({
                    segmentationSessionId: mtxBuffer.segmentationSessionId,
                    data: getStringFromBytes(mtxBuffer.data, body),
                    message: mtxMessage
                });
            }
        }
    }

    return assembledMessages.length === 0 ? {commands} : {commands, assembledMessages};
};


/**
 * @this fastify.FastifyInstance
 */
export default function decode ( {body}, reply ) {
    const {
        framingFormat,
        response
    } = body;

    try {
        const result = framingFormat === HDLC
            ? {frames: decodeFrames(body).map(frame => decodeFrame(frame, body))}
            : decodeLoraMessage(body);

        reply.send({
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
