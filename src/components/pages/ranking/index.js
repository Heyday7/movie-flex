import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@material-ui/core';
import { getScore } from '../../../firebase';
import './ranking.css';

function Ranking() {
  const [rankingData, setRankingData] = useState(null);

  useEffect(async () => {
    const data = await getScore();
    setRankingData(data);
  }, []);

  return (
    <div>
      <TableContainer className="RankTable" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>순위</TableCell>
              <TableCell>점수</TableCell>
              <TableCell>유저</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rankingData && rankingData.map((row, idx) => {
              if (idx <= 9) {
                return (
                  <TableRow key={idx} className={`rank_${idx + 1}`}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{row.score}</TableCell>
                    <TableCell>{row.user}</TableCell>
                  </TableRow>
                );
              }
              return null;
            })}
          </TableBody>
        </Table>
        <div className="remark">점수가 같을 경우 최근에 기록을 세운 사람이 순위가 높습니다!</div>
        <Link to="/rank-game"><div className="retry">랭킹전 재도전하기</div></Link>
      </TableContainer>
    </div>
  );
}

export default Ranking;
