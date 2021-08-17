import { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "../../component/Home/Header/Header";



export const HomeTemplate = (props) => { //path, exact, Component
   const { Component, ...resProps } = props;


   return <Route {...resProps} render={(propsRoute) => { // props.location, props.history, props.match
      return <Fragment>
         <Header />
         <Component {...propsRoute} />

      </Fragment>

   }} />
}