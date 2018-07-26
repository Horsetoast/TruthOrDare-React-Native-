import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native";
import { defaults, assets, styles } from "../styles";

const buttonStyles = {
  primary: "buttonPrimary",
  secondary: "buttonSecondary",
  inverted: "buttonInverted"
};

export default props => {
  const touchableType = props.touchableType || "opacity";
  const style = styles[buttonStyles[props.type]];

  if (props.disabled) {
    return (
      <TouchableHighlight
        style={[
          styles["disabled"],
          {
            alignSelf: props.fullwidth ? "stretch" : "auto"
          }
        ]}
      >
        <Text style={styles.disabledText}> {props.text} </Text>
      </TouchableHighlight>
    );
  } else if (touchableType === "highlight") {
    return (
      <TouchableHighlight
        onPress={props.pressHandler}
        underlayColor={style.backgroundColor}
        style={[
          style,
          {
            alignSelf: props.fullwidth ? "stretch" : "auto"
          }
        ]}
      >
        <Text style={styles.buttonText}> {props.text} </Text>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={props.pressHandler}
        style={[
          style,
          {
            alignSelf: props.fullwidth ? "stretch" : "auto"
          }
        ]}
      >
        <Text style={styles.buttonText}> {props.text} </Text>
      </TouchableOpacity>
    );
  }
};
