import {
  GET_RANDOM_EPISODE,
  GET_EPISODE,
  GET_TOTAL,
  SET_CURRENT_USER,
  GOT_ERRORS
} from "./types";

import axios from "axios";
import jwt_decode from "jwt-decode";

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

export const gotErrors = errors => {
  return {
    type: GOT_ERRORS,
    payload: errors.errors
  };
};

export const register = (username, email, password) => {
  return dispatch => {
    return axios
      .post("/users/new", { username, email, password })
      .then(res => (window.location.href = "/login"))
      .catch(error => {
        dispatch(gotErrors(error.response.data));
      });
  };
};

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const login = (loginName, password) => {
  return dispatch => {
    return axios
      .post("/users/login", { loginName, password })
      .then(res => {
        const { token } = res.data;

        localStorage.setItem("creedfiles_jwt", token);
        setAuthToken(token);

        const user = jwt_decode(token);

        dispatch(setCurrentUser(user));
      })
      .catch(e => {
        dispatch(gotErrors(e.response.data));
      });
  };
};

export const logout = () => dispatch => {
  localStorage.removeItem("creedfiles_jwt");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
