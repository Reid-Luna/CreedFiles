import { GOT_ERRORS } from "../actions/types";

export default function errorReducer(state = {}, action) {
  switch (action.type) {
    case GOT_ERRORS:
      return action.payload || {};
    default:
      return state;
  }
}
