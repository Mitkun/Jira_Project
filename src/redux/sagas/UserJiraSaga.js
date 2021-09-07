import { UsbTwoTone } from '@ant-design/icons';
import Axios from 'axios';
import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { jiraService } from '../../services/JiraService';
import { userService } from '../../services/UserService';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../util/constants/settingSystem';
import { history } from '../../util/history';
import { notificationFunction } from '../../util/Notification/notificationJira';
import { USER_SIGNIN_API, USER_SIGNUP_API, US_LOGIN } from '../constants/JiraConst';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import { GET_LIST_PROJECT_SAGA, REMOVE_USER_PROJECT_API } from '../constants/ProjectJiraConst';
import { ADD_USER_PROJECT_API, DELETE_USER_SAGA, EDIT_USER_SAGA, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA, GET_USER_SEARCH, SIGNUP_ERR } from '../constants/UserConst';




// Quản lý các action saga
function* signinSaga(action) {
   //put giống dispatch action
   yield put({
      type: DISPLAY_LOADING,
   });

   yield delay(500);

   // Gọi api
   try {
      const { data, status } = yield call(() => jiraService.signinJira(action.userLogin));
      // Lưu vào localstorage khi đăng nhập thành công
      localStorage.setItem(TOKEN, data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));


      yield put({
         type: US_LOGIN,
         userLogin: data.content
      });

      // sau khi login về lại trang home
      // let history = yield select(state => state.HistoryReducer.history);
      history.push('/projectmanagement');

   } catch (err) {
      console.log('err', err);
   };


   yield put({
      type: HIDE_LOADING,
   });

};

export function* theoDoiSignin() {
   yield takeLatest(USER_SIGNIN_API, signinSaga)
};

/******************************************************************/
/**
 * Saga Create account
 * Thiện 2021/8/21
 */


function* signupSaga(action) {
   //put giống dispatch action
   yield put({
      type: DISPLAY_LOADING,
   });

   yield delay(500);
   // Gọi api
   try {
      const { data, status } = yield call(() => userService.signUpJira(action.registrationInformation));

      if (status === STATUS_CODE.SUCCESS) {
         console.log(data);
      }


      // sau khi login về lại trang login
      // let history = yield select(state => state.HistoryReducer.history);
      history.push('/login');

   } catch (err) {
      console.log('err', err);
      console.log('error', err.response?.data);
      if (err.response?.data.statusCode === STATUS_CODE.BAD_REQUEST) {
         // console.log(err.response?.data.message);
         yield put({
            type: SIGNUP_ERR,
            SignupErr: 'Email already exists!'
         })
      }

   };


   yield put({
      type: HIDE_LOADING,
   });

};


export function* theoDoiSignup() {
   yield takeLatest(USER_SIGNUP_API, signupSaga)
};



/******************************************************************/
/**
 * Saga search user add to project
 * Thiện 2021/8/21
 */

function* getUserSaga(action) {

   yield put({
      type: DISPLAY_LOADING
   });


   try {

      const { data, status } = yield call(() => userService.getUser(action.keyword));
      // console.log('data', data);
      yield put({
         type: GET_USER_SEARCH,
         listUserSearch: data.content
      });

   } catch (err) {
      console.log(err);
   }
   yield put({
      type: HIDE_LOADING
   });

};


export function* theoDoiGetUser() {
   yield takeLatest(GET_USER_SAGA, getUserSaga);
};



/******************************************************************/
/**
 * Saga search user add to project
 * Thiện 2021/8/21
 */

function* deleteUserSaga(action) {
   yield put({
      type: DISPLAY_LOADING
   });

   yield delay(500);

   try {

      const { data, status } = yield call(() => userService.deleteUser(action.userId));

      if (status === STATUS_CODE.SUCCESS) {
         console.log(data);
         notificationFunction('success', 'Delete user successfully!')
      } else {
         notificationFunction('error', 'Delete user fail!')
         yield put({
            type: HIDE_LOADING
         });
      }

      yield put({
         type: GET_USER_SAGA,
         keyword: ''
      })
      yield put({
         type: HIDE_LOADING
      });


   } catch (err) {
      yield put({
         type: HIDE_LOADING
      });
      console.log(err);
      console.log(err.response.data);
      notificationFunction('error', 'Delete user fail!')

   }

}

export function* theoDoiDeleteUserSaga() {
   yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}


/******************************************************************/
/**
 * Saga search user add to project
 * Thiện 2021/8/21
 */

function* editUserSaga(action) {
   yield put({
      type: DISPLAY_LOADING
   });

   yield delay(500);

   try {

      const { data, status } = yield call(() => userService.editUser(action.userEdit));

      if (status === STATUS_CODE.SUCCESS) {
         console.log(data);
         notificationFunction('success', 'Edit user successfully!')
      } else {
         notificationFunction('error', 'Edit user fail!')
      }

      yield put({
         type: GET_USER_SAGA,
         keyword: ''
      })

   } catch (err) {
      console.log(err);
      console.log(err.response.data);
   }

}

export function* theoDoiEditUserSaga() {
   yield takeLatest(EDIT_USER_SAGA, editUserSaga)
}

/******************************************************************/
/**
 * Saga add user to project
 * Thiện 2021/8/21
 */

function* addUserProjectSaga(action) {
   try {
      const { data, status } = yield call(() => userService.assignUserProject(action.userProject));
      if (status === STATUS_CODE.SUCCESS) {
         notificationFunction('success', 'Add user successfully!')
      } else {
         notificationFunction('error', 'Add user fail!')
      };

      yield put({
         type: GET_LIST_PROJECT_SAGA
      });

   } catch (err) {
      console.log(err);
      notificationFunction('error', 'Add user fail!');
   }
}

export function* theoDoiAddUserProjectSaga() {
   yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
};

/******************************************************************/
/**
 * Saga remove user add to project
 * Thiện 2021/8/21
 */


function* removeUserProjectSaga(action) {

   try {

      const { data, status } = yield call(() => userService.removeUserFromProject(action.userProject));

      if (status === STATUS_CODE.SUCCESS) {
         console.log('data', data);
         notificationFunction('success', 'Remove user successfully!');
      } else {
         notificationFunction('error', 'Remove user fail!');
      }
      yield put({
         type: GET_LIST_PROJECT_SAGA
      });

   } catch (err) {
      console.log(err);
      notificationFunction('error', 'Remove user fail!');
   }

}


export function* theoDoiRemoveUserProjectSaga() {
   yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga)
}

/******************************************************************/
/**
 * Saga get user by project
 * Thiện 2021/8/25
 */


function* getUserByProjectIdSaga(action) {

   try {

      const { data, status } = yield call(() => userService.getUserByProjectId(action.idProject));
      console.log('checkdata', data);

      if (status === STATUS_CODE.SUCCESS) {
         yield put({
            type: GET_USER_BY_PROJECT_ID,
            arrUser: data.content
         })
      }


   } catch (err) {
      console.log(err);
      console.log(err.response?.data);
      if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
         yield put({
            type: GET_USER_BY_PROJECT_ID,
            arrUser: [],
         })
      }
   }


};


export function* theoDoiGetUserByProjectIdSaga() {
   yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
};