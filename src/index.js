import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import App from './components/App';
import Auth from './containers/Auth';
import Admin from './containers/Admin';
import Dashboard from './containers/Dashboard';
import PatientGraph from './containers/PatientGraph';
import TableContainer from './containers/TableContainer';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Auth} />
        <Route path="dashboard">
          <IndexRedirect to="/dashboard/:docId" />
          <Route path=":docId" component={Dashboard} />
          <Route path=":docId/:patientId" component={PatientGraph} />
        </Route>
        <Route path="admin" component={Admin}>
          <Route path=":tableName" component={TableContainer} />
        </Route>
        {
        	//<Route path="404" component={RequireAuth(Feature)} />
      	}
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.app')
);
