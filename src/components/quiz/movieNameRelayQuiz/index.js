import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import film from './film.png';
import { movieApi } from '../../../api/movieApi';
import HoonsModal from '../../common/HoonsModal';

function MovieNameRelayQuiz() {
  const [movieTitle, setTitle] = useState(null);
  const [titleHint, setHint] = useState(null);
  const [titleAnswer, setAnswer] = useState(null);
  const [answerLength, setLength] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setCorrect] = useState(false);

  const makeRandomNumber = (n) => (Math.floor(Math.random(0) * (n - 1) + 1));

  const popFailModal = () => {
    setCorrect(false);
    setShowModal(true);
  };

  const popCorrectModal = () => {
    setCorrect(true);
    setShowModal(true);
    setTimeout(() => { setShowModal(false); }, 700);
  };

  const setAnswerLength = (answer) => {
    setLength(answer);
  };

  const setQuizData = (title) => {
    console.log(title);
    setHint(title.substring(0, title.length / 2));
    setAnswer(title.substring(title.length / 2).replace(/ /gi, ''));
    setAnswerLength(title.substring(title.length / 2).replace(/ /gi, '').length);
  };

  const setData = async () => {
    const { data } = await movieApi.popular(makeRandomNumber(5));
    const title = data.results[makeRandomNumber(20)].title;
    setTitle(title);
    setQuizData(title);
  };

  const checkAnswer = (e) => {
    const answer = titleAnswer.toUpperCase().replace(/ /gi, '');
    console.log(answer);
    const userAnswerModify = userAnswer.toUpperCase().replace(/ /gi, '');
    console.log(userAnswerModify);
    if (userAnswerModify === answer) {
      popCorrectModal();
      setScore(score + 1);
      setUserAnswer('');
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
    <>
      <>
        {isCorrect ? <HoonsModal isCorrect={isCorrect} showModal={showModal} setshowModal={setShowModal} title="정답입니다!" /> : <HoonsModal showModal={showModal} setshowModal={setShowModal} title="오답입니다!" />}
      </>
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
          <div className="quiz-content-hint">{ titleHint }</div>
          <div className="quiz-content-quiz">{ '? '.repeat(answerLength) }</div>
          {/* 아랫줄은 배포시 삭제해야하는 코드 */}
          <div>{ titleAnswer }</div>
        </div>
        <div className="answer-box">
          <div className="answer-box-title">답:</div>
          <input onKeyPress={enterkey} onChange={(e) => setUserAnswer(e.target.value)} type="text" value={userAnswer} className="answer-box-content" />
        </div>
        <div onClick={(e) => checkAnswer(e)} className="answer-button">
          <div> 정답 제출 </div>
        </div>
        <div className="current-score">현재 점수 : { score } 점</div>
      </div>
    </>
  );
}

export default MovieNameRelayQuiz;
