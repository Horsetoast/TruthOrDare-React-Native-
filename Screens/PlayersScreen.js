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
import styles from "../styles.js";
import SvgUri from "react-native-svg-uri";
import gameModes from "../Content/gameModes.js";

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

  scrollPlayersList(ev) {
    const height = ev.nativeEvent.layout.height;
    if (height) {
      this.playersList.scrollTo(height);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { mode } = this.props.screenProps;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          paddingVertical: 30,
          alignItems: "center",
          backgroundColor: styles.colors.primary,
          position: "relative"
        }}
      >
        <Image
          source={styles.images.bcgPattern}
          style={{
            position: "absolute",
            top: 0,
            height: "50%",
            width: "100%",
            zIndex: 0
          }}
        />
        {/* <Text
                  style={{
                    fontSize: styles.generic.fontSizeLarge,
                    color: styles.colors.white,
                    fontFamily: styles.generic.fontFamily
                  }}
                >
                  Mode {gameModes[mode].name}
                </Text> */}
        <Text
          style={{
            fontSize: styles.generic.fontSizeSmall,
            color: styles.colors.white,
            fontFamily: styles.generic.fontFamily,
            textAlign: "left",
            width: "80%",
            position: "relative",
            top: 20
          }}
        >
          Game mode
        </Text>
        <View
          style={{
            backgroundColor: styles.colors.primary,
            width: "80%",
            height: 80,
            justifyContent: "center",
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
          <Text
            style={{
              fontSize: styles.generic.fontSizeLarge,
              color: styles.colors.white,
              fontFamily: styles.generic.fontFamily
            }}
          >
            {gameModes[mode].name}
          </Text>
        </View>
        <ScrollView
          ref={c => (this.playersList = c)}
          // onLayout={ev => this.scrollPlayersList(ev)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.playersList.scrollToEnd({
              animated: true
            });
          }}
          style={{
            paddingHorizontal: 70,
            marginVertical: 30,
            width: "100%",
            backgroundColor: styles.colors.primaryDark
          }}
        >
          <View
            style={{
              paddingVertical: 20
            }}
          >
            {this.props.screenProps.players.map((player, i) => (
              <View
                key={i}
                style={{
                  paddingVertical: 10,
                  borderBottomColor: styles.colors.primary,
                  borderBottomWidth: 2,
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
                  {/* <View
                                style={{
                                  fill:
                                    player.gender === "M"
                                      ? styles.colors.male
                                      : styles.colors.female,
                                  width: 10,
                                  height: 10,
                                  borderRadius: 10,
                                  marginRight: 15
                                }}
                              /> */}
                  <View
                    style={{
                      marginRight: 10
                    }}
                  >
                    {player.gender === "M" ? (
                      <SvgUri
                        width="20"
                        fill={styles.colors.male}
                        height="20"
                        source={styles.svg.iconMale}
                      />
                    ) : (
                      <SvgUri
                        width="20"
                        fill={styles.colors.female}
                        height="20"
                        source={styles.svg.iconFemale}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      color: styles.colors.white,
                      fontSize: styles.generic.fontSizeMedium
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
                      source={styles.svg.iconTimes}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => navigate("AddPlayer")}
            style={styles.buttonSecondary}
          >
            <Text style={styles.buttonText}> Add Player </Text>
          </TouchableOpacity>
          {this.props.screenProps.players.length > 1 ? (
            <TouchableOpacity
              onPress={this.startGame.bind(this)}
              style={styles.buttonPrimary}
            >
              <Text style={styles.buttonText}> Start Game </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
