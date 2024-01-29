import {getFrameCollector, cleanupFrameCollectors} from './frameCollectors.js';
import {getSegmentCollector, removeSegmentCollector, cleanupSegmentCollectors} from './segmentCollectors.js';
import {getNumber} from '../../utils/environment.js';
import getEpochSeconds from '../../utils/getEpochSeconds.js';


const COLLECTOR_TTL = getNumber('COLLECTOR_TTL', 120);
const COLLECTOR_CLEANUP_INTERVAL = getNumber('COLLECTOR_CLEANUP_INTERVAL', 60 * 1000); //5 * 60 * 1000);

const cleanupCollectors = () => {
    const currentTime = getEpochSeconds();

    cleanupFrameCollectors(currentTime, COLLECTOR_TTL);
    cleanupSegmentCollectors(currentTime, COLLECTOR_TTL);
};


setInterval(cleanupCollectors, COLLECTOR_CLEANUP_INTERVAL);

export {
    getFrameCollector,
    getSegmentCollector,
    removeSegmentCollector
};
