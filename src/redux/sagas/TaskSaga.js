import { call, put, takeLatest } from "@redux-saga/core/effects";
import { delay, select } from "redux-saga/effects";
import { taskService } from "../../services/TaskSevice";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { notificationFunction } from "../../util/Notification/notificationJira";
import { CLOSE_DRAWER } from "../constants/DrawerConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import { GET_PROJECT_DETAIL_SAGA } from "../constants/ProjectConst";
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, CREATE_TASK_SAGA, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_ASSIGNESS, UPDATA_STATUS_TASK_SAGA, UPDATA_TASK_SAGA } from "../constants/TaskConst";

/******************************************************************/
/**
 * Saga create task
 * Thiện 2021/8/25
 */

function* createTaskSaga(action) {
   // console.log('task', action.taskObject);
   yield put({
      type: DISPLAY_LOADING
   });

   yield delay(500)

   try {
      const { data, status } = yield call(() => taskService.createTask(action.taskObject));

      if (status === STATUS_CODE.SUCCESS) {
         console.log(data);
      }

      yield put({
         type: CLOSE_DRAWER
      })

      notificationFunction('success', 'Create task successfully!')


   } catch (err) {
      console.log(err.response.data);
      notificationFunction('error', 'Create task fail!')

   }
   yield put({
      type: HIDE_LOADING
   });
};

export function* theoDoiCreateTaskSaga() {
   yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}


/******************************************************************/
/**
 * Saga get task detail
 * Thiện 2021/8/25
 */


function* getTaskDetailSaga(action) {
   try {

      const { data, status } = yield call(() => taskService.getTaskDetail(action.taskId));
      yield put({
         type: GET_TASK_DETAIL,
         taskDetailModal: data.content
      })

   } catch (err) {
      console.log(err);
      console.log(err.response?.data);
   }
}


export function* theoDoiGetTaskDetailSaga() {
   yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}



/******************************************************************/
/**
 * Saga update task status
 * Thiện 2021/8/28
 */


function* updateTaskStatusSaga(action) {
   const { taskStatusUpdate } = action;
   try {

      //Cập nhật api status cho task hiện tại (Task đang mở modal)
      const { data, status } = yield call(() => taskService.updateStatusTask(taskStatusUpdate));

      // Sau khi thành công gọi lại getTaskDetailSaga đẻ sắp xếp lại thông tin các task
      if (status === STATUS_CODE.SUCCESS) {

         yield put({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId: taskStatusUpdate.projectId
         })
      }

   } catch (err) {
      console.log(err);
      console.log(err.response?.data);
   }
}

export function* theoDoiUpdateTaskStatusSaga() {
   yield takeLatest(UPDATA_STATUS_TASK_SAGA, updateTaskStatusSaga)
}


/******************************************************************/
/**
 * Saga update task
 * Thiện 2021/8/30
 */

// function* updateTaskSaga(action) {
//    const { taskUpdate } = action
//    try {
//       const { data, status } = yield call(() => taskService.updateTask(taskUpdate));


//    } catch (err) {
//       console.log(err);
//       console.log(err.response?.data);
//    }
// }

// export function* theoDoiUpdateTaskSaga() {
//    yield takeLatest(UPDATA_TASK_SAGA, updateTaskSaga)
// }



/**
 * Saga thay đổi giá trị sau đó cập nhật lên api
 * Thiện 2021/8/30
 */

function* handelChangePostApi(action) {
   //Gọi action làm thay đổi taskDetail modal sử lý tuần tự
   switch (action.actionType) {
      case CHANGE_TASK_MODAL: {
         const { value, name } = action;
         yield put({
            type: CHANGE_TASK_MODAL,
            name,
            value,
         })
      }; break;
      case CHANGE_ASSIGNESS: {
         const { userSelected } = action;
         yield put({
            type: CHANGE_ASSIGNESS,
            userSelected
         })
      }; break;
      case REMOVE_ASSIGNESS: {
         const { userId } = action;
         yield put({
            type: REMOVE_ASSIGNESS,
            userId
         })
      }; break;
   }
   //Save qua api updateTaskSaga

   //lấy dữ liệu từ state.taskDetailModal (reducer)
   let { taskDetailModal } = yield select((state) => state.TaskDetailModallReducer);
   // console.log('taskdetailmodal sau thay doi', taskDetailModal);
   //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần
   const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
      return user.id
   })
   const taskUpdateApi = { ...taskDetailModal, listUserAsign }
   // console.log('objectApi', taskDetailModal);
   try {
      const { data, status } = yield call(() => taskService.updateTask(taskUpdateApi));

      if (status === STATUS_CODE.SUCCESS) {
         yield put({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId: taskUpdateApi.projectId
         });
         yield put({
            type: GET_TASK_DETAIL_SAGA,
            taskId: taskUpdateApi.taskId
         })
      }

   } catch (err) {
      console.log(err);
      console.log(err.response?.data);
   }

}

export function* theoDoiHandelChangePostApi() {
   yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handelChangePostApi)
}

