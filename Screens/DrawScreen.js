import React from "react";
import gameModes from "../Content/gameModes";

import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import CustomButton from "../Components/CustomButton";
import CustomModal from "../Components/CustomModal";
import ResultCard from "../Components/ResultCard";
import FadeView from "../Components/FadeView";
import PlayerActionHeader from "../Components/PlayerActionHeader";
import SvgUri from "react-native-svg-uri";
import { defaults, assets, styles } from "../styles";

export default class PlayersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.commit = this.props.screenProps.commit;
    this.state = {
      endGamePrompt: false,
      playerHeaderState: "waiting",
      randomPlayer: null,
      truth: null,
      dare: null,
      drawn: false
    };
    this._resultCard = React.createRef();
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
    const { randomPlayer } = this.state;
    /* Split but keep delimeter in array */
    const replaced = text.split(/(\{.*\})/g);
    return replaced.map((item, i) => {
      if (item === "{player}") {
        return (
          <Text
            key={i}
            style={{
              color:
                randomPlayer.gender === "M"
                  ? defaults.colors.male
                  : defaults.colors.female
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

  _drawUpdate(type, payload) {
    const drawingPlayer = this.props.screenProps.drawingPlayer;   
    const players = this.props.screenProps.players.slice();
    players.splice(drawingPlayer, 1);
    const randomIndex = Math.floor(Math.random() * players.length);
    const randomPlayer = players[randomIndex];

    this.setState(
      {
        [type]: payload,
        drawn: true,
        playerHeaderState: "drawn",
        randomPlayer
      },
      () => {
        this._resultCard.animateCardIn(() => {
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
          this._drawUpdate("truth", drawnTruth);
        });
      });
    } else if (pickedTruths.indexOf(randomIndex) !== -1) {
      this.drawTruth();
    } else {
      this.commit("addPickedTruth", randomIndex, () => {
        this._drawUpdate("truth", drawnTruth);
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
          this._drawUpdate("dare", drawnDare);
        });
      });
    } else if (pickedDares.indexOf(randomIndex) !== -1) {
      this.drawDare();
    } else {
      this.commit("addPickedDare", randomIndex, () => {
        this._drawUpdate("dare", drawnDare);
      });
    }
  }

  nextPlayer() {
    this.setState({
      cardReady: false,
      playerHeaderState: "fade"
    });

    this._resultCard.animateCardOut(() => {
      this.commit("nextPlayer", null, () => {
        this.setState({
          truth: null,
          dare: null,
          drawn: false,
          playerHeaderState: "waiting"
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
    // const player = this.props.screenProps.players[
    //   this.props.screenProps.drawingPlayer
    // ];

    return (
      <View>
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
    // const player = this.props.screenProps.players[
    //   this.props.screenProps.drawingPlayer
    // ];
    console.log("RENDER", this.props);

    return (
      <View
        style={{
          alignItems: "center",
          flex: 1
        }}
      >
        {/* <Text
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
        )} */}
        <ResultCard ref={c => (this._resultCard = c)} result={result} />
        <FadeView visible={this.state.cardReady}>
          <CustomButton
            pressHandler={this.nextPlayer.bind(this)}
            touchableType="highlight"
            type="primary"
            text="Completed"
            style={{
              alignSelf: "center"
            }}
          />
        </FadeView>
        {/* {this.state.cardReady && (

        )} */}
      </View>
    );
  }

  render() {
    console.log(
      "RENDER?",
      JSON.stringify(this.state)
      // JSON.stringify(this.props)
    );
    const player = this.props.screenProps.players[
      this.props.screenProps.drawingPlayer
    ];

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          position: "relative",
          alignItems: "center",
          backgroundColor: defaults.colors.primary
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
            width: 40,
            height: 40,
            top: 40,
            right: 30,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: defaults.colors.primaryDark
          }}
        >
          <SvgUri
            width="10"
            height="10"
            fill="#ffffff"
            svgXmlData={assets.svg.iconTimes}
          />
        </TouchableOpacity>
        <Image
          source={assets.images.bcgPattern}
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
            paddingTop: "40%",
            flex: 1,
            alignItems: "center"
          }}
        >
          <PlayerActionHeader
            drawnType={this.state.dare ? "dare" : "truth"}
            headerState={this.state.playerHeaderState}
            player={player}
            style={{
              alignItems: "center"
            }}
          />
          {this.state.drawn ? this.showDrawnResult() : this.showDrawOptions()}
        </View>
      </View>
    );
  }
}
