import React, { Component } from "react";
import axios from "axios";

var timerID;

class Sat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      dataLoaded: null,
      name: null,
      epoch: null,
      eccentricity: null,
      inclination: null,
      rightAscension: null,
      argPericenter: null,
      meanAnomaly: null,
      meanMotion: null,
      userInput: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    console.log("attempting request");
    this._asyncRequest = axios
      .get("/sat/login")
      .then(externalData => {
        if (externalData.data == "") {
          console.log("Failed to login");
          this.setState({ dataLoaded: false });
        } else {
          //name = this._asyncRequest.data.name;
          console.log(externalData);
          this._asyncRequest = null;
          this.setState({ dataLoaded: true });
          this.setState({
            name: externalData.data.name,
            epoch: externalData.data.epoch,
            eccentricity: externalData.data.eccentricity,
            inclination: externalData.data.inclination,
            rightAscension: externalData.data.rightAscension,
            argPericenter: externalData.data.argPericenter,
            meanAnomaly: externalData.data.meanAnomaly,
            meanMotion: externalData.data.meanMotion
          });
          console.log("ASYNC FINISH");
        }
      })
      .catch(error => {
        console.log("Failed to login");
        this.setState({ dataLoaded: false });
      });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value });
    console.log("TYPED");
  }

  handleSubmit(event) {
    console.log("A name was submitted: " + this.state.userInput);
    event.preventDefault();
  }

  render() {
    if (this.state.dataLoaded == null) {
      return <h1>Loading...</h1>;
    } else if (this.state.dataLoaded == true) {
      return (
        <div>
          <h1>
            <b>Satellite Info</b>
          </h1>
          <h2>The date is: {this.state.date.toLocaleDateString()}</h2>
          <h2>The time is: {this.state.date.toLocaleTimeString()}</h2>
          <h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                Input &lt; Lat, Long &gt; :
                <input
                  type="text"
                  value={this.state.userInput}
                  onChange={this.handleChange}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </h2>

          <h4>name: {this.state.name}</h4>
          <h4>epoch: {this.state.epoch}</h4>
          <h4>eccentricity: {this.state.eccentricity}</h4>
          <h4>inclination: {this.state.inclination}</h4>
          <h4>rightAscension: {this.state.rightAscension}</h4>
          <h4>argPericenter: {this.state.argPericanter}</h4>
          <h4>meanAnomaly: {this.state.meanAnomaly}</h4>
          <h4>meanMotion: {this.state.meanMotion}</h4>
        </div>
      );
    } else {
      return <h1>Failed to acquire satellite data</h1>;
    }
  }
}

export default Sat;
