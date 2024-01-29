import buildFastify from '../src/buildFastify.js';


describe('decoder test', () => {
    test('obis observer', async () => {
        const fastify = await buildFastify();
        console.log(fastify);

        fastify.inject(
            {
                method: 'POST',
                url: '/v1/obis-observer/decoder',
                body: '{"deviceEUI": "001a79881701b63c", "data": "BAUBCAgAAQ=="}'
            },
            (error, response) => {
                console.log(JSON.stringify(error));
                console.log(JSON.stringify(response));
            }
        );
    });
});
