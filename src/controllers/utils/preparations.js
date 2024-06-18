import getStringFromBytes from '../../utils/getStringFromBytes.js';


const prepareCommand = ( commandsById, command, options ) => {
    const {id, name} = command;
    const commandNamespace = commandsById[command.id];

    const parameters = commandNamespace && 'toJson' in commandNamespace && typeof commandNamespace.toJson === 'function'
        ? JSON.parse(commandNamespace.toJson(command.parameters, options))
        : command.parameters;

    return parameters && Object.keys(parameters).length !== 0 ? {id, name, parameters} : {id, name};
};

const prepareCommandWithError = (commandsById, {error, command}, options ) => {
    const preparedCommand = prepareCommand(commandsById, command, options);

    return command.bytes
        ? {...preparedCommand, error, data: getStringFromBytes(command.bytes, options)}
        : {...preparedCommand, error};
};

export const prepareCommands = ( commandsById, commands, options ) => (
    commands.map(command => (command.error
        ? prepareCommandWithError(commandsById, command, options)
        : prepareCommand(commandsById, command, options)))
);

export const prepareFrame = ( {header, bytes, payload}, options ) => ({
    ...header,
    bytes: getStringFromBytes(bytes, options),
    payload: getStringFromBytes(payload, options)
});
