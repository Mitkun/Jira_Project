import { call, delay, put, takeLatest } from "redux-saga/effects";
import { taskTypeService } from "../../services/TaskTypeService";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../constants/TaskTypeConst";

function* getAllTaskTypeSaga(action) {

   try {

      const { data, status } = yield call(() => taskTypeService.getAllTaskType());

      yield put({
         type: GET_ALL_TASK_TYPE,
         arrTaskType: data.content
      })

   } catch (err) {
      console.log(err.response.data);
   }

};

export function* theoDoigetAllTaskTypeSaga() {
   yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga)
}