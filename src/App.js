import React from 'react';
import './App.css';

import { Switch, } from 'react-router-dom';
import Login from './pages/Login/Login';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoadingComponent from './component/GlobalSetting/LoadingComponent/LoadingComponent';
import { useSelector } from 'react-redux'
import { JiraTemplate } from './templates/HomeTemplate/JiraTemplate';
import CreateProject from './pages/CreateProject/CreateProject';
import ProjectManagement from './pages/ProjectManagement/ProjectManagement';
import indexJira from './component/Jira/indexJira';
import DrawerJiraHOC from './HOC/DrawerJiraHOC';
import FormComment from './component/Forms/FormComment/FormComment';
import Signup from './pages/Signup/Signup';
import UsersManagement from './pages/UsersManagement/UsersManagement';

function App() {

  const userLogin = useSelector(state => state.UserJiraReducer.userLogin)

  return (
    <>
      <LoadingComponent />
      <DrawerJiraHOC />
      <Switch>


        <UserLoginTemplate path="/login" exact Component={Login} />
        <UserLoginTemplate path="/signup" exact Component={Signup} />

        <JiraTemplate exact path="/jira" Component={indexJira} />
        <JiraTemplate exact path="/createproject" Component={CreateProject} />
        <JiraTemplate exact path="/formcomment" Component={FormComment} />
        <JiraTemplate exact path="/projectmanagement" Component={ProjectManagement} />
        <JiraTemplate exact path="/projectdetail/:projectId" Component={indexJira} />
        <JiraTemplate exact path="/usersmanagement" Component={UsersManagement} />

        {
          userLogin?.accessToken ? <JiraTemplate exact path="/" Component={ProjectManagement} /> : <UserLoginTemplate exact path="/" Component={Login} />
        }

      </Switch>
    </>
  );
}

export default App;
