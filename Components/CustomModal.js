import React from "react";

import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from "react-native";
import CustomButton from "./CustomButton";
import { defaults, assets, styles } from "../styles";

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const buttons = this.props.buttons.map(btn => {
      return (
        <View
          style={{
            marginBottom: 15
          }}
        >
          <CustomButton
            text={btn.text}
            pressHandler={btn.pressHandler}
            type={btn.type || "inverted"}
          />
        </View>
      );
    });

    if (this.props.visible) {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => this.props.closeHandler()}
          onBackButtonPress={() => this.props.closeHandler()}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View>
              {this.props.modalText.length > 0 && (
                <Text
                  style={{
                    color: styles.colors.white,
                    alignSelf: "center",
                    fontSize: styles.generic.fontSizeMedium,
                    marginBottom: 40
                  }}
                >
                  {this.props.modalText}
                </Text>
              )}
              {buttons}
            </View>
          </View>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

CustomModal.defaultProps = {
  modalText: "",
  buttons: []
};

export default CustomModal;
