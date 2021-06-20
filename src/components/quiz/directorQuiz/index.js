import React, { useState, useEffect } from 'react';
import { movieApi } from '../../../api/movieApi';
import './directorQuiz.css';

function DirectorQuiz() {
  const [movies, setMovies] = useState(null);
  const [dirMovies, setDirMovies] = useState(null);
  const [director, setDirector] = useState(null);
  const [answerNum, setAnswerNum] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [answer, setAnswer] = useState(true);
  const defaultdirectors = ['존 파브로', '봉준호', '스티븐 스필버그', '제임스 카메론', '홍상수', '크리스토퍼 놀란', '김기덕', '미야자키 하야오'];
  let movieLists = [];
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
      // eslint-disable-next-line no-return-await
      return await movieApi.boxOfficeData(randDate);
    };
    getData()
      .then((res) => {
        console.log(res.data.boxOfficeResult.dailyBoxOfficeList[0].movieNm);
        // setMovies(res.data.boxOfficeResult.dailyBoxOfficeList.slice(1, 4));
        const movieNameList = [];
        // eslint-disable-next-line array-callback-return
        res.data.boxOfficeResult.dailyBoxOfficeList.slice(1, 4).map((movie) => {
          movieNameList.push(movie.movieNm);
        });
        console.log('movielist');
        console.log(movieNameList);
        movieLists = movieNameList;
        console.log(movieLists);
      });
  }, []);
  useEffect(() => {
    const getData1 = async () => {
      const randDate = randomDate(new Date(2010, 0, 1), new Date());
      // eslint-disable-next-line no-return-await
      return await movieApi.boxOfficeData(randDate);
    };
    getData1()
      .then((res) => {
        console.log(res.data.boxOfficeResult.dailyBoxOfficeList[0].movieNm);
        return res.data.boxOfficeResult.dailyBoxOfficeList[0].movieNm;
      })
      .then((tmpMovie) => {
        console.log(tmpMovie);
        const getDirector = async (tmpMovie) => {
          const { data } = await movieApi.movieListByName(tmpMovie);
          console.log('data!!');
          console.log(data);
          if (data.movieListResult.movieList[0].directors[0] !== undefined) {
            return data.movieListResult.movieList[0].directors[0].peopleNm;
          }
          return defaultdirectors[Math.floor(Math.random() * defaultdirectors.length)];
        };
        getDirector(tmpMovie)
          .then((dir) => {
            setDirector(dir);
            const getDirMovies = async (dir) => {
              const { data } = await movieApi.movieListByDirector(dir);
              console.log('movielistbydirector');
              console.log(data);
              return data.movieListResult.movieList;
            };
            getDirMovies(dir)
              .then((dirMovieList) => {
                const dirMovieNameList = [];
                // eslint-disable-next-line array-callback-return
                dirMovieList.map((dirMovie) => {
                  dirMovieNameList.push(dirMovie.movieNm);
                });
                if (dirMovieNameList.length >= 4) {
                  dirMovieNameList.splice(3, dirMovieNameList.length - 3);
                }
                console.log(dirMovieNameList);
                setDirMovies(dirMovieNameList);
                setAnswerNum(dirMovieNameList.length);
                const ansMovies = [
                  ...dirMovieNameList,
                  ...movieLists
                ];
                setMovies(shuffleArray(ansMovies));
              });
          });
      });
  }, []);
  const onChangeAnswerBox = (movie) => {
    if (selectedMovie.includes(movie)) {
      setSelectedMovie(selectedMovie.filter((selmovie) => selmovie !== movie));
    } else {
      setSelectedMovie([...selectedMovie, movie]);
    }
    console.log('selected!');
    console.log(selectedMovie);
  };
  const onClickCertifyAnswer = (selectMovies) => {
    console.log(`dirMovies${dirMovies}`);
    console.log(`selectMovies${selectMovies}`);
    if (JSON.stringify(selectMovies.sort()) === JSON.stringify(dirMovies.sort())) {
      alert('정답입니다!');
    } else {
      alert('틀렸습니다!');
    }
  };
  return (
    <div>
      <header>
        <div className="nav_bar">
          <span className="logo">
            <img src="./logo.png" alt="logo" />
          </span>
          <span className="movieQuiz">영화퀴즈</span>
        </div>
        <div className="division_bar_1">
          <div className="division_bar_2"> divbar </div>
        </div>
      </header>
      <body>
        <div className="quiz4">4. 감독으로 영화 맞추기</div>
        <div className="question4">다음 영화감독이 만든 작품을 모두 골라보세요</div>
        <div className="director_box">
          {director}
        </div>
        { dirMovies && movies && answerNum && (
          <div>
            <div>
              대표작:
              {dirMovies[0]}
            </div>
            <ul className="answer_sheet">
              { movies.map((movie) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
                <li
                  className={
                  selectedMovie.find((selMovie) => selMovie === movie)
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
      </body>
    </div>
  );
}

export default DirectorQuiz;
