import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuJira(props) {
   return (
      <div className="menu">
         <div className="account">
            <div className="avatar">
               <img src={require('../../assets/img/logo.jpg').default} alt="logo" />
            </div>
            <div className="account-info">
               <p>JiraBug.vn</p>
               <p>Report bugs</p>
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
               <NavLink to='createproject' activeClassName="active" activeStyle={{ background: 'rgb(235, 236, 240)', color: 'rgb(0, 82, 204)' }} className="h6">
                  <i className="fa fa-cog mr-2" />
                  <span>Create Project</span>
               </NavLink>
            </div>
         </div>
         <div className="feature">
            <div>
               <i className="fa fa-truck mr-1" />
               <span>Releases</span>
            </div>
            <div>
               <i className="fa fa-equals mr-1" />
               <span>Issues and filters</span>
            </div>
            <div>
               <i className="fa fa-paste mr-1" />
               <span>Pages</span>
            </div>
            <div>
               <i className="fa fa-location-arrow mr-1" />
               <span>Reports</span>
            </div>
            <div>
               <i className="fa fa-box mr-1" />
               <span>Components</span>
            </div>
         </div>
      </div>

   )
}
