import { combineReducers } from "redux";
import episodes from "./episodeReducer";
import total from "./totalReducer";
import auth from "./authReduder";
import register from "./registerReducer";
import errors from "./errorReducer";

export default combineReducers({
  episodes,
  total,
  auth,
  register,
  errors
});
