import {HEX, BASE64} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';
import {HDLC} from '../src/constants/framingFormats.js';
import {OBIS_OBSERVER} from '../src/constants/protocols.js';
import {runTestsSequence} from './utils/runTestsSequence.js';


const tests = [

    {
        name: 'hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            data: '04050108080001'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            data: '04050108080001',
            commands: [{
                id: 4,
                name: 'getObserverCapabilities',
                parameters: {
                    requestId: 1,
                    maxMeterProfilesNumber: 8,
                    maxMetersNumber: 8,
                    maxObisProfilesNumber: 0,
                    isMultiModeSupported: true
                }
            }]
        }
    },
    {
        name: 'default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            data: '04050108080001'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            data: '04050108080001',
            commands: [{
                id: 4,
                name: 'getObserverCapabilities',
                parameters: {
                    requestId: 1,
                    maxMeterProfilesNumber: 8,
                    maxMetersNumber: 8,
                    maxObisProfilesNumber: 0,
                    isMultiModeSupported: true
                }
            }]
        }
    },
    {
        name: 'base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            data: 'BAUBCAgAAQ=='
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            data: 'BAUBCAgAAQ==',
            commands: [{
                id: 4,
                name: 'getObserverCapabilities',
                parameters: {
                    requestId: 1,
                    maxMeterProfilesNumber: 8,
                    maxMetersNumber: 8,
                    maxObisProfilesNumber: 0,
                    isMultiModeSupported: true
                }
            }]
        }
    },
    {
        name: 'hdlc frame, hex bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e04050108080001567c4e7e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: HEX,
            framingFormat: HDLC,
            data: '7e04050108080001567c4e7e',
            frames: [{
                data: '7e04050108080001567c4e7e',
                payload: '04050108080001',
                commands: [{
                    id: 4,
                    name: 'getObserverCapabilities',
                    parameters: {
                        requestId: 1,
                        maxMeterProfilesNumber: 8,
                        maxMetersNumber: 8,
                        maxObisProfilesNumber: 0,
                        isMultiModeSupported: true
                    }
                }]
            }]
        }
    },
    {
        name: 'hdlc frame, default bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e04050108080001567c4e7e'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            framingFormat: HDLC,
            data: '7e04050108080001567c4e7e',
            frames: [{
                data: '7e04050108080001567c4e7e',
                payload: '04050108080001',
                commands: [{
                    id: 4,
                    name: 'getObserverCapabilities',
                    parameters: {
                        requestId: 1,
                        maxMeterProfilesNumber: 8,
                        maxMetersNumber: 8,
                        maxObisProfilesNumber: 0,
                        isMultiModeSupported: true
                    }
                }]
            }]
        }
    },
    {
        name: 'hdlc frame, base64 bytes format',
        request: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'fgQFAQgIAAFWfE5+'
        },
        response: {
            deviceEUI: '001a79881701b63c',
            bytesConversionFormat: BASE64,
            framingFormat: HDLC,
            data: 'fgQFAQgIAAFWfE5+',
            frames: [{
                data: 'fgQFAQgIAAFWfE5+',
                payload: 'BAUBCAgAAQ==',
                commands: [{
                    id: 4,
                    name: 'getObserverCapabilities',
                    parameters: {
                        requestId: 1,
                        maxMeterProfilesNumber: 8,
                        maxMetersNumber: 8,
                        maxObisProfilesNumber: 0,
                        isMultiModeSupported: true
                    }
                }]
            }]
        }
    }
];

const routes = [
    {url: `/v2/decoder/${OBIS_OBSERVER}`},
    {url: '/v2/decoder', requestExtension: {protocol: OBIS_OBSERVER}}
];


runTestsSequence('obisObserver decoder', routes, tests);
