import { createStore } from "redux";
import { reducer } from "./counterReducer";

export type AppStoreType = ReturnType<typeof reducer>;
const store = createStore(reducer);
export default store;
// @ts-ignore
window.store = store; // for dev
