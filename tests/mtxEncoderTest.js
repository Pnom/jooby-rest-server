import {HEX, BASE64} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';
import {READ_ONLY, UNENCRYPTED} from '@jooby-dev/jooby-codec/mtx/constants/accessLevels.js';
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
            segmentationSessionId: 0,
            message: {
                id: 1,
                accessLevel: UNENCRYPTED,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            segmentationSessionId: 0,
            data: ['1e0900910110100700004297']
        }
    },
    {
        name: 'default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            segmentationSessionId: 0,
            message: {
                id: 1,
                accessLevel: UNENCRYPTED,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            segmentationSessionId: 0,
            data: ['1e0900910110100700004297']
        }
    },
    {
        name: 'base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            segmentationSessionId: 0,
            message: {
                id: 1,
                accessLevel: UNENCRYPTED,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            segmentationSessionId: 0,
            data: ['HgkAkQEQEAcAAEKX']
        }
    },
    {
        name: 'hdlc frame, hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            accessLevel: UNENCRYPTED,
            framingFormat: HDLC,
            message: {
                id: 1,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e50fffffffe01101007000042f8427e'
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            message: {
                id: 1,
                accessLevel: UNENCRYPTED,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e50fffffffe01101007000042f8427e'
        }
    },
    {
        name: 'hdlc frame, base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            message: {
                id: 1,
                accessLevel: UNENCRYPTED,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'flD////+ARAQBwAAQvhCfg=='
        }
    },
    {
        name: 'base64 bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            segmentationSessionId: 0,
            aesKey: 'AAECAwQFBgcICQoLDA0ODw==',
            message: {
                id: 1,
                accessLevel: READ_ONLY,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            segmentationSessionId: 0,
            data: ['HhQAkQETRwSm5eY3Aa03pdVxkhQ8Un8=']
        }
    },
    {
        name: 'default bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            segmentationSessionId: 0,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            message: {
                id: 1,
                accessLevel: READ_ONLY,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            segmentationSessionId: 0,
            data: ['1e14009101134704a6e5e63701ad37a5d57192143c527f']
        }
    },
    {
        name: 'bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            segmentationSessionId: 0,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            message: {
                id: 1,
                accessLevel: READ_ONLY,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            segmentationSessionId: 0,
            data: ['1e14009101134704a6e5e63701ad37a5d57192143c527f']
        }
    },
    {
        name: 'hdlc frame, hex bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            framingFormat: HDLC,
            header: {
                destination: 0xffff,
                source: 0xfffe
            },
            message: {
                id: 1,
                accessLevel: READ_ONLY,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e50fffffffe017d334704a6e5e63701ad37a5d57192143c52dee07e'
        }
    },
    {
        name: 'hdlc frame, default bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            aesKey: '000102030405060708090a0b0c0d0e0f',
            framingFormat: HDLC,
            message: {
                id: 1,
                accessLevel: READ_ONLY,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            framingFormat: HDLC,
            data: '7e50fffffffe017d334704a6e5e63701ad37a5d57192143c52dee07e'
        }
    },
    {
        name: 'hdlc frame, base64 bytes format, encrypted',
        request: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            aesKey: 'AAECAwQFBgcICQoLDA0ODw==',
            framingFormat: HDLC,
            message: {
                id: 1,
                accessLevel: READ_ONLY,
                commands: [
                    {
                        id: 7
                    }
                ]
            }
        },
        response: {
            deviceEUI: '001a79881701b63c',
            direction: DOWNLINK,
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'flD////+AX0zRwSm5eY3Aa03pdVxkhQ8Ut7gfg=='
        }
    }
];


const routes = [
    {url: `/v2/encoder/${MTX}`},
    {url: '/v2/encoder', requestExtension: {protocol: MTX}}
];


runTestsSequence('mtx encoder', routes, tests);
