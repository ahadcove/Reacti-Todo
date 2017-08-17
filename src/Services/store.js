import {compose, applyMiddleware, createStore} from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './Reducers';

const middleware=
    applyMiddleware(
        logger, 
        thunk
     );

const store = createStore(
    reducers, undefined, 
    compose(
        middleware,
        autoRehydrate()
      )
);

// Periodically persisting the store
persistStore(store)
      
export default store;