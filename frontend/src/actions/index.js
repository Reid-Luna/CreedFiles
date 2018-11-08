import { GET_RANDOM_EPISODE, GET_EPISODE } from "./types";

import axios from "axios";

export const getRandom = () => {
  return dispatch => {
    let season = Math.floor(Math.random() * 9) + 1;
    axios
      .get(`http://localhost:3001/${season}/limit`)
      .then(({ data }) => {
        let episode = Math.floor(Math.random() * data.limit) + 1;
        return axios
          .get(`/${season}/${episode}`)
          .then(response => {
            console.log(response);
            response.data = {
              ...response.data,
              season
            };
            dispatch(getRandomSuccess(response.data));
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  };
};

export const getRandomSuccess = data => {
  const { season, number, title, description } = data;
  return {
    type: GET_RANDOM_EPISODE,
    payload: {
      season,
      number,
      title,
      description
    }
  };
};

export const getEpisode = (season, episode) => {
  return dispatch => {
    return axios
      .get(`http://localhost:3001/${season}/${episode}`)
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
