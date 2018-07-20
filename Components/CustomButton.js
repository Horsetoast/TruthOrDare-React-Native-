import React from "react";
import { Text, TouchableOpacity, TouchableHighlight } from "react-native";
import styles from "../styles";

const buttonStyles = {
  primary: "buttonPrimary",
  secondary: "buttonSecondary",
  inverted: "buttonInverted"
};

export default props => {
  const type = props.touchableType || "opacity";
  const style = styles[buttonStyles[props.type]];
  if (type === "highlight") {
    return (
      <TouchableHighlight
        onPress={props.pressHandler}
        underlayColor={style.backgroundColor}
        style={style}
      >
        <Text style={styles.buttonText}> {props.text} </Text>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableOpacity onPress={props.pressHandler} style={style}>
        <Text style={styles.buttonText}> {props.text} </Text>
      </TouchableOpacity>
    );
  }
};
