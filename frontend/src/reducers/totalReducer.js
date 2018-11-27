import { GET_TOTAL } from "../actions/types";

export default function totalReducer(state = [], action) {
  switch (action.type) {
    case GET_TOTAL:
      return action.payload;
    default:
      return state;
  }
}
