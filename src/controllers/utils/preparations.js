import getStringFromBytes from '../../utils/getStringFromBytes.js';

const prepareCommand = ( command, options ) => {
    const {constructor: {id, name}} = command;
    let result = {id, name};

    try {
        result = {...result, ...JSON.parse(command.toJson(options))};
        // eslint-disable-next-line no-empty
    } catch {}

    return result;
};

export const prepareCommands = ( commands, options ) => commands.map(({command}) => prepareCommand(command, options));

export const prepareFrame = ( {isValid, bytes, content}, options ) => ({
    isValid,
    bytes: getStringFromBytes(bytes, options),
    content: getStringFromBytes(content, options)
});
