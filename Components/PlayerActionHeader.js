import React from "react";
import { Animated, Text } from "react-native";
import { defaults, assets, styles } from "../styles";

export default class PlayerActionHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerState: "waiting",
      drawnType: null
    };
  }

  componentWillMount() {
    this._visibility = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.headerState === "fade") {
      Animated.timing(this._visibility, {
        toValue: 0,
        duration: 300
      }).start(() => {
        this.setState({
          headerState: "hidden"
        });
      });
    } else if (nextProps.headerState === "waiting") {
      this.setState({
        headerState: "waiting",
        drawnType: null
      });
    } else if (nextProps.headerState === "drawn") {
      this.setState({
        headerState: "drawn",
        drawnType: nextProps.drawnType
      });
    }
  }

  render() {
    const { player, style, ...rest } = this.props;
    const { drawnType, headerState } = this.state;

    if (headerState === "waiting") {
      Animated.timing(this._visibility, {
        toValue: 1,
        duration: 300
      }).start();
    }

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          translateX: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: headerState === "drawn" ? [-10, 0] : [10, 0]
          })
        }
      ]
    };

    const combinedStyle = [containerStyle, style];
    let headerText = "Draw a card";
    if (headerState === "drawn") {
      headerText = drawnType === "dare" ? "Dare for" : "Question for";
    }

    return (
      <Animated.View style={combinedStyle} {...rest}>
        <Text
          style={{
            paddingBottom: 15,
            fontSize: defaults.generic.fontSizeMedium,
            color: defaults.colors.white
          }}
        >
          {headerText}
        </Text>
        {player && (
          <Text
            style={{
              paddingBottom: 30,
              fontSize: defaults.generic.fontSizeLarge,
              color:
                player.gender === "M"
                  ? defaults.colors.male
                  : defaults.colors.female
            }}
          >
            {player.name}
          </Text>
        )}
      </Animated.View>
    );
  }
}
