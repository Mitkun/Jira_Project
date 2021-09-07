import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactHTMLParser from 'react-html-parser'
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/StatusConst';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/TaskTypeConst';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/PriorityConst';
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, HANDLE_CHANGE_POST_API_SAGA, REMOVE_ASSIGNESS } from '../../../redux/constants/TaskConst';
import { Editor } from '@tinymce/tinymce-react';
import { Select } from 'antd';
import { DELETE_COMMENT_SAGA, EDIT_COMMENT_SAGA, PUT_ID_VISIBLE, VISIBLE_EDIT_COMMENT } from '../../../redux/constants/CommentConst';
import FormComment from '../../Forms/FormComment/FormComment';

import { Popconfirm, message, Button } from 'antd';

const text = 'Are you sure to delete this task?';


export default function ModalJira(_props) {

   // let visibleCommentRef = useRef(null);

   const { taskDetailModal } = useSelector((state) => state.TaskDetailModallReducer);
   const { arrStatus } = useSelector((state) => state.StatusReducer);
   const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
   const { arrPriority } = useSelector(state => state.PriorityReducer);
   const { projectDetail } = useSelector(state => state.ProjectReducer);
   const { userLogin } = useSelector(state => state.UserJiraReducer);
   const { commentDetail, idVisible } = useSelector(state => state.CommentReducer)
   //Lưu dữ liệu description khi click save
   const [historyContentDescription, setHistoryContentDescription] = useState(taskDetailModal.description);
   const [contentDescription, setContentDescription] = useState(taskDetailModal.description);

   //Lưu dữ liệu comment khi click post
   const [contentComment, setContentComment] = useState(commentDetail.contentComment);

   //set ẩn hiện Editor
   const [visibleEditorDescription, setVisibleEditorDescription] = useState(false);

   // console.log('commentDetail', commentDetail);
   // console.log('taskDetailModal', taskDetailModal);


   const userAssigned = projectDetail?.members?.filter((mem) => {
      let index = taskDetailModal.assigness?.findIndex((us) => us.id === mem.userId);
      if (index !== -1) {
         return false;
      } return true;
   }).map((item, _index) => {
      return { label: item.name, value: item.userId }
   })


   const dispatch = useDispatch();

   useEffect(() => {
      dispatch({ type: GET_ALL_STATUS_SAGA });
      dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
      dispatch({ type: GET_ALL_PRIORITY_SAGA });
      // dispatch({ type: GET_ALL_COMMENT_SAGA });
   }, [])

   // tắt thẻ Editor khi mở modal
   useEffect(() => {
      setVisibleEditorDescription(false);
      dispatch({
         type: PUT_ID_VISIBLE,
         idVisible: ''
      })
   }, [taskDetailModal])

   const rederDescription = () => {
      const jsxDescription = ReactHTMLParser(taskDetailModal.description)
      return <div>
         {visibleEditorDescription ? <div><Editor
            name="description"
            initialValue={taskDetailModal.description}
            init={{
               selector: 'textarea',
               plugins: 'autoresize',
               height: 200,
               autoresize_min_height: 400,
               autoresize_max_height: 800,
               menubar: false,
               plugins: [
                  'advlist autolink lists link image',
                  'charmap print preview anchor help',
                  'searchreplace visualblocks code',
                  'insertdatetime media table paste wordcount',
                  'autoresize'
               ],
               toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help'
            }}

            onEditorChange={(content, editor) => {
               console.log('description', content);
               setContentDescription(content)
            }}
         />
            <div className="mt-3">
               <button className="btn btn-light mr-3" onClick={() => {
                  dispatch({
                     type: HANDLE_CHANGE_POST_API_SAGA, //TaskSaga
                     actionType: CHANGE_TASK_MODAL,
                     name: 'description',
                     value: historyContentDescription,
                  })

                  // dispatch({
                  //    type: CHANGE_TASK_MODAL,
                  //    name: 'description',
                  //    value: historyContentDescription,
                  // })
                  // setVisibleEditor(false);
               }}>Close</button>
               <button className="btn btn-primary" onClick={() => {

                  dispatch({
                     type: HANDLE_CHANGE_POST_API_SAGA, //TaskSaga
                     actionType: CHANGE_TASK_MODAL,
                     name: 'description',
                     value: contentDescription,
                  })

                  // dispatch({
                  //    type: CHANGE_TASK_MODAL,
                  //    name: 'description',
                  //    value: content,
                  // })
                  // setVisibleEditor(false);
               }}>Save</button>
            </div>
         </div> : <div onClick={() => {
            setHistoryContentDescription(taskDetailModal.description)
            setVisibleEditorDescription(!visibleEditorDescription)
         }}>{jsxDescription}</div>}


      </div>
   }

   const renderEditComment = (e, commentID, taskId) => {
      const Visible = commentID // nếu Visible === idVisible thì hiền Editor
      const jsxComment = ReactHTMLParser(e);
      return <div>
         {(Visible === idVisible) ? <div><Editor
            name="contentComment"
            initialValue={e}
            init={{
               selector: 'textarea',
               plugins: 'autoresize',
               height: 400,
               autoresize_min_height: 400,
               autoresize_max_height: 800,
               menubar: false,
               plugins: [
                  'advlist autolink lists link image',
                  'charmap print preview anchor help',
                  'searchreplace visualblocks code',
                  'insertdatetime media table paste wordcount',
                  'autoresize'
               ],
               toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help'
            }}

            onEditorChange={(content, editor) => {
               setContentComment(content)
            }}
         />
            <div className="mt-3">
               <button className="btn btn-light mr-3" onClick={() => {
                  dispatch({
                     type: PUT_ID_VISIBLE,
                     idVisible: ''
                  })
               }}>Close</button>
               <button className="btn btn-primary" onClick={() => {
                  dispatch({
                     type: EDIT_COMMENT_SAGA,
                     id: commentID,
                     contentComment: contentComment
                  })

                  dispatch({
                     type: PUT_ID_VISIBLE,
                     idVisible: ''
                  })


               }}>Save</button>
            </div>
         </div> : <div>
            <div>{jsxComment}</div>
            <div>
               <span className="m-1" style={{ color: '#929398', cursor: 'pointer' }} onClick={() => {
                  dispatch({
                     // dispast đưa id của comment lên reducer
                     type: PUT_ID_VISIBLE,
                     idVisible: commentID
                  });


               }}>Edit</span>
               •

               <Popconfirm
                  placement="rightBottom"
                  title={text}
                  onConfirm={() => {
                     dispatch({
                        type: DELETE_COMMENT_SAGA,
                        idComment: commentID,
                        taskId: taskId
                     })
                  }}
                  okText="Yes"
                  cancelText="No"
               >
                  <span className="m-1" style={{ color: '#929398', cursor: 'pointer' }} >Delete</span>
               </Popconfirm>
            </div>
         </div>}


      </div>
   }

   const renderTimeTracking = () => {
      const { timeTrackingSpent, timeTrackingRemaining, originalEstimate } = taskDetailModal;
      let max = 0;
      let timeEstimated = 0;

      if ((Number(originalEstimate) - Number(timeTrackingSpent)) >= Number(timeTrackingRemaining)) {
         timeEstimated = Number(originalEstimate) - Number(timeTrackingSpent)
      } else {
         timeEstimated = Number(timeTrackingRemaining)
      }
      if (Number(originalEstimate) >= (Number(timeTrackingRemaining) + Number(timeTrackingSpent))) {
         max = Number(originalEstimate)
      } else {
         max = Number(timeTrackingSpent) + Number(timeTrackingRemaining)
      }
      const percentSpent = (Number(timeTrackingSpent) * 100) / max;


      return <div className="timeTracking p-2" style={{ display: 'flex' }} >
         <i className="fa fa-clock" />
         <div style={{ width: '100%' }}>
            <div className="progress mt-2">
               <div className="progress-bar" role="progressbar" style={{ width: `${percentSpent}%` }} aria-valuenow={timeTrackingSpent} aria-valuemin={0} aria-valuemax={max} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <p className="logged">{Number(timeTrackingSpent)}h logged</p>
               <p className="estimate-time">{max}h estimated</p>
            </div>
         </div>
      </div>
   }


   const handleChange = (e) => {
      const { name, value } = e.target;
      dispatch({
         type: HANDLE_CHANGE_POST_API_SAGA,
         actionType: CHANGE_TASK_MODAL,
         name,
         value
      })
   }



   return (
      <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true" >
         <div className="modal-dialog modal-info">
            <div className="modal-content">
               <div className="modal-header">
                  <div className="task-title">
                     <select name="typeId" className={`custom-select typeId${taskDetailModal.typeId}`} value={taskDetailModal.typeId} onChange={(e) => {
                        handleChange(e)
                     }}>
                        {arrTaskType.map((taskType, index) => {

                           return <option className={taskType.taskType} key={index} value={taskType.id}>{taskType.taskType}</option>
                        })}
                     </select>
                  </div>
                  <div style={{ display: 'flex' }} className="task-click">
                     <div>
                        <i className="fab fa-telegram-plane" />
                        <span style={{ paddingRight: 20 }}>Give feedback</span>
                     </div>
                     <div>
                        <i className="fa fa-link" />
                        <span style={{ paddingRight: 20 }}>Copy link</span>
                     </div>
                     <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                     </button>
                  </div>
               </div>
               <div className="modal-body">
                  <div className="container-fluid">
                     <div className="row">
                        <div className="col-8">
                           <p className="issue h5">{taskDetailModal.taskName}</p>
                           <div className="description">
                              <p>Description</p>

                              {rederDescription()}

                           </div>

                           <div className="comment">
                              <h6>Comment</h6>
                              <div className="block-comment" style={{ display: 'flex' }}>
                                 <div className="avatar">
                                    <img src={userLogin?.avatar} alt={userLogin?.name} />
                                 </div>
                                 <div name="contentComment" className="input-comment mb-3">
                                    <FormComment />
                                 </div>
                              </div>
                              <div className="lastest-comment">
                                 <div className="comment-item card p-3">
                                    {commentDetail.map((item, index) => {

                                       return (
                                          <div className="display-comment mb-3" key={index} style={{ display: 'flex' }}>
                                             <div className="avatar">
                                                <img src={item.user?.avatar} alt={item.user?.name} />
                                             </div>
                                             <div>
                                                <p style={{ marginBottom: 5 }}>
                                                   {item.user?.name}
                                                </p>
                                                <p style={{ marginBottom: 5 }}>
                                                   {renderEditComment(item.contentComment, item.id, item.taskId)}
                                                   {/* <div>
                                                      <span className="m-1" style={{ color: '#929398', cursor: 'pointer' }} onClick={() => {
                                                         dispatch({
                                                            type: VISIBLE_EDIT_COMMENT,
                                                            // visibleComment: true,
                                                            index: index
                                                         })

                                                      }}>Edit</span>
                                                      •
                                                      <span className="m-1" style={{ color: '#929398', cursor: 'pointer' }}>Delete</span>
                                                   </div> */}
                                                </p>

                                             </div>
                                          </div>)
                                    })}
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-4">
                           <div className="status">
                              <h6>STATUS</h6>
                              <select name="statusId" className={`custom-select statusId${taskDetailModal.statusId}`} value={taskDetailModal.statusId} onChange={(e) => {
                                 handleChange(e)
                              }}>
                                 {arrStatus.map((status, index) => {
                                    return <option className={status.statusName} key={index} value={status.statusId}>{status.statusName}</option>
                                 })}
                              </select>
                           </div>
                           <div className="assignees">
                              <h6>ASSIGNEES</h6>
                              <div className="row">
                                 {taskDetailModal.assigness?.map((mem, index) => {
                                    return <div key={index} className="col-6">
                                       <div className="item">
                                          <div className="avatar">
                                             <img src={mem.avatar} alt={mem.name} />
                                          </div>
                                          <p className="name mt-1" onClick={() => {
                                             dispatch({
                                                type: HANDLE_CHANGE_POST_API_SAGA,//TaskSaga
                                                actionType: REMOVE_ASSIGNESS,
                                                userId: mem.id
                                             })
                                             // dispatch({
                                             //    type: REMOVE_ASSIGNESS,
                                             //    userId: mem.id
                                             // })
                                          }}  >
                                             {mem.name?.slice(0, 9)}
                                             {mem.name?.length > 9 ? '...' : ''}
                                             <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} />
                                          </p>
                                       </div>
                                    </div>
                                 })}
                                 <div className="col-6">
                                    <div className="user-assigned">
                                       <Select
                                          mode="multiple"
                                          size="100%"
                                          bordered={false}
                                          options={userAssigned}
                                          value="+ Add More"
                                          optionFilterProp='label'
                                          placeholder="Please select"
                                          onChange={(_values) => {

                                          }}
                                          onSelect={(value) => {
                                             if (value == '0') {
                                                return;
                                             }
                                             let userSelected = projectDetail.members?.find((mem) => mem.userId == value);
                                             userSelected = { ...userSelected, id: userSelected.userId };
                                             dispatch({
                                                type: HANDLE_CHANGE_POST_API_SAGA,//TaskSaga
                                                actionType: CHANGE_ASSIGNESS,
                                                userSelected
                                             })
                                             // dispatch({
                                             //    type: CHANGE_ASSIGNESS,
                                             //    userSelected
                                             // })
                                          }}
                                          style={{ width: '100%' }}
                                       >
                                          {/* {children} */}
                                       </Select>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="priority" style={{ marginBottom: 20 }}>
                              <h6>PRIORITY</h6>
                              <select name="priorityId" className="custom-select" value={taskDetailModal.priorityId} onChange={(e) => {
                                 handleChange(e);
                              }}>
                                 {arrPriority.map((priorityy, index) => {
                                    return <option key={index} value={priorityy.priorityId}>{priorityy.priority}</option>
                                 })}
                              </select>
                           </div>
                           <div className="estimate">
                              <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                              <input type="text" name="originalEstimate" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => {
                                 handleChange(e);
                              }} />
                           </div>
                           <div className="time-tracking">
                              <h6>TIME TRACKING</h6>
                              {renderTimeTracking()}

                           </div>
                           <div style={{ color: '#929398' }}>Create at a month ago</div>
                           <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}


