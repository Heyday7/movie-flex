import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFoundError from './components/pages/404';
import Home from './components/pages/home';
import Ranking from './components/pages/ranking';

const ActorQuiz = React.lazy(() => import('./components/quiz/actorQuiz'));
const DirectorQuiz = React.lazy(() => import('./components/quiz/directorQuiz'));
const InitialQuiz = React.lazy(() => import('./components/quiz/InitialQuiz'));
const MovieNameRelayQuiz = React.lazy(() => import('./components/quiz/movieNameRelayQuiz'));
const MovieScoreQuiz = React.lazy(() => import('./components/quiz/movieScoreQuiz'));
const MovieYearQuiz = React.lazy(() => import('./components/quiz/movieYearQuiz'));
const RankGame = React.lazy(() => import('./components/quiz/rankGame'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/ranking" component={Ranking} />
          <Route exact path="/actor-quiz" component={ActorQuiz} />
          <Route exact path="/director-quiz" component={DirectorQuiz} />
          <Route exact path="/initial-quiz" component={InitialQuiz} />
          <Route exact path="/movie-name-relay-quiz" component={MovieNameRelayQuiz} />
          <Route exact path="/movie-score-quiz" component={MovieScoreQuiz} />
          <Route exact path="/movie-year-quiz" component={MovieYearQuiz} />
          <Route exact path="/rank-game" component={RankGame} />
          <Route component={() => <NotFoundError />} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
