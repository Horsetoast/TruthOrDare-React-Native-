import React from "react";
import { Animated, Text } from "react-native";
import styles from "../styles";

export default class Fade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  componentWillMount() {
    this._visibility = new Animated.Value(this.props.isDrawn ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isDrawn) {
      this.setState({ visible: true });
    }
    Animated.timing(this._visibility, {
      toValue: nextProps.isDrawn ? 1 : 0,
      duration: 300
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    const { visible, style, player, drawnType, isDrawn, ...rest } = this.props;

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          translateX: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: visible ? [-10, 0] : [10, 0]
          })
        }
      ]
    };

    const combinedStyle = [containerStyle, style];
    let headerText = "Draw a card";
    if (isDrawn) {
      headerText = drawnType === "dare" ? "Dare for" : "Question for";
    }

    return (
      <Animated.View
        style={this.state.visible ? combinedStyle : containerStyle}
        {...rest}
      >
        <Text
          style={{
            paddingBottom: 15,
            fontSize: styles.generic.fontSizeMedium,
            color: styles.colors.white
          }}
        >
          {headerText}
        </Text>
        {player && (
          <Text
            style={{
              paddingBottom: 30,
              fontSize: styles.generic.fontSizeLarge,
              color:
                player.gender === "M"
                  ? styles.colors.male
                  : styles.colors.female
            }}
          >
            {player.name}
          </Text>
        )}
      </Animated.View>
    );
  }
}
