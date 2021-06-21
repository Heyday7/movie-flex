import React, { useState, useEffect } from 'react';
import { movieApi } from '../../../api/movieApi';
import './directorQuiz.css';
import logo from './logo.png';
import Modal from '../../common/Modal';

function DirectorQuiz() {
  const [movies, setMovies] = useState(null); // 보기에 나오는 영화들 (임의의 영화 + 감독이 만든 영화 셔플)
  const [dirMovies, setDirMovies] = useState(null); // 감독이 만든 영화들 (3개 이하로 세팅)
  const [director, setDirector] = useState(null); // 감독
  const [answerNum, setAnswerNum] = useState(null); // 정답 개수
  const [selectedMovie, setSelectedMovie] = useState([]); // 선택된 영화 리스트
  const [score, setScore] = useState(0); // 맞힌 개수
  // modal state: true일 때 modal 출력
  const [showModal, setShowModal] = useState(false);
  const [showModalFail, setShowModalFail] = useState(false);
  // default 감독들(감독 데이터 없는 영화시 default 값으로 전환
  const defaultdirectors = ['존 파브로', '봉준호', '스티븐 스필버그', '제임스 카메론', '홍상수', '크리스토퍼 놀란', '김기덕', '미야자키 하야오'];
  let movieLists = [];
  // date를 yyyymmdd로 전환
  const getFormatDate = (date) => {
    const year = date.getFullYear();
    let month = (1 + date.getMonth());
    month = month >= 10 ? month : `0${month}`;
    let day = date.getDate();
    day = day >= 10 ? day : `0${day}`;
    return `${year}${month}${day}`;
  };
  // start ~ end 사이 random한 date 반환
  const randomDate = (start, end) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return getFormatDate(date);
  };
  // 배열 셔플
  const shuffleArray = (array) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < array.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  // 임의의 날짜 박스오피스 순위 1~3위 영화를 movieLists에 넣습니다.
  useEffect(() => {
    const getData = async () => {
      const randDate = randomDate(new Date(2010, 0, 1), new Date());
      // eslint-disable-next-line no-return-await
      return await movieApi.boxOfficeData(randDate);
    };
    getData()
      .then((res) => {
        console.log(res.data.boxOfficeResult.dailyBoxOfficeList[0].movieNm);
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
  }, [score]);
  // 임의의 날짜 1위 영화의 감독을 받아온 뒤 그 감독의 영화들 중 3개 이하를 받아옵니다.
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
  }, [score]);
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
      setSelectedMovie([]);
      setScore(score + 1);
      setShowModal(true);
    } else {
      setShowModalFail(true);
    }
  };
  return (
    <div>
      <Modal
        showModal={showModal}
        setshowModal={setShowModal}
        confirmFunction={() => setShowModal(false)}
        title="정답!"
        contents={`현재까지 맞힌 개수: ${score}개 
        확인 버튼을 누르시면 다음 문제로 넘어갑니다.`}
      />
      <Modal showModal={showModalFail} setshowModal={setShowModalFail} confirmFunction={() => setShowModalFail(false)} title="틀렸습니다!" contents={`현재까지 맞힌 개수: ${score}개`} />

      <div>
        <div className="quiz4">4. 감독으로 영화 맞추기</div>
        <div className="question4">{`다음 영화감독이 만든 작품을 모두 골라보세요 (답: ${answerNum}개)`}</div>
        <div className="director_box">
          {director}
        </div>
        { dirMovies && movies && answerNum && (
          <div className="hint">
            <span className="represent">
              대표작:
              {dirMovies[0]}
            </span>
            <span>
              맞은 개수:
              {score}
            </span>
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
          <button className="submit_button" onClick={() => onClickCertifyAnswer(selectedMovie)}>정답 확인</button>
        </div>
      </div>
    </div>
  );
}

export default DirectorQuiz;