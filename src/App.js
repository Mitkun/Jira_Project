import React, { useEffect, useState } from 'react';
import './App.css';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { BrowserRouter, Router, Switch, useHistory } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoadingComponent from './component/GlobalSetting/LoadingComponent/LoadingComponent';
import { useDispatch } from 'react-redux'
import { ADD_HISTORY } from './redux/constants/HistoryConst';
import { JiraTemplate } from './templates/HomeTemplate/JiraTemplate';
import indexJira from './redux/sagas/indexJira';
import CreateProject from './pages/CreateProject/CreateProject';

function App() {

  // const history = useHistory();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: ADD_HISTORY,
  //     history: history
  //   });
  // }, [])



  return (
    <>
      <LoadingComponent />
      <Switch>

        <HomeTemplate path="/home" exact Component={Home} />

        <UserLoginTemplate path="/login" exact Component={Login} />

        <JiraTemplate path="/jira" exact Component={indexJira} />
        <JiraTemplate path="/createproject" exact Component={CreateProject} />

        <HomeTemplate path="/" exact Component={Home} />

      </Switch>
    </>
  );
}

export default App;
