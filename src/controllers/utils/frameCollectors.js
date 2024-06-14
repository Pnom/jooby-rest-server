import FrameCollector from '@jooby-dev/jooby-codec/utils/frameCollector.js';
import getEpochSeconds from '../../utils/getEpochSeconds.js';
import {startCollectorsCleaner} from './collectorsCleaner.js';


const frameCollectors = new Map();


export const getFrameCollector = deviceEUI => {
    let collector = frameCollectors.get(deviceEUI);

    if ( !collector ) {
        collector = new FrameCollector();
        frameCollectors.set(deviceEUI, collector);
        startCollectorsCleaner();
    }

    collector.lastAccessTime = getEpochSeconds();

    return collector;
};

export const cleanupFrameCollectors = ( currentTime, ttlPeriod ) => (
    [...frameCollectors].forEach(
        ([key, collector]) => {
            if ( collector.isEmpty() || collector.lastAccessTime + ttlPeriod < currentTime ) {
                frameCollectors.delete(key);
            }
        }
    )
);
