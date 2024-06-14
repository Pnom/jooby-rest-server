import {downlink, uplink} from '@jooby-dev/jooby-codec/obis-observer/message/index.js';
import * as wrappers from '@jooby-dev/jooby-codec/obis-observer/message/wrappers.js';
import {utils} from '@jooby-dev/jooby-codec/index.js';
import * as Frame from '@jooby-dev/jooby-codec/utils/frame.js';
import {HDLC} from '../../constants/framingFormats.js';
import getStringFromBytes from '../../utils/getStringFromBytes.js';
import errors from '../../errors.js';


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
            frame,
            bytesConversionFormat,
            response
        } = body;

        const {commands} = framingFormat === HDLC ? frame : body;
        let bytes = toBytes(commands);

        if ( framingFormat === HDLC ) {
            bytes = Frame.toFrame(bytes).bytes;
            response.frame.data = getStringFromBytes(bytes, bytesConversionFormat);
        } else {
            response.data = getStringFromBytes(bytes, bytesConversionFormat);
        }

        reply.send(response);
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
