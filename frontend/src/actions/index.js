import { GET_RANDOM_EPISODE, GET_EPISODE, GET_TOTAL } from "./types";

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
