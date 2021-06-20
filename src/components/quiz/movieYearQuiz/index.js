import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { movieApi } from '../../../api/movieApi';
import logo from './logo.png';
import arrow from './arrow.png';
import './movieYearQuiz.css';

function MovieYearQuiz() {
  const [firstMovie, setFirstMovie] = useState(null);
  const [secondMovie, setSecondMovie] = useState(null);
  const [thirdMovie, setThirdMovie] = useState(null);
  const [fourthMovie, setFourthMovie] = useState(null);
  const [fifthMovie, setFifthMovie] = useState(null);

  const randomNum = Math.floor(Math.random() * 24);
  const randomNumbers = [];

  for (let i = 0; i < 4; i += 1) {
    if (randomNumbers.indexOf(randomNum) === -1) {
      randomNumbers.push(randomNum);
    } else {
      i -= 1;
    }
  }

  const firstMovieIndex = randomNum[0];
  const secondMovieIndex = randomNum[1];
  const thirdMovieIndex = randomNum[2];
  const fourthMovieIndex = randomNum[3];
  const fifthMovieIndex = randomNum[4];

  console.log(randomNumbers);
  const makeRandomNumber = (n) => (Math.floor(Math.random(0) * (n - 1) + 1));

  useEffect(() => {
    const getData = async () => {
      const { data } = await movieApi.popular(makeRandomNumber(10));
      console.log(data);

      setFirstMovie(`https://image.tmdb.org/t/p/original${data.results[firstMovieIndex].poster_path}`);
      setSecondMovie(`https://image.tmdb.org/t/p/original${data.results[secondMovieIndex].poster_path}`);
      setThirdMovie(`https://image.tmdb.org/t/p/original${data.results[thirdMovieIndex].poster_path}`);
      setFourthMovie(`https://image.tmdb.org/t/p/original${data.results[fourthMovieIndex].poster_path}`);
      setFifthMovie(`https://image.tmdb.org/t/p/original${data.results[fifthMovieIndex].poster_path}`);
    };
    getData();
  }, [score]);

  return (
    <div>
      <header>
        <div className="nav_bar">
          <div>
            <img src={logo} alt="logo" id="logo" />
          </div>
          <div className="movieQuiz">영화퀴즈</div>
          <div className="ranking">랭킹</div>
        </div>
        <div className="division_bar_1">
          <div className="division_bar_2"> divbar </div>
        </div>
      </header>
      <body>
        <div className="quiz6">6. 영화 개봉 순서 맞추기</div>
        <div className="question6">다음 영화들을 개봉한 순서대로 나열해보세요.</div>
        <div className="image_box">
          <div className="posters">
            <div className="poster">
              <img src={firstMovie} alt="" className="posterImage" />
              1
            </div>
            <div className="poster">
              <img src={secondMovie} alt="" className="posterImage" />
              2
            </div>
            <div className="poster">
              <img src={thirdMovie} alt="" className="posterImage" />
              3
            </div>
            <div className="poster">
              <img src={fourthMovie} alt="" className="posterImage" />
              4
            </div>
            <div className="poster">
              <img src={fifthMovie} alt="" className="posterImage" />
              5
            </div>

          </div>
        </div>
        <div className="answers">
          <form className="answer_box">
            <TextField id="outlined-basic" label="" variant="outlined" />
          </form>
          <span>
            <img className="arrow" src={arrow} alt="arrow" />
          </span>
          <form className="answer_box">
            <TextField id="outlined-basic" label="" variant="outlined" />
          </form>
          <span>
            <img className="arrow" src={arrow} alt="arrow" />
          </span>
          <form className="answer_box">
            <TextField id="outlined-basic" label="" variant="outlined" />
          </form>
          <span>
            <img className="arrow" src={arrow} alt="arrow" />
          </span>
          <form className="answer_box">
            <TextField id="outlined-basic" label="" variant="outlined" />
          </form>
          <span>
            <img className="arrow" src={arrow} alt="arrow" />
          </span>
          <form className="answer_box">
            <TextField id="outlined-basic" label="" variant="outlined" />
          </form>
        </div>

        <div>
          <button className="next_button">다음 퀴즈</button>
        </div>
      </body>
    </div>
  );
}

export default MovieYearQuiz;
