import {UPLINK} from '../src/constants/directions.js';
import {MTX} from '../src/constants/protocols.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const tests = [
    {
        name: 'getDayMaxPower',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: UPLINK,
            segmentationSessionId: 1,
            maxSegmentSize: 40,
            message: {
                id: 2,
                commands: [
                    {
                        id: 121,
                        name: 'getDayMaxPower',
                        parameters: {
                            date: {
                                year: 24,
                                month: 1,
                                date: 8
                            },
                            tariffs: [
                                {
                                    'A+': {hours: 1, minutes: 29, power: 8},
                                    'A+R+': {hours: 0, minutes: 26, power: 8},
                                    'A+R-': {hours: 0, minutes: 29, power: 8},
                                    'A-': {hours: 1, minutes: 58, power: 8}
                                },
                                {
                                    'A+': {hours: 1, minutes: 29, power: 8},
                                    'A+R+': {hours: 0, minutes: 26, power: 8},
                                    'A+R-': {hours: 0, minutes: 29, power: 8},
                                    'A-': {hours: 1, minutes: 58, power: 8}
                                },
                                {
                                    'A+': {hours: 1, minutes: 29, power: 8},
                                    'A+R+': {hours: 0, minutes: 26, power: 8},
                                    'A+R-': {hours: 0, minutes: 29, power: 8},
                                    'A-': {hours: 1, minutes: 58, power: 8}
                                },
                                {
                                    'A+': {hours: 1, minutes: 29, power: 8},
                                    'A+R+': {hours: 0, minutes: 26, power: 8},
                                    'A+R-': {hours: 0, minutes: 29, power: 8},
                                    'A-': {hours: 1, minutes: 58, power: 8}
                                }
                            ]
                        }
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: UPLINK,
            segmentationSessionId: 1,
            maxSegmentSize: 40,
            data: [
                '1e2a0131021010796430280fff011d00000008001a00000008001a00000008011d00000008001a0000000800b4',
                '1e2a01321a00000008011d00000008001a00000008001a00000008011d00000008001a00000008001a00000048',
                '1e1d01b308013a00000008013a00000008013a00000008013a0000000800b05c'
            ]
        }
    }
];

const routes = [
    {url: `/v2/encoder/${MTX}`},
    {url: '/v2/encoder', requestExtension: {protocol: MTX}}
];


runTestsSequence('mtxLora encoder', routes, tests);
