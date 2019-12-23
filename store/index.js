import Store from "./store.js";
import createReducers from "./reducers.js";
import Backend from "../js/backend.js";

export default new Store(createReducers());

