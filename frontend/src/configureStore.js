import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import thunk from "redux-thunk";

export const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const resetEnhancer = (rootReducer) => (state, action) => {
  if (action.type !== "@@router/LOCATION_CHANGE") {
    console.log("NOT @@router/LOCATION_CHANGE: STATE", state);
    console.log("NOT @@router/LOCATION_CHANGE: ACTION", action);

    return rootReducer(state, action);
  }
  console.log("state", state);
  console.log("action", action);
  // console.log("createRootReducer(history)", createRootReducer(history));
  const newState = rootReducer({ ...state, userDetails: {}, productList: {}, userLoginStatus: {} }, action, );
  return newState;
};

export default function configureStore(initialState) {
  const store = createStore(
    resetEnhancer(createRootReducer(history)), // root reducer with router state
    initialState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk
      )
    )
  );

  return store;
}
