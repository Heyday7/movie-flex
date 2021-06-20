import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { movieApi } from '../../../api/movieApi';
import { adaptiveBackground, flexCentering } from '../../../style/mixin';
import extractKoPhonemes from '../../../utils/extractKoPhonemes';

const S = {
  Wrapper: styled.div`
    padding: 5vw;
  `,
  QuizTitle: styled.div`
    margin-bottom: 16px;
  `,
  QuizDesc: styled.div`
    margin-bottom: 16px;
  `,
  CharBoxWrapper: styled.div`
    display: flex;
    justify-content: space-around;
    background: var(--lightyellow);

    padding: 16px;
  `,
  CharBox: styled.div`
    ${flexCentering('row')};
    width: 50px;
    height: 50px;
    background: var(--yellow);
    color: var(--adaptiveGray900);
    font-weight: 900;
    font-size: 32px;
    border-radius: 6px;
  `,
  Hint: styled.button`
    margin: 16px;
    border: none;
    background: none;
    color: var(--adaptiveGray900);
    text-decoration: underline;
    cursor: pointer;
    line-height: 1.5;
  `,
  Synopsis: styled.div`
    padding-bottom: 16px;
    margin: 16px;
  `,
  InputWrapper: styled.div`
    ${flexCentering('column')};
    width: 100%;
    text-align: center;
    margin: 16px;
  `,
  Input: styled.input`
    padding: 16px;
    border-radius: 6px;
    width: 50vw;
    border: 2px solid var(--adaptiveGray900);
    margin-top: 16px;

    
    &:hover, &:focus {
      border: 2px solid var(--blue);
      transition: border .5s ease;
    }
  `,
  Button: styled.div`
    background: var(--adaptiveGray900);
    color: var(--adaptiveGray50);
    cursor: pointer;
    padding: 16px;

    width: 250px;
    text-align: center;
    border-radius: 6px;
    margin-top: 16px;
  `
};

const getRandomNumber = (n) => Math.floor(Math.random() * (n)) + 1;
const getMostPopularMovie = (arr) => arr.reduce((acc, cur) => (acc?.popularity <= cur?.popularity ? cur : acc));

function InitialQuiz() {
  const [movieData, setmovieData] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [userInputValue, setuserInputValue] = useState('');
  const [score, setScore] = useState(0);

  async function getMovieData() {
    try {
      const pageNumber = getRandomNumber(450);
      const { data: { results }, status } = await movieApi.popular(pageNumber);

      const mostPopularMovie = getMostPopularMovie(results);
      const cleanUpTitle = mostPopularMovie.title.trim().replaceAll(/(\s|[0-9]|:|\/|\.|,|\?|!|-)/g, '');

      if (!cleanUpTitle) throw new Error('title is missing');
      if (status >= 400) throw new Error(`status ${status}`);

      console.log(mostPopularMovie.title);
      mostPopularMovie.title = cleanUpTitle;
      console.log(mostPopularMovie.title);

      setmovieData(mostPopularMovie);
    } catch (error) {
      console.log(error);
      toast.error(`sorry. error occured ${error.message}`);
    }
  }

  useEffect(() => {
    getMovieData();
  }, []);

  const onSubmitAnswer = () => {
    if (userInputValue === movieData.title) {
      toast.success('맞음! 점수 + 1점');
      setuserInputValue('');
      getMovieData();
      setScore((prev) => prev + 1);
    } else {
      toast.error('틀림!');
      setuserInputValue('');
      getMovieData();
    }
  };

  return (
    <S.Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        draggable
      />
      <S.QuizTitle>초성 퀴즈</S.QuizTitle>
      <S.QuizDesc>다음 초성을 보고 영화 제목을 맞춰보세요</S.QuizDesc>
      <S.QuizDesc>* 일부 특수문자와 공백은 제거되었습니다.</S.QuizDesc>
      <S.QuizDesc>* 한국에서 개봉했던 영화들이 대상입니다</S.QuizDesc>

      <div>{movieData && (
        <>

          <S.CharBoxWrapper>{[...(movieData.title)].map((char, i) => <S.CharBox key={i}>{extractKoPhonemes(char).initial ? extractKoPhonemes(char).initial : extractKoPhonemes(char)}</S.CharBox>)}</S.CharBoxWrapper>

          <S.Hint onClick={() => setShowHint((prev) => !prev)}>힌트{showHint ? '닫기' : '보기' } (시놉시스)</S.Hint>
          {showHint && <S.Synopsis>{movieData.overview.length > 0 ? movieData.overview : '없음 😝'}</S.Synopsis>}
        </>
      )}
      </div>

      <S.InputWrapper>

        <S.Input
          type="text"
          placeholder="답을 입력하세요"
          value={userInputValue}
          onChange={
          useCallback(
            (e) => setuserInputValue(e.target.value),
            [userInputValue],
          )
          }
        />

        <S.Button onClick={onSubmitAnswer}>제출하기</S.Button>
      </S.InputWrapper>

    </S.Wrapper>
  );
}

export default InitialQuiz;
