/*
Name : Parshant Nagpal
Filename : WebView.js
Description : "Contains the webView file"
*/
import React from "react";
import {WebView, View, StyleSheet} from "react-native";

class WebViewComp extends React.Component {
  render() {
    let {uri} = this.props;
    return (
      <View style={styles.container}>
        <WebView source={{uri}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default WebViewComp;
