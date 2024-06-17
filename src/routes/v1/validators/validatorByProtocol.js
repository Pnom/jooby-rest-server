import * as analog from './analog.js';
import * as mtx from './mtx.js';
import * as obisObserver from './obisObserver.js';
import {ANALOG, MTX, MTX3, OBIS_OBSERVER} from '../../../constants/protocols.js';


const validatorByProtocol = {};

validatorByProtocol[ANALOG] = analog;
validatorByProtocol[MTX] = mtx;
validatorByProtocol[MTX3] = mtx;
validatorByProtocol[OBIS_OBSERVER] = obisObserver;

export default validatorByProtocol;
