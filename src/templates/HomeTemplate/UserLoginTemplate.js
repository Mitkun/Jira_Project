import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;








export const UserLoginTemplate = (props) => {

   const [size, setSize] = useState({ width: Math.round(window.innerWidth), height: Math.round(window.innerHeight) })


   useEffect(() => {
      window.onresize = () => {
         setSize({
            width: Math.round(window.innerWidth),
            height: Math.round(window.innerHeight),
         })
      }
   }, [])


   let { Component, ...resRoute } = props;

   return <Route {...resRoute} render={(propsRoute) => {
      return <>
         <Layout>
            <Sider width={size.width / 2} style={{ height: size.height, backgroundImage: `url(https://picsum.photos/${Math.round(size.width / 2)}/${size.height})`, backgroundSize: '100%' }}>
            </Sider>
            <Content>
               <Component {...propsRoute} />
            </Content>
         </Layout>
      </>
   }} />
}





