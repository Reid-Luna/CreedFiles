import { GET_RANDOM_EPISODE, GET_EPISODE } from "../actions/types";

export default function episodeReducer(state = [], action) {
  switch (action.type) {
    case GET_RANDOM_EPISODE:
      return action.payload;
    case GET_EPISODE:
      return action.payload;
    default:
      return state;
  }
}
