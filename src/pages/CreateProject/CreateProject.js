import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../redux/constants/JiraConst';

function CreateProject(props) {

   // kết nối với redux lấy mảng arrProjectCategory
   const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)
   const dispatch = useDispatch();
   const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue //tuộc tính giúp set lại giá trị trong 1 hàm bất kỳ
   } = props;

   useEffect(() => {
      //Gọi api để lấy dữ liệu select
      dispatch({
         type: GET_ALL_PROJECT_CATEGORY_SAGA
      })
   }, [])



   const handleEditorChange = (content, editor) => {
      setFieldValue('description', content)

   }

   return (
      <div className="container m-5">
         <h3>Create Project</h3>
         <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
            <div className="form-group">
               <p>Name</p>
               <input className="form-control" name="projectName" />
            </div>
            <div className="form-group">
               <p>Description</p>
               <Editor
                  name="description"
                  init={{
                     selector: 'textarea#myTextArea',
                     height: 500,
                     menubar: false,
                     plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code',
                        'insertdatetime media table paste wordcount'
                     ],
                     toolbar:
                        'undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | help'
                  }}
                  onEditorChange={handleEditorChange}
               />
            </div>
            <div className="form-group">
               <select name="categoryId" className="form-control" onChange={handleChange}>
                  {arrProjectCategory.map((item, index) => {
                     return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                  })}
               </select>
            </div>
            <button className="btn btn-primary" type="submit">Create Project</button>
         </form>
      </div>
   )
}


const createProjectForm = withFormik({
   enableReinitialize: true, // Bắt mapPropsToValues chạy lại khi component render lại
   mapPropsToValues: (props) => {

      return {
         projectName: '',
         description: '',
         categoryId: props.arrProjectCategory[0]?.id,
         alias: '',
      }
   },

   validationSchema: Yup.object().shape({

   }),

   handleSubmit: (values, { props, setSubmitting }) => {
      props.dispatch({
         type: 'CREATE_PROJECT_SAGA',
         newProject: values
      })


   },

   displayName: 'CreateProjectFormik'
})(CreateProject)

const mapStateToProps = (state) => {
   return {
      arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
   }
}


export default connect(mapStateToProps)(createProjectForm)
