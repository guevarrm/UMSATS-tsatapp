import React, { Component } from "react";

class Skeleton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stateVal: null };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return;
    <h1>Skeleton component</h1>;
  }
}

export default Skeleton;
