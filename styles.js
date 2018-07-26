import { StyleSheet } from "react-native";

const defaults = {
  colors: {
    primary: "#4b0095",
    primaryLight: "#a969ea",
    primaryDark: "#38046c",
    orange: "#db7b26",
    white: "#ffffff",
    male: "#1f97eb",
    female: "#d337db",
    grey: "#555555"
  },
  generic: {
    borderRadius: 25,
    fontSizeSmall: 14,
    fontSizeMedium: 18,
    fontSizeLarge: 30,
    fontFamily: "TitilliumWeb-Regular"
  }
};

const button = {
  paddingHorizontal: 20,
  paddingVertical: 8,
  marginVertical: 10,
  alignSelf: "center",
  alignItems: "center",
  borderRadius: defaults.generic.borderRadius
};

const textInput = {
  paddingHorizontal: 15,
  paddingVertical: 10,
  marginVertical: 10,
  minWidth: 100,
  fontSize: defaults.generic.fontSizeMedium,
  color: defaults.colors.white,
  borderColor: defaults.colors.white,
  borderBottomWidth: 1,
  textAlign: "center"
};

const styles = StyleSheet.create({
  buttonPrimary: {
    ...button,
    backgroundColor: defaults.colors.orange
  },
  buttonSecondary: {
    ...button,
    backgroundColor: defaults.colors.primaryDark
  },
  buttonInverted: {
    ...button,
    borderWidth: 1,
    paddingHorizontal: button.paddingHorizontal - 2,
    paddingVertical: button.paddingVertical - 2,
    borderColor: defaults.colors.white
  },
  disabled: {
    ...button,
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  textInput,
  buttonText: {
    fontFamily: defaults.generic.fontFamily,
    fontSize: defaults.generic.fontSizeMedium,
    color: defaults.colors.white
  },
  disabledText: {
    fontFamily: defaults.generic.fontFamily,
    fontSize: defaults.generic.fontSizeMedium,
    color: defaults.colors.primary
  }
});

const assets = {
  images: {
    bcgPattern: require("./assets/images/bcg_pattern.png"),
    modeParty: require("./assets/images/mode_party.png"),
    modeWild: require("./assets/images/mode_wild.png"),
    modeCollege: require("./assets/images/mode_college.png")
  },
  svg: {
    iconMale: require("./assets/svg/icon_male.svg"),
    iconFemale: require("./assets/svg/icon_female.svg"),
    iconTimes: require("./assets/svg/icon_times.svg"),
    iconMenu: require("./assets/svg/icon_menu.svg"),
    iconArrowLeft: require("./assets/svg/icon_arrow_left.svg")
  }
};

export { defaults, assets, styles };
