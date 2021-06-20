import axios from 'axios';
import { API_KEY, ISO_KOREA } from '../_constants';

const Params = {
  api_key: API_KEY,
  language: ISO_KOREA,
  region: 'KR',
  page: 1
};

const DetailParams = {
  api_key: API_KEY,
  language: ISO_KOREA,
  page: 1,
  region: 'KR',
  append_to_response: 'videos',
};

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

// response 인터셉터
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { config, response: { status } } = error;
//     const originalRequest = config;
//     if (status >= 400) {
//       return sleepRequest(1000, originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

export const movieApi = {
  nowPlaying: (page) => api.get('movie/now_playing', { params: { ...Params, page } }),
  upComing: (page) => api.get('movie/upcoming', { params: { ...Params, page } }),
  popular: (page,) => api.get('movie/popular', { params: { ...Params, page } }),
  getVideo: (page, id) => api.get(`movie/${id}/videos`, { params: { ...Params, page } }),
  movieDetail: (page, id) => api.get(`movie/${id}`, { params: { ...DetailParams, page } }),
  search: (term) =>
    api.get('search/movie', {
      params: {
        api_key: API_KEY,
        language: ISO_KOREA,
        query: encodeURIComponent(term),
      },
    }),
};
