import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import firebase from 'firebase/app';
import Modal from '../../common/Modal';
import { recordScore, login } from '../../../firebase';
import './rankGame.css';
import popcorn from './popcorn.png';
import ticket from './ticket.png';

const ActorQuiz = React.lazy(() => import('../actorQuiz'));
const DirectorQuiz = React.lazy(() => import('../directorQuiz'));
const InitialQuiz = React.lazy(() => import('../InitialQuiz'));
const MovieNameRelayQuiz = React.lazy(() => import('../movieNameRelayQuiz'));
const MovieScoreQuiz = React.lazy(() => import('../movieScoreQuiz'));
const MovieYearQuiz = React.lazy(() => import('../movieYearQuiz'));

function rankGame() {
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(3);
  const [quizNum, setQuizNum] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [ready, setReady] = useState(false);
  const [lifeImage, setLifeImage] = useState([]);
  const [scoreImage, setScoreImage] = useState([]);

  const getQuiz = () => Math.floor(Math.random() * 6);

  let lives = [];
  let scores = [];
  const quizCorrect = () => {
    setScore(score + 1);
    toast.success('맞췄습니다!! [Score +1]');
    setQuizNum(getQuiz());
    // setLifeImage(lives);
    // setScoreImage(scores);
  };

  const quizWrong = () => {
    setLife(life - 1);
    console.log(`life is ${life}`);
    toast.error('틀렸습니다!! [Life -1] ㅠ.ㅠ');
    setQuizNum(getQuiz());
    // setLifeImage(lives);
    // setScoreImage(scores);
  };

  const quizzes = [
    <ActorQuiz quizCorrect={quizCorrect} quizWrong={quizWrong} isRank />,
    <DirectorQuiz quizCorrect={quizCorrect} quizWrong={quizWrong} isRank />,
    <InitialQuiz quizCorrect={quizCorrect} quizWrong={quizWrong} isRank />,
    <MovieNameRelayQuiz quizCorrect={quizCorrect} quizWrong={quizWrong} isRank />,
    <MovieScoreQuiz quizCorrect={quizCorrect} quizWrong={quizWrong} isRank />,
    <MovieYearQuiz quizCorrect={quizCorrect} quizWrong={quizWrong} isRank />
  ];

  useEffect(() => {
    setQuizNum(getQuiz());
  }, []);

  useEffect(() => {
    setQuiz(quizzes[quizNum]);
  }, [quizNum]);

  useEffect(() => {
    if (life === 0) {
      setShowModal(true);
      recordScore(score);
    }
  }, [life]);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setShowLoginModal(false);
      setReady(true);
    } else {
      setShowLoginModal(true);
      setReady(false);
    }
  });

  const makeLife = () => {
    lives = [];
    for (let i = 0; i < life; i += 1) {
      lives.push(<img id="popcorn" key={life} src={popcorn} alt={popcorn} />);
    }
    return lives;
  };

  // useEffect(() => {
  //   // makeLife();
  //   setLifeImage(lives);
  // }, [life]);

  const makeScore = () => {
    scores = [];
    for (let i = 0; i < score; i += 1) {
      scores.push(<img id="ticket" key={score} src={ticket} alt={ticket} />);
      console.log(scores);
      console.log(score);
    }
    return scores;
  };

  useEffect(() => {
    // makeScore();
    setScoreImage(scores);
  }, [score]);

  return (
    <div>
      {ready
      ? (
        <div className="RankGame">
          <ToastContainer position="top-center" autoClose={2000} draggable />
          <Modal
            showModal={showModal}
            setshowModal={setShowModal}
            confirmFunction={() => {
              setShowModal(false);
              setScore(0);
              setLife(3);
              setQuizNum(getQuiz());
            }}
            title="Game Over!"
            contents={`최종 score : ${score} \n 이 score가 Ranking에 기록됩니다!`}
          />
          <div className="board">
            <div className="life">
              <img id="popcorn" key={life} src={popcorn} alt={popcorn} />
              <div className="lifeCount">남은 목숨&nbsp;&nbsp;</div>
              <span className="lifeCount">{ life }</span>
            </div>
            <div className="score">
              <img id="ticket" key={score} src={ticket} alt={ticket} />
              <div className="scoreCount">현재 점수&nbsp;&nbsp;</div>
              <span className="scoreCount">{ score }</span>
            </div>
          </div>
          {quiz}
        </div>
      )
      : <Modal showModal={showLoginModal} setshowModal={setShowLoginModal} confirmFunction={() => login()} title="로그인이 필요합니다." contents="RankGame의 경우 로그인이 필요합니다." />}
    </div>
  );
}

export default rankGame;
