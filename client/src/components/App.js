// Rendered layer control (React Router) (top level view layer)
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import axios from "axios";
import Sat from "./Sat";
import Header from "./Header";
import Landing from "./Landing";
import Schedule from "./Schedule";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { auth: null };
  }

  componentDidMount() {
    console.log("attempting request");
    this._asyncRequest = axios
      .get("/api/current_user")
      .then(externalData => {
        console.log(externalData);
        this._asyncRequest = null;
        this.setState({
          auth: externalData.data._id || false
        });
        console.log("ASYNC FINISH");
      })
      .catch(error => {
        console.log("Failed to login");
        this.setState({ dataLoaded: false, auth: false });
      });
  }
  renderContent() {
    return this.state.auth;
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header auth={this.state.auth} test={"hello"} />
            <Route exact path="/sat" component={Sat} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route
              path="/schedule"
              render={routeProps => (
                <Schedule {...routeProps} auth={this.renderContent()} />
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
