import React from "react";
import gameModes from "../Content/gameModes.js";

import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import SvgUri from "react-native-svg-uri";
import styles from "../styles.js";

export default class PlayersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.commit = this.props.screenProps.commit;
    this.state = {
      truth: null,
      dare: null,
      drawn: false
    };
  }

  endGame() {
    this.commit("endGame", null, () => {
      this.props.navigation.navigate("Players");
    });
  }

  _replacePlayerName(text) {
    const players = this.props.screenProps.players;
    const randomIndex = Math.floor(Math.random() * players.length);
    const randomPlayer = players[randomIndex];
    /* Split but keep delimeter in array */
    const replaced = text.split(/(\{.*\})/g);
    return replaced.map(item => {
      if (item === "{player}") {
        return (
          <Text
            style={{
              color:
                randomPlayer.gender === "M"
                  ? styles.colors.male
                  : styles.colors.female
            }}
          >
            {randomPlayer.name}
          </Text>
        );
      } else {
        return item;
      }
    });
  }

  drawTruth() {
    /* If we run out of unpicked
    reset them and start again */
    const { pickedTruths, mode } = this.props.screenProps;
    const randomIndex = Math.floor(
      Math.random() * gameModes[mode]["truths"].length
    );

    // console.log("PICKED INDEX", randomIndex);
    // console.log("EXISTING INDEXES", pickedTruths);

    let drawnTruth = gameModes[mode]["truths"][randomIndex];

    if (pickedTruths.length === gameModes[mode]["truths"].length) {
      this.commit("resetPickedTruths", null, () => {
        this.commit("addPickedTruth", randomIndex, () => {
          this.setState({
            truth: drawnTruth,
            drawn: true
          });
        });
      });
    } else if (pickedTruths.indexOf(randomIndex) !== -1) {
      this.drawTruth();
    } else {
      this.commit("addPickedTruth", randomIndex, () => {
        this.setState({
          truth: drawnTruth,
          drawn: true
        });
      });
    }
  }

  drawDare() {
    /* If we run out of unpicked
    reset them and start again */
    const { pickedDares, mode } = this.props.screenProps;
    const randomIndex = Math.floor(
      Math.random() * gameModes[mode]["dares"].length
    );

    // console.log("PICKED INDEX", randomIndex);
    // console.log("EXISTING INDEXES", pickedTruths);

    let drawnDare = gameModes[mode]["dares"][randomIndex];

    if (pickedDares.length === gameModes[mode]["dares"].length) {
      this.commit("resetPickedDares", null, () => {
        this.commit("addPickedDare", randomIndex, () => {
          this.setState({
            dare: drawnDare,
            drawn: true
          });
        });
      });
    } else if (pickedDares.indexOf(randomIndex) !== -1) {
      this.drawDare();
    } else {
      this.commit("addPickedDare", randomIndex, () => {
        this.setState({
          dare: drawnDare,
          drawn: true
        });
      });
    }
  }

  nextPlayer() {
    this.commit("nextPlayer", null, () => {
      this.setState({
        truth: null,
        dare: null,
        drawn: false
      });
    });
  }

  getResult() {
    if (this.state.truth) {
      const truthText = this._replacePlayerName(this.state.truth.question);
      return <Text>{truthText}</Text>;
    } else if (this.state.dare) {
      const dareText = this._replacePlayerName(this.state.dare.dare);
      return <Text>{dareText}</Text>;
    } else {
      return null;
    }
  }

  showDrawOptions() {
    return (
      <View>
        <Text
          style={{
            paddingVertical: 20,
            fontSize: styles.generic.fontSizeLarge,
            color: styles.colors.white
          }}
        >
          Draw a card
        </Text>
        <TouchableOpacity
          onPress={this.drawTruth.bind(this)}
          style={styles.buttonPrimary}
          key="truth"
        >
          <Text style={styles.buttonText}>Truth</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.drawDare.bind(this)}
          style={styles.buttonPrimary}
          key="dare"
        >
          <Text style={styles.buttonText}>Dare</Text>
        </TouchableOpacity>
      </View>
    );
  }

  showDrawnResult() {
    const result = this.getResult();

    return (
      <View
        style={{
          alignItems: "center"
        }}
      >
        <Text
          style={{
            paddingVertical: 20,
            fontSize: styles.generic.fontSizeLarge,
            color: styles.colors.white
          }}
        >
          {this.state.dare ? "Dare" : "Question"}
        </Text>
        <View
          style={{
            backgroundColor: styles.colors.primary,
            width: "80%",
            justifyContent: "center",
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
              color: styles.colors.white
            }}
          >
            {result}
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.nextPlayer.bind(this)}
          style={{
            ...styles.buttonSecondary,
            alignSelf: "center"
          }}
        >
          <Text
            style={{
              ...styles.buttonText
            }}
          >
            Done!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const player = this.props.screenProps.players[
      this.props.screenProps.drawingPlayer
    ];

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: styles.colors.primary
        }}
        behavior="padding"
      >
        <TouchableOpacity
          onPress={() => this.endGame()}
          style={{
            zIndex: 10,
            position: "absolute",
            width: 50,
            height: 50,
            top: 50,
            left: 30,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: styles.colors.primaryDark
          }}
        >
          <SvgUri
            width="10"
            height="10"
            fill="#ffffff"
            source={styles.svg.iconTimes}
          />
        </TouchableOpacity>
        <Image
          source={styles.images.bcgPattern}
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
            zIndex: 0
          }}
        />
        {player && (
          <Text
            style={{
              fontSize: styles.generic.fontSizeMedium,
              color: styles.colors.white
            }}
          >
            {player.name}
          </Text>
        )}
        {this.state.drawn ? this.showDrawnResult() : this.showDrawOptions()}
      </View>
    );
  }
}
