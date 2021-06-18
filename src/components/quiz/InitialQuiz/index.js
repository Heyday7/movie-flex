import React, { useEffect } from 'react';
import { movieApi } from '../../../api/movieApi';

function InitialQuiz() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await movieApi.popular();
      console.log(data);
    };
    getData();
  }, []);
  return <div>initial</div>;
}

export default InitialQuiz;
