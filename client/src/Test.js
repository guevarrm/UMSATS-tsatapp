import React from "react";

function myFunc(name) {
  return "My name is " + name;
}

const Test = ({ name }) => {
  return <div>{myFunc(name)}</div>;
};

export default Test;
