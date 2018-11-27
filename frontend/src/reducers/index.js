import { combineReducers } from "redux";
import episodes from "./episodeReducer";
import total from "./totalReducer";

export default combineReducers({
  episodes,
  total
});
