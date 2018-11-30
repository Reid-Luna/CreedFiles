import { REGISTER } from "../actions/types";

export default function registerReducer(state = [], action) {
  switch (action.type) {
    case REGISTER:
      return action.payload;
    default:
      return state;
  }
}
