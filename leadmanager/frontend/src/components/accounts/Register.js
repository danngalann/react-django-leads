import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createErrors } from "../../actions/messages";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password != password2) {
      this.props.createErrors({ passwordsNotMatch: "Passwords do not match" });
    } else {
      const newUser = { username, email, password };
      this.props.register(newUser);
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    // If the user is logged in, redirect to the dashboard
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { username, email, password, password2 } = this.state;
    return (
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          <div className="input-field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={this.onChange}
              value={username}
              required
            />
          </div>
          <div className="input-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
              required
            />
          </div>
          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.onChange}
              value={password}
              required
            />
          </div>
          <div className="input-field">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password2"
              onChange={this.onChange}
              value={password2}
              required
            />
          </div>
          <div className="input-field">
            <button
              type="submit"
              className="btn waves-effect waves-light indigo lighten-1"
            >
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, createErrors })(Register);
