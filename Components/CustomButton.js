import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles";

const buttonStyles = {
  primary: "buttonPrimary",
  secondary: "buttonSecondary",
  inverted: "buttonInverted"
};

export default props => {
  return (
    <TouchableOpacity
      onPress={props.pressHandler}
      style={styles[buttonStyles[props.type]]}
    >
      <Text style={styles.buttonText}> {props.text} </Text>
    </TouchableOpacity>
  );
};
