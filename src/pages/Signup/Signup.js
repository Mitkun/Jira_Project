import React from 'react';
import './Signup.module.css';
import { useFormik, withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useDispatch, useSelector } from 'react-redux';
import { USER_SIGNUP_API } from '../../redux/constants/JiraConst';
import { Input, Button } from 'antd';


export default function Signup(props) {

   //check Email already exists!
   const { SignupErr } = useSelector(state => state.UserJiraReducer);
   const emailIsExist = () => {
      if (SignupErr !== '') {
         return true
      } return false
   }
   const dispatch = useDispatch()

   const formik = useFormik({
      initialValues: {
         email: "",
         passWord: "",
         name: "",
         phoneNumber: ""
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
            type: USER_SIGNUP_API,
            registrationInformation: values
         })
      },
   });

   return (
      <form onSubmit={formik.handleSubmit}>
         <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }}>
            <div className="container-fluid" style={{ backgroundColor: '#EEEEEE', display: 'flex', justifyContent: 'center' }}>
               <div style={{ fontFamily: '"Google Sans", "Noto Sans Myanmar UI", arial, sans-serif', width: '60%' }} className="bg-white p-5">
                  <h1 className="text-center mt-0 mb-5" style={{ color: '#0052CC' }}>Create Account</h1>
                  <div className="row mb-5">
                     <div className="col-12">
                        <div className="group">
                           <Input type="text" name="name" required onChange={formik.handleChange} />
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
                           <Input type="" name="email" required onChange={formik.handleChange} />
                           <span className="highlight" />
                           <span className="bar" />
                           <label>email</label>
                           {emailIsExist() ? <span className="text text-danger">Email already exists!</span> : ''}
                           {formik.touched.email && (<span className="text text-danger">{formik.errors.email}</span>)}
                           {/* <div className="text text-danger">{formik.errors.email}</div> */}
                        </div>
                     </div>
                  </div>
                  <div className="row mb-5">
                     <div className="col-12">
                        <div className="group">
                           <Input name="passWord" type="password" required onChange={formik.handleChange} />
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
                           <Input name="phoneNumber" type="number" required onChange={formik.handleChange} />
                           <span className="highlight" />
                           <span className="bar" />
                           <label>Phone Number</label>
                           {formik.touched.phoneNumber && (<span className="text text-danger">{formik.errors.phoneNumber}</span>)}
                           {/* <div className="text text-danger">{formik.errors.phoneNumber}</div> */}
                        </div>
                     </div>
                  </div>
                  <div className="row mb-5">
                     <button className="btn text-white bg-dark w-100 col-12" type="submit" style={{ fontSize: 25 }}>Register</button>
                  </div>
               </div>
            </div>
         </div>
      </form>
   )
}
