import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GET_USER_SAGA } from '../../redux/constants/UserConst';





export default function MenuJira(props) {

   const { userLogin } = useSelector(state => state.UserJiraReducer);


   return (
      <div className="menu">
         <div className="account">
            <div className="avatar">
               <img src={userLogin?.avatar} alt="logo" />
            </div>
            <div className="account-info">
               <p>JiraBug.vn</p>
               <p>Hello {userLogin?.name}</p>
            </div>
         </div>
         <div className="control">
            <div>
               <NavLink to='/jira' activeClassName="active" activeStyle={{ background: 'rgb(235, 236, 240)', color: 'rgb(0, 82, 204)' }} className="h6">
                  <i className="fa fa-credit-card mr-2" />
                  <span>Jira Board</span>
               </NavLink>
            </div>

            <div>
               <NavLink to='/projectmanagement' activeClassName="active" activeStyle={{ background: 'rgb(235, 236, 240)', color: 'rgb(0, 82, 204)' }} className="h6">
                  <i className="fa fa-cog mr-2" />
                  <span>Project Management</span>
               </NavLink>
            </div>

         </div>
         <div className="feature">
            <div>
               <NavLink to='/usersmanagement' activeClassName="active" activeStyle={{ background: 'rgb(235, 236, 240)', color: 'rgb(0, 82, 204)' }} className="h6">
                  <i className="fa fa-users mr-1" />
                  <span>Users Management</span>
               </NavLink>
            </div>
         </div>
      </div>

   )
}
