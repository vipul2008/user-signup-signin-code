import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

class Profile extends Component {

    render() {
        let {
            user
        } = this.props.auth;
        console.log('name', user);
        return (
               <div className="container" style={{ marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px', textAlign: 'center'}}>Profile Information</h2>
                <form>
                    <div className="form-group">
                        <label>User Name</label>
                        <input
                        type="text"
                        readOnly
                        className={classnames('form-control form-control-lg')}
                        name="name"
                        value={ user.name }
                        />
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                        type="text"
                        readOnly
                        className={classnames('form-control form-control-lg')}
                        name="first_name"
                        value={ user.first_name }
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                        type="text"
                        readOnly
                        className={classnames('form-control form-control-lg')}
                        name = "last_name"
                        value={ user.last_name }
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                        type="text"
                        readOnly
                        className={classnames('form-control form-control-lg')}
                        name = "last_name"
                        value={ new Date(user.dob).toDateString() }
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                        type="email"
                        readOnly
                        className={classnames('form-control form-control-lg')}
                        name="email"
                        value={ user.email }
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Profile));