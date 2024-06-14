import errors from '../../errors.js';
import * as Frame from '@jooby-dev/jooby-codec/utils/frame.js';
import {downlink, uplink} from '@jooby-dev/jooby-codec/analog/message/index.js';
import {HDLC} from '../../constants/framingFormats.js';
import getStringFromBytes from '../../utils/getStringFromBytes.js';
import * as directions from '../../constants/directions.js';


/**
 * @this fastify.FastifyInstance
 */
export default function encode ( {body}, reply ) {
    try {
        const {
            direction,
            framingFormat,
            frame,
            response
        } = body;

        const {commands} = framingFormat === HDLC ? frame : body;

        let bytes = direction === directions.DOWNLINK
            ? downlink.toBytes(commands)
            : uplink.toBytes(commands);

        if ( framingFormat === HDLC ) {
            bytes = Frame.toFrame(bytes).bytes;
            response.frame.data = getStringFromBytes(bytes, body);
        } else {
            response.data = getStringFromBytes(bytes, body);
        }

        reply.send(response);
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
