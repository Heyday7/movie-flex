import React, { useEffect } from 'react';
import { movieApi } from '../../../api/movieApi';
import './directorQuiz.css';

function DirectorQuiz() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await movieApi.boxOfficeData(20210612);
      console.log(data);
    };
    getData();
  }, []);
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
        <div className="director_box">감독이름</div>
        <div className="answer_box">영화이름</div>
        <div>
          <button className="next_button">다음 퀴즈</button>
        </div>
      </body>
    </div>
  );
}

export default DirectorQuiz;
