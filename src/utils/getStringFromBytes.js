import {getHexFromBytes, getBase64FromBytes} from '@jooby-dev/jooby-codec/utils/index.js';
import {BASE64} from '@jooby-dev/jooby-codec/constants/bytesConversionFormats.js';


const getStringFromBytes = ( bytes, {bytesConversionFormat} = {} ) => (
    bytesConversionFormat === BASE64 ? getBase64FromBytes(bytes) : getHexFromBytes(bytes)
);

export default getStringFromBytes;
