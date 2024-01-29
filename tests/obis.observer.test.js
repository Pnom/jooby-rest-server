import buildFastify from '../src/buildFastify.js';
import test from 'node:test';
// eslint-disable-next-line no-unused-vars
import assert from 'node:assert';


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

const testUrl = async ( url, request = {} ) => {
    for ( let index = 0; index < tests.length; index++ ) {
        const {statusCode, body} = await inject(url, {...tests[index].request, ...request});

        assert.equal(statusCode, 200);

        const actualResponse = JSON.parse(body);
        const expectedResponse = {
            ...responseBlank,
            ...tests[index].response
        };

        assert.deepStrictEqual(actualResponse, expectedResponse);
    }
};


test('obis observer', async () => {
    fastify = await buildFastify();

    await testUrl('/v1/decoder/obisObserver');
    await testUrl('/v1/decoder', {codec: 'obisObserver'});

    await fastify.close();
});
