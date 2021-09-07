import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/JiraConst';
import { UPDATE_PROJECT_SAGA } from '../../../redux/constants/ProjectConst';
import { SET_SUBMIT_EDIT_PROJECT } from '../../../redux/constants/SubmitConst';


function FormEditProject(props) {


   const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
   } = props;

   // kết nối với redux lấy mảng arrProjectCategory
   const { arrProjectCategory } = useSelector(state => state.ProjectCategoryReducer)


   const dispatch = useDispatch();
   // const submitForm = (e) => {
   //    e.preventDefault();
   //    alert('submit edit')
   // };

   useEffect(() => {

      dispatch({
         type: GET_ALL_PROJECT_CATEGORY_SAGA
      })

      dispatch({
         type: SET_SUBMIT_EDIT_PROJECT,
         submitFunction: handleSubmit  //dispatch sự kiện submit của form lên reducer
      })
   }, [])


   const handleEditorChange = (content, editor) => {
      setFieldValue('description', content)

   }


   return (
      <form className="container-fluid">
         <div className="row">
            <div className="col-4">
               <div className="form-group">
                  <h6>Project ID</h6>
                  <input value={values.id} disabled className="form-control" name="id" />
               </div>
            </div>
            <div className="col-4">
               <div className="form-group">
                  <h6>Project Name</h6>
                  <input value={values.projectName} className="form-control" name="projectName" onChange={handleChange} />
               </div>
            </div>
            <div className="col-4">
               <div className="form-group">
                  <h6>Project Category</h6>
                  <select name="categoryId" className="form-control" value={values.projectCategoryName}>
                     {arrProjectCategory?.map((item, index) => {
                        return <option key={index} value={item.id}>
                           {item.projectCategoryName}
                        </option>
                     })}
                  </select>
               </div>
            </div>

            <div className="col-12">
               <div className="form-group">
                  <h6>Description</h6>
                  <Editor
                     name="description"
                     // initialValue={values.description}
                     value={values.description}
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
                           'undo redo | formatselect | ' +
                           'bold italic backcolor | alignleft aligncenter ' +
                           'alignright alignjustify | bullist numlist outdent indent | ' +
                           'removeformat | help'
                     }}

                     onEditorChange={handleEditorChange}
                  />
               </div>
            </div>

         </div>
      </form>
   )
}


const EditProjectForm = withFormik({
   enableReinitialize: true,
   mapPropsToValues: (props) => {
      const { projectEdit } = props;
      return {
         id: projectEdit?.id,
         projectName: projectEdit?.projectName,
         description: projectEdit?.description,
         categoryId: projectEdit?.categoryId,
      }
   },

   validationSchema: Yup.object().shape({

   }),

   handleSubmit: (values, { props, setSubmitting }) => {
      // khi người dùng submit => đưa dữ liệu về backend thông qua api
      const action = {
         type: UPDATE_PROJECT_SAGA,
         updateProject: values
      }

      props.dispatch(action)
   },

   displayName: 'EditProjectForm'
})(FormEditProject);

const mapStateToProps = (state) => ({
   projectEdit: state.ProjectReducer.projectEdit
})


export default connect(mapStateToProps)(EditProjectForm);
