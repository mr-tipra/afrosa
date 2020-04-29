import React,{Fragment, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import VerifyEmail from "./components/auth/VerifyEmail";
import Alert from "./components/layout/Alert";
import {loadUser} from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-form/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateRouteVerified from "./components/routing/PrivateRouteVerified";
import PrivateRouteAdmin from "./components/routing/PrivateRouteAdmin";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddQualification from "./components/profile-form/AddQualification";
import Footer from "./components/layout/Footer";

import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import CompaniesMap from "./components/maps/CompaniesMap.js"

import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

import MessageList from "./components/messages/MessageList";
import Team from "./components/team/Team";

//website loader
import WebsiteLoader from "./components/layout/WebsiteLoader";

//admin
import UsersList from "./components/admin/UsersList";

// Redux
import {Provider} from "react-redux";
import store from "./store";

//styling
import "./styles/main.scss";

//arcgis
import { setDefaultOptions } from "esri-loader";
setDefaultOptions({css: true});



if(localStorage.getItem("token"))
        setAuthToken(localStorage.getItem("token"));
  


function App() {
  
  const [siteLoading, setSiteLoading] = useState(true);
  useEffect(() => {
    store.dispatch(loadUser());
    const path = window.location.href.split("/");
    if(path[path.length-1] != "")
      loadComplete();
  },[]);

  const loadComplete = () => {
    setTimeout(() => {  
      setSiteLoading(false);
      document.querySelector(".page-container").style.display='block';
      setTimeout(() => {
        document.querySelector(".page-container").style.opacity='1.0';
      }, 0);
    }, 2000);
  };

  return <Fragment>
    {siteLoading && <WebsiteLoader />  }
   <div className="page-container">
    <Provider store = {store}>
      <Router>
          <Navbar />
         
          <Alert />
          <Switch>
            <Route exact path="/" render={props => <Landing {...props} onLoad={loadComplete} /> } />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/verifyemail/:token" component={VerifyEmail}/>
            <Route exact path="/team" component={Team} />
            <PrivateRoute exact path="/dashboard"  component={Dashboard} />
            <PrivateRoute exact path="/createprofile"  component={CreateProfile} />
            <PrivateRoute exact path="/editprofile" component={EditProfile} />
            <PrivateRoute exact path="/addexperience" component={AddExperience} />
            <PrivateRoute exact path="/addqualification" component={AddQualification} />
            <PrivateRouteVerified exact path="/profiles" component={Profiles} />
            <PrivateRouteVerified exact path="/profile/:id" component={Profile} />
            <PrivateRouteVerified exact path="/maps/companies" component={CompaniesMap} />
            <PrivateRouteVerified exact path="/posts" component={Posts} />
            <PrivateRouteVerified exact path="/posts/:id" component={Post} />
            <PrivateRouteVerified exact path="/messages" component={MessageList} />
            
            <PrivateRouteAdmin exact path="/admin/userslist" component={UsersList} />
          </Switch>
          <Footer />
      </Router>
    </Provider>
    </div>
    </Fragment>
  ;
}

export default App;
