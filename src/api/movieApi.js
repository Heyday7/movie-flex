import axios from 'axios';
import { API_KEY, ISO_KOREA } from '../_constants';

const Params = {
  api_key: API_KEY,
  language: ISO_KOREA,
};

const DetailParams = {
  api_key: API_KEY,
  language: ISO_KOREA,
  page: 1,
  append_to_response: 'videos',
};

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export const movieApi = {
  nowPlaying: () => api.get('movie/now_playing', { params: Params }),
  upComing: () => api.get('movie/upcoming', { params: Params }),
  popular: () => api.get('movie/popular', { params: Params }),
  getVideo: (id) => api.get(`movie/${id}/videos`, { params: Params }),
  movieDetail: (id) => api.get(`movie/${id}`, { params: DetailParams }),
  search: (term) =>
    api.get('search/movie', {
      params: {
        api_key: API_KEY,
        language: ISO_KOREA,
        query: encodeURIComponent(term),
      },
    }),
};
