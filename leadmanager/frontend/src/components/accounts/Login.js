import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    // If the user is logged in, redirect to the dashboard
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { username, password } = this.state;
    return (
      <div className="container">
        <h2>Login</h2>
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
            <button
              type="submit"
              className="btn waves-effect waves-light indigo lighten-1"
            >
              Login
            </button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
