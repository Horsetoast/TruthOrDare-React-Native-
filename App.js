"use strict";

import React from "react";
import PlayersScreen from "./Screens/PlayersScreen";
import AddPlayerScreen from "./Screens/AddPlayerScreen";
import GameModeScreen from "./Screens/GameModeScreen";
import DrawScreen from "./Screens/DrawScreen";
// import cacheAssetsAsync from "./cachedAssetsAsync";
// import styles from "./styles";
import { StackNavigator } from "react-navigation";
import { Animated, Easing } from "react-native";
import SplashScreen from 'react-native-splash-screen';

// Disable yellow warnings
console.disableYellowBox = true;

const RootStack = StackNavigator(
  {
    GameMode: {
      screen: GameModeScreen
    },
    Players: {
      screen: PlayersScreen
    },
    AddPlayer: {
      screen: AddPlayerScreen
    },
    Draw: {
      screen: DrawScreen
    }
  },
  {
    headerMode: "none",
    animationEnabled: false,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(2)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateX }] };
      }
    }),
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

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
          name: "Jack",
          gender: "M",
          pickedTruths: [],
          pickedDares: []
        }
      ],
      pickedTruths: [],
      pickedDares: []
    };
  }

  async _loadAssetsAsync() {
    try {
      // Font.loadAsync({
      //   "titilium-regular": require("./assets/fonts/TitilliumWeb-Regular.ttf")
      // }).then(() => {
      //   this.setState({
      //     fontLoaded: true
      //   });
      // });
    } catch (e) {
      console.log({
        e
      });
    } finally {
      this.setState({
        fontLoaded: true,
        appIsReady: true
      });
      setTimeout(() => {
        SplashScreen.hide();    
      }, 300);
    }
  }

  componentDidMount() {
    this._loadAssetsAsync();
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
