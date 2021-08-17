import React from 'react'
import ContentMain from '../../component/Jira/Main/ContentMain'
import HeaderMain from '../../component/Jira/Main/HeaderMain'
import InfoMain from '../../component/Jira/Main/InfoMain'

export default function indexJira(props) {
   return (
      <div>
         <div className="main">
            <HeaderMain />
            <InfoMain />
            <ContentMain />
         </div>
      </div>
   )
}
