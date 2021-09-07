import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Editor } from '@tinymce/tinymce-react';
import { INSERT_COMMENT_SAGA } from '../../../redux/constants/CommentConst';


function FormComment(props) {

   const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
   } = props;

   const handleEditorChange = (content, editor) => {
      setFieldValue('contentComment', content)

   }

   return (
      <form onSubmit={handleSubmit} onChange={handleChange}>
         <Editor
            name="contentComment"
            init={{
               selector: 'textarea#myTextArea',
               height: 100,
               autoresize_min_height: 200,
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

            onEditorChange={handleEditorChange}
         />
         <div className="mt-3">
            <button className="btn btn-primary" type="submit">Post</button>

         </div>
      </form>
   )
}

const InsertComment = withFormik({
   enableReinitialize: true,
   mapPropsToValues: (props) => {
      const { taskDetailModal } = props;
      return {
         taskId: taskDetailModal.taskId,
         contentComment: ''
      }
   },

   validationSchema: Yup.object().shape({

   }),

   handleSubmit: (values, { props, setSubmitting }) => {
      // khi người dùng submit => đưa dữ liệu về backend thông qua api
      props.dispatch({
         type: INSERT_COMMENT_SAGA,
         commentObject: values
      })
   },

   displayName: 'FormComment'
})(FormComment);

const mapStateToProps = (state) => ({
   taskDetailModal: state.TaskDetailModallReducer.taskDetailModal
})


export default connect(mapStateToProps)(InsertComment);
