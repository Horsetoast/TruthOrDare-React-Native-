const defaults = {
  colors: {
    primary: "#4b0095",
    primaryLight: "#a969ea",
    primaryDark: "#38046c",
    orange: "#db7b26",
    white: "#ffffff",
    male: "#1f97eb",
    female: "#d337db"
  },
  generic: {
    borderRadius: 6,
    fontSizeMedium: 18,
    fontSizeLarge: 30,
    fontFamily: "TitilliumWeb-Regular"
  }
};

const button = {
  paddingHorizontal: 20,
  paddingVertical: 8,
  marginVertical: 10,
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

export default {
  ...defaults,
  buttonPrimary: {
    ...button,
    backgroundColor: defaults.colors.orange
  },
  buttonSecondary: {
    ...button,
    backgroundColor: defaults.colors.primaryDark
  },
  textInput,
  buttonText: {
    fontFamily: defaults.generic.fontFamily,
    fontSize: defaults.generic.fontSizeMedium,
    color: defaults.colors.white
  },
  images: {
    bcgPattern: require("./assets/images/bcg_pattern.png"),
    modeParty: require("./assets/images/mode_party.png"),
    modeRaunchy: require("./assets/images/mode_raunchy.png")
  },
  svg: {
    iconMale: require("./assets/svg/icon_male.svg"),
    iconFemale: require("./assets/svg/icon_female.svg"),
    iconTimes: require("./assets/svg/icon_times.svg"),
  }
};