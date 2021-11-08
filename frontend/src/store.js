import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  loadingBarMiddleware,
  loadingBarReducer,
} from 'react-redux-loading-bar';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { postListReducer } from './reducers/postsReducers';

const reducer = combineReducers({
  // this will contain our reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  postList: postListReducer,
  loadingBar: loadingBarReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(
    applyMiddleware(
      ...middleware,
      loadingBarMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAIL'],
      })
    )
  )
);

export default store;
