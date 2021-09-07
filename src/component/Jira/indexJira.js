import React, { useEffect } from 'react';
import ContentMain from './Main/ContentMain';
import HeaderMain from './Main/HeaderMain';
import InfoMain from './Main/InfoMain';
import { useSelector, useDispatch } from 'react-redux';
import { GET_PROJECT_DETAIL_SAGA } from '../../redux/constants/ProjectConst';


export default function IndexJira(props) {

   const { projectDetail } = useSelector(state => state.ProjectReducer);

   const dispatch = useDispatch()

   useEffect(() => {
      //Khi người dùng link qua trang này bằng thẻ navink hoặc người dùng tự gõ url thì ta sẽ lấy tham số từ url => gọi saga
      const { projectId } = props.match.params;
      dispatch({
         type: GET_PROJECT_DETAIL_SAGA,
         projectId
      })
   }, [])

   return (
      <div className="container-fluid">
         <div className="main">
            <HeaderMain projectDetail={projectDetail} />
            <InfoMain projectDetail={projectDetail} />
            <ContentMain projectDetail={projectDetail} />
         </div>
      </div>
   )
}
