import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from 'react';
import { Select, Slider } from 'antd';
import * as Yup from 'yup';
import { useSelector, useDispatch, connect } from 'react-redux'
import { GET_ALL_PROJECT_SAGA } from '../../../redux/constants/ProjectJiraConst';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/TaskTypeConst';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/PriorityConst';
import { withFormik } from 'formik';
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/StatusConst';
import { GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA } from '../../../redux/constants/UserConst';
import { SET_SUBMIT_CRATE_TASK } from '../../../redux/constants/SubmitConst';
import { CREATE_TASK_SAGA } from '../../../redux/constants/TaskConst';



const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


function FormCreateTask(props) {

   //Lấy dữ liệu từ redux
   const { arrProject } = useSelector((state) => state.ProjectJiraReducer);
   const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
   const { arrPriority } = useSelector((state) => state.PriorityReducer);
   const { arrUser } = useSelector((state) => state.UserJiraReducer);
   const { arrStatus } = useSelector((state) => state.StatusReducer);

   // hàm biền đổi option cho thẻ select
   const userOption = arrUser?.map((item, index) => {
      return { label: item.name, value: item.userId }
   })

   //do kết nối với Formik => component có các props
   const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
   } = props;


   const dispatch = useDispatch();


   const [size, setSize] = React.useState('default');

   const [timeTracking, setTimeTracking] = useState({
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
   });


   //hook
   useEffect(() => {
      dispatch({ type: GET_ALL_PROJECT_SAGA });
      dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
      dispatch({ type: GET_ALL_PRIORITY_SAGA });
      dispatch({ type: GET_ALL_STATUS_SAGA });
      // Đưa hàm handlesubmit lên Drawer reducer để cập nhật lại sự kiện cho nut submit
      dispatch({ type: SET_SUBMIT_CRATE_TASK, submitFunction: handleSubmit })
      // dispatch({ type: GET_USER_SAGA, keyword: '' });
   }, [])


   const handleEditorChange = (content, editor) => {
      setFieldValue('description', content)
   }


   return (
      <form className="container" onSubmit={handleSubmit}>
         <div className="form-group">
            <p className="h6">Project</p>
            <select name="projectId" className="form-control" onChange={(e) => {

               //dispatch giá trị làm thay đổi arrUser
               let { value } = e.target;
               dispatch({
                  type: GET_USER_BY_PROJECT_ID_SAGA,
                  idProject: value
               })

               //Cập nhật giá trị cho project Id
               setFieldValue('projectId', e.target.value)

            }}>
               {arrProject.map((project, index) => {
                  return <option key={index} value={project.id}>
                     {project.projectName}
                  </option>
               })}
            </select>
         </div>
         <div className="form-group">
            <p className="h6 mt-3">Task Name</p>
            <input className="form-control" name="taskName" onChange={handleChange} />
         </div>

         <div className="form-group">
            <p className="h6 mt-3">Assignees</p>
            <Select
               mode="multiple"
               size={size}
               options={userOption}
               optionFilterProp='label'
               placeholder="Please select"
               onChange={(values) => {
                  setFieldValue('listUserAsign', values)
               }}
               onSelect={(value) => {
                  // console.log(value);
               }}
               style={{ width: '100%' }}
            >
               {children}
            </Select>
         </div>

         <div className="form-group">
            <div className="row">
               <div className="col-6">
                  <p className="h6 mt-3">Priority</p>
                  <select name="priorityId" className="form-control" onChange={handleChange}>
                     {arrPriority.map((priority, index) => {
                        return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                     })}
                  </select>
               </div>
               <div className="col-6">
                  <p className="h6 mt-3">Task type</p>
                  <select name="typeId" className="form-control" onChange={handleChange}>
                     {arrTaskType.map((taskType, index) => {
                        return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                     })}
                  </select>
               </div>
            </div>
         </div>

         <div className="form-group">
            <div className="row">
               <div className="col-6 p-1">
                  <div>
                     <p className="h6">Origina Estimate</p>
                     <input type="number" defaultValue="0" min="0" className="form-control" name="originalEstimate" onChange={handleChange} />
                  </div>
                  <div>
                     <p className="h6">Status</p>
                     <select className="form-control" name="statusId" onChange={handleChange}>
                        {arrStatus.map((statusItem, index) => {
                           return <option key={index} value={statusItem.statusId}>{statusItem.statusName}</option>
                        })}
                     </select>
                  </div>
               </div>

               <div className="col-6 p-1">
                  <div className="card p-1">
                     <div>
                        <p className="h6">Time tracking</p>
                        <Slider defaultValue={30} value={Number(timeTracking.timeTrackingSpent)} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className="row">
                           <div className="col-6 text-left">{timeTracking.timeTrackingSpent}h logged</div>
                           <div className="col-6 text-right">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-6">
                           <p className="h6">Time spent</p>
                           <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
                              setTimeTracking({
                                 ...timeTracking,
                                 timeTrackingSpent: e.target.value
                              });
                              setFieldValue('timeTrackingSpent', Number(e.target.value))
                           }} />
                        </div>
                        <div className="col-6">
                           <p className="h6">Time remaining</p>
                           <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                              setTimeTracking({
                                 ...timeTracking,
                                 timeTrackingRemaining: e.target.value
                              });
                              setFieldValue('timeTrackingRemaining', Number(e.target.value))
                           }} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>

         <div className="form-group">
            <p className="h6 mt-3">Description</p>
            <Editor
               name="description"
               init={{
                  selector: 'textarea#myTextArea',
                  height: 300,
                  menubar: false,
                  plugins: [
                     'advlist autolink lists link image',
                     'charmap print preview anchor help',
                     'searchreplace visualblocks code',
                     'insertdatetime media table paste wordcount'
                  ],
                  toolbar:
                     'undo redo | formatselect | ' +
                     'bold italic backcolor | alignleft aligncenter ' +
                     'alignright alignjustify | bullist numlist outdent indent | ' +
                     'removeformat | help'
               }}

               onEditorChange={handleEditorChange}
            />
         </div>
         {/* <button type='submit'>submit</button> */}
      </form>
   )
}


const frmCreateTask = withFormik({
   enableReinitialize: true,
   mapPropsToValues: (props) => {
      const { arrProject, arrTaskType, arrPriority, arrStatus } = props;

      // if (arrProject.length > 0) {
      //    props.dispatch({ type: GET_USER_BY_PROJECT_ID_SAGA, idProject: arrProject[0]?.id })
      // }

      return {
         "listUserAsign": [],
         "taskName": "",
         "description": "",
         "statusId": arrStatus[0]?.statusId,
         "originalEstimate": 0,
         "timeTrackingSpent": 0,
         "timeTrackingRemaining": 0,
         "projectId": arrProject[0]?.id,
         "typeId": arrTaskType[0]?.id,
         "priorityId": arrPriority[0]?.priorityId,
      }
   },

   validationSchema: Yup.object().shape({

   }),

   handleSubmit: (values, { props, setSubmitting }) => {
      props.dispatch({
         type: CREATE_TASK_SAGA,
         taskObject: values
      });
      // console.log('task object', values);
   },

   displayName: 'crateTaskForm'
})(FormCreateTask);

const mapStateToProps = (state) => {
   return {
      arrProject: state.ProjectJiraReducer.arrProject,
      arrTaskType: state.TaskTypeReducer.arrTaskType,
      arrPriority: state.PriorityReducer.arrPriority,
      arrStatus: state.StatusReducer.arrStatus,
   }
}

export default connect(mapStateToProps)(frmCreateTask);
