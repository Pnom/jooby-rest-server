import {HEX, BASE64} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';
import {DOWNLINK} from '../src/constants/directions.js';
import {ANALOG} from '../src/constants/protocols.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const tests = [
    {
        name: 'segment1',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            data: 'HgkjkSMQEAcAAADU'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            data: 'HgkjkSMQEAcAAADU',
            commands: [{
                id: 30,
                name: 'dataSegment',
                parameters: {
                    data: 'IxAQBwAAAA==',
                    payload: 'IxAQBwAAAA==',
                    segmentationSessionId: 35,
                    segmentIndex: 1,
                    segmentsNumber: 1,
                    isLast: true
                }
            }]
        }
    },
    {
        name: 'segment2',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1e09239123101007000000d4'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1e09239123101007000000d4',
            commands: [{
                id: 30,
                name: 'dataSegment',
                parameters: {
                    data: '23101007000000',
                    payload: '23101007000000',
                    segmentationSessionId: 35,
                    segmentIndex: 1,
                    segmentsNumber: 1,
                    isLast: true
                }
            }]
        }
    },
    {
        name: 'segment3',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            data: '1e09239123101007000000d4'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            data: '1e09239123101007000000d4',
            commands: [{
                id: 30,
                name: 'dataSegment',
                parameters: {
                    data: '23101007000000',
                    payload: '23101007000000',
                    segmentationSessionId: 35,
                    segmentIndex: 1,
                    segmentsNumber: 1,
                    isLast: true
                }
            }]
        }
    }
];

const routes = [
    {url: `/v2/decoder/${ANALOG}`},
    {url: '/v2/decoder', requestExtension: {protocol: ANALOG}}
];

runTestsSequence('analog segments decoder (simple)', routes, tests);
