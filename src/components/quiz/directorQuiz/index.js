import React, { useState, useEffect } from 'react';
import { movieApi } from '../../../api/movieApi';
import './directorQuiz.css';

function DirectorQuiz() {
  const [movies, setMovies] = useState(null);
  const [dirMovies, setDirMovies] = useState(null);
  const [director, setDirector] = useState(null);
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
  useEffect(() => {
    const getData = async () => {
      const randDate = randomDate(new Date(2010, 0, 1), new Date());
      // eslint-disable-next-line no-return-await
      return await movieApi.boxOfficeData(randDate);
    };
    getData()
      .then((res) => {
        console.log(res.data.boxOfficeResult.dailyBoxOfficeList[0].movieNm);
        setMovies(res.data.boxOfficeResult.dailyBoxOfficeList.slice(1, 5));
        return res.data.boxOfficeResult.dailyBoxOfficeList[0].movieNm;
      })
      .then((tmpMovie) => {
        console.log(tmpMovie);
        const getDirector = async (tmpMovie) => {
          const { data } = await movieApi.movieListByName(tmpMovie);
          console.log('data!!');
          console.log(data);
          return data.movieListResult.movieList[0].directors[0].peopleNm;
        };
        getDirector(tmpMovie)
          .then((dir) => {
            setDirector(dir);
            const getDirMovies = async (dir) => {
              const { data } = await movieApi.movieListByDirector(dir);
              console.log('data!');
              console.log(data);
              return data.movieListResult.movieList;
            };
            getDirMovies(dir)
              .then((dirMovieList) => {
                setDirMovies(dirMovieList);
                console.log(dirMovieList);
              });
            return dir;
          });
      });
  }, []);
  console.log(randomDate(new Date(2010, 0, 1), new Date()));
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
        { dirMovies && (
          <div>
            <div>
              대표작:
              {dirMovies[0].movieNm}
            </div>
            <div className="answer_sheet">
              {dirMovies.map((dirmovie) =>
                <button className="answer_box">{dirmovie.movieNm}</button>
              )}
            </div>
          </div>
        )}
        <div>
          <button className="next_button">다음 퀴즈</button>
        </div>
      </body>
    </div>
  );
}

export default DirectorQuiz;
