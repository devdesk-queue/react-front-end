import {combineReducers} from 'redux';
import {account} from './account';
import {tickets} from './tickets';

export const rootReducer = combineReducers({account,tickets});