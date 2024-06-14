import {downlink, uplink} from '@jooby-dev/jooby-codec/mtx/message/index.js';
import * as frame from '@jooby-dev/jooby-codec/mtx/utils/frame.js';
import {accessLevels} from '@jooby-dev/jooby-codec/mtx/constants/index.js';
import {HDLC} from '../../constants/framingFormats.js';
import * as directions from '../../constants/directions.js';
import encodeAnalogDataSegments from './utils/encodeAnalogDataSegments.js';
import getStringFromBytes from '../../utils/getStringFromBytes.js';
import errors from '../../errors.js';


/**
 * @this fastify.FastifyInstance
 */
export default function encode ( {body}, reply ) {
    try {
        const {
            accessLevel = accessLevels.UNENCRYPTED,
            commands,
            messageId,
            direction,
            aesKeyBytes,
            frameHeader,
            framingFormat,
            response
        } = body;

        const bytes = direction === directions.DOWNLINK
            ? downlink.toBytes(commands, {messageId, accessLevel, aesKey: aesKeyBytes})
            : uplink.toBytes(commands, {messageId, accessLevel, aesKey: aesKeyBytes});

        if ( framingFormat === HDLC ) {
            reply.send({
                ...response,
                data: getStringFromBytes(frame.toBytes(bytes, frameHeader), body)
            });
        } else {
            reply.send({
                ...response,
                segments: encodeAnalogDataSegments(bytes, body)
            });
        }
    } catch ( error ) {
        reply.sendError(errors.BAD_REQUEST, error);
    }
}
