import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import styles from "../styles";
import gameModes from "../Content/gameModes.js";

export default props => {
  const mode = gameModes[props.mode];
  return (
    <TouchableOpacity
      onPress={() => props.pressHandler(props.mode)}
      style={{
        backgroundColor: styles.colors.primary,
        flex: 1,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        height: 160,
        marginBottom: 10
      }}
    >
      <Image
        source={styles.images[mode.image]}
        style={{
          width: "100%",
          height: "100%"
        }}
      />
      <View
        style={{
          height: 40,
          marginLeft: 10,
          justifyContent: "center",
          backgroundColor: styles.colors.primaryDark,
          paddingHorizontal: 20,
          alignSelf: "flex-start",
          position: "relative",
          top: -50,
          borderRadius: 25,
          zIndex: 1
        }}
      >
        <Text style={{ color: styles.colors.white }}>{mode.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
