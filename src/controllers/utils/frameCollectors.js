import {FrameCollector} from '../../externals/joobyCodec.js';
import getEpochSeconds from '../../utils/getEpochSeconds.js';


const frameCollectors = {
    7: new Map(),
    8: new Map()
};


export const getFrameCollector = ( deviceEUI, dataBits = 8 ) => {
    const collectors = frameCollectors[dataBits];

    if ( !collectors ) {
        throw new Error(`Incorrect dataBits value. ${dataBits}`);
    }

    let collector = collectors.get(deviceEUI);

    if ( !collector ) {
        collector = new FrameCollector(dataBits);
        collectors.set(deviceEUI, collector);
    }

    collector.lastAccessTime = getEpochSeconds();

    return collector;
};

export const cleanupFrameCollectors = ( currentTime, ttlPeriod ) => (
    Object.values(frameCollectors).forEach(collectors => ([...collectors].forEach(
        ([key, collector]) => {
            if ( collector.isEmpty() || collector.lastAccessTime + ttlPeriod < currentTime ) {
                collectors.delete(key);
            }
        }
    )))
);
