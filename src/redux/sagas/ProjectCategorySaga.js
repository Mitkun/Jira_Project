import { call, put, takeLatest } from "redux-saga/effects";
import { jiraService } from "../../services/JiraService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../constants/JiraConst";


function* getAllProjectCategorySaga(action) {

   try {
      // Gọi api lấy dữ liệu về
      const { data, status } = yield call(() => jiraService.getAllProjectCategory());

      // Gọi api thành công thì dispatch lên reducer thông qua put
      if (status === STATUS_CODE.SUCCESS) {
         yield put({
            type: GET_ALL_PROJECT_CATEGORY,
            data: data.content
         })
      }

   } catch (err) {
      console.log('error', err.response.data);
   }

}



export function* theoDoigetApiProjectCategory() {
   yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga)
}