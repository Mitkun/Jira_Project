import { call, put, takeLatest } from 'redux-saga/effects';
import { statusService } from '../../services/StatusService'
import { GET_ALL_STATUS_SAGA, GET_ALL_STATUS } from '../constants/StatusConst';

function* getAllStatusSaga(action) {

   try {
      const { data, status } = yield call(() => statusService.getAllStatus());

      yield put({
         type: GET_ALL_STATUS,
         arrStatus: data.content,
      })

   } catch (err) {
      console.log(err);
      console.log(err.response?.data);
   }

}

export function* theoDoigetAllStatusSaga() {
   yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga)
}