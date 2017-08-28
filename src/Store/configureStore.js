import 'babel-polyfill';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../Reducers/index';
import rootSaga from '../Sagas/index';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(rootReducer,
            applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run(rootSaga)
    };
};

export default configureStore;
