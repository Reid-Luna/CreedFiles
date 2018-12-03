import {
  GET_RANDOM_EPISODE,
  GET_EPISODE,
  GET_TOTAL,
  SET_CURRENT_USER,
  GOT_ERRORS
} from "./types";

import axios from "axios";
import jwt_decode from "jwt-decode";
import { RichEmbed } from "discord.js";

export const randomEpisode = () => {
  return new Promise(resolve => {
    let season = Math.floor(Math.random() * 9) + 1;
    axios
      .get(`/api/${season}/limit`)
      .then(({ data }) => {
        let episode = Math.floor(Math.random() * data.limit) + 1;
        return resolve({ season, episode });
      })
      .catch(e => console.log(e));
  });
};

export const getRandomForUser = user => dispatch => {
  randomEpisode().then(({ season, episode }) => {
    return axios
      .get(`/api/id`)
      .then(response => {
        const { ids } = response.data;
        user.dislikedEpisodes.forEach(id => {
          ids.splice(ids.indexOf(id), 1);
        });
        let random = ids[Math.floor(Math.random() * (ids.length - 1)) + 1];
        if (sessionStorage.getItem("episodes")) {
          let episodes = JSON.parse(sessionStorage.getItem("episodes"));
          if (episodes.indexOf(response.data._id) === -1) {
            axios.get(`/api/id/${random}`).then(response => {
              dispatch(getRandomSuccess(response.data));
            });
          } else {
            getRandomForUser(user);
          }
          if (episodes.length === 197) {
            sessionStorage.setItem("episodes", JSON.stringify([]));
          } else if (episodes.length > 0) {
            episodes.push(response.data._id);
            sessionStorage.setItem("episodes", JSON.stringify(episodes));
          } else if (episodes.length === 0) {
            episodes = [response.data._id];
            sessionStorage.setItem("episodes", JSON.stringify(episodes));
          }
        } else {
          episodes = [response.data._id];
          sessionStorage.setItem("episodes", JSON.stringify(episodes));
        }
      })
      .catch(e => console.log(e));
  });
};

export const getRandom = () => dispatch => {
  randomEpisode().then(({ season, episode }) => {
    return axios
      .get(`/api/${season}/${episode}`)
      .then(response => {
        if (sessionStorage.getItem("episodes")) {
          let episodes = JSON.parse(sessionStorage.getItem("episodes"));
          if (episodes.indexOf(response.data._id) === -1) {
            axios.get(`/api/id/${random}`).then(response => {
              dispatch(getRandomSuccess(response.data));
            });
          } else {
            getRandom();
          }
          if (episodes.length === 197) {
            sessionStorage.setItem("episodes", JSON.stringify([]));
          } else if (episodes.length > 0) {
            episodes.push(response.data._id);
            sessionStorage.setItem("episodes", JSON.stringify(episodes));
          } else if (episodes.length === 0) {
            episodes = [response.data._id];
            sessionStorage.setItem("episodes", JSON.stringify(episodes));
          }
        } else {
          episodes = [response.data._id];
          sessionStorage.setItem("episodes", JSON.stringify(episodes));
        }
        response.data.season = season;
        dispatch(getRandomSuccess(response.data));
      })
      .catch(e => console.log(e));
  });
};

export const getRandomSuccess = data => {
  const { _id: id, season, number, title, description, image } = data;
  return {
    type: GET_RANDOM_EPISODE,
    payload: {
      id,
      season,
      number,
      title,
      description,
      image
    }
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
      .then(res => {
        let embed = new RichEmbed();
        embed.setTitle("New User!");
        embed.addField("username", username);
        embed.addField("email", email);
        axios
          .post(
            "https://discordapp.com/api/webhooks/517965133109002250/8qXJYA-R68lUDHhdaFUbUhHEOONBhFqJD4N8yHl07zUCCkG5xHf6SKeusgB2xH3N61j1",
            { embeds: [embed] }
          )
          .then(res => {
            window.location.href = "/login";
          })
          .catch(error => {
            console.log(error);
            window.location.href = "/login";
          });
      })
      .catch(error => {
        dispatch(gotErrors(error.response.data));
      });
  };
};

export const setAuthToken = token => {
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

export const likeEpisode = id => dispatch => {
  return axios
    .get(`/users/like/${id}`)
    .then(res => {
      return dispatch(setCurrentUser(res.data));
    })
    .catch(e => {
      dispatch(gotErrors(e.response.data));
    });
};

export const dislikeEpisode = id => dispatch => {
  return axios
    .get(`/users/dislike/${id}`)
    .then(res => {
      return dispatch(setCurrentUser(res.data));
    })
    .catch(e => {
      dispatch(gotErrors(e.response.data));
    });
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
