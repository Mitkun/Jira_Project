import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { GET_ALL_COMMENT_SAGA } from '../../../redux/constants/CommentConst';
import { GET_TASK_DETAIL_SAGA, UPDATA_STATUS_TASK_SAGA } from '../../../redux/constants/TaskConst';

export default function ContentMain(props) {

   const { projectDetail } = props;

   const dispatch = useDispatch();

   const handleDragEnd = (result) => {
      let { projectId, taskId } = JSON.parse(result.draggableId); //lấy ra chuỗi sau mỗi lần dragg
      //kiểm tra vị trí drop
      let { source, destination } = result;
      if (!destination) {
         return;
      }
      if (source.index === destination.index && source.droppableId === destination.droppableId) {
         return;
      }
      //Gọi api cập nhật lại status
      dispatch({
         type: UPDATA_STATUS_TASK_SAGA,
         taskStatusUpdate: {
            "taskId": taskId,
            "statusId": destination.droppableId,
            "projectId": projectId
         }

      })
   }

   const renderCardTaskList = () => {
      return <DragDropContext onDragEnd={handleDragEnd}>
         {
            projectDetail.lstTask?.map((taskListDetail, index) => {
               return <Droppable key={index} droppableId={taskListDetail.statusId}>
                  {(provided) => {
                     return <div className="card pb-2" style={{ width: '18rem', height: 'auto', marginRight: '20px' }}>
                        <div className="card-header">
                           {taskListDetail.statusName}
                        </div>
                        <div
                           ref={provided.innerRef}
                           {...provided.droppableProps}
                           className="list-group list-group-flush" style={{ height: '100%' }}>

                           {taskListDetail.lstTaskDeTail.map((task, index) => {
                              return <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({ projectId: task.projectId, taskId: task.taskId })}>
                                 {(provided) => {
                                    return <div
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                       key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" onClick={() => {

                                          dispatch({
                                             type: GET_TASK_DETAIL_SAGA,
                                             taskId: task.taskId
                                          });
                                          dispatch({
                                             type: GET_ALL_COMMENT_SAGA,
                                             taskId: task.taskId
                                          })
                                       }}>
                                       <p className="h6">
                                          {task.taskName}
                                       </p>
                                       <div className="block" style={{ display: 'flex' }}>
                                          <div className="block-left">
                                             <p className="text-danger">{task.priorityTask.priority}</p>
                                             {/* <i className="fa fa-arrow-up" /> */}
                                          </div>
                                          <div className="block-right">
                                             <div className="avatar-group" style={{ display: 'flex' }}>
                                                {task.assigness?.map((mem, index) => {
                                                   return <div className="avatar" key={index}>
                                                      <img src={mem.avatar} alt={mem.name} />
                                                   </div>
                                                })}

                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 }}
                              </Draggable>
                           })}
                           {provided.placeholder}
                        </div>
                     </div>
                  }}

               </Droppable>
            })}
      </DragDropContext>
   }


   return (
      <div className="container-fluid">
         <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}

         </div>
      </div>
   )
}
