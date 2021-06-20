import React, { useState, useEffect } from 'react';
import { movieApi } from '../../../api/movieApi';
import './actorQuiz.css';
import logo from './logo.png';

function ActorQuiz() {
  const [movies, setMovies] = useState(null);
  const [actorMovie, setActorMovie] = useState(null);
  const [actor, setActor] = useState(null);
  const [answerNum, setAnswerNum] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [score, setScore] = useState(0);
  const defaultdirectors = ['존 파브로', '봉준호', '스티븐 스필버그', '제임스 카메론', '홍상수', '크리스토퍼 놀란', '김기덕', '미야자키 하야오'];
  const moviesNameList = [];
  const moviesCdList = [];
  const getFormatDate = (date) => {
    const year = date.getFullYear();
    let month = (1 + date.getMonth());
    month = month >= 10 ? month : `0${month}`;
    let day = date.getDate();
    day = day >= 10 ? day : `0${day}`;
    return `${year}${month}${day}`;
  };
  const randomDate = (start, end) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return getFormatDate(date);
  };
  const shuffleArray = (array) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < array.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  useEffect(() => {
    const getData = async () => {
      const randDate = randomDate(new Date(2010, 0, 1), new Date());
      const movieCdList = [];
      // eslint-disable-next-line no-return-await
      return await movieApi.boxOfficeData(randDate);
    };
    getData()
      .then((res) => {
        // eslint-disable-next-line array-callback-return
        res.data.boxOfficeResult.dailyBoxOfficeList.slice(0, 6).map((movie) => {
          moviesCdList.push(movie.movieCd);
          moviesNameList.push(movie.movieNm);
        });
        setMovies(shuffleArray(moviesNameList));
        console.log(res.data.boxOfficeResult.dailyBoxOfficeList[0].movieNm);
        setActorMovie(res.data.boxOfficeResult.dailyBoxOfficeList[0].movieNm);
        return res.data.boxOfficeResult.dailyBoxOfficeList[0].movieCd;
      })
      .then((numOneMovieCd) => {
        console.log(numOneMovieCd);
        const getMovieDetail = async (numOneMovieCd) => {
          const { data } = await movieApi.movieDetailByCd(numOneMovieCd);
          console.log('data!!');
          console.log(data);
          // if (data.movieListResult.movieList[0].directors[0] !== undefined) {
          //   return data.movieListResult.movieList[0].directors[0].peopleNm;
          // }
          return data.movieInfoResult.movieInfo.actors[0].peopleNm;
        };
        getMovieDetail(numOneMovieCd)
          .then((actorName) => {
            setActor(actorName);
            console.log(`actor Name:${actorName}`);
          });
      });
  }, [score]);
  const onChangeAnswerBox = (movie) => {
    if (selectedMovie === movie) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
    console.log(`selected!${selectedMovie}`);
  };
  const onClickCertifyAnswer = (selectMovie) => {
    console.log(`actorMovietype${typeof (actorMovie)}`);
    console.log(`selectMovietype${typeof (selectMovie)}`);
    console.log(`actorMovie${actorMovie}`);
    console.log(`selectMovie${selectMovie}`);
    if (selectMovie === actorMovie) {
      alert('정답입니다!');
      setSelectedMovie([]);
      setScore(score + 1);
    } else {
      alert('틀렸습니다!');
    }
  };
  return (
    <div>
      <header>
        <div className="nav_bar">
          <span>
            <img src={logo} alt="logo" className="logo" />
          </span>
          <span className="movieQuiz">영화퀴즈</span>
        </div>
        <div className="division_bar_1">
          <div className="division_bar_2"> divbar </div>
        </div>
      </header>
      <div>
        <div className="quiz4">5. 배우가 출연한 영화 고르기</div>
        <div className="question4">다음 배우가 출연한 영화를 고르세요</div>
        <div className="director_box">
          {actor}
        </div>
        { movies && actorMovie && (
          <div className="hint">
            <span>
              맞은 개수:
              {score}
            </span>
            <ul className="answer_sheet">
              { movies.map((movie) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
                <li
                  className={
                    selectedMovie === movie
                      ? 'selectedAnswerBox'
                      : 'defaultAnswerBox'
                  }
                  onClick={() => onChangeAnswerBox(movie)}
                >
                  {movie}
                </li>
              )
              )}
            </ul>
          </div>
        )}
        <div>
          <button className="next_button" onClick={() => onClickCertifyAnswer(selectedMovie)}>정답 확인</button>
        </div>
      </div>
    </div>
  );
}

export default ActorQuiz;
