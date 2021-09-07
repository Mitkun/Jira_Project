import React, { useEffect } from 'react';
import { Popconfirm, Table, Input, Space } from 'antd';
import { AudioOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_USER_SAGA, EDIT_USER, GET_USER_SAGA } from '../../redux/constants/UserConst';
import { OPEN_FORM_EDIT_USER } from '../../redux/constants/FormConst';
import Signup from '../Signup/Signup';
import FormEditUser from '../../component/Forms/FormEditUser/FormEditUser';

export default function UsersManagement() {
   // userSearch gồm toàm bộ các user
   const { userSearch } = useSelector((state) => state.UserJiraReducer);


   const dispatch = useDispatch()

   useEffect(() => {
      dispatch({
         type: GET_USER_SAGA,
         keyword: '',
      })
   }, [])

   const { Search } = Input;

   const columns = [
      {
         title: 'User Id',
         dataIndex: 'userId',
         sorter: (a, b) => a.userId - b.userId,
         sortDirections: ['descend', 'ascend'],
         width: 100
      },
      {
         title: 'Name',
         dataIndex: 'name',
         sorter: (item2, item1) => {
            let name1 = item1.name?.trim().toLowerCase();
            let name2 = item2.name?.trim().toLowerCase();
            if (name2 < name1) {
               return -1;
            }
            return 1;
         },
         sortDirections: ['descend', 'ascend'],
         width: 400
      },
      {
         title: 'Email',
         dataIndex: 'email',
         sorter: (item2, item1) => {
            let email1 = item1.email?.trim().toLowerCase();
            let email2 = item2.email?.trim().toLowerCase();
            if (email2 < email1) {
               return -1;
            }
            return 1;
         },
         sortDirections: ['descend', 'ascend'],
         width: 400
      },
      {
         title: 'Phone number',
         dataIndex: 'phoneNumber',
         sorter: (a, b) => a.phoneNumber - b.phoneNumber,
         sortDirections: ['descend', 'ascend'],
         width: 300
      },

      {
         title: 'Action',
         dataIndex: 'creator',
         key: 'x',
         render: (text, record, index) => (
            <Space size="middle">
               <button className="btn btn-primary text-white" onClick={() => {
                  dispatch({
                     type: OPEN_FORM_EDIT_USER,
                     title: 'Edit User',
                     Component: <FormEditUser />
                  })
                  //dispatch dữ liệu lên reducer
                  dispatch({
                     type: EDIT_USER,
                     userEdit: record
                  })

               }}><FormOutlined style={{ fontSize: 17 }} /></button>

               <Popconfirm
                  title="Are you sure to delete this user?"
                  onConfirm={() => {
                     dispatch({
                        type: DELETE_USER_SAGA,
                        userId: record.userId
                     })
                  }}
                  okText="Yes"
                  cancelText="No"
               >
                  <button className="btn btn-danger text-white"><DeleteOutlined style={{ fontSize: 17 }} /></button>
               </Popconfirm>,


            </Space>
         ),
      },

   ];

   const suffix = (
      <AudioOutlined
         style={{
            fontSize: 16,
            color: '#1890ff',
         }}
      />
   );

   const onSearch = value => {
      dispatch({
         type: GET_USER_SAGA,
         keyword: value,
      })
   };

   function onChange(pagination, filters, sorter, extra) {
      // console.log('params', pagination, filters, sorter, extra);
   }


   return (
      <div className="container-fluid m-5">
         <h3>Users Management</h3>
         <div className="container">
            <Search
               enterButton
               size="large"
               onSearch={onSearch}
            />
         </div>
         <Table columns={columns} dataSource={userSearch} onChange={onChange} />
      </div>
   )
}
