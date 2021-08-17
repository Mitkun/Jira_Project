import React from 'react';
import { Route } from 'react-router-dom';
import ContentMain from '../../component/Jira/Main/ContentMain';
import HeaderMain from '../../component/Jira/Main/HeaderMain';
import InfoMain from '../../component/Jira/Main/InfoMain';
import MenuJira from '../../component/Jira/MenuJira';
import ModalJira from '../../component/Jira/ModalJira/ModalJira';
import SidebarJira from '../../component/Jira/SidebarJira';
import '../../index.css'


export const JiraTemplate = (props) => {

   const { Component, ...resParam } = props;
   return <Route {...resParam} render={(propsRoute) => {
      return <>
         <div className="jira">
            <SidebarJira />
            <MenuJira />
            <Component {...propsRoute} />
            <ModalJira />
         </div>




      </>
   }} />
}