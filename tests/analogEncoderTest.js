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
            commands: [
                {
                    id: 7,
                    name: 'GetDateTime'
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            data: '070052'
        }
    },
    {
        name: 'default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            commands: [
                {
                    id: 7,
                    name: 'GetDateTime'
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            data: '070052'
        }
    },
    {
        name: 'base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            commands: [
                {
                    id: 7,
                    name: 'GetDateTime'
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            data: 'BwBS'
        }
    },
    {
        name: 'hdlc frame, hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            commands: [
                {
                    id: 7,
                    name: 'GetDateTime'
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e0700525e3b7e'
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            commands: [
                {
                    id: 7,
                    name: 'GetDateTime'
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e0700525e3b7e'
        }
    },
    {
        name: 'hdlc frame, base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            commands: [
                {
                    id: 7,
                    name: 'GetDateTime'
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'fgcAUl47fg=='
        }
    }
];

const routes = [
    {url: `/v2/encoder/${ANALOG}`},
    {url: '/v2/encoder', requestExtension: {protocol: ANALOG}}
];


runTestsSequence('analog encoder', routes, tests);
