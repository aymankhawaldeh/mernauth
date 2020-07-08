import React, { Component } from "react";
import Swal from 'sweetalert2'
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { remove } from "./apiUser";
import { signout } from "../auth";

class DeleteUser extends Component {
    state = {
        redirect: false
    };

    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                // signout user
                signout(() => console.log("User is deleted"));
                // redirect
                this.setState({ redirect: true });
            }
        });
    };
    alertDeleteSuccessfully = () =>{
         
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Deleted Successfully',
    showConfirmButton: false,
    timer: 1500
  })
    }

    deleteConfirmed = () => {
           let answer = Swal.fire({
            title: 'Are you sure you want to delete your account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33', 
            confirmButtonText: 'Yes!'
         }).then((result) => {
            if(result.value){
             this.deleteAccount()
           }
         })
    };

    render() {
        if (this.state.redirect) {
            this.alertDeleteSuccessfully()
            return <Redirect to="/" />
            
            
        }
        return (
            <button
                onClick={this.deleteConfirmed}
                className="btn btn-raised btn-danger"
            >
                Delete Profile
            </button>
        );
    }
}

export default DeleteUser;









