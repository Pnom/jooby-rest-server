import {BASE64} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';
import {DOWNLINK} from '../src/constants/directions.js';
import {ANALOG} from '../src/constants/protocols.js';
import {describe} from 'node:test';
import {runTestsSequence} from './utils/runTestsSequence.js';


const segment1 = {
    name: 'segment 1',
    request: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HijEMU0QEHlkMCgP/wEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAAMw=='
    },
    response: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HijEMU0QEHlkMCgP/wEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAAMw==',
        commands: [{
            id: 30,
            name: 'dataSegment',
            parameters: {
                data: 'TRAQeWQwKA//AR0AAAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAA=',
                segmentationSessionId: 196,
                segmentIndex: 1,
                segmentsNumber: 3,
                isLast: false
            }
        }]
    }
};

const segment2 = {
    name: 'segment 2',
    request: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HijEMggAHQAAAAgBHQAAAAgAGgAAAAgAHQAAAAgBHQAAAAgAGgAAAAgAnQ=='
    },
    response: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HijEMggAHQAAAAgBHQAAAAgAGgAAAAgAHQAAAAgBHQAAAAgAGgAAAAgAnQ==',
        commands: [{
            id: 30,
            name: 'dataSegment',
            parameters: {
                data: 'CAAdAAAACAEdAAAACAAaAAAACAAdAAAACAEdAAAACAAaAAAACAA=',
                segmentationSessionId: 196,
                segmentIndex: 2,
                segmentsNumber: 3,
                isLast: false
            }
        }]
    }
};

const segment3 = {
    name: 'segment 3 (last)',
    request: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HiHEsx0AAAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAABj0Lnl5w=='
    },
    response: {
        deviceEUI: '001a79881701b63c',
        direction: DOWNLINK,
        bytesConversionFormat: BASE64,
        data: 'HiHEsx0AAAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAABj0Lnl5w==',
        commands: [
            {
                id: 30,
                name: 'dataSegment',
                parameters: {
                    segmentationSessionId: 196,
                    segmentIndex: 3,
                    segmentsNumber: 3,
                    isLast: true,
                    data: 'HQAAAAgBOgAAAAgBOgAAAAgBOgAAAAgBOgAAAAgAAA==',
                    payload: `TRAQeWQwKA//AR0AAAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAAIAB0AAAAIAR0A \
                        AAAIABoAAAAIAB0AAAAIAR0AAAAIABoAAAAIAB0AAAAIAToAAAAIAToAAAAIAToAAAAIAToAAAAIAAA=`.replace(/\s/g, '')
                }
            },
            {
                id: 96,
                error: 'Unsupported command id: 96!',
                data: 'Y9C55Q=='
            }
        ]
    }
};

const tests = [
    {
        name: 'segments: 1, 2, 3 (last)',
        segments: [segment1, segment2, segment3]
    },
    {
        name: 'segments: 2, 1, 3 (last)',
        segments: [segment2, segment1, segment3]
    }
];

const routes = [
    {url: `/v2/decoder/${ANALOG}`},
    {url: '/v2/decoder', requestExtension: {protocol: ANALOG}}
];


describe('analog segments decoder', () => {
    tests.forEach(({name, segments}) => runTestsSequence(name, routes, segments));
});
