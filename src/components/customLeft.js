import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
const styles = StyleSheet.create({
  button: {
    overflow: "hidden",
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

// Our custom component we want as a button in the nav bar
class CustomButton extends React.Component {
  constructor(props) {
    super(props);
    this.isSideDrawerVisible = false;
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "tomato" }]}
        onPress={() => console.log("pressed me!")}
      >
        <View style={styles.button}>
          <Text style={{ color: "white" }}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
export default CustomButton;
