import React, { useState, useEffect } from 'react';
import { movieApi } from '../../../api/movieApi';
import './actorQuiz.css';
import Modal from '../../common/Modal';

function ActorQuiz() {
  const [movies, setMovies] = useState(null); // 보기에 나오는 영화들(임의의 영화 + 배우 출연 영화 1개)
  const [actorMovie, setActorMovie] = useState(null); // 배우 출연 영화
  const [actor, setActor] = useState(null); // 배우 이름
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 이름
  const [score, setScore] = useState(0); // 맞힌 개수
  const moviesNameList = []; // 보기에 들어갈 임의의 영화를 받는 리스트
  const moviesCdList = []; // 박스오피스 순위권 영화 코드를 받는 리스트
  // modal state: true일 때 modal 출력
  const [showModal, setShowModal] = useState(false);
  const [showModalFail, setShowModalFail] = useState(false);
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
  // 임의의 날짜 박스오피스 순위권 영화를 받아오고 1위 영화 출연 배우도 받아옵니다.
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
      setSelectedMovie([]);
      setScore(score + 1);
      setShowModal(true);
    } else {
      setShowModalFail(true);
    }
  };
  return (
    <div>
      <Modal showModal={showModal} setshowModal={setShowModal} confirmFunction={() => setShowModal(false)} title="정답!" contents={`현재까지 맞힌 개수: ${score}`} />
      <Modal showModal={showModalFail} setshowModal={setShowModalFail} confirmFunction={() => setShowModalFail(false)} title="틀렸습니다!" contents={`현재까지 맞힌 개수: ${score}`} />

      <div>
        <div className="quiz4">5. 배우가 출연한 영화 고르기</div>
        <div className="question4">다음 배우가 출연한 영화를 고르세요</div>
        <div className="actor_box">
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
          <button className="submit_button" onClick={() => onClickCertifyAnswer(selectedMovie)}>정답 확인</button>
        </div>
      </div>
    </div>
  );
}

export default ActorQuiz;
