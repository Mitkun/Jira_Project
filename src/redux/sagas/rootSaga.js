import { all } from 'redux-saga/effects';
import * as UserSaga from './UserJiraSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga';
import * as ProjectSaga from './ProjectSaga';
import * as TaskTypeSaga from './TaskTypeSaga';
import * as PrioritySaga from './PrioritySaga';
import * as TaskSaga from './TaskSaga';
import * as StatusSaga from './StatusSaga';
import * as CommentSaga from './CommentSaga'




export function* rootSaga() {

   yield all([
      UserSaga.theoDoiSignin(),
      UserSaga.theoDoiSignup(),
      UserSaga.theoDoiGetUser(),
      UserSaga.theoDoiAddUserProjectSaga(),
      UserSaga.theoDoiRemoveUserProjectSaga(),
      UserSaga.theoDoiGetUserByProjectIdSaga(),
      UserSaga.theoDoiDeleteUserSaga(),
      UserSaga.theoDoiEditUserSaga(),

      ProjectCategorySaga.theoDoigetApiProjectCategory(),

      ProjectSaga.theoDoiCreateProjectSaga(),
      ProjectSaga.theoDoiGetListProjectSaga(),
      ProjectSaga.theoDoiUpdateProjectSaga(),
      ProjectSaga.theoDoiDeleteProjectSaga(),
      ProjectSaga.theoDoiGetProjectDetailSaga(),
      ProjectSaga.theoDoiGetAllProjectSaga(),

      TaskTypeSaga.theoDoigetAllTaskTypeSaga(),

      PrioritySaga.theoDoigetAllPrioritySaga(),

      TaskSaga.theoDoiCreateTaskSaga(),
      TaskSaga.theoDoiGetTaskDetailSaga(),
      TaskSaga.theoDoiUpdateTaskStatusSaga(),
      // TaskSaga.theoDoiUpdateTaskSaga(),
      TaskSaga.theoDoiHandelChangePostApi(),

      StatusSaga.theoDoigetAllStatusSaga(),

      CommentSaga.theoDoiGetAllCommentSaga(),
      CommentSaga.theoDoiInsertCommentSaga(),
      CommentSaga.theoDoiEditCommentSaga(),
      CommentSaga.theoDoiDeleteCommentSaga(),
   ])

}