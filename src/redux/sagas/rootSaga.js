import { all } from 'redux-saga/effects';
import * as UserLoginSaga from './UserLoginJiraSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga';
import * as ProjectSaga from './ProjectSaga'



export function* rootSaga() {

   yield all([
      UserLoginSaga.theoDoiSignin(),
      ProjectCategorySaga.theoDoigetApiProjectCategory(),
      ProjectSaga.theoDoiCreateProjectSaga(),
   ])

}