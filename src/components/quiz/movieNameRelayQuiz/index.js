import React, { useState, useEffect } from 'react';
import './index.css';
import film from './film.png';
import { movieApi } from '../../../api/movieApi';

function MovieNameRelayQuiz() {
  const [movieTitle, setTitle] = useState(null);
  const [titleHint, setHint] = useState(null);
  const [titleAnswer, setAnswer] = useState(null);
  const [answerLength, setLength] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const makeRandomNumber = (n) => (Math.floor(Math.random(0) * (n - 1) + 1));

  const popFailModal = () => {
    const failModalDom = document.getElementsByClassName('fail-modal')[0];
    failModalDom.classList.add('fail-on');
  };
  const popCorrectModal = () => {
    const correctModal = document.getElementsByClassName('correct-modal')[0];
    correctModal.classList.add('correct-on');
    setTimeout(() => {
      correctModal.classList.remove('correct-on');
    }, 1000);
  };

  const setAnswerLength = (answer) => {
    setLength(answer);
  };

  const setQuizData = (title) => {
    console.log(title);
    setHint(title.substring(0, title.length / 2));
    setAnswer(title.substring(title.length / 2).replace(' ', ''));
    setAnswerLength(title.substring(title.length / 2).replace(' ', '').length);
  };

  const setData = async () => {
    const { data } = await movieApi.popular(makeRandomNumber(5));
    const title = data.results[makeRandomNumber(20)].title;
    setTitle(title);
    setQuizData(title);
  };

  const checkAnswer = (e) => {
    const answer = titleAnswer.toUpperCase().replace(' ', '');
    const userAnswerModify = userAnswer.toUpperCase().replace(' ', '');
    if (userAnswerModify === answer) {
      popCorrectModal();
      setScore(score + 1);
      console.log(e);
    } else {
      popFailModal();
    }
  };
  const enterkey = () => {
    if (window.event.keyCode === 13) {
      checkAnswer();
    }
  };

  useEffect(() => {
    setData();
  }, [score]);

  return (
    <div>
      <nav>
        <img src={film} alt="" className="nav-image" />
        <div className="nav-quiz">영화퀴즈</div>
        <div className="nav-rank">랭킹</div>
      </nav>
      <div className="status-bar"> </div>
      <div className="question-title">3. 영화 이어말하기</div>
      <div className="question-content">이어지는 영화 제목을 맞춰보세요. (글자수에는 공백이 포함됩니다.)</div>
      <div className="question-box">
        <div className="quiz-content-hint">{ titleHint }</div>
        <div className="quiz-content-quiz">{ '? '.repeat(answerLength) }</div>
        <div>{ titleAnswer }</div>
      </div>
      <div className="answer-box">
        <div className="answer-box-title">답:</div>
        <input onKeyPress={enterkey} onChange={(e) => setUserAnswer(e.target.value)} type="text" className="answer-box-content" />
      </div>
      <div onClick={(e) => checkAnswer(e)} className="answer-button">
        <div> 정답 제출 </div>
      </div>
      <div className="current-score">현재 점수 : { score } 점</div>
      <div className="fail-modal">
        <div className="fail-modal-inner">틀렸습니다!</div>
        <div>나의 점수는 {score} 점!</div>
        {/* 누르면 메인페이지로 돌아가도록 하기 */}
        <button className="fail-modal-close">메인페이지로 돌아가기</button>
      </div>
      <div className="correct-modal">
        <div className="correct-modal-inner">정답입니다!</div>
      </div>
    </div>
  );
}

export default MovieNameRelayQuiz;
// .then(() => setHint(movieTitle.substring(0, movieTitle.length / 2))
//       )
//       .then(() => setAnswer(movieTitle.substring(movieTitle.length / 2)))
//       .then(() => setLength('? '.repeat(titleAnswer.length)));
//     console.log(movieTitle);
//     console.log(titleAnswer);
