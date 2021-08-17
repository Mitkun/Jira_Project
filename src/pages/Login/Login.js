import React from 'react'
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined, TwitterOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { signinJiraAction } from '../../redux/action/JiraAction';

function Login(props) {

   const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
   } = props;

   return (
      <form onSubmit={handleSubmit} className="container">
         <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }}>
            <h3 className="text-center h1" style={{ color: '#0052CC' }}>Login Jira</h3>
            <div className="mt-3 w-50" style={{ minWidth: 200 }}>
               <Input name="email" onChange={handleChange} size="large" placeholder="email" prefix={<UserOutlined />} />
            </div>
            <div className="text-danger">{errors.email}</div>
            <div className="mt-3 w-50" style={{ minWidth: 200 }}>
               <Input name="password" onChange={handleChange} type="password" size="large" placeholder="password" prefix={<LockOutlined />} />
            </div>
            <div className="text-danger">{errors.password}</div>
            <div className="w-50 mt-4">
               <Button htmlType="submit" size="large" type="primary" style={{ backgroundColor: 'rgb(7, 71, 166)', color: '#fff' }} className="w-100">Login</Button>
            </div>
            <div className="social m-2 d-flex ">
               <Button type="default" style={{ backgroundColor: 'rgb(59,89,152)' }} className="mr-2" type="primary" shape="circle" size={"large"}>
                  <span className="h4">f</span>
               </Button>
               <Button className="d-flex justify-content-center align-items-center" type="primary" shape="circle" icon={<TwitterOutlined />} size={"large"} />
            </div>
         </div>

      </form >
   )
}


const LoginJiraFormWithFormik = withFormik({
   mapPropsToValues: () => ({
      email: '',
      password: ''
   }),

   // Bắt validation kết hợp Formik với yup
   validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required!').email('Email is invalid!'),
      password: Yup.string().min(6, 'Password must have min 6 characters',).max(32, 'Password must have max 32 characters'),
   }),


   handleSubmit: (values, { props, setSubmitting }) => {

      props.dispatch(signinJiraAction(values.email, values.password));

   },

   displayName: 'LoginJira',
})(Login);



export default connect()(LoginJiraFormWithFormik);