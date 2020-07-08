import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from "../auth"

const isActive = (history, path) =>{
    if(history.location.pathname === path) return {color: "#ff9900"};
    else return {color: "#ffffff"}
}

const Menu = ({history}) =>(
    <div>
        <ul className="nav nav-tabs bg-primary" >
   

    {!isAuthenticated() && (
        <React.Fragment>
              <li className="nav-item">
               <Link style={isActive(history, "/")} className="nav-link" to="/">Home</Link>
             </li>

             <li className="nav-item">
               <Link style={isActive(history, "/users")} className="nav-link" to="/users">Users</Link>
             </li>


          <li className="nav-item">
          <Link style={isActive(history, "/signin")} className="nav-link" to="/signin">Sign In</Link>
          </li>
      
          <li className="nav-item">
          <Link style={isActive(history, "/signup")} className="nav-link" to="/signup">Sign Up</Link>
          </li>
          </React.Fragment>
      
    )}
      {isAuthenticated() && (
        <React.Fragment>
             <li className="nav-item">
                        <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link">
                            Find People
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/post/create`} style={isActive(history, `/post/create`)} className="nav-link">
                            Create Post
                        </Link>
                    </li>
             <li className="nav-item">
               <Link style={isActive(history, "/")} className="nav-link" to="/">Home</Link>
             </li>
             <li className="nav-item">
               <Link style={isActive(history, "/users")} className="nav-link" to="/users">Users</Link>
             </li>
         
         <li className="nav-item"> 
         <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link"
                        >
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>         </li>
                        <li className="nav-item">
            <a style={(isActive(history, "/signup"), {cursor: "pointer", color: "#fff"})} className="nav-link" onClick={() => signout(() => history.push('/'))}>Sign Out</a>
         </li>

          </React.Fragment>
      
    )}
    
        </ul>

    </div>
)
export default withRouter(Menu);

