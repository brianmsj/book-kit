// import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

function checkTokenExpiry() {
  const jwt = localStorage.getItem('idToken');
  if (jwt) {
    const jwtExp = jwtDecode(jwt).exp;
    const expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    if (new Date() < expiryDate) {
      return true;
    }
  }

  return false;
}

function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}

function getToken() {
  return localStorage.getItem('idToken');
}

// const logger = createLogger();

const initialState = {
  auth: {
    isAuthenticated: checkTokenExpiry(),
    profile: getProfile(),
    error: '',
    token: getToken(),
  },
  bookmarks: [],
  folders: [],
  tags: [],
  search: '',
};

const store = createStore(
  reducers.rootReducer,
  initialState,
  applyMiddleware(thunk)
);

module.exports = store;
