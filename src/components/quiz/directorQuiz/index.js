import React, { useEffect } from 'react';
import { movieApi } from '../../../api/movieApi';
import './directorQuiz.css';

function DirectorQuiz() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await movieApi.popular();
      console.log(data);
    };
    getData();
  }, []);
  return (
    <div>
      <header>
        <div className="navbar">
          <div className="logo">
            <img className="logo" src="./logo.png" alt="logo" />
          </div>
        </div>
      </header>
      Director
    </div>
  );
}

export default DirectorQuiz;
