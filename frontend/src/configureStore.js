import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import thunk from "redux-thunk";

export const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const resetEnhancer = (rootReducer) => (state, action) => {
  if (action.type !== "@@router/LOCATION_CHANGE") {
    console.log("NOT @@router/LOCATION_CHANGE: ACTION", action);
    console.log("NOT @@router/LOCATION_CHANGE: STATE", state);

    return rootReducer(state, action);
  }
  console.log("action", action);
  console.log("state", state);
  const newState = rootReducer({ cart: { ...state.cart } }, {});
  newState.router = state.router;
  return newState;
};

export default function configureStore(initialState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
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
