"use strict";

import React from "react";
import PlayersScreen from "./Screens/PlayersScreen.js";
import AddPlayerScreen from "./Screens/AddPlayerScreen.js";
import GameModeScreen from "./Screens/GameModeScreen.js";
import DrawScreen from "./Screens/DrawScreen.js";
// import cacheAssetsAsync from "./cachedAssetsAsync";
import styles from "./styles";
import { StackNavigator } from "react-navigation";
// import { Font } from "expo";

// Disable yellow warnings
console.disableYellowBox = true;

const RootStack = StackNavigator({
  GameMode: {
    screen: GameModeScreen,
    navigationOptions: navigation => ({
      header: null
    })
  },
  Players: {
    screen: PlayersScreen,
    navigationOptions: navigation => ({
      header: null
    })
  },
  AddPlayer: {
    screen: AddPlayerScreen,
    navigationOptions: navigation => ({
      header: null
    })
  },
  Draw: {
    screen: DrawScreen,
    navigationOptions: navigation => ({
      header: null
    })
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsReady: false,
      fontLoaded: false,
      gameStatus: "waiting",
      mode: "friends",
      drawingPlayer: 0,
      players: [
        {
          name: "Matus",
          gender: "M",
          pickedTruths: [],
          pickedDares: []
        },
        {
          name: "Jessica",
          gender: "F",
          pickedTruths: [],
          pickedDares: []
        }
      ],
      pickedTruths: [],
      pickedDares: []
    };
  }

  // async _loadAssetsAsync() {
  //   try {
  //     await cacheAssetsAsync({
  //       images: [
  //         styles.images.bcgPattern,
  //         styles.images.modeParty,
  //         styles.images.modeRaunchy,
  //         styles.svg.iconMale,
  //         styles.svg.iconFemale,
  //         styles.svg.iconTimes
  //       ]
  //     });
  //   } catch (e) {
  //     console.log({
  //       e
  //     });
  //   } finally {
  //     this.setState({
  //       appIsReady: true
  //     });
  //   }
  // }

  componentDidMount() {
    // this._loadAssetsAsync();
    // Font.loadAsync({
    //   "titilium-regular": require("./assets/fonts/TitilliumWeb-Regular.ttf")
    // }).then(() => {
    //   this.setState({
    //     fontLoaded: true
    //   });
    // });

    this.setState({
      fontLoaded: true,
      appIsReady: true
    });
  }

  commit(action, payload, cb = null) {
    console.log("COMMIT", action, payload);
    let newState = null;
    switch (action) {
      case "addPlayer":
        newState = Object.assign({}, this.state);
        newState.players.push({
          name: payload.playerName,
          gender: payload.playerGender,
          pickedTruths: [],
          pickedDares: []
        });
        this.setState(newState, cb);
        break;
      case "removePlayer":
        newState = Object.assign({}, this.state);
        newState.players.splice(payload.index, 1);
        this.setState(newState, cb);
        break;
      case "nextPlayer":
        newState = Object.assign({}, this.state);
        if (newState.drawingPlayer === newState.players.length - 1) {
          newState.drawingPlayer = 0;
        } else {
          newState.drawingPlayer++;
        }
        this.setState(newState, cb);
        break;
      case "startGame":
        newState = Object.assign({}, this.state, {
          gameStatus: "started"
        });
        this.setState(newState, cb);
        break;
      case "addPickedTruth":
        newState = Object.assign({}, this.state);
        newState.pickedTruths.push(payload);
        newState.players[this.state.drawingPlayer].pickedTruths.push(payload);
        this.setState(newState, cb);
        break;
      case "resetPickedTruths":
        newState = Object.assign({}, this.state, {
          pickedTruths: []
        });
        this.setState(newState, cb);
        break;
      case "addPickedDare":
        newState = Object.assign({}, this.state);
        newState.pickedDares.push(payload);
        newState.players[this.state.drawingPlayer].pickedDares.push(payload);
        this.setState(newState, cb);
        break;
      case "resetPickedDares":
        newState = Object.assign({}, this.state, {
          pickedDares: []
        });
        this.setState(newState, cb);
        break;
      case "setGameMode":
        newState = Object.assign({}, this.state, {
          mode: payload
        });
        this.setState(newState, cb);
        break;
      case "endGame":
        newState = Object.assign({}, this.state, {
          pickedTruths: [],
          pickedDares: [],
          gameStatus: "waiting",
          drawingPlayer: 0
        });
        this.setState(newState, cb);
        break;
      default:
        console.log("COMMIT ACTION " + action + " NOT FOUND");
    }
  }

  render() {
    // TODO: return loading
    if (!this.state.fontLoaded || !this.state.appIsReady) return null;
    return (
      <RootStack
        screenProps={{
          ...this.state,
          commit: this.commit.bind(this)
        }}
      />
    );
  }
}
