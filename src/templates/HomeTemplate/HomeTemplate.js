import { Fragment } from "react";
import { Route, Redirect } from 'react-router-dom';
import Header from "../../component/Home/Header/Header";
import { USER_LOGIN } from "../../util/constants/settingSystem";



export const HomeTemplate = (props) => { //path, exact, Component
   const { Component, ...resProps } = props;

   if (!localStorage.getItem(USER_LOGIN)) {
      return <Redirect to='/login' />
   }

   return <Route {...resProps} render={(propsRoute) => { // props.location, props.history, props.match
      return <Fragment>
         <Header />
         <Component {...propsRoute} />

      </Fragment>

   }} />
}