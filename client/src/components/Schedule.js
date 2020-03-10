import React, { Component } from "react";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.auth);
    this.state = { fromMongo: null };
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        {
          console.log("NULL");
          return <li>Loading </li>;
        }
        return;
      case false: {
        console.log("false");
        return <li>Not logged in</li>;
      }
      default: {
        console.log("data");
        console.log(this.props.auth);

        //const existingUser = this.User.findOne({ _id: this.props.auth }).then(
        //console.log(existingUser)

        return <li>Logged In as: {this.props.auth}</li>;
      }
    }
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>
          <b>Schedule</b>
        </h1>
        Your account information: {this.renderContent()}
      </div>
    );
  }
}

export default Schedule;
