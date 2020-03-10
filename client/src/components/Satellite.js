import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Satellite extends Component {
  renderContent() {
    switch (this.props.sat) {
      case null:
        {
          console.log("NULL");
        }
        return;
      case false: {
        console.log("false");
        return <h1>NOT LOGGED IN</h1>;
      }
      default: {
        console.log("data");
        console.log(this.props.sat);
        return (
          <h1>
            Name:{this.props.sat.name}
            <div>epoch: {this.props.sat.epoch}</div>
            <div>eccentricity: {this.props.sat.eccentricity}</div>
            <div>inclination: {this.props.sat.inclination}</div>
            <div>rightAscension: {this.props.sat.rightAscension}</div>
            <div>argPericenter: {this.props.sat.argPericenter}</div>
            <div>meanAnomaly: {this.props.sat.meanAnomaly}</div>
            <div>meanMotion: {this.props.sat.meanMotion}</div>
          </h1>
        );
      }
    }
  }

  render() {
    return <h1>{this.renderContent()}</h1>;
  }
}

function mapStateToProps({ sat }) {
  return { sat };
}
export default connect(mapStateToProps)(Satellite);
