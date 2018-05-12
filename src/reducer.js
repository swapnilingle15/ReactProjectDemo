import { combineReducers } from "redux";
import { employeeData } from "./home/reducer";
import entityErrors  from "./home/reducer/errors";

const reducers = combineReducers({
  employeeData,
  entityErrors
});

export default reducers;
