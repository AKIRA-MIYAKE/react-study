import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from '../containers/app-container';
import MemoMasterContainer from '../containers/memo-master-container';
import MemoDetailContainer from '../containers/memo-detail-container';


export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={MemoMasterContainer}></IndexRoute>
    <Route path="/memos" component={MemoMasterContainer}>
      <Route path="/memos/:id" component={MemoDetailContainer} />
    </Route>
  </Route>
);
