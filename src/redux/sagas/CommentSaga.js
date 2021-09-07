import { call, put, takeLatest } from "@redux-saga/core/effects";
import { commentService } from "../../services/CommentService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { notificationFunction } from "../../util/Notification/notificationJira";
import { DELETE_COMMENT_SAGA, EDIT_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, INSERT_COMMENT_SAGA } from "../constants/CommentConst";



/******************************************************************/
/**
 * Saga get all comment
 * Thiện 2021/9/03
 */
function* getAllCommentSaga(action) {
   try {
      const { data, status } = yield call(() => commentService.getAllComment(action.taskId));
      if (status === STATUS_CODE.SUCCESS) {
         yield put({
            type: GET_ALL_COMMENT,
            commentDetail: data.content
         })
      }

   } catch (err) {
      console.log(err);
      console.log(err.response?.data);
   }
}

export function* theoDoiGetAllCommentSaga() {
   yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga)
}

/******************************************************************/
/**
 * Saga insert comment
 * Thiện 2021/9/04
 */


function* insertCommentSaga(action) {
   try {
      const { data, status } = yield call(() => commentService.insertComment(action.commentObject))

      if (status === STATUS_CODE.SUCCESS) {
         console.log(data);
         yield put({
            type: GET_ALL_COMMENT_SAGA,
            taskId: data.content.taskId
         })
      }
   } catch (err) {
      console.log(err);
      console.log(err.response?.data);
   }
}

export function* theoDoiInsertCommentSaga() {
   yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga)
}

/******************************************************************/
/**
 * Saga update comment
 * Thiện 2021/9/04
 */

function* editCommentSaga(action) {
   try {
      const { data, status } = yield call(() => commentService.updateComment(action.id, action.contentComment));
      if (status === STATUS_CODE.SUCCESS) {
         console.log(data);
         yield put({
            type: GET_ALL_COMMENT_SAGA,
            taskId: data.content.taskId
         })
      }

   } catch (err) {
      console.log(err);
      console.log(err.response?.data);
   }
}

export function* theoDoiEditCommentSaga() {
   yield takeLatest(EDIT_COMMENT_SAGA, editCommentSaga)
}


/******************************************************************/
/**
 * Saga delete comment
 * Thiện 2021/9/05
 */

function* deleteCommentSaga(action) {
   try {
      console.log(action);
      const { data, status } = yield call(() => commentService.deleteComment(action.idComment));

      if (status === STATUS_CODE.SUCCESS) {
         console.log(data);
         notificationFunction('success', 'Delete comment successfully!');
         yield put({
            type: GET_ALL_COMMENT_SAGA,
            taskId: action.taskId
         })
      } else {
         notificationFunction('error', 'Delete comment fail!');
      }



   } catch (err) {
      console.log(err);
      console.log(err.response?.data);
      notificationFunction('error', 'Delete comment fail!');

   }
}

export function* theoDoiDeleteCommentSaga() {
   yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga)
}