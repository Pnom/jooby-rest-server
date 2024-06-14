import * as messages from '@jooby-dev/jooby-codec/obis-observer/message/index.js';
import {downlink, uplink} from '@jooby-dev/jooby-codec/obis-observer/commands/byId.js';
import * as wrappers from '@jooby-dev/jooby-codec/obis-observer/message/wrappers.js';
import {fromBytes as frameFromBytes} from '@jooby-dev/jooby-codec/utils/frame.js';
import decodeFrames from './utils/decodeFrames.js';
import {HDLC} from '../../constants/framingFormats.js';
import {prepareCommands} from '../utils/preparations.js';
import getStringFromBytes from '../../utils/getStringFromBytes.js';
import errors from '../../errors.js';


const obisObserverFrameDataBits = 7;
const commandsById = {...downlink, ...uplink};

const fromBytes = wrappers.getFromBytes(
    {...messages.downlink.fromBytesMap, ...messages.uplink.fromBytesMap},
    {...messages.downlink.nameMap, ...messages.uplink.nameMap}
);

const decodeMessage = ( bytes, options ) => {
    const {commands} = fromBytes(bytes);

    return {commands: prepareCommands(commandsById, commands, options)};
};

const prepareFrame = ( {bytes, payload}, options ) => ({
    bytes: getStringFromBytes(bytes, options),
    payload: getStringFromBytes(payload, options)
});


const decodeFrame = ( bytes, options ) => {
    const frame = frameFromBytes(bytes, obisObserverFrameDataBits);

    if ( 'payload' in frame ) {
        return {
            ...prepareFrame(frame, options),
            ...decodeMessage(frame.payload, options)
        };
    }

    return {
        ...prepareFrame(frame, options)
    };
};

/**
 * @this fastify.FastifyInstance
 */
export default function decode ( {body}, reply ) {
    const {
        bytes,
        framingFormat,
        response
    } = body;

    try {
        const result = framingFormat === HDLC
            ? {frames: decodeFrames(body).map(frame => decodeFrame(frame, body))}
            : {message: decodeMessage(bytes, body)};

        reply.send({
            ...response,
            ...result
        });
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
