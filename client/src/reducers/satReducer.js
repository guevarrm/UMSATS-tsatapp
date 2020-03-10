import { QUERY_SAT } from "../actions/types";

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case QUERY_SAT: {
      console.log(action.payload);
      return action.payload || false;
    }
    default:
      return state;
  }
}
