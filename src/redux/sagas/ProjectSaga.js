import { call, delay, put, takeLatest } from "redux-saga/effects";
import { jiraService } from "../../services/JiraService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";



function* createProjectSaga(action) {

   //Hiển thị loading
   yield put({
      type: DISPLAY_LOADING
   });
   yield delay(500)


   try {

      const { data, status } = yield call(() => jiraService.createProject(action.newProject));

      if (status === STATUS_CODE.SUCCESS) {
         console.log(data);
      }

   } catch (err) {
      console.log('errors', err);
   }


   yield put({
      type: HIDE_LOADING
   })

}


export function* theoDoiCreateProjectSaga() {
   yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga)
}