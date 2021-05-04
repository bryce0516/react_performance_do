import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";
// const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer
  // composeWidthDevTools(applyMiddleware(sagaMiddleware))
);

// sagaMiddleware.run(rootSaga);
export { store };
