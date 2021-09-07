import { call, delay, put, takeLatest } from "redux-saga/effects";
import { jiraService } from "../../services/JiraService";
import { STATUS_CODE, TOKEN } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import { history } from '../../util/history';
import { notificationFunction } from '../../util/Notification/notificationJira'
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA } from "../constants/ProjectJiraConst";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../constants/UserConst";
import { CLOSE_DRAWER } from "../constants/DrawerConst";
import { CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_PROJECT_DETAIL_SAGA, PUT_PROJECT_DETAIL, UPDATE_PROJECT_SAGA } from "../constants/ProjectConst";


/**
 * Saga create project api
 * Thiện 2021/8/17
 */

function* createProjectSaga(action) {

   //Hiển thị loading
   yield put({
      type: DISPLAY_LOADING
   });
   yield delay(500)


   try {

      const { data, status } = yield call(() => jiraService.createProjectAuthorization(action.newProject));

      if (status === STATUS_CODE.SUCCESS) {
         console.log(data);

         history.push('/projectmanagement')
      }

   } catch (err) {
      console.log('errors', err);
   }


   yield put({
      type: HIDE_LOADING
   })

}


export function* theoDoiCreateProjectSaga() {
   yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}

/**************************************************************** */

/**
 * Saga get all project api
 * Thiện 2021/8/19
 */

function* getListProjectSaga(action) {

   try {

      const { data, status } = yield call(() => jiraService.getlistProject());
      //Sau khi lấy dữ liệu về thành công
      if (status === STATUS_CODE.SUCCESS) {
         yield put({
            type: GET_LIST_PROJECT,
            projectList: data.content
         })
      }

   } catch (err) {
      console.log(err);
   }



}


export function* theoDoiGetListProjectSaga() {
   yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga)
}

/**************************************************************** */

/**
 * Saga update and get project api
 * Thiện 2021/820
 */

function* updateProjectSaga(action) {

   yield put({
      type: DISPLAY_LOADING
   });
   yield delay(500)

   try {

      const { data, status } = yield call(() => jiraService.updateProject(action.updateProject));

      if (status === STATUS_CODE.SUCCESS) {
         console.log(data);
      }

   } catch (err) {
      console.log(err);
   }

   yield put({
      type: GET_LIST_PROJECT_SAGA
   })
   yield put({
      type: CLOSE_DRAWER
   })

   yield put({
      type: HIDE_LOADING
   });
}



export function* theoDoiUpdateProjectSaga() {
   yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga)
}


/**************************************************************** */

/**
 * Saga delete project api
 * Thiện 2021/8/21
 */

function* deleteProjectSaga(action) {
   yield put({
      type: DISPLAY_LOADING
   });

   yield delay(500);

   try {

      const { data, status } = yield call(() => jiraService.deleteProject(action.idProject))
      if (status === STATUS_CODE.SUCCESS) {
         console.log(data);
         notificationFunction('success', 'Delete project successfully!')
      } else {
         notificationFunction('error', 'Delete project fail!')
      }


      yield put({
         type: GET_LIST_PROJECT_SAGA
      })

   } catch (err) {
      console.log(err);
      notificationFunction('error', 'Delete project fail!')

   }

   yield put({
      type: HIDE_LOADING
   });

}

export function* theoDoiDeleteProjectSaga() {
   yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga)
}

/**************************************************************** */

/**
 * Saga get project detai api
 * Thiện 2021/8/21
 */

function* getProjectDetailSaga(action) {
   try {

      const { data, status } = yield call(() => jiraService.getProjectDetail(action.projectId))

      yield put({
         type: PUT_PROJECT_DETAIL,
         projectDetail: data?.content
      })


   } catch (err) {
      console.log('404 not found', err);
      history.push('/projectmanagement')
   }
}

export function* theoDoiGetProjectDetailSaga() {
   yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga)
}



/**************************************************************** */

/**
 * Saga get all project api
 * Thiện 2021/8/24
 */

function* getAllProjectSaga(action) {

   try {

      const { data, status } = yield call(() => jiraService.getAllProject());

      //Sau khi lấy dữ liệu về thành công
      if (status === STATUS_CODE.SUCCESS) {
         yield put({
            type: GET_ALL_PROJECT,
            arrProject: data.content
         })

         yield put({
            type: GET_USER_BY_PROJECT_ID_SAGA,
            idProject: data.content[0]?.id
         })
      }

   } catch (err) {
      console.log(err);
   }



}


export function* theoDoiGetAllProjectSaga() {
   yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga)
}