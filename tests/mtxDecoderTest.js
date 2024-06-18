import {HEX, BASE64} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';
import {HDLC} from '../src/constants/framingFormats.js';
import {DOWNLINK} from '../src/constants/directions.js';
import {MTX} from '../src/constants/protocols.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const tests = [
    {
        name: 'hex bytes format',
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
                    segmentationSessionId: 35,
                    segmentIndex: 1,
                    segmentsNumber: 1,
                    isLast: true,
                    data: '23101007000000',
                    payload: '23101007000000'
                }
            }],
            assembledMessages: [{
                segmentationSessionId: 35,
                data: '23101007000000',
                message: {
                    id: 35,
                    accessLevel: 0,
                    commands: [{
                        id: 7,
                        name: 'getDateTime'
                    }]
                }
            }]
        }
    },
    {
        name: 'default bytes format',
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
                    segmentationSessionId: 35,
                    segmentIndex: 1,
                    segmentsNumber: 1,
                    isLast: true,
                    data: '23101007000000',
                    payload: '23101007000000'
                }
            }],
            assembledMessages: [{
                segmentationSessionId: 35,
                data: '23101007000000',
                message: {
                    id: 35,
                    accessLevel: 0,
                    commands: [{
                        id: 7,
                        name: 'getDateTime'
                    }]
                }
            }]
        }
    },
    {
        name: 'base64 bytes format',
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
                    segmentationSessionId: 35,
                    segmentIndex: 1,
                    segmentsNumber: 1,
                    isLast: true,
                    data: 'IxAQBwAAAA==',
                    payload: 'IxAQBwAAAA=='
                }
            }],
            assembledMessages: [{
                segmentationSessionId: 35,
                data: 'IxAQBwAAAA==',
                message: {
                    id: 35,
                    accessLevel: 0,
                    commands: [{
                        id: 7,
                        name: 'getDateTime'
                    }]
                }
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
            data: '7e50ffff0001551010070000004f707e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e50ffff0001551010070000004f707e',
            frames: [{
                data: '7e50ffff0001551010070000004f707e',
                payload: '55101007000000', //'50ffff000155101007000000',
                header: {
                    type: 80,
                    destination: 65535,
                    source: 1
                },
                message: {
                    id: 85,
                    accessLevel: 0,
                    commands: [{
                        id: 7,
                        name: 'getDateTime'
                    }]
                }
            }]
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e50ffff0001551010070000004f707e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e50ffff0001551010070000004f707e',
            frames: [{
                data: '7e50ffff0001551010070000004f707e',
                payload: '55101007000000', //'50ffff000155101007000000',
                header: {
                    type: 80,
                    destination: 65535,
                    source: 1
                },
                message: {
                    id: 85,
                    accessLevel: 0,
                    commands: [{
                        id: 7,
                        name: 'getDateTime'
                    }]
                }
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
            data: 'flD//wABVRAQBwAAAE9wfg=='
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'flD//wABVRAQBwAAAE9wfg==',
            frames: [{
                data: 'flD//wABVRAQBwAAAE9wfg==',
                payload: 'VRAQBwAAAA==', //'UP//AAFVEBAHAAAA',
                header: {
                    type: 80,
                    destination: 65535,
                    source: 1
                },
                message: {
                    id: 85,
                    accessLevel: 0,
                    commands: [{
                        id: 7,
                        name: 'getDateTime'
                    }]
                }
            }]
        }
    },
    {
        name: 'hdlc frame, hex bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            data: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e',
            frames: [{
                data: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e',
                payload: '0c134704a6e5e63701ad37a5d57192143c52', //'50fffffffe0c134704a6e5e63701ad37a5d57192143c52'
                header: {
                    type: 80,
                    destination: 65535,
                    source: 65534
                },
                message: {
                    id: 12,
                    accessLevel: 3,
                    commands: [{
                        id: 7,
                        name: 'getDateTime'
                    }]
                }
            }]
        }
    },
    {
        name: 'hdlc frame, default bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            data: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e',
            frames: [{
                data: '7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e',
                payload: '0c134704a6e5e63701ad37a5d57192143c52', // '50fffffffe0c134704a6e5e63701ad37a5d57192143c52',
                header: {
                    type: 80,
                    destination: 65535,
                    source: 65534
                },
                message: {
                    id: 12,
                    accessLevel: 3,
                    commands: [{
                        id: 7,
                        name: 'getDateTime'
                    }]
                }
            }]
        }
    },
    {
        name: 'hdlc frame, base64 bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            aesKey: 'AAECAwQFBgcICQoLDA0ODw==',
            data: 'flD////+DH0zRwSm5eY3Aa03pdVxkhQ8Utkcfg=='
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'flD////+DH0zRwSm5eY3Aa03pdVxkhQ8Utkcfg==',
            frames: [{
                data: 'flD////+DH0zRwSm5eY3Aa03pdVxkhQ8Utkcfg==',
                payload: 'DBNHBKbl5jcBrTel1XGSFDxS', //'UP////4ME0cEpuXmNwGtN6XVcZIUPFI=',
                header: {
                    type: 80,
                    destination: 65535,
                    source: 65534
                },
                message: {
                    id: 12,
                    accessLevel: 3,
                    commands: [{
                        id: 7,
                        name: 'getDateTime'
                    }]
                }
            }]
        }
    }
];

const routes = [
    {url: `/v2/decoder/${MTX}`},
    {url: '/v2/decoder', requestExtension: {protocol: MTX}}
];


runTestsSequence('mtx decoder', routes, tests);
