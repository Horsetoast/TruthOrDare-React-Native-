import React from "react";

import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  ScrollView,
  Keyboard
} from "react-native";
import { defaults, assets, styles } from "../styles";
import SvgUri from "react-native-svg-uri";
import CustomButton from "../Components/CustomButton";

export default class PlayersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.commit = this.props.screenProps.commit;
    this.state = {
      playerName: "",
      playerGender: "M"
    };
  }

  addPlayer() {
    this.commit("addPlayer", {
      playerName: this.state.playerName,
      playerGender: this.state.playerGender
    });
    Keyboard.dismiss();
    this.props.navigation.navigate("Players");
  }

  return() {
    this.setState({
      playerName: "",
      playerGender: "M"
    });
    Keyboard.dismiss();
    this.props.navigation.navigate("Players");
  }

  setGender(gender) {
    console.log("gender", gender);
    this.setState({
      playerGender: gender
    });
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1,
            backgroundColor: defaults.colors.primary
          }}
          keyboardVerticalOffset={-200}
          behavior="padding"
          enabled
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                paddingVertical: 20,
                fontSize: defaults.generic.fontSizeLarge,
                color: defaults.colors.white,
                maxWidth: "70%"
              }}
            >
              What's your name?
            </Text>
            <TextInput
              maxLength={30}
              placeholderTextColor={defaults.colors.primaryLight}
              underlineColorAndroid="transparent"
              style={{
                ...styles.textInput,
                width: 200,
                marginBottom: 30
              }}
              onChangeText={text => this.setState({ playerName: text })}
              value={this.state.playerName}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <TouchableWithoutFeedback onPress={() => this.setGender("M")}>
                <View>
                  <SvgUri
                    width="80"
                    fill={
                      this.state.playerGender === "M"
                        ? defaults.colors.male
                        : defaults.colors.primaryDark
                    }
                    height="80"
                    svgXmlData={assets.svg.iconMale}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.setGender("F")}>
                <View>
                  <SvgUri
                    width="80"
                    fill={
                      this.state.playerGender === "F"
                        ? defaults.colors.female
                        : defaults.colors.primaryDark
                    }
                    height="80"
                    svgXmlData={assets.svg.iconFemale}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                paddingBottom: 100,
                width: "100%",
                alignItems: "center"
              }}
            >
              <CustomButton
                text="Add Player"
                pressHandler={this.addPlayer.bind(this)}
                disabled={this.state.playerName.length === 0}
                type="primary"
              />
              <CustomButton
                text="Return"
                pressHandler={this.return.bind(this)}
                type="secondary"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
