import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            first_name: '',
            last_name: '',
            dob: '',
            email: '',
            password: '',
            password_confirm: '',
            skills: '',
            country: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            dob: this.state.dob,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Sign Up</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="User Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                    })}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="First Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.first_name
                    })}
                    name="first_name"
                    onChange={ this.handleInputChange }
                    value={ this.state.first_name }
                    />
                    {errors.first_name && (<div className="invalid-feedback">{errors.first_name}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Last Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.last_name
                    })}
                    name = "last_name"
                    onChange={ this.handleInputChange }
                    value={ this.state.last_name }
                    />
                    {errors.last_name && (<div className="invalid-feedback">{errors.last_name}</div>)}
                </div>
                 <div className="form-group">
                    <input
                    type="date"
                    placeholder="Date of Birth"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.dob
                    })}
                    name = "dob"
                    onChange={ this.handleInputChange }
                    value={ this.state.dob }
                    />
                    {errors.dob && (<div className="invalid-feedback">{errors.dob}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password_confirm
                    })}
                    name="password_confirm"
                    onChange={ this.handleInputChange }
                    value={ this.state.password_confirm }
                    />
                    {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register User
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))