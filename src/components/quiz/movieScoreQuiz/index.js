import React, { useEffect, useState } from 'react';
import './index.css';
import film from './film.png';
import { movieApi } from '../../../api/movieApi';

function MovieScoreQuiz() {
  const [leftMovie, setLeftMovie] = useState(null);
  const [rightMovie, setRigthMovie] = useState(null);
  const choiceLeft = () => {
    console.log('Left');
  };
  const choiceRight = () => {
    console.log('Right');
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await movieApi.popular();
      console.log(data);
      console.log(data.results[0].poster_path);
      // data --> 요청보낼때 body에 page도 변경가능
      setLeftMovie(`https://image.tmdb.org/t/p/original${data.results[0].poster_path}`);
      setRigthMovie(`https://image.tmdb.org/t/p/original${data.results[1].poster_path}`);
    };
    getData();
  }, []);
  return (
    <div>
      <nav>
        <div className="nav-image-box">
          <img src={film} alt="" className="nav-image" />
        </div>
        <div className="nav-quiz">영화퀴즈</div>
        <div className="nav-rank">랭킹</div>
      </nav>
      <div className="status-bar"> </div>
      <div className="question-title">2. 영화 관객 수 비교</div>
      <div className="question-content">다음 두 영화 중 평점이 더 높은 영화를 골라보세요.(The Movie Database 기준)</div>
      <div className="main-content">
        <img onClick={choiceLeft} src={leftMovie} alt="" className="left-movie" />
        <div className="versus">vs.</div>
        <img onClick={choiceRight} src={rightMovie} alt="" className="right-movie" />
      </div>
    </div>
  );
}

export default MovieScoreQuiz;
