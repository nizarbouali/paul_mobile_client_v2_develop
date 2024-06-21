import { createSlice, configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import reactotron from './ReactotronConfig';

// const sagaMonitor = Reactotron?.createSagaMonitor();

// const reduxSagaMonitorOptions = { sagaMonitor };

function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        rootReducer: createSlice({
            name: 'rootReducer',
            initialState: "REDUX CONFIGURED CORRECTLY",
            reducers: {},
        }).reducer,
        ...injectedReducers,
    });
    return rootReducer;
}

const sagaMiddleware = createSagaMiddleware();
const { run: runSaga } = sagaMiddleware;

let enhancers =
    __DEV__ ? [reactotron.createEnhancer!()] as any[] :
        [] as any[];

enhancers.push(createInjectorsEnhancer({
    createReducer,
    runSaga,
}),)

const store = configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(enhancers)
});

// runSaga(rootSaga);

export default store;
