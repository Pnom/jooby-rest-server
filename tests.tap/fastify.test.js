import {test} from 'tap';
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


test('fastify test', async tap => {
    try {
        const fastify = await buildFastify();

        //tap.teardown(() => fastify.close());

        const {statusCode} = await fastify.inject({
            method: 'POST',
            url: '/v1/decoder/obisObserver',
            body: {
                deviceEUI: '001a79881701b63c',
                data: 'BAUBCAgAAQ=='
            }
        });

        tap.equal(statusCode, 404);

        console.log('After test logic');

        await fastify.close();

        console.log('After test logic 2');

        tap.end();
    } catch (error) {
        console.error('Error in test:', error);
        tap.fail('Test failed due to an error');
    }
});
