import test from 'node:test';
// eslint-disable-next-line no-unused-vars
import assert from 'node:assert';
//import fastify from 'fastify';
import buildFastify from '../src/buildFastify.js';

//async function buildFastify () {
//    try {
//        const instance = fastify();
//
//        // Your Fastify initialization logic here
//
//        return instance;
//    } catch (error) {
//        console.error('Error building Fastify:', error);
//        throw error;
//    }
//}


test('fastify test', async () => {
    try {
        const fastify = await buildFastify();

        //const {statusCode} = await fastify.inject({
        //    method: 'POST',
        //    url: '/v1/decoder/obisObserver1',
        //    body: {
        //        deviceEUI: '001a79881701b63c',
        //        data: 'BAUBCAgAAQ=='
        //    }
        //});

        const {statusCode} = await fastify.inject({
            method: 'GET',
            url: '/v1/health'
        });


        assert.equal(statusCode, 200);

        await fastify.close();

        console.log('After test logic');
    } catch (error) {
        console.error('Error in test:', error);
    }
});
