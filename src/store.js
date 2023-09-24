import { createStore } from "redux";
import rootRecord from "./reducers";

const store = createStore(rootRecord);

export default store;