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

const total = 186;

export const randomEpisode = user => {
  return new Promise(resolve => {
    axios
      .get("/api/id")
      .then(({ data }) => {
        let episodes = data.ids;

        if (user) {
          user.dislikedEpisodes.forEach(id => {
            episodes.splice(episodes.indexOf(id), 1);
          });
        }

        if (window.sessionStorage.chosen) {
          let chosen = JSON.parse(window.sessionStorage.chosen);
          chosen.forEach(id => {
            if (episodes.indexOf(id) !== -1) {
              episodes.splice(episodes.indexOf(id), 1);
            }
          });
        }

        let episode =
          episodes[Math.floor(Math.random() * (episodes.length - 1)) + 1];

        if (episode) {
          if (window.sessionStorage.chosen) {
            let chosen = JSON.parse(window.sessionStorage.chosen);
            if (user && chosen.length >= total - user.dislikedEpisodes.length) {
              window.sessionStorage.setItem("chosen", JSON.stringify([]));
            } else if (!user && chosen.length === total) {
              window.sessionStorage.setItem("chosen", JSON.stringify([]));
            }

            chosen.push(episode);
            window.sessionStorage.setItem("chosen", JSON.stringify(chosen));

            return resolve(episode);
          } else {
            window.sessionStorage.setItem("chosen", JSON.stringify([episode]));

            return resolve(episode);
          }
        } else {
          window.sessionStorage.setItem("chosen", JSON.stringify([]));
          window.location.reload();
        }
      })
      .catch(e => console.log(e));
  });
};

export const getRandomForUser = user => dispatch => {
  randomEpisode(user).then(id => {
    return axios
      .get(`/api/id/${id}`)
      .then(response => {
        dispatch(getRandomSuccess(response.data));
      })
      .catch(e => console.log(e));
  });
};

export const getRandom = () => dispatch => {
  randomEpisode().then(id => {
    return axios
      .get(`/api/id/${id}`)
      .then(response => {
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
