import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './core/Home'
import Menu from './core/Menu'
import Profile from './user/Profile.js'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Users from './user/Users.js'
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import FindPeople from "./user/FindPeople";
import NewPost from './post/NewPost'


const MainRouter = () =>(
    <div>
        <Menu />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={Users} />

            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <PrivateRoute  path="/user/edit/:userId" exact  component={EditProfile} />
            <PrivateRoute  path="/user/:userId" exact  component={Profile} />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/post/create" component={NewPost} />




        </Switch>
    </div>

)
export default MainRouter;