import React from "react";
import classes from "./Joke.module.css";

const Joke = (props) => {
  return <div className={classes.joke}>{props.joke}</div>;
};

export default Joke;
