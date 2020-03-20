import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Alert extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.message.name) alert.error(`Name: ${error.message.name.join()}`);
      if (error.message.email)
        alert.error(`Email: ${error.message.email.join()}`);
      if (error.message.message)
        alert.error(`Message: ${error.message.message.join()}`);
      if (error.message.non_field_errors)
        alert.error(error.message.non_field_errors.join());
      if (error.message.passwordsNotMatch)
        alert.error(error.message.passwordsNotMatch);
      if (error.message.username) alert.error(error.message.username.join());
    }

    if (message != prevProps.message) {
      if (message.leadDeleted) alert.success(message.leadDeleted);
      if (message.leadAdded) alert.success(message.leadAdded);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alert));
