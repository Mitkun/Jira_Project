import Axios from 'axios';
import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { jiraService } from '../../services/JiraService';
import { TOKEN, USER_LOGIN } from '../../util/constants/settingSystem';
import { history } from '../../util/history';
import { USER_SIGNIN_API, US_LOGIN } from '../constants/JiraConst';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';




// Quản lý các action saga
function* signinSaga(action) {
   //put giống dispatch action
   yield put({
      type: DISPLAY_LOADING,
   })

   yield delay(500)

   // Gọi api
   try {
      const { data, status } = yield call(() => jiraService.signinJira(action.userLogin));
      // Lưu vào localstorage khi đăng nhập thành công
      localStorage.setItem(TOKEN, data.content.accessToken)
      localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))


      yield put({
         type: US_LOGIN,
         userLogin: data.content
      })

      // sau khi login về lại trang home
      // let history = yield select(state => state.HistoryReducer.history);
      history.push('/home');

   } catch (err) {
      console.log('err', err);
   }


   yield put({
      type: HIDE_LOADING,
   })

}


export function* theoDoiSignin() {
   yield takeLatest(USER_SIGNIN_API, signinSaga)
}