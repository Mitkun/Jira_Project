import React, { useEffect } from 'react';
import './Signup.module.css';
import { useFormik, withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'antd';
import { EDIT_USER_SAGA } from '../../../redux/constants/UserConst';
import { SET_SUBMIT_EDIT_USER } from '../../../redux/constants/SubmitConst';


export default function FormEditUser(props) {


   const { userEdit } = useSelector(state => state.UserEditReducer);

   const dispatch = useDispatch()

   useEffect(() => {

      dispatch({
         type: SET_SUBMIT_EDIT_USER,
         submitFunction: formik.handleSubmit
      })

   }, [])


   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         id: userEdit?.userId,
         email: userEdit?.email,
         passWord: userEdit?.passWord,
         name: userEdit?.name,
         phoneNumber: userEdit?.phoneNumber
      },



      validationSchema: Yup.object().shape({
         email: Yup.string()
            .email("Invalid email format")
            .required("Emai is required!"),
         passWord: Yup.string()
            .min(8, "Password must have min 8 characters")
            .required("Password is required!"),
         name: Yup.string()
            .min(2, "Name must have min 2 characters")
            .max(15, "Name must have max 15 characters")
            .required("Name is required!"),
         phoneNumber: Yup.number()
            .required("Phone number is required!")
      }),
      onSubmit: (values) => {
         dispatch({
            type: EDIT_USER_SAGA,
            userEdit: values
         })
      },
   });


   return (
      <form >
         <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ fontFamily: '"Google Sans", "Noto Sans Myanmar UI", arial, sans-serif', width: '60%' }} className="bg-white p-5">
               <h1 className="text-center mt-0 mb-5" style={{ color: '#0052CC' }}>Edit Account</h1>
               <div className="row mb-5">
                  <div className="col-12">
                     <div className="group">
                        <Input type="text" name="id" disabled value={formik.values.id} required />
                        <span className="highlight" />
                        <span className="bar" />
                     </div>
                  </div>
               </div>
               <div className="row mb-5">
                  <div className="col-12">
                     <div className="group">
                        <Input type="text" name="name" value={formik.values.name} required onChange={formik.handleChange} />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>Name</label>
                        {formik.touched.name && (<span className="text text-danger">{formik.errors.name}</span>)}
                        {/* <div className="text text-danger">{formik.errors.name}</div> */}
                     </div>
                  </div>
               </div>
               <div className="row mb-5">
                  <div className="col-12">
                     <div className="group">
                        <Input type="" name="email" value={formik.values.email} required onChange={formik.handleChange} />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>email</label>
                        {formik.touched.email && (<span className="text text-danger">{formik.errors.email}</span>)}
                        {/* <div className="text text-danger">{formik.errors.email}</div> */}
                     </div>
                  </div>
               </div>
               <div className="row mb-5">
                  <div className="col-12">
                     <div className="group">
                        <Input name="passWord" type="password" value={formik.values.passWord} required onChange={formik.handleChange} />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>Passworld</label>
                        {formik.touched.passWord && (<span className="text text-danger">{formik.errors.passWord}</span>)}
                        {/* <div className="text text-danger">{formik.errors.passWord}</div> */}
                     </div>
                  </div>
               </div>
               <div className="row mb-5">
                  <div className="col-12">
                     <div className="group">
                        <Input name="phoneNumber" type="number" value={formik.values.phoneNumber} required onChange={formik.handleChange} />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>Phone Number</label>
                        {formik.touched.phoneNumber && (<span className="text text-danger">{formik.errors.phoneNumber}</span>)}
                        {/* <div className="text text-danger">{formik.errors.phoneNumber}</div> */}
                     </div>
                  </div>
               </div>
               <div className="row mb-5">

               </div>
            </div>
         </div>
      </form>
   )
}
