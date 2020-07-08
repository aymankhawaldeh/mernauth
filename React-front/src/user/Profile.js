
import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {isAuthenticated} from '../auth'
import {read} from './apiUser'
import DefaultProfile from "../images/avatar.png";
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTaps'
require('dotenv').config()

class Profile extends Component {
     constructor(){
        super()
        this.state={
                user: {following: [], followers: []},
                RedirectToSignin: false,
                following: false,
                error: ""
        }
    }



    
    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
          // one id has many other ids (followers) and vice versa
          return follower._id === jwt.user._id;
        });
        return match;
      };
       



      clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
    
        callApi(userId, token, this.state.user._id).then(data => {
          if (data.error) {
            this.setState({ error: data.error });
          } else {
            this.setState({ user: data, following: !this.state.following });
          }
        });
      };




    init = (userId) =>{
        const token = isAuthenticated().token
        read(userId, token)
      
        .then(data => {
            if(data.error){
               this.setState({RedirectToSignin: true})
            } else {
                let following = this.checkFollow(data)

                this.setState({user: data, following: following})
            }
        })

    }

    componentDidMount() {
        console.log("user id from route params ", this.props.match.params.userId);
        const userId = this.props.match.params.userId;
        this.init(userId)
    }
    
    componentWillReceiveProps(props) {
        console.log("user id from route params ", this.props.match.params.userId);
        const userId = props.match.params.userId;
        this.init(userId)
    }

    render() { 
        const {RedirectToSignin, user} = this.state;
        if(RedirectToSignin) return <Redirect to="/signin" />
        const photoUrl = user._id ? `${process.env.REACT_APP_API}/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile

        return ( 
            <div className="container">
                                <h2 className="mt-5 mb-5">Profile</h2>

                <div  class="d-md-flex h-md-100 align-items-center">
                <div class="col-md-6 p-0 bg-indigo h-md-100">
                <img className="img-thumbnail" style={{height: "200px", width: "auto"}} src={photoUrl} alt={user.name} onError={i => (i.target.src = `${DefaultProfile}`)}/>
         

        

                </div>
                <div class="col-md-6 p-0  h-md-100 loginarea">
                <div className="lead mt-5 ml-5">
                <p>NAME: {user.name}</p>
            <p>EMAIL: {user.email}</p>
            {/* <p>Email {isAuthenticated().user.email}</p> */}

        <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                </div>
                    {isAuthenticated().user && isAuthenticated().user._id == user._id ? (
                        <div className="dd-inline-block mt-5">
                             <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>Edit Porfile</Link>
                             <DeleteUser userId={user._id} />
                        </div>
                    ): (<FollowProfileButton following={this.state.following} onButtonClick={this.clickFollowButton}/>)}

                </div>
                </div>
                <div className="row">
                    <div className="col md-12 mt-3 mb-3">
                        <hr />
                        <p className="lead">Bio: {user.about}</p>
                        <hr />
                    <ProfileTabs followers={user.followers} following={user.following}/>
                    </div>
                </div>
 
            </div>
            
         );
    }
}
 
export default Profile;