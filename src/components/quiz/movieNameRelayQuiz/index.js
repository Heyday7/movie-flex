import React from 'react';
import './index.css';
import film from './film.png';

function MovieNameRelayQuiz() {
  return (
    <div>
      <nav>
        <img src={film} alt="" className="nav-image" />
        <div className="nav-quiz">영화퀴즈</div>
        <div className="nav-rank">랭킹</div>
      </nav>
      <div className="status-bar"> </div>
      <div className="question-title">3. 영화 이어말하기</div>
      <div className="question-content">이어지는 영화 제목을 맞춰보세요.</div>
      <div className="question-box">
        <div className="quiz-content">인터 ***</div>
      </div>
      <div className="answer-box">
        <div className="answer-box-title">답:</div>
        <div className="answer-box-content">인터스텔라</div>
      </div>
      <div className="next-button">다음 퀴즈</div>
    </div>
  );
}

export default MovieNameRelayQuiz;
