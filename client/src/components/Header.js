import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.auth);
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        {
          console.log("NULL");
        }
        return;
      case false: {
        console.log("false");
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      }
      default: {
        console.log("data");
        console.log(this.props.auth);
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
      }
    }
  }

  render() {
    console.log("IN HEADER: ", this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

export default Header;
