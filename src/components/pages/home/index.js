import React from 'react';
import styled from 'styled-components';
import './home.css';
import Container from '@material-ui/core/Container';

const S = {
  GameWrapper: styled.div`
    position: relative;
    z-index: 10;
    display: grid;
    padding: 6px;
    grid-gap: 3px;
    grid-template-columns: repeat(6, 6fr);
    grid-template-rows: 1fr;
    align-items: center;
    justify-items: center;
  `,
  Game: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 50%;
    padding-bottom: 50%;
    height: auto;
    font-family: BBTreeGo_R;
    color: white;
    border: 2px solid black;
    border-radius: 6px;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      transform: translateY(-2.5%);
      background: var(--adaptiveGray900);
      transition: all 0.5s ease;
    }
  `,
};
function Home({ history }) {
  return (
    <body className="body">
      <div className="background">
        <div id="title">
          영화 퀴즈 천국에 오신 것을 환영합니다.
        </div>
        <div id="subtitle">
          6가지 영화 퀴즈 풀어보고 당신의 랭킹을 확인해보세요.
        </div>
        <div>
          <button id="startButton" onClick={() => history.push('/rankGame')}>랭킹전 도전하기</button>
        </div>
        <Container className="gameWrapper">
          <S.GameWrapper>
            <S.Game className="initialQuiz" onClick={() => history.push('/initial-quiz')}>
              영화 초성<br />맞추기
            </S.Game>
            <S.Game className="movieScoreQuiz" onClick={() => history.push('/movie-score-quiz')}>
              영화 관객수<br />비교하기
            </S.Game>
            <S.Game className="movieNameQuiz" onClick={() => history.push('/movie-name-relay-quiz')}>
              영화<br />이어말하기
            </S.Game>
            <S.Game className="directorQuiz" onClick={() => history.push('/director-quiz')}>
              영화감독의<br />작품 맞추기
            </S.Game>
            <S.Game className="actorQuiz" onClick={() => history.push('/actor-quiz')}>
              영화배우의<br />작품 맞추기
            </S.Game>
            <S.Game className="movieYearQuiz" onClick={() => history.push('/movie-year-quiz')}>
              영화 개봉<br />순서 맞추기
            </S.Game>
          </S.GameWrapper>
        </Container>
      </div>
    </body>
  );
}

export default Home;
