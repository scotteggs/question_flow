import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import MainContainer from 'containers/MainContainer';
import About from 'containers/About';
import LoginOrRegister from 'containers/LoginOrRegister';
import SelectQuestionnaire from 'containers/SelectQuestionnaire';
import Create from 'containers/create';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={MainContainer} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="select" component={SelectQuestionnaire} onEnter={requireAuth} />
      <Route path="about" component={About} />
      <Route path="create" component={Create} />
    </Route>
  );
};
