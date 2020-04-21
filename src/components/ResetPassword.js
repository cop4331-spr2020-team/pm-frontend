import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Spinner, FormFeedback, Alert } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email:"",
            isEmailInvalid: false,
            loading:false,
            successEmail: false
        };
    }

    validFormat = () => {   // Valid email format
        const {email} = this.state;

        if(!emailRegex.test(email)){
            this.setState({
                isEmailInvalid: true,
            })
            return false;
        }
        return true;
    }

    handleSubmit = (event) => {
        this.setState({loading:true});

        const {email} = this.state;

        if(this.validFormat()){

            axios.post("http://api.parkingmanagerapp.com/auth/reset", {
                email: email,
            })
            .then(result => {
                if(result.status === 200) {
                    console.log('success');
                    this.setState({
                        successEmail: true,
                    });
                }
            })
            .catch(error => {
                this.setState({
                    isEmailInvalid:true
                });
            });
        }
        this.setState({loading:false});
    }

    handleEmailChange = (event) => {
		this.setState({ 
            email: event.target.value,
            isEmailInvalid:false
		})
    }
    
    componentDidUpdate(){
        setTimeout(() => this.setState({successEmail: false}), 60000);
    }

    render() {
            return(
                <Form className="col-lg-4 container-fluid p-3 my-3 mt-5 bg-light rounded">
                    {this.state.successEmail && <Alert color="success">
                        Email for password reset successfully sent! 
                        Please wait 60 seconds before sending 
                        another request.
                    </Alert>}
                   
                        <FormGroup>
                            <Label>Please enter your registered email to reset your password.</Label>
                            <Input
                                className="text"
                                type="text"
                                value={this.state.email}
                                placeholder="Email Address"
                                onChange={this.handleEmailChange}
                                invalid={this.state.isEmailInvalid}
                            />
                            {this.state.isEmailInvalid && <FormFeedback>
                                This email address is invalid. Please try again or register for a new account
                                </FormFeedback>}
                        </FormGroup>

                        <Button className="btn-warning btn-lg btn-block rounded-pill" 
                            onClick={this.handleSubmit} 
                            disabled={this.state.email === "" || this.state.successEmail} // Disable button if fields are empty or when loading
                            >
                            {this.state.loading && <Spinner color="primary"/>} {/*Loading animation*/}
                            Reset Password
                        </Button>
                        <Link to="./" className="register-link"><span className="ml-2">Go back to login page</span></Link>
                  
                </Form>
            );
        
    }
}
