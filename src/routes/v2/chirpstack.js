import hook from '../../controllers/ns-webhook/chirpstack.js';


export default fastify => {
    fastify.post(
        `/ns-webhook/chirpstack`,
        {
            schema: {
                querystring: {
                    event: {type: 'string'}
                }
            }
        },
        hook
    );
};
