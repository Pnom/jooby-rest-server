import * as messages from '@jooby-dev/jooby-codec/analog/message/index.js';
import {downlink, uplink} from '@jooby-dev/jooby-codec/analog/commands/byId.js';
import * as dataSegment from '@jooby-dev/jooby-codec/analog/commands/downlink/dataSegment.js';
import {getSegmentCollector, removeSegmentCollector} from '../../utils/segmentCollectors.js';
import * as directions from '../../../constants/directions.js';
import {prepareCommands} from '../../utils/preparations.js';
import getStringFromBytes from '../../../utils/getStringFromBytes.js';


export const decodeAnalogMessage = ( bytes, options ) => {
    const {direction, deviceEUI} = options;
    const {commands} = direction === directions.DOWNLINK
        ? messages.downlink.fromBytes(bytes, options)
        : messages.uplink.fromBytes(bytes, options);
    const assembledDataArray = [];

    for ( let index = 0; index < commands.length; index++ ) {
        const command = commands[index];

        if ( command.id === dataSegment.id ) {
            const collector = getSegmentCollector(deviceEUI);
            const assembledData = collector.push(command.parameters);

            if ( assembledData.length !== 0 ) {
                command.parameters.assembledData = getStringFromBytes(assembledData, options);
                assembledDataArray.push({
                    segmentationSessionId: command.parameters.segmentationSessionId,
                    data: assembledData
                });

                removeSegmentCollector(deviceEUI);
            }
        }
    }

    const preparedCommands = prepareCommands(
        direction === directions.DOWNLINK ? downlink : uplink,
        commands,
        options
    );

    return assembledDataArray.length === 0
        ? {message: preparedCommands}
        : {message: preparedCommands, assembledData: assembledDataArray};
};
