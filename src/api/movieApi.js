import axios from 'axios';
import { API_KEY, ISO_KOREA } from '../_constants';

const API_KEY_1 = 'b0ff20ac5d8954e06fe0687ef0879e37';

const Params1 = {
  key: API_KEY_1,
  curPage: 1,
  itemPerPage: 20
};

const Params2 = {
  key: API_KEY_1
};

const Params1Box = {
  key: API_KEY_1,
  itemPerPage: 20,
};

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

const api1 = axios.create({
  baseURL: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/'
});

export const movieApi = {
  nowPlaying: (page) => api.get('movie/now_playing', { params: { ...Params, page } }),
  upComing: (page) => api.get('movie/upcoming', { params: { ...Params, page } }),
  popular: (page) => api.get('movie/popular', { params: { ...Params, page } }),
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
  movieListByName: (movieNm) => api1.get('movie/searchMovieList.json', { params: { ...Params1, movieNm } }),
  movieListByDirector: (directorNm) => api1.get('movie/searchMovieList.json', { params: { ...Params1, directorNm } }),
  movieList: (curPage) => api1.get('movie/searchMovieList.json', { params: { ...Params1, curPage } }),
  boxOfficeData: (targetDt) => api1.get('boxoffice/searchDailyBoxOfficeList.json', { params: { ...Params1Box, targetDt } }),
  movieDetailByCd: (movieCd) => api1.get('movie/searchMovieInfo.json', { params: { ...Params2, movieCd } }),
};
