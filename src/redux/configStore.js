import { applyMiddleware, combineReducers, createStore } from 'redux';
import LoadingReducer from './reducers/LoadingReducer';
import { HistoryReducer } from './reducers/HistoryReducer';

// middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import { UserJiraReducer } from './reducers/UserJiraReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { ProjectJiraReducer } from './reducers/ProjectJiraReducer';
import { DrawerReducer } from './reducers/DrawerJiraReducer';
import { ProjectReducer } from './reducers/ProjectReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';
import { TaskDetailModallReducer } from './reducers/TaskReducer';
import { CommentReducer } from './reducers/CommentReducer';
import { UserEditReducer } from './reducers/UserEditReducer';


const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
   LoadingReducer,
   HistoryReducer,
   UserJiraReducer,
   ProjectCategoryReducer,
   ProjectJiraReducer,
   DrawerReducer,
   ProjectReducer,
   TaskTypeReducer,
   PriorityReducer,
   StatusReducer,
   TaskDetailModallReducer,
   CommentReducer,
   UserEditReducer,
});

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));

// Gọi saga
middleWareSaga.run(rootSaga);

export default store