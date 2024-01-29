import {analog, utils} from '../../../externals/joobyCodec.js';
import DataSegment from '../../../../../../jooby-codecs/jooby-codec/dist/analog/commands/DataSegmentBase.js';
import {getSegmentCollector, removeSegmentCollector} from '../../utils/index.js';


export const decodeAnalogMessage = ( bytes, options ) => {
    const {message} = analog;
    const {commands, isValid} = message.fromBytes(bytes, options);
    const assembledDataArray = [];

    for ( let index = 0; index < commands.length; index++ ) {
        const {command} = commands[index];

        if ( command instanceof DataSegment ) {
            const collector = getSegmentCollector(options.deviceEUI);
            const assembledData = collector.push(command.parameters);

            if ( assembledData.length !== 0 ) {
                command.parameters.assembledData = utils.getStringFromBytes(assembledData, options.encodingFormat);
                assembledDataArray.push({
                    segmentationSessionId: command.parameters.segmentationSessionId,
                    data: assembledData
                });

                removeSegmentCollector(options.deviceEUI);
            }
        }
    }

    return {
        isValid,
        commands,
        assembledData: assembledDataArray
    };
};
