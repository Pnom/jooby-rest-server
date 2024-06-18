import * as messages from '@jooby-dev/jooby-codec/analog/message/index.js';
import {downlinkById, uplinkById} from '@jooby-dev/jooby-codec/analog/commands/index.js';
import * as dataSegment from '@jooby-dev/jooby-codec/analog/commands/downlink/dataSegment.js';
import {getSegmentCollector, removeSegmentCollector} from '../../utils/segmentCollectors.js';
import * as directions from '../../../constants/directions.js';
import {prepareCommands} from '../../utils/preparations.js';
import getStringFromBytes from '../../../utils/getStringFromBytes.js';


export const decodeAnalogMessage = ( bytes, options ) => {
    const {direction, deviceEUI} = options;
    const message = direction === directions.DOWNLINK
        ? messages.downlink.fromBytes(bytes, options)
        : messages.uplink.fromBytes(bytes, options);
    const {commands} = message;
    const payloadArray = [];

    for ( let index = 0; index < commands.length; index++ ) {
        const command = commands[index];

        if ( command.id === dataSegment.id ) {
            const collector = getSegmentCollector(deviceEUI);
            const payload = collector.push(command.parameters);

            if ( payload.length !== 0 ) {
                command.parameters.payload = getStringFromBytes(payload, options);
                payloadArray.push({
                    segmentationSessionId: command.parameters.segmentationSessionId,
                    data: payload
                });

                removeSegmentCollector(deviceEUI);
            }
        }
    }

    const preparedCommands = prepareCommands(
        direction === directions.DOWNLINK ? downlinkById : uplinkById,
        commands,
        options
    );

    return payloadArray.length === 0
        ? {commands: preparedCommands}
        : {commands: preparedCommands, payload: payloadArray};
};
