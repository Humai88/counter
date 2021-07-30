import { combineReducers, createStore } from "redux";
import { reducer } from "./counterReducer";

const reducers = combineReducers({
  counter: reducer,
});

export type AppStoreType = ReturnType<typeof reducers>;
const store = createStore(reducers);
export default store;
// @ts-ignore
window.store = store; // for dev
