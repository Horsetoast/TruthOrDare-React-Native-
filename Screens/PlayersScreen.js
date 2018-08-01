import React from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { defaults, assets, styles } from "../styles";
import CustomButton from "../Components/CustomButton";
import SvgUri from "react-native-svg-uri";
import gameModes from "../Content/gameModes";

export default class PlayersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.commit = this.props.screenProps.commit;
    this.state = {};
    this.playersList = React.createRef();
    this.playersListHeight = null;
  }

  startGame() {
    this.commit("startGame");
    this.props.navigation.navigate("Draw");
  }

  removePlayer(index) {
    this.commit("removePlayer", {
      index
    });
  }

  returnToModes() {
    this.props.navigation.navigate("GameMode");
  }

  scrollPlayersList(ev) {
    const height = ev.nativeEvent.layout.height;
    if (height) {
      this.playersList.scrollTo(height);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { mode, players } = this.props.screenProps;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          paddingVertical: 30,
          alignItems: "center",
          backgroundColor: defaults.colors.primary,
          position: "relative"
        }}
      >
        <Image
          source={assets.images.bcgPattern}
          style={{
            position: "absolute",
            top: 0,
            height: "50%",
            width: "100%",
            zIndex: 0
          }}
        />
        <View
          style={{
            backgroundColor: defaults.colors.primary,
            width: "85%",
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
            <Text
              style={{
                fontSize: defaults.generic.fontSizeSmall,
                color: defaults.colors.primaryLight,
                fontFamily: defaults.generic.fontFamily
              }}
            >
              Game mode
            </Text>
            <Text
              style={{
                fontSize: defaults.generic.fontSizeMedium,
                color: defaults.colors.white,
                fontFamily: defaults.generic.fontFamily
              }}
            >
              {gameModes[mode].name}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
              backgroundColor: defaults.colors.primaryDark
            }}
            onPress={this.returnToModes.bind(this)}
          >
            <SvgUri
              width="15"
              height="15"
              fill={defaults.colors.white}
              svgXmlData={assets.svg.iconArrowLeft}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={c => (this.playersList = c)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.playersList.scrollToEnd({
              animated: true
            });
          }}
          style={{
            paddingHorizontal: 70,
            marginVertical: 30,
            width: "100%",
            backgroundColor: defaults.colors.primaryDark
          }}
        >
          <View
            style={{
              paddingVertical: 20
            }}
          >
            {players.map((player, i) => (
              <View
                key={i}
                style={{
                  paddingVertical: 10,
                  borderBottomColor: defaults.colors.primary,
                  borderBottomWidth: players.length - 1 === i ? 0 : 2,
                  flex: 1,
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      marginRight: 10
                    }}
                  >
                    {player.gender === "M" ? (
                      <SvgUri
                        width="20"
                        fill={defaults.colors.male}
                        height="20"
                        svgXmlData={assets.svg.iconMale}
                      />
                    ) : (
                      <SvgUri
                        width="20"
                        fill={defaults.colors.female}
                        height="20"
                        svgXmlData={assets.svg.iconFemale}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      color: defaults.colors.white,
                      fontSize: defaults.generic.fontSizeMedium
                    }}
                    key={i}
                  >
                    {player.name}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={() => this.removePlayer(i)}
                  >
                    <SvgUri
                      width="10"
                      height="10"
                      fill="#ffffff"
                      svgXmlData={assets.svg.iconTimes}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <CustomButton
              text="Add Player"
              pressHandler={() => navigate("AddPlayer")}
              type="inverted"
              fullwidth={true}
            />
          </View>
        </ScrollView>
        <View>
          <CustomButton
            text="Start Game"
            pressHandler={this.startGame.bind(this)}
            disabled={players.length <= 1}
            type="primary"
          />
        </View>
      </View>
    );
  }
}
