import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const isEmpty = obj => {
  return Object.keys(obj).length > 0;
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log(isEmpty(action.payload));
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
