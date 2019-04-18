import {
    combineReducers
} from 'redux';
import {
    account
} from './account';
import {
    categories
} from './categories';
import {
    roles
} from './roles';
import {
    tickets
} from './tickets';
import {
    users
} from './users';

export const rootReducer = combineReducers({
    account,
    categories,
    roles,
    tickets,
    users
});