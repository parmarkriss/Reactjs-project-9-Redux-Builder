import { combineReducers } from "redux";
import Crud from "./Crudreducers";

const rootRecord = combineReducers({
    crud : Crud
})

export default rootRecord;