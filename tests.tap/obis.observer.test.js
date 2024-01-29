/* eslint-disable no-unused-vars */
import buildFastify from '../src/buildFastify.js';
import {test} from 'tap';


let fastify;

const tests = [
    {
        request: {
            deviceEUI: '001a79881701b63c',
            data: 'BAUBCAgAAQ==',
            encodingFormat: 'base64'
        },
        response: {
            data: 'BAUBCAgAAQ==',
            encodingFormat: 'base64'
        }
    },
    {
        request: {
            deviceEUI: '001a79881701b63c',
            data: 'BAUBCAgAAQ=='
        },
        response: {
            data: 'BAUBCAgAAQ=='
        }
    },
    {
        request: {
            deviceEUI: '001a79881701b63c',
            data: '04050108080001',
            encodingFormat: 'hex'
        },
        response: {
            data: '04050108080001',
            encodingFormat: 'hex'
        }
    }
];

const responseBlank = {
    codec: 'obisObserver',
    deviceEUI: '001a79881701b63c',
    commands: [{
        id: 4,
        name: 'GetObserverCapabilitiesResponse',
        parameters: {
            requestId: 1,
            maxMeterProfilesNumber: 8,
            maxMetersNumber: 8,
            maxObisProfilesNumber: 0,
            isMultiModeSupported: true
        }
    }]
};

const inject = ( url, body ) => (fastify.inject({
    method: 'POST',
    url,
    body
}));

const testUrl = async ( tap, url, request = {} ) => {
    for ( let index = 0; index < tests.length; index++ ) {
        const {statusCode, body} = await inject(url, {...tests[index].request, ...request});

        tap.equal(statusCode, 200);

        const actualResponse = JSON.parse(body);
        const expectedResponse = {
            ...responseBlank,
            ...tests[index].response
        };

        tap.strictSame(actualResponse, expectedResponse);
    }
};


test('obis observer', async tap => {
    fastify = await buildFastify();

    tap.teardown(() => fastify.close());

    await testUrl(tap, '/v1/decoder/obisObserver');
    await testUrl(tap, '/v1/decoder', {codec: 'obisObserver'});
    tap.end();
});
