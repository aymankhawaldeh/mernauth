import React, { Component } from 'react';
import {Redirect } from "react-router-dom";
import { authenticate, signin} from '../auth'
class  Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        
        };
    }


 
      handleChange = name => event => {
        this.setState({  error: ""})
        this.setState({ [name]: event.target.value });
    };


      clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true})
        const { email, password} = this.state;
        const user = {
            // u also can write them like this name, password, email this is because they are the same key and val
            email: email,
            password: password
        }   

       signin(user)
       .then(data => {
           if(data.error) {  
               this.setState({ error: data.error, loading: false }) 
            } else { 
                authenticate(data, () =>{
                    this.setState({redirectToReferer: true})
                })
        }
       })
    };



    signinForm = ( email, password) =>(
        <form>

        <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange={this.handleChange("email")} type="email" className="form-control" value={email}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={this.handleChange("password")} type="password" className="form-control" value={password}/>
        </div>
        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
    </form>
    )

     render(){
         const { email, password, error, redirectToReferer, loading} = this.state;
         if(redirectToReferer){
             return <Redirect to="/" />
         }
         return(
             <div className="container">
                 <h2 className="mt-5 mb-5">Sign In</h2>

                 <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                     {error}

                 </div>
                 {loading ? ( <div className="jumbotron text-center"> 
                  <h2>loading...</h2>
                  </div> ) : (""
                  )}
         

                {this.signinForm(email, password)}
             </div>

         )
     }
}
export default Signin;