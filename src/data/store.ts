import * as Constants from './Constants';
import {createStore} from 'redux';

import {rootReducer} from './Reducers';

const store = createStore(rootReducer);
export default store;