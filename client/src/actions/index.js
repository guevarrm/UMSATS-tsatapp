import axios from "axios";
import { FETCH_USER, QUERY_SAT } from "./types";

/* prior to refactor
export const fetchUser = () => {
  return function(dispatch) {
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
*/

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const querySat = () => async dispatch => {
  const res = await axios.get("/sat/login");
  dispatch({ type: QUERY_SAT, payload: res.data });
};
