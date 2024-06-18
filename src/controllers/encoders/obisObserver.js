import {downlink, uplink} from '@jooby-dev/jooby-codec/obis-observer/message/index.js';
import * as wrappers from '@jooby-dev/jooby-codec/obis-observer/message/wrappers.js';
import * as frame from '@jooby-dev/jooby-codec/utils/frame.js';
import {HDLC} from '../../constants/framingFormats.js';
import getStringFromBytes from '../../utils/getStringFromBytes.js';
import errors from '../../errors.js';

const obisObserverFrameDataBits = 7;

const toBytes = wrappers.getToBytes(
    {...downlink.toBytesMap, ...uplink.toBytesMap},
    {...downlink.nameMap, ...uplink.nameMap}
);

/**
 * @this fastify.FastifyInstance
 */
export default function encode ( {body}, reply ) {
    try {
        const {
            framingFormat,
            commands,
            response
        } = body;

        let bytes = toBytes(commands);

        if ( framingFormat === HDLC ) {
            bytes = frame.toBytes(bytes, obisObserverFrameDataBits);
        }

        response.data = getStringFromBytes(bytes, body);
        reply.send(response);
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
