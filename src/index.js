import './setup.js';
import fastifyFactory from 'fastify';
import {pino as configPino, http as configHTTP} from './configs/main.js';

// plugins
import fastifyPrintRoutes from 'fastify-print-routes';
import errorHandler from './plugins/errorHandler.js';
import validateApiKey from './plugins/validateApiKey.js';

// reply plugins
import replySendError from './plugins/reply/sendError.js';

import initRoutes from './routes/v2/index.js';
import {stopCollectorsCleaner} from './controllers/utils/collectorsCleaner.js';


let requestIndex = 1;

const fastify = fastifyFactory({
    logger: {...configPino},
    genReqId: () => requestIndex++
});

fastify.register(fastifyPrintRoutes, {useColors: configPino.transport.options.colorize});

// custom plugins
fastify.register(errorHandler);
fastify.register(validateApiKey);

// reply decorators
fastify.register(replySendError);

fastify.register(initRoutes, {prefix: 'v2'});

// Run the server!
fastify
    .listen(configHTTP)
    .catch(error => {
        console.error('Error starting server:', error);
        process.exit(1);
    });

fastify.addHook('onClose', (instance, done) => {
    stopCollectorsCleaner();
    done();
});


export default fastify;
