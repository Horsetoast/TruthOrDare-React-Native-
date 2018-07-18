import React from "react";
import { Text, Animated } from "react-native";
import styles from "../styles";

export default class ResultCard extends React.Component {
  constructor(props) {
    super(props);

    this.cardX = new Animated.Value(-1000);
  }

  componentWillMount() {
    // this.animateCardIn();
  }

  animateCardIn(cb) {
    Animated.parallel([
      Animated.spring(this.cardX, {
        toValue: 0,
        duration: 500
      })
    ]).start(() => {
      (cb || (() => {}))();
    });
  }

  animateCardOut(cb) {
    Animated.parallel([
      Animated.timing(this.cardX, {
        toValue: 1000,
        duration: 500
      })
    ]).start(() => {
      (cb || (() => {}))();
    });
  }

  render() {
    const { result } = this.props;
    return (
      <Animated.View
        style={{
          backgroundColor: styles.colors.white,
          borderRadius: 10,
          width: "80%",
          justifyContent: "center",
          left: this.cardX,
          position: "relative",
          padding: 30,
          marginBottom: 30,
          zIndex: 1,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 4
        }}
      >
        <Text
          style={{
            fontSize: styles.generic.fontSizeMedium,
            color: styles.colors.grey
          }}
        >
          {result}
        </Text>
      </Animated.View>
    );
  }
}
