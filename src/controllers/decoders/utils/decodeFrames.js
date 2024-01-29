import {utils} from '../../../externals/joobyCodec.js';
import {getFrameCollector} from '../../utils/index.js';


const decodeFrames = ( {deviceEUI, bytes}, frameDataBits ) => {
    const result = [];
    const collector = getFrameCollector(deviceEUI, frameDataBits);
    const frames = collector.process(bytes);

    frames.forEach(frame => {
        result.push({
            isValid: frame.isValid,
            data: utils.getStringFromBytes(frame.bytes),
            message: frame.content
        });
    });

    return result;
};

export default decodeFrames;
