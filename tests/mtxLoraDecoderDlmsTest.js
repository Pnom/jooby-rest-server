import {UNENCRYPTED} from '@jooby-dev/jooby-codec/mtx/constants/accessLevels.js';
import {UPLINK} from '../src/constants/directions.js';
import {MTX} from '../src/constants/protocols.js';
import {describe} from 'node:test';
import {runTestsSequence} from './utils/runTestsSequence.js';


const segment1 = {
    name: 'segment 1',
    request: {
        deviceEUI: '001a79881701b63c',
        direction: UPLINK,
        dlms: true,
        data: '1e28c4314d1010796430280fff011d00000008001a00000008001d00000008011d00000008001a00000033'
    },
    response: {
        deviceEUI: '001a79881701b63c',
        direction: UPLINK,
        dlms: true,
        data: '1e28c4314d1010796430280fff011d00000008001a00000008001d00000008011d00000008001a00000033',
        commands: [{
            id: 30,
            name: 'dataSegment',
            parameters: {
                segmentationSessionId: 196,
                segmentIndex: 1,
                segmentsNumber: 3,
                isLast: false,
                data: '4d1010796430280fff011d00000008001a00000008001d00000008011d00000008001a000000'
            }
        }]
    }
};

const segment2 = {
    name: 'segment 2',
    request: {
        deviceEUI: '001a79881701b63c',
        direction: UPLINK,
        dlms: true,
        data: '1e28c43208001d00000008011d00000008001a00000008001d00000008011d00000008001a00000008009d'
    },
    response: {
        deviceEUI: '001a79881701b63c',
        direction: UPLINK,
        dlms: true,
        data: '1e28c43208001d00000008011d00000008001a00000008001d00000008011d00000008001a00000008009d',
        commands: [{
            id: 30,
            name: 'dataSegment',
            parameters: {
                segmentationSessionId: 196,
                segmentIndex: 2,
                segmentsNumber: 3,
                isLast: false,
                data: '08001d00000008011d00000008001a00000008001d00000008011d00000008001a0000000800'
            }
        }]
    }
};

const segment3 = {
    name: 'segment 3 (last)',
    request: {
        deviceEUI: '001a79881701b63c',
        direction: UPLINK,
        dlms: true,
        data: '1e21c4b31d00000008013a00000008013a00000008013a00000008013a00000008000063d0b9e5e7'
    },
    response: {
        deviceEUI: '001a79881701b63c',
        direction: UPLINK,
        dlms: true,
        data: '1e21c4b31d00000008013a00000008013a00000008013a00000008013a00000008000063d0b9e5e7',
        commands: [
            {
                id: 30,
                name: 'dataSegment',
                parameters: {
                    segmentationSessionId: 196,
                    segmentIndex: 3,
                    segmentsNumber: 3,
                    isLast: true,
                    data: '1d00000008013a00000008013a00000008013a00000008013a000000080000',
                    payload: `4d1010796430280fff011d00000008001a00000008001 \
                        d00000008011d00000008001a00000008001d00000008011d00000008 \
                        001a00000008001d00000008011d00000008001a00000008001d00000 \
                        008013a00000008013a00000008013a00000008013a000000080000`.replace(/\s/g, '')
                }
            },
            {
                id: 96,
                name: 'lastEvent',
                parameters: {
                    sequenceNumber: 208,
                    status: {
                        isMeterCaseOpen: true,
                        isMagneticInfluence: false,
                        isParametersSetRemotely: false,
                        isParametersSetLocally: true,
                        isMeterProgramRestarted: true,
                        isLockedOut: true,
                        isTimeSet: false,
                        isTimeCorrected: true,
                        isMeterFailure: true,
                        isMeterTerminalBoxOpen: false,
                        isModuleCompartmentOpen: true,
                        isTariffPlanChanged: false,
                        isNewTariffPlanReceived: false
                    }
                }
            }
        ],
        assembledMessages: [{
            data: `4d1010796430280fff011d00000008001a00000008001 \
                d00000008011d00000008001a00000008001d00000008011 \
                d00000008001a00000008001d00000008011d00000008001 \
                a00000008001d00000008013a00000008013a00000008013 \
                a00000008013a000000080000`.replace(/\s/g, ''),
            segmentationSessionId: 196,
            message: {
                id: 77,
                accessLevel: UNENCRYPTED,
                commands: [
                    {
                        id: 121,
                        name: 'getDayMaxPower',
                        parameters: {
                            date: {year: 24, month: 1, date: 8},
                            '1.6.1': {hours: 1, minutes: 29, power: 8},
                            '3.6.1': {hours: 0, minutes: 26, power: 8},
                            '4.6.1': {hours: 0, minutes: 29, power: 8},
                            '2.6.1': {hours: 1, minutes: 58, power: 8},
                            '1.6.2': {hours: 1, minutes: 29, power: 8},
                            '3.6.2': {hours: 0, minutes: 26, power: 8},
                            '4.6.2': {hours: 0, minutes: 29, power: 8},
                            '2.6.2': {hours: 1, minutes: 58, power: 8},
                            '1.6.3': {hours: 1, minutes: 29, power: 8},
                            '3.6.3': {hours: 0, minutes: 26, power: 8},
                            '4.6.3': {hours: 0, minutes: 29, power: 8},
                            '2.6.3': {hours: 1, minutes: 58, power: 8},
                            '1.6.4': {hours: 1, minutes: 29, power: 8},
                            '3.6.4': {hours: 0, minutes: 26, power: 8},
                            '4.6.4': {hours: 0, minutes: 29, power: 8},
                            '2.6.4': {hours: 1, minutes: 58, power: 8}
                        }
                    }
                ]
            }
        }]
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
    {url: `/v2/decoder/${MTX}`},
    {url: '/v2/decoder', requestExtension: {protocol: MTX}}
];


describe('mtxLora decoder with dlms', () => {
    tests.forEach(({name, segments}) => runTestsSequence(name, routes, segments));
});
