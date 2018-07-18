import React from "react";
import gameModes from "../Content/gameModes";

import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import CustomButton from "../Components/CustomButton";
import CustomModal from "../Components/CustomModal";
import ResultCard from "../Components/ResultCard";
import SvgUri from "react-native-svg-uri";
import styles from "../styles";

export default class PlayersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.commit = this.props.screenProps.commit;
    this.resultCard = React.createRef();
    this.state = {
      endGamePrompt: false,
      truth: null,
      dare: null,
      drawn: false
    };
  }

  endGame() {
    if (!this.state.endGamePrompt) {
      this.setState({
        endGamePrompt: true
      });
      return;
    }

    this.setState(
      {
        endGamePrompt: false
      },
      () => {
        this.commit("endGame", null, () => {
          this.props.navigation.navigate("Players");
        });
      }
    );
  }

  closePrompt() {
    this.setState({
      endGamePrompt: false
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

  drawUpdate(type, payload) {
    this.setState(
      {
        [type]: payload,
        drawn: true
      },
      () => {
        this.resultCard.animateCardIn(() => {
          this.setState({
            cardReady: true
          });
        });
      }
    );
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
          // this.setState({
          //   truth: drawnTruth,
          //   drawn: true
          // });
          this.drawUpdate("truth", drawnTruth);
        });
      });
    } else if (pickedTruths.indexOf(randomIndex) !== -1) {
      this.drawTruth();
    } else {
      this.commit("addPickedTruth", randomIndex, () => {
        this.drawUpdate("truth", drawnTruth);
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
          this.drawUpdate("dare", drawnDare);
        });
      });
    } else if (pickedDares.indexOf(randomIndex) !== -1) {
      this.drawDare();
    } else {
      this.commit("addPickedDare", randomIndex, () => {
        this.drawUpdate("dare", drawnDare);
      });
    }
  }

  nextPlayer() {
    this.setState({
      cardReady: false
    });

    this.resultCard.animateCardOut(() => {
      this.commit("nextPlayer", null, () => {
        this.setState({
          truth: null,
          dare: null,
          drawn: false
        });
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
    const player = this.props.screenProps.players[
      this.props.screenProps.drawingPlayer
    ];

    return (
      <View>
        <Text
          style={{
            paddingBottom: 15,
            fontSize: styles.generic.fontSizeMedium,
            color: styles.colors.white
          }}
        >
          Draw a card
        </Text>
        {player && (
          <Text
            style={{
              fontSize: styles.generic.fontSizeLarge,
              paddingBottom: 60,
              alignSelf: "center",
              color:
                player.gender === "M"
                  ? styles.colors.male
                  : styles.colors.female
            }}
          >
            {player.name}
          </Text>
        )}
        <CustomButton
          pressHandler={this.drawTruth.bind(this)}
          type="primary"
          text="Truth"
          key="truth"
        />
        <CustomButton
          pressHandler={this.drawDare.bind(this)}
          type="primary"
          text="Dare"
          key="dare"
        />
      </View>
    );
  }

  showDrawnResult() {
    const result = this.getResult();
    const player = this.props.screenProps.players[
      this.props.screenProps.drawingPlayer
    ];

    return (
      <View
        style={{
          alignItems: "center"
        }}
      >
        <Text
          style={{
            paddingBottom: 15,
            fontSize: styles.generic.fontSizeMedium,
            color: styles.colors.white
          }}
        >
          {this.state.dare ? "Dare for " : "Question for"}
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
        <ResultCard ref={c => (this.resultCard = c)} result={result} />
        {this.state.cardReady && (
          <CustomButton
            pressHandler={this.nextPlayer.bind(this)}
            type="secondary"
            text="Completed"
            style={{
              alignSelf: "center"
            }}
          />
        )}
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          position: "relative",
          alignItems: "center",
          backgroundColor: styles.colors.primary
        }}
      >
        <CustomModal
          visible={this.state.endGamePrompt}
          buttons={[
            {
              text: "End game",
              pressHandler: this.endGame.bind(this),
              type: "secondary"
            },
            {
              text: "Return",
              pressHandler: this.closePrompt.bind(this)
            }
          ]}
          closeHandler={this.closePrompt.bind(this)}
        />
        <TouchableOpacity
          onPress={() => this.endGame()}
          style={{
            zIndex: 10,
            position: "absolute",
            width: 50,
            height: 50,
            top: 40,
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
        <View
          style={{
            paddingTop: "40%"
          }}
        >
          {this.state.drawn ? this.showDrawnResult() : this.showDrawOptions()}
        </View>
      </View>
    );
  }
}
