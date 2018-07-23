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
import styles from "../styles";
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
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: styles.colors.primary
          }}
          keyboardVerticalOffset={-200}
          behavior="padding"
        >
          <Text
            style={{
              paddingVertical: 20,
              fontSize: styles.generic.fontSizeLarge,
              color: styles.colors.white,
              maxWidth: "70%"
            }}
          >
            What's your name?
          </Text>
          <TextInput
            maxLength={30}
            placeholderTextColor={styles.colors.primaryLight}
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
                      ? styles.colors.male
                      : styles.colors.primaryDark
                  }
                  height="80"
                  source={styles.svg.iconMale}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setGender("F")}>
              <View>
                <SvgUri
                  width="80"
                  fill={
                    this.state.playerGender === "F"
                      ? styles.colors.female
                      : styles.colors.primaryDark
                  }
                  height="80"
                  source={styles.svg.iconFemale}
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
              type="primary"
            />
            <CustomButton
              text="Return"
              pressHandler={this.return.bind(this)}
              type="secondary"
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
