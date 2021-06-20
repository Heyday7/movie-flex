import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { movieApi } from '../../../api/movieApi';
import extractKoPhonemes from '../../../utils/extractKoPhonemes';

const S = {
  QuizTitle: styled.div``,
  QuizDesc: styled.div``
};

const getRandomNumber = (n) => Math.floor(Math.random() * n) - 1;
const getMostPopularMovie = (arr) => arr.reduce((acc, cur) => (acc?.popularity <= cur?.popularity ? cur : acc));

function InitialQuiz() {
  const [movieName, setMovieName] = useState('');

  useEffect(() => {
    async function getMovieData() {
      try {
        const { data: { results } } = await movieApi.popular(getRandomNumber(100));
        const mostPopularMovie = getMostPopularMovie(results);

        console.log(results);
        console.log('mostPopularMovie', mostPopularMovie);

        mostPopularMovie.title.map((el) => console.log(extractKoPhonemes(el)));
        console.log(extractKoPhonemes(mostPopularMovie.title[0]));

        setMovieName(mostPopularMovie);
      } catch (error) {
        console.log(error);
      }
    }

    getMovieData();
  }, []);

  return (
    <div>
      <S.QuizTitle>초성 퀴즈</S.QuizTitle>
      <S.QuizDesc>다음 초성을 보고 영화 제목을 맞춰보세요</S.QuizDesc>

      <div>{movieName && (
      <div>
        <div>{movieName.title}</div>
        <div>{movieName.overview}</div>
      </div>
      )}
      </div>
    </div>
  );
}

export default InitialQuiz;
