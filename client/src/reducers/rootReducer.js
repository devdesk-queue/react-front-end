import {combineReducers} from 'redux';
import {account} from './account';
import {tickets} from './tickets';
import {categories} from './categories';

export const rootReducer = combineReducers({account,tickets,categories});