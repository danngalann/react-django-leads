import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="right">
        <li style={{marginRight: '8px'}} className="hide-on-med-and-down">
          <span>
            <strong>{user ? `Welcome ${user.username}` : ""}</strong>
          </span>
        </li>
        <li>
          <button
            onClick={this.props.logout}
            className="waves-effect waves-light btn-small orange"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="right">
        <li>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">
            Log In
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="nav-wrapper indigo lighten-1">
        <div className="container">
          <a className="brand-logo" href="#">
            Lead Manager
          </a>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
