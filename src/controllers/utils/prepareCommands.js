import {HEX} from '../../../../../jooby-codecs/jooby-codec/dist/utils/constants/bytesEncodeFormat.js';


export const prepareCommand = command => {
    const json = command.toJson(HEX, {separator: ''});
    const {constructor: {id, name}} = command;

    return json ? {id, name, ...JSON.parse(json)} : {id, name};
};

export const prepareCommands = commands => commands.map(({command}) => prepareCommand(command));
