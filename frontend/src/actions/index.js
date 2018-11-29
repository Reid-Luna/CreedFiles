import {
  GET_RANDOM_EPISODE,
  GET_EPISODE,
  GET_TOTAL,
  CHECK_LOGIN,
  LOGIN,
  GET_CURRENT_USER,
  REGISTER,
  LOGOUT,
  REMOVE,
  LIKE_EPISODE,
  DISLIKE_EPISODE
} from "./types";

import axios from "axios";

export const getRandom = () => {
  return dispatch => {
    let season = Math.floor(Math.random() * 9) + 1;
    axios
      .get(`/api/${season}/limit`)
      .then(({ data }) => {
        let episode = Math.floor(Math.random() * data.limit) + 1;
        return axios
          .get(`/api/${season}/${episode}`)
          .then(response => {
            response.data.season = season;
            console.log(response.data);
            dispatch(getRandomSuccess(response.data));
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  };
};

export const getRandomSuccess = data => {
  const { season, number, title, description, image } = data;
  return {
    type: GET_RANDOM_EPISODE,
    payload: {
      season,
      number,
      title,
      description,
      image
    }
  };
};

export const getEpisode = (season, episode) => {
  return dispatch => {
    return axios
      .get(`/api/${season}/${episode}`)
      .then(response => {
        dispatch(getEpisodeSuccess(response.data));
      })
      .catch(e => console.log(e));
  };
};

export const getEpisodeSuccess = data => {
  const { number, title, description } = data;
  return {
    type: GET_EPISODE,
    payload: {
      number,
      title,
      description
    }
  };
};

export const getTotal = () => {
  return dispatch => {
    return axios
      .get("/api/total")
      .then(response => {
        dispatch(getTotalSuccess(response.data));
      })
      .catch(e => console.log(e));
  };
};

export const getTotalSuccess = data => {
  const total = data.count;
  return {
    type: GET_TOTAL,
    payload: {
      total
    }
  };
};

export const register = (username, email, password) => {
  return dispatch => {
    return axios
      .post("/users/new", { username, email, password })
      .then(response => {
        dispatch(registerSuccess(response.data));
      })
      .catch(error => {
        dispatch(registerError(error.data));
      });
  };
};

export const registerError = data => {
  const { errors } = data;
  return {
    type: REGISTER,
    payload: { errors }
  };
};

export const registerSuccess = data => {
  const { id, username, likedEpisodes, dislikedEpisodes, totalSorted } = data;
  return {
    type: REGISTER,
    payload: {
      id,
      username,
      likedEpisodes,
      dislikedEpisodes,
      totalSorted
    }
  };
};

export const getCurrentUser = () => {
  return dispatch => {
    return axios
      .get("/auth/current")
      .then(res => {
        dispatch(getCurrentUserSuccess(res.data));
      })
      .catch(e => console.log(e));
  };
};

export const getCurrentUserSuccess = data => {
  const { user } = data;
  return {
    type: GET_CURRENT_USER,
    payload: { user }
  };
};

export const login = (loginName, password) => {
  return dispatch => {
    return axios
      .post("/users/login", { loginName, password })
      .then(res => {
        dispatch(loginSuccess(res.data));
      })
      .catch(e => {
        dispatch(loginError(e.data));
      });
  };
};

export const loginSuccess = data => {
  axios.defaults.headers.common["Authorization"] = data.token;
  return {
    type: LOGIN,
    payload: {}
  };
};

export const loginError = data => {
  const { errors } = data;
  return {
    type: LOGIN,
    payload: { errors }
  };
};

export const isLoggedIn = () => {
  return dispatch => {
    return axios
      .get("/auth/verify")
      .then(res => {
        dispatch(isLoggedInSuccess(true));
      })
      .catch(e => console.log(e));
  };
};

export const isLoggedInSuccess = loggedIn => {
  return {
    type: CHECK_LOGIN,
    payload: { loggedIn }
  };
};

export const logout = () => {
  axios.defaults.headers.common["Authorization"] = null;
  return {
    type: LOGOUT,
    payload: {}
  };
};
