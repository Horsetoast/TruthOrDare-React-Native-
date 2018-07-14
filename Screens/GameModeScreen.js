import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles.js";
// import SvgUri from "react-native-svg-uri";
// import gameModes from "../Content/gameModes.js";

export default class GameModeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.commit = this.props.screenProps.commit;
    this.state = {};
  }

  setGameMode(mode) {
    this.commit("setGameMode", mode);
    this.props.navigation.navigate("Players");
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: styles.colors.primary
        }}
      >
        <Text
          style={{
            fontSize: styles.generic.fontSizeLarge,
            color: styles.colors.white,
            fontFamily: styles.generic.fontFamily,
            textAlign: "center",
            marginTop: 50,
            marginBottom: 30
          }}
        >
          Choose game mode
        </Text>
        <ScrollView
          style={{
            padding: 20,
            width: "100%",
            backgroundColor: styles.colors.primaryDark
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <TouchableOpacity
              onPress={() => this.setGameMode("friends")}
              style={{
                backgroundColor: styles.colors.primary,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 4,
                height: 200,
                marginVertical: 10
              }}
            >
              <Image
                source={styles.images.modeParty}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setGameMode("friends")}
              style={{
                backgroundColor: styles.colors.primary,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 4,
                height: 200,
                marginVertical: 10
              }}
            >
              <Image
                source={styles.images.modeRaunchy}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
