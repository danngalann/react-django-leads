import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../actions/leads";

export class Form extends Component {
  state = {
    name: "",
    email: "",
    message: ""
  };

  static propTypes = {
    addLead: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const newLead = { name, email, message };
    this.props.addLead(newLead);
    this.setState({
      name: '',
      email: '',
      message: ''
    })
  };

  render() {
    const { name, email, message } = this.state;
    return (
      <div>
        <h2>Add Lead</h2>
        <form onSubmit={this.onSubmit}>
          <div className="input-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="input-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div className="input-field">
            <label>Message</label>
            <textarea
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
              className="materialize-textarea"
            ></textarea>
          </div>
          <div className="input-field">
            <button type="submit" className="btn waves-effect waves-light indigo lighten-1">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addLead })(Form);
