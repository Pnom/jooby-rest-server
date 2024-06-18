import * as constants from '@jooby-dev/jooby-codec/constants/index.js';
import {HDLC} from '../src/constants/framingFormats.js';
import {OBIS_OBSERVER} from '../src/constants/protocols.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const {HEX, BASE64} = constants.bytesConversionFormats;


const tests = [
    {
        name: 'hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            commands: [
                {
                    id: 5,
                    parameters: {
                        requestId: 2
                    }
                }

            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            data: '050102'
        }
    },
    {
        name: 'default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            commands: [
                {
                    id: 5,
                    parameters: {
                        requestId: 2
                    }
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            data: '050102'
        }
    },
    {
        name: 'base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            commands: [
                {
                    id: 5,
                    parameters: {
                        requestId: 2
                    }
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            data: 'BQEC'
        }
    },
    {
        name: 'hdlc frame, hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            commands: [
                {
                    id: 5,
                    parameters: {
                        requestId: 2
                    }
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e0501027c3b7c457e'
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            commands: [
                {
                    id: 5,
                    parameters: {
                        requestId: 2
                    }
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e0501027c3b7c457e'
        }
    },
    {
        name: 'hdlc frame, base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            commands: [
                {
                    id: 5,
                    parameters: {
                        requestId: 2
                    }
                }
            ]
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'fgUBAnw7fEV+'
        }
    }
];

const routes = [
    {url: `/v2/encoder/${OBIS_OBSERVER}`},
    {url: '/v2/encoder', requestExtension: {protocol: OBIS_OBSERVER}}
];


runTestsSequence('obisObserver encoder', routes, tests);
