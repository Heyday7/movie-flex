import React from 'react';
import './index.css';
import film from './film.png';

function MovieScoreQuiz() {
  return (
    <div>
      <nav>
        <img src={film} alt="" className="nav-image" />
        <div className="nav-quiz">영화퀴즈</div>
        <div className="nav-rank">랭킹</div>
      </nav>
      <div className="status-bar"> </div>
      <div className="question-title">2. 영화 관객 수 비교</div>
      <div className="question-content">다음 두 영화 중 관객 수가 더 많았던 영화를 골라보세요.</div>
      <div className="main-content">
        <div className="left-movie">왼쪽영화</div>
        <div className="versus">vs.</div>
        <div className="right-movie">오른쪽 영화</div>
      </div>
    </div>
  );
}

export default MovieScoreQuiz;
