import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, Space, Tag, Popconfirm, Avatar, Popover, AutoComplete } from 'antd';
import ReactHtmlParser from 'react-html-parser'
import { DeleteOutlined, FormOutlined, UserDeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import FormEditProject from '../../component/Forms/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom';
import { ADD_USER_PROJECT_API, GET_USER_SAGA } from '../../redux/constants/UserConst';
import { OPEN_FORM_EDIT_PROJECT } from '../../redux/constants/FormConst';
import { DELETE_PROJECT_SAGA, EDIT_PROJECT } from '../../redux/constants/ProjectConst';
import { GET_LIST_PROJECT_SAGA, REMOVE_USER_PROJECT_API } from '../../redux/constants/ProjectJiraConst';



export default function ProjectManagement(props) {

   // Kỹ thuật Debounce Search
   const searchRef = useRef(null)

   const [value, setValue] = useState(''); //set value cho thẻ AutoComplate

   // Lấy dữ liệu từ reducer về
   const { projectList } = useSelector((state) => state.ProjectJiraReducer);

   const { userSearch } = useSelector((state) => state.UserJiraReducer)

   // Sử dụng useDispatch để gọi action
   const dispatch = useDispatch();


   const [state, setState] = useState({
      filteredInfo: null,
      sortedInfo: null,
   });

   useEffect(() => {
      dispatch({ type: GET_LIST_PROJECT_SAGA });

   }, [])


   const handleChange = (pagination, filters, sorter) => {
      // console.log('Various parameters', pagination, filters, sorter);
      setState({
         filteredInfo: filters,
         sortedInfo: sorter,
      });
   };


   const clearFilters = () => {
      setState({ filteredInfo: null });
   };

   const clearAll = () => {
      setState({
         filteredInfo: null,
         sortedInfo: null,
      });
   };

   const setAgeSort = () => {
      setState({
         sortedInfo: {
            order: 'descend',
            columnKey: 'age',
         },
      });


   };

   let { sortedInfo, filteredInfo } = state;
   sortedInfo = sortedInfo || {};
   filteredInfo = filteredInfo || {};

   const columns = [
      {
         title: 'Id',
         dataIndex: 'id',
         key: 'id',
         sorter: (item2, item1) => {
            return item2.id - item1.id;
         },

      },
      {
         title: 'Project Name',
         dataIndex: 'projectName',
         key: 'projectName',
         render: (text, record, index) => {
            return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>
         },
         sorter: (item2, item1) => {
            let projectName1 = item1.projectName?.trim().toLowerCase();
            let projectName2 = item2.projectName?.trim().toLowerCase();
            if (projectName2 < projectName1) {
               return -1;
            }
            return 1;
         }

      },

      {
         title: 'Category',
         dataIndex: 'categoryName',
         key: 'categoryName',
         sorter: (item2, item1) => {
            let category1 = item1.categoryName?.trim().toLowerCase();
            let category2 = item2.categoryName?.trim().toLowerCase();
            if (category2 < category1) {
               return -1;
            }
            return 1;
         }

      },

      {
         title: 'Creator',
         dataIndex: 'creator',
         key: 'creator',
         render: (text, record, index) => {
            return <Tag color="geekblue">{record.creator?.name}</Tag>
         },
         sorter: (item2, item1) => {
            let creator1 = item1.creator?.name.trim().toLowerCase();
            let creator2 = item2.creator?.name.trim().toLowerCase();
            if (creator2 < creator1) {
               return -1;
            }
            return 1;
         }

      },

      {
         title: 'Members',
         key: 'members',
         render: (text, record, index) => {
            return <div>
               {record.members?.slice(0, 3).map((member, index) => {
                  return (
                     <Popover key={index} placement="bottom" title="Members" content={() => {
                        return <table className="table">
                           <thead>
                              <tr>
                                 <th>Id</th>
                                 <th>Avatar</th>
                                 <th>Name</th>
                                 <th></th>
                              </tr>
                           </thead>
                           <tbody>
                              {record.members?.map((item, index) => {
                                 return <tr key={index}>
                                    <td>{item.userId}</td>
                                    <td><img src={item.avatar} width="30" height="30" style={{ borderRadius: '50%' }} /></td>
                                    <td>{item.name}</td>
                                    <td>
                                       <Button onClick={() => {
                                          dispatch({
                                             type: REMOVE_USER_PROJECT_API,
                                             userProject: {
                                                userId: item.userId,
                                                projectId: record.id
                                             }
                                          })
                                       }} style={{ borderRadius: '50%', height: '32px', width: '32px', padding: 0 }} type="primary" danger><UserDeleteOutlined /></Button>
                                    </td>

                                 </tr>
                              })}
                           </tbody>
                        </table>
                     }}>
                        <Avatar style={{ marginRight: '2px' }} key={index} src={member.avatar} />
                     </Popover>
                  )
               })}
               {record.members?.length > 3 ? <Avatar style={{ marginRight: '2px' }}>...</Avatar> : ''}

               <Popover placement="rightTop" title={'Add user'} content={() => {
                  return <AutoComplete style={{ width: '100%' }}
                     // do property (thuộc tính) options có các giá trị label và value mà userSearch trà về không có các giá trị đó nên cần dùng hàm map để chuyển về các giá trị mà options cần
                     options={userSearch?.map((user, index) => {
                        return { label: user.name, value: user.userId }
                     })}

                     value={value}

                     onChange={(text) => {
                        setValue(text)
                     }}

                     onSelect={(valueSelect, option) => {
                        //set giá trị của hộp thoại = option.label
                        setValue(option.label);
                        //Gọi api gửi về backend   
                        dispatch({
                           type: ADD_USER_PROJECT_API,
                           userProject: {
                              "projectId": record.id,
                              "userId": valueSelect
                           }
                        })
                     }}

                     onSearch={(value) => {
                        if (searchRef.current) {
                           clearTimeout(searchRef.current)
                        }
                        searchRef.current = setTimeout(() => {
                           dispatch({
                              type: GET_USER_SAGA,
                              keyword: value,
                           })
                        }, 500)
                     }} />
               }} trigger="click">
                  <Button style={{ borderRadius: '50%', height: '32px', width: '32px', padding: 0 }} type="primary"><UserAddOutlined /></Button>
               </Popover>
            </div>
         }
      },

      {
         title: 'Action',
         dataIndex: 'creator',
         key: 'x',
         render: (text, record, index) => (
            <Space size="middle">
               <button className="btn btn-primary text-white" onClick={() => {
                  const action = {
                     type: OPEN_FORM_EDIT_PROJECT,
                     title: 'Edit Project',
                     Component: <FormEditProject />
                  }
                  dispatch(action)

                  // dispatch dữ liệu (chứa trong record) lên reducer
                  const actionEditProject = {
                     type: EDIT_PROJECT,
                     projectEditModel: record
                  }
                  dispatch(actionEditProject)
               }}><FormOutlined style={{ fontSize: 17 }} /></button>

               <Popconfirm
                  title="Are you sure to delete this project?"
                  onConfirm={() => {
                     dispatch({
                        type: DELETE_PROJECT_SAGA,
                        idProject: record.id
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

   return (
      <div className="container-fluid m-5">
         <h3>Project Management</h3>
         <Space style={{ marginBottom: 16 }}>
            <Button onClick={setAgeSort}>Sort age</Button>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
         </Space>
         <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />

      </div>
   )
}
