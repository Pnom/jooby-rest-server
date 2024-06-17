import {getFrameCollector} from '../../utils/frameCollectors.js';


const decodeFrames = ( {deviceEUI, bytes} ) => {
    const collector = getFrameCollector(deviceEUI);

    return collector.process(bytes);
};

export default decodeFrames;
