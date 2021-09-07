import React from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_DRAWER, OPEN_DRAWER } from '../redux/constants/DrawerConst';
import { HIDE_LOADING } from '../redux/constants/LoadingConst';


export default function DrawerJiraHOC(props) {

   const { visible, ComponentContentDrawer, callBackSubmit, title } = useSelector((state) => state.DrawerReducer);
   const dispatch = useDispatch();

   const onClose = () => {
      dispatch({
         type: CLOSE_DRAWER,
         visible: false,
      });
      dispatch({ type: HIDE_LOADING })
   };

   return (
      <>
         {/* <button onClick={showDrawer}>Drawer</button> */}
         <Drawer
            title={title}
            width={720}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
               <div
                  style={{
                     textAlign: 'right',
                  }}
               >
                  <Button onClick={() => {
                     dispatch({ type: CLOSE_DRAWER })
                     dispatch({ type: HIDE_LOADING })
                  }} style={{ marginRight: 8 }}>
                     Cancel
                  </Button>
                  <Button onClick={callBackSubmit} type="primary">
                     Submit
                  </Button>
               </div>
            }
         >
            {/* Content Drawer */}
            {ComponentContentDrawer}

         </Drawer>
      </>
   )
}
