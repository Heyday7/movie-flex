import React, { useEffect, useState } from 'react';
import './index.css';
import film from './film.png';
import loading from './loading.gif';
import { movieApi } from '../../../api/movieApi';

function MovieScoreQuiz() {
  const [leftMovie, setLeftMovie] = useState(null);
  const [rightMovie, setRigthMovie] = useState(null);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [score, setScore] = useState(0);
  const popFailModal = () => {
    const failModalDom = document.getElementById('fail-modal');
    failModalDom.classList.add('fail-on');
  };
  const popCorrectModal = () => {
    const correctModal = document.getElementById('correct-modal');
    correctModal.classList.add('correct-on');
  };
  const choiceLeft = () => {
    console.log('Left');
    if (leftScore >= rightScore) {
      console.log('맞췄습니다!');
      setScore(score + 1);
    } else {
      console.log('틀렸습니다!');
      popFailModal();
    }
  };
  const choiceRight = () => {
    if (leftScore <= rightScore) {
      console.log('맞췄습니다!');
      setScore(score + 1);
    } else {
      console.log('틀렸습니다!');
      popFailModal();
    }
  };

  // 1 ~ n까지의 정수 랜덤하게 리턴
  const makeRandomNumber = (n) => (Math.floor(Math.random(0) * (n - 1) + 1));

  useEffect(() => {
    const getData = async () => {
      const { data } = await movieApi.popular(makeRandomNumber(7));
      console.log(data);
      const leftNumber = makeRandomNumber(20);
      let rightNumber = 0;
      while (1) {
        const tmp = makeRandomNumber(20);
        if (tmp !== leftNumber) {
          rightNumber = tmp;
          break;
        }
      }
      setLeftScore(data.results[leftNumber].vote_average);
      setRightScore(data.results[rightNumber].vote_average);
      setLeftMovie(`https://image.tmdb.org/t/p/original${data.results[leftNumber].poster_path}`);
      setRigthMovie(`https://image.tmdb.org/t/p/original${data.results[rightNumber].poster_path}`);
    };
    getData();
  }, [score]);
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
      <div className="question-content">다음 두 영화 중 평점이 더 높은 영화를 골라보세요. (The Movie Database 기준)</div>
      <div className="main-content">
        <img onClick={choiceLeft} src={leftMovie} alt="" className="left-movie movie-box" />
        <div className="versus">vs.</div>
        <img onClick={choiceRight} src={rightMovie} alt="" className="right-movie movie-box" />
      </div>
      <div className="current-score">현재 점수 : { score } 점</div>
      <div id="fail-modal">틀렸습니다!</div>
      <div id="correct-modal">맞았습니다!</div>
    </div>
  );
}

export default MovieScoreQuiz;
