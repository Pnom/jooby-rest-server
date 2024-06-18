import {HEX, BASE64} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';
import {HDLC} from '../src/constants/framingFormats.js';
import {DOWNLINK} from '../src/constants/directions.js';
import {ANALOG} from '../src/constants/protocols.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const tests = [
    {
        name: 'hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            data: '1f020048'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            data: '1f020048',
            commands: [{
                id: 543,
                name: 'getLmicInfo'
            }]
        }
    },
    {
        name: 'default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1f020048'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '1f020048',
            commands: [{
                id: 543,
                name: 'getLmicInfo'
            }]
        }
    },
    {
        name: 'base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            data: 'HwIASA=='
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            data: 'HwIASA==',
            commands: [{
                id: 543,
                name: 'getLmicInfo'
            }]
        }
    },
    {
        name: 'hdlc frame, hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e1f02004872f67e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e1f02004872f67e',
            frames: [{
                data: '7e1f02004872f67e',
                payload: '1f020048',
                commands: [{
                    id: 543,
                    name: 'getLmicInfo'
                }]
            }]
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e1f02004872f67e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e1f02004872f67e',
            frames: [{
                data: '7e1f02004872f67e',
                payload: '1f020048',
                commands: [{
                    id: 543,
                    name: 'getLmicInfo'
                }]
            }]
        }
    },
    {
        name: 'hdlc frame, base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'fh8CAEhy9n4='
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'fh8CAEhy9n4=',
            frames: [{
                data: 'fh8CAEhy9n4=',
                payload: 'HwIASA==',
                commands: [{
                    id: 543,
                    name: 'getLmicInfo'
                }]
            }]
        }
    }
];

const routes = [
    {url: `/v2/decoder/${ANALOG}`},
    {url: '/v2/decoder', requestExtension: {protocol: ANALOG}}
];


runTestsSequence('analog decoder', routes, tests);
