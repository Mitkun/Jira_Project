import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { BarsOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import FormCreateTask from '../Forms/FormCreateTask/FormCreateTask';
import FormEditProject from '../Forms/FormEditProject/FormEditProject';
import { OPEN_FORM_CREATE_TASK } from '../../redux/constants/FormConst';
import { NavLink } from 'react-router-dom';



const { Header, Sider, Content } = Layout;

export default function SidebarJira(props) {

   const dispatch = useDispatch();

   const [state, setState] = useState({
      collapsed: false,
   })

   const toggle = () => {
      setState({
         collapsed: !state.collapsed,
      });
   };

   return (
      <div>
         <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ height: '100%' }}>
            <div className="text-right pr-2" onClick={toggle}><BarsOutlined style={{ cursor: 'pointer', color: '#fff', fontSize: '30px' }} /></div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
               <Menu.Item key="1" icon={<PlusOutlined style={{ fontSize: 20 }} />}>
                  <NavLink to='/createproject' className="h5">
                     <span>Create Project</span>
                  </NavLink>
               </Menu.Item>
               <Menu.Item key="2" icon={<PlusOutlined style={{ fontSize: 20 }} />} onClick={() => {
                  const action = {
                     type: OPEN_FORM_CREATE_TASK,
                     title: 'Edit Project',
                     Component: <FormCreateTask />
                  }
                  dispatch(action)
               }}>
                  <span className="mb-2 h5">Create task</span>
               </Menu.Item>

            </Menu>
         </Sider>
      </div>

   )
}
