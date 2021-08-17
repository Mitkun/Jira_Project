import { applyMiddleware, combineReducers, createStore } from 'redux';
import LoadingReducer from './reducers/LoadingReducer';
import { HistoryReducer } from './reducers/HistoryReducer';

// middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import { UserLoginJiraReducer } from './reducers/UserJiraReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';


const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
   LoadingReducer,
   HistoryReducer,
   UserLoginJiraReducer,
   ProjectCategoryReducer
});

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));

// Gọi saga
middleWareSaga.run(rootSaga);

export default store