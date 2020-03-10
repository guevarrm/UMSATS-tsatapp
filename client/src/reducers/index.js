import { combineReducers } from "redux";
import authReducer from "./authReducer";
import satReducer from "./satReducer";

export default combineReducers({
  auth: authReducer,
  sat: satReducer
});
