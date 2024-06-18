import {downlink, uplink} from '@jooby-dev/jooby-codec/analog/message/index.js';
import {dataSegment as downlinkDataSegment} from '@jooby-dev/jooby-codec/analog/commands/downlink/index.js';
import {dataSegment as uplinkDataSegment} from '@jooby-dev/jooby-codec/analog/commands/uplink/index.js';
import {splitBytesToDataSegments} from '@jooby-dev/jooby-codec/analog/utils/splitBytesToDataSegments.js';
import * as directions from '../../../constants/directions.js';
import getStringFromBytes from '../../../utils/getStringFromBytes.js';


const encodeAnalogDataSegments = ( bytes, options ) => {
    const {direction, maxSegmentSize = 50} = options;
    const segments = splitBytesToDataSegments(bytes, {maxSegmentSize, ...options});
    const encoder = direction === directions.DOWNLINK ? downlink : uplink;
    const id = direction === directions.DOWNLINK ? downlinkDataSegment.id : uplinkDataSegment.id;

    return segments.map(parameters => getStringFromBytes(encoder.toBytes([{id, parameters}]), options));
};

export default encodeAnalogDataSegments;
