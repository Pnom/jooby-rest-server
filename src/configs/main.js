import pino from './pino.js';
import {hexFormatOptions} from '../../../../jooby-codecs/jooby-codec/dist/config.js';


hexFormatOptions.separator = '';

const {env} = process;

const http = {
    host: env.HTTP_HOST || '0.0.0.0',
    port: env.HTTP_PORT || 3000
};


export {
    pino,
    http
};
