import DataSegmentsCollector from '@jooby-dev/jooby-codec/analog/utils/DataSegmentsCollector.js';
import getEpochSeconds from '../../utils/getEpochSeconds.js';
import {startCollectorsCleaner} from './collectorsCleaner.js';


const collectors = new Map();


export const getSegmentCollector = deviceEUI => {
    let collector = collectors.get(deviceEUI);

    if ( !collector ) {
        collector = new DataSegmentsCollector();
        collector.creationTime = getEpochSeconds();
        collectors.set(deviceEUI, collector);
        startCollectorsCleaner();
    }

    return collector;
};

export const removeSegmentCollector = deviceEUI => collectors.delete(deviceEUI);

export const cleanupSegmentCollectors = ( currentTime, ttlPeriod ) => {
    [...collectors].forEach(([key, {creationTimeSec}]) => {
        if ( creationTimeSec + ttlPeriod < currentTime ) {
            collectors.delete(key);
        }
    });
};
