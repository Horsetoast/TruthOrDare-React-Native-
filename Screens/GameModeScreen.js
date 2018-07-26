import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import GameModeCard from "../Components/GameModeCard";
import { defaults, assets, styles } from "../styles";
// import SvgUri from "react-native-svg-uri";

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
          backgroundColor: defaults.colors.primary
        }}
      >
        <View
          style={{
            backgroundColor: defaults.colors.primary,
            width: "90%",
            height: 80,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
            paddingHorizontal: 30,
            zIndex: 1,
            top: 40,
            shadowOffset: {
              width: 0,
              height: 4
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 4
          }}
        >
          <View>
            {/* <Text
              style={{
                fontSize: styles.generic.fontSizeSmall,
                color: styles.colors.primaryLight,
                fontFamily: styles.generic.fontFamily
              }}
            >
              Game mode
            </Text> */}
            <Text
              style={{
                fontSize: defaults.generic.fontSizeMedium,
                color: defaults.colors.white,
                fontFamily: defaults.generic.fontFamily
              }}
            >
              Choose game mode
            </Text>
          </View>
        </View>
        {/* <Text
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
        </Text> */}
        <ScrollView
          style={{
            padding: 20,
            paddingTop: 50,
            width: "100%",
            backgroundColor: defaults.colors.primaryDark
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <GameModeCard
              pressHandler={this.setGameMode.bind(this)}
              mode="party"
            />
            <GameModeCard
              pressHandler={this.setGameMode.bind(this)}
              mode="wild"
            />
            <GameModeCard
              pressHandler={this.setGameMode.bind(this)}
              mode="college"
            />
            {/* <TouchableOpacity
              onPress={() => this.setGameMode("wild")}
              style={{
                backgroundColor: styles.colors.primary,
                flex: 1,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
                height: 160
              }}
            >
              <Image
                source={styles.images.modeRaunchy}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
              <Text>Wild & Raunchy</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}
