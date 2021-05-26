import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware  from "redux-saga";
import { rootReducers } from "./mainReducer";
import { mainSaga } from "./mainSaga";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [sagaMiddleware];

const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(...middlewares))
)

sagaMiddleware.run(mainSaga);

export { store }